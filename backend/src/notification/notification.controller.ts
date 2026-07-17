import { Controller, Get, Put, Param, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  findByUser(@Req() req: Request) {
    return this.notificationService.findByUser((req.user as any).id);
  }

  @Get('unread-count')
  getUnreadCount(@Req() req: Request) {
    return this.notificationService.getUnreadCount((req.user as any).id);
  }

  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Put('read-all')
  markAllAsRead(@Req() req: Request) {
    return this.notificationService.markAllAsRead((req.user as any).id);
  }
}
