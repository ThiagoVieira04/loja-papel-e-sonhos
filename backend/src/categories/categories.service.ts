import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as slugify from 'slugify';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(type?: string) {
    const where: any = { isActive: true };
    if (type) where.type = type;
    return this.prisma.category.findMany({
      where,
      orderBy: { order: 'asc' },
      include: { _count: { select: { products: true, services: true } } },
    });
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: { _count: { select: { products: true, services: true } } },
    });
    if (!category) throw new NotFoundException('Categoria não encontrada');
    return category;
  }

  async create(data: any) {
    const slug = slugify.default(data.name, { lower: true, strict: true });
    return this.prisma.category.create({ ...data, slug });
  }

  async update(id: string, data: any) {
    if (data.name) data.slug = slugify.default(data.name, { lower: true, strict: true });
    return this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
