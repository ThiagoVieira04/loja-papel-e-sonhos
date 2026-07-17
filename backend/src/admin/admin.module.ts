import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [OrdersModule, ProductsModule, ServicesModule],
  controllers: [AdminController],
})
export class AdminModule {}
