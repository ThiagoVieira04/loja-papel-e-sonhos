import { Controller, Get, Post, Put, Param, Body, UseGuards, Req, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('messages')
  getMessages(
    @Query('orderId') orderId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.chatService.getMessages(orderId, userId);
  }

  @Post('send')
  sendMessage(@Body() body: any, @Req() req: Request) {
    return this.chatService.sendMessage({
      ...body,
      senderId: (req.user as any).id,
    });
  }

  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.chatService.markAsRead(id);
  }
}
