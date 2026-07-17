import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('coupons')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Post('validate')
  validate(@Body() body: { code: string; orderValue: number }) {
    return this.couponService.validate(body.code, body.orderValue);
  }

  @Post('apply')
  apply(@Body() body: { code: string; orderValue: number }) {
    return this.couponService.apply(body.code, body.orderValue);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Post()
  create(@Body() body: any) {
    return this.couponService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.couponService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.couponService.delete(id);
  }
}
