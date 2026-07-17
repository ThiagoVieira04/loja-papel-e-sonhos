import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { ChatModule } from './chat/chat.module';
import { AdminModule } from './admin/admin.module';
import { UploadModule } from './upload/upload.module';
import { CouponModule } from './coupon/coupon.module';
import { ReviewModule } from './review/review.module';
import { NotificationModule } from './notification/notification.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    ProductsModule,
    ServicesModule,
    OrdersModule,
    CategoriesModule,
    ChatModule,
    AdminModule,
    UploadModule,
    CouponModule,
    ReviewModule,
    NotificationModule,
    FavoritesModule,
    AddressesModule,
  ],
})
export class AppModule {}
