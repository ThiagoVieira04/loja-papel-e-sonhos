import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(data: {
    orderId?: string;
    userId: string;
    senderId: string;
    content?: string;
    file?: string;
  }) {
    return this.prisma.message.create({ data });
  }

  async getMessages(orderId?: string, userId?: string) {
    const where: any = {};
    if (orderId) where.orderId = orderId;
    if (userId) where.userId = userId;
    return this.prisma.message.findMany({
      where,
      include: { user: { select: { id: true, name: true, avatar: true, role: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async markAsRead(messageId: string) {
    return this.prisma.message.update({
      where: { id: messageId },
      data: { isRead: true, readAt: new Date() },
    });
  }
}
