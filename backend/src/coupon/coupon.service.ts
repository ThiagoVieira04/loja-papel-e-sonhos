import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async validate(code: string, orderValue: number) {
    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    if (!coupon) throw new NotFoundException('Cupom não encontrado');
    if (!coupon.isActive) throw new BadRequestException('Cupom inativo');
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses)
      throw new BadRequestException('Cupom esgotado');
    if (coupon.expiresAt && coupon.expiresAt < new Date())
      throw new BadRequestException('Cupom expirado');
    if (coupon.minValue && orderValue < Number(coupon.minValue))
      throw new BadRequestException(`Valor mínimo de R$ ${coupon.minValue} não atingido`);

    return coupon;
  }

  async apply(code: string, orderValue: number) {
    const coupon = await this.validate(code, orderValue);
    let discount = 0;

    if (coupon.type === 'percentage') {
      discount = orderValue * (Number(coupon.value) / 100);
    } else {
      discount = Number(coupon.value);
    }

    await this.prisma.coupon.update({
      where: { id: coupon.id },
      data: { usedCount: { increment: 1 } },
    });

    return { discount, code, couponId: coupon.id };
  }

  async findAll() {
    return this.prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: any) {
    return this.prisma.coupon.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.coupon.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.coupon.delete({ where: { id } });
  }
}
