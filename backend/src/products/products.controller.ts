import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('featured') featured?: string,
    @Query('bestSeller') bestSeller?: string,
    @Query('new') new_?: string,
    @Query('status') status?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.productsService.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 12,
      category,
      search,
      featured: featured === 'true',
      bestSeller: bestSeller === 'true',
      new: new_ === 'true',
      status,
      sortBy,
      order,
    });
  }

  @Get('featured')
  getFeatured(@Query('limit') limit?: string) {
    return this.productsService.getFeatured(limit ? parseInt(limit) : 8);
  }

  @Get('best-sellers')
  getBestSellers(@Query('limit') limit?: string) {
    return this.productsService.getBestSellers(limit ? parseInt(limit) : 8);
  }

  @Get('new')
  getNew(@Query('limit') limit?: string) {
    return this.productsService.getNew(limit ? parseInt(limit) : 8);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id/related')
  findRelated(@Param('id') id: string, @Query('categoryId') categoryId: string) {
    return this.productsService.findRelated(id, categoryId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Post()
  create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Post(':id/duplicate')
  duplicate(@Param('id') id: string) {
    return this.productsService.duplicate(id);
  }
}
