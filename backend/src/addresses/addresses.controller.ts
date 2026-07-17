import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddressesService } from './addresses.service';

@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.addressesService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() body: any) {
    return this.addressesService.create(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() body: any) {
    return this.addressesService.update(req.user.id, id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req: any, @Param('id') id: string) {
    return this.addressesService.delete(req.user.id, id);
  }
}
