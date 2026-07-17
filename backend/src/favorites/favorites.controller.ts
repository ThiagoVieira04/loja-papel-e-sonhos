import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';

@Controller('api/favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.favoritesService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':productId/toggle')
  toggle(@Request() req: any, @Param('productId') productId: string) {
    return this.favoritesService.toggle(req.user.id, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':productId/check')
  check(@Request() req: any, @Param('productId') productId: string) {
    return this.favoritesService.check(req.user.id, productId);
  }
}
