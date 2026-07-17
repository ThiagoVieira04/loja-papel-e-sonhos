import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { OrdersService } from '../orders/orders.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'STAFF')
export class AdminController {
  constructor(
    private prisma: PrismaService,
    private ordersService: OrdersService,
  ) {}

  @Get('dashboard')
  async getDashboard() {
    return this.ordersService.getDashboardStats();
  }

  @Get('customers')
  async getCustomers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const pg = page ? parseInt(page) : 1;
    const lm = limit ? parseInt(limit) : 20;
    const where: any = { role: 'CUSTOMER' };
    if (search) where.name = { contains: search, mode: 'insensitive' };

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          cpf: true,
          points: true,
          createdAt: true,
          lastLogin: true,
          _count: { select: { orders: true } },
        },
        skip: (pg - 1) * lm,
        take: lm,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data, meta: { total, page: pg, limit: lm, totalPages: Math.ceil(total / lm) } };
  }

  @Get('customers/:id')
  async getCustomer(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        addresses: true,
        orders: {
          include: { items: { include: { product: true, service: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { orders: true } },
      },
    });
  }

  @Get('financial')
  async getFinancial(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('type') type?: string,
  ) {
    const where: any = {};
    if (dateFrom || dateTo) {
      where.date = {};
      if (dateFrom) where.date.gte = new Date(dateFrom);
      if (dateTo) where.date.lte = new Date(dateTo);
    }
    if (type) where.type = type;

    const records = await this.prisma.financialRecord.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    const totals = await this.prisma.financialRecord.groupBy({
      by: ['type'],
      _sum: { amount: true },
      where,
    });

    return { records, totals };
  }

  @Get('reports/sales')
  async getSalesReport(
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    const y = year ? parseInt(year) : new Date().getFullYear();
    const start = month
      ? new Date(y, parseInt(month) - 1, 1)
      : new Date(y, 0, 1);
    const end = month
      ? new Date(y, parseInt(month), 0, 23, 59, 59)
      : new Date(y + 1, 0, 0, 23, 59, 59);

    const orders = await this.prisma.order.findMany({
      where: {
        createdAt: { gte: start, lte: end },
        status: 'DELIVERED',
      },
      include: { items: { include: { product: true, service: true } } },
      orderBy: { createdAt: 'asc' },
    });

    const totalRevenue = orders.reduce((acc, o) => acc + Number(o.total), 0);

    const productSales: Record<string, { name: string; quantity: number; total: number }> = {};
    const serviceSales: Record<string, { name: string; quantity: number; total: number }> = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.product) {
          if (!productSales[item.product.id]) {
            productSales[item.product.id] = { name: item.product.name, quantity: 0, total: 0 };
          }
          productSales[item.product.id].quantity += item.quantity;
          productSales[item.product.id].total += Number(item.total);
        }
        if (item.service) {
          if (!serviceSales[item.service.id]) {
            serviceSales[item.service.id] = { name: item.service.name, quantity: 1, total: 0 };
          }
          serviceSales[item.service.id].quantity += 1;
          serviceSales[item.service.id].total += Number(item.total);
        }
      });
    });

    return {
      period: { year: y, month: month || 'all' },
      totalOrders: orders.length,
      totalRevenue,
      productSales: Object.values(productSales).sort((a, b) => b.total - a.total),
      serviceSales: Object.values(serviceSales).sort((a, b) => b.total - a.total),
    };
  }

  @Get('reports/cash-flow')
  async getCashFlow(@Query('days') days?: string) {
    const d = days ? parseInt(days) : 30;
    const start = new Date();
    start.setDate(start.getDate() - d);

    const records = await this.prisma.financialRecord.findMany({
      where: { date: { gte: start } },
      orderBy: { date: 'asc' },
    });

    const dailyFlow: Record<string, { income: number; expense: number }> = {};
    records.forEach((r) => {
      const key = r.date.toISOString().split('T')[0];
      if (!dailyFlow[key]) dailyFlow[key] = { income: 0, expense: 0 };
      if (r.type === 'income') dailyFlow[key].income += Number(r.amount);
      else dailyFlow[key].expense += Number(r.amount);
    });

    return {
      startDate: start,
      endDate: new Date(),
      dailyFlow,
      totalIncome: records.filter((r) => r.type === 'income').reduce((a, r) => a + Number(r.amount), 0),
      totalExpense: records.filter((r) => r.type === 'expense').reduce((a, r) => a + Number(r.amount), 0),
    };
  }
}
