import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    status?: string;
    userId?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const { page = 1, limit = 20, status, userId, search, dateFrom, dateTo } = params;
    const where: Prisma.OrderWhereInput = {};

    if (status) where.status = status as OrderStatus;
    if (userId) where.userId = userId;
    if (search) where.user = { name: { contains: search, mode: 'insensitive' } };
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true, phone: true } },
          items: { include: { product: true, service: true } },
          coupon: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, cpf: true } },
        items: {
          include: {
            product: { include: { images: { where: { isPrimary: true } } } },
            service: true,
          },
        },
        coupon: true,
        messages: { orderBy: { createdAt: 'asc' } },
      },
    });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  async create(data: any) {
    return this.prisma.order.create({
      data: {
        userId: data.userId,
        subtotal: parseFloat(data.subtotal),
        discount: data.discount ? parseFloat(data.discount) : 0,
        shipping: data.shipping ? parseFloat(data.shipping) : 0,
        total: parseFloat(data.total),
        paymentMethod: data.paymentMethod,
        shippingAddress: data.shippingAddress,
        notes: data.notes,
        couponId: data.couponId,
        items: {
          create: data.items.map((item: any) => ({
            productId: item.productId,
            serviceId: item.serviceId,
            quantity: item.quantity || 1,
            price: parseFloat(item.price),
            total: parseFloat(item.total),
            description: item.description,
          })),
        },
      },
      include: {
        items: true,
        user: true,
      },
    });
  }

  async updateStatus(id: string, status: OrderStatus, data?: any) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Pedido não encontrado');

    const updateData: any = { status };
    if (data?.trackingCode) updateData.trackingCode = data.trackingCode;
    if (status === 'DELIVERED') updateData.deliveredAt = new Date();

    if (status === 'PAYMENT_CONFIRMED') {
      await this.prisma.user.update({
        where: { id: order.userId },
        data: { points: { increment: Math.floor(Number(order.total) * 0.1) } },
      });
    }

    return this.prisma.order.update({
      where: { id },
      data: updateData,
    });
  }

  async getOrdersByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: { include: { images: true } }, service: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDashboardStats() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalOrders,
      totalRevenue,
      totalProfit,
      todayOrders,
      monthOrders,
      monthRevenue,
      totalProducts,
      totalServices,
      totalCustomers,
      newCustomers,
      ordersByStatus,
    ] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.aggregate({ _sum: { total: true }, where: { status: 'DELIVERED' } }),
      this.prisma.financialRecord.aggregate({
        _sum: { amount: true },
        where: { type: 'income' },
      }),
      this.prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
      this.prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
      this.prisma.order.aggregate({
        _sum: { total: true },
        where: { createdAt: { gte: startOfMonth }, status: 'DELIVERED' },
      }),
      this.prisma.product.count({ where: { status: 'ACTIVE' } }),
      this.prisma.service.count({ where: { status: 'ACTIVE' } }),
      this.prisma.user.count({ where: { role: 'CUSTOMER' } }),
      this.prisma.user.count({
        where: { role: 'CUSTOMER', createdAt: { gte: startOfMonth } },
      }),
      this.prisma.order.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalProfit: totalProfit._sum.amount || 0,
      todayOrders,
      monthOrders,
      monthRevenue: monthRevenue._sum.total || 0,
      totalProducts,
      totalServices,
      totalCustomers,
      newCustomers,
      ordersByStatus: ordersByStatus.map((o) => ({ status: o.status, count: o._count })),
    };
  }
}
