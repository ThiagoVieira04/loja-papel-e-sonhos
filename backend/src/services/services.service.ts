import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as slugify from 'slugify';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    status?: string;
  }) {
    const { page = 1, limit = 12, category, search, status } = params;
    const where: Prisma.ServiceWhereInput = {};

    if (category) where.category = { slug: category };
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (status) where.status = status as any;
    else where.status = 'ACTIVE';

    const [data, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        include: { category: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.service.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { slug },
      include: { category: true, reviews: { include: { user: true } } },
    });
    if (!service) throw new NotFoundException('Serviço não encontrado');
    return service;
  }

  async create(data: any) {
    const slug = slugify.default(data.name, { lower: true, strict: true });
    return this.prisma.service.create({
      data: {
        ...data,
        slug,
        price: parseFloat(data.price),
      },
      include: { category: true },
    });
  }

  async update(id: string, data: any) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Serviço não encontrado');
    if (data.name) data.slug = slugify.default(data.name, { lower: true, strict: true });
    if (data.price) data.price = parseFloat(data.price);
    return this.prisma.service.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async delete(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Serviço não encontrado');
    await this.prisma.service.delete({ where: { id } });
    return { message: 'Serviço excluído com sucesso' };
  }
}
