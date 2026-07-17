import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    featured?: boolean;
    bestSeller?: boolean;
    new?: boolean;
    status?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      featured,
      bestSeller,
      new: isNew,
      status,
      sortBy = 'createdAt',
      order = 'desc',
    } = params;

    const where: Prisma.ProductWhereInput = {};

    if (category) where.category = { slug: category };
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (featured) where.isFeatured = true;
    if (bestSeller) where.isBestSeller = true;
    if (isNew) where.isNew = true;
    if (status) where.status = status as any;
    else where.status = 'ACTIVE';

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          images: { orderBy: { order: 'asc' } },
          category: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { order: 'asc' } },
        category: true,
        reviews: { include: { user: { select: { id: true, name: true, avatar: true } } } },
      },
    });
    if (!product) throw new NotFoundException('Produto não encontrado');

    await this.prisma.product.update({
      where: { id: product.id },
      data: { views: { increment: 1 } },
    });

    return product;
  }

  async findRelated(productId: string, categoryId: string) {
    return this.prisma.product.findMany({
      where: {
        categoryId,
        id: { not: productId },
        status: 'ACTIVE',
      },
      include: { images: { where: { isPrimary: true } } },
      take: 4,
    });
  }

  async create(data: any) {
    const slug = slugify.default(data.name, { lower: true, strict: true });
    return this.prisma.product.create({
      data: {
        ...data,
        slug,
        price: parseFloat(data.price),
        promotionalPrice: data.promotionalPrice ? parseFloat(data.promotionalPrice) : null,
        stock: data.stock ? parseInt(data.stock) : 0,
        weight: data.weight ? parseFloat(data.weight) : null,
        images: {
          create: data.images?.map((img: any, idx: number) => ({
            url: img.url,
            alt: img.alt || data.name,
            order: idx,
            isPrimary: idx === 0,
          })) || [],
        },
      },
      include: { images: true, category: true },
    });
  }

  async update(id: string, data: any) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');

    if (data.name) {
      data.slug = slugify.default(data.name, { lower: true, strict: true });
    }

    if (data.price) data.price = parseFloat(data.price);
    if (data.promotionalPrice) data.promotionalPrice = parseFloat(data.promotionalPrice);
    if (data.stock) data.stock = parseInt(data.stock);
    if (data.weight) data.weight = parseFloat(data.weight);

    if (data.images) {
      await this.prisma.productImage.deleteMany({ where: { productId: id } });
      data.images = {
        create: data.images.map((img: any, idx: number) => ({
          url: img.url,
          alt: img.alt || data.name,
          order: idx,
          isPrimary: idx === 0,
        })),
      };
    }

    return this.prisma.product.update({
      where: { id },
      data,
      include: { images: true, category: true },
    });
  }

  async delete(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    await this.prisma.product.delete({ where: { id } });
    return { message: 'Produto excluído com sucesso' };
  }

  async duplicate(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!product) throw new NotFoundException('Produto não encontrado');

    const { id: _, images, createdAt, updatedAt, views, slug, ...data } = product;
    return this.create({
      ...data,
      name: `${data.name} (cópia)`,
      images: images.map((img) => ({ url: img.url, alt: img.alt })),
    });
  }

  async getBestSellers(limit = 8) {
    return this.prisma.product.findMany({
      where: { isBestSeller: true, status: 'ACTIVE' },
      include: { images: { where: { isPrimary: true } } },
      take: limit,
    });
  }

  async getFeatured(limit = 8) {
    return this.prisma.product.findMany({
      where: { isFeatured: true, status: 'ACTIVE' },
      include: { images: { where: { isPrimary: true } } },
      take: limit,
    });
  }

  async getNew(limit = 8) {
    return this.prisma.product.findMany({
      where: { isNew: true, status: 'ACTIVE' },
      include: { images: { where: { isPrimary: true } } },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}
