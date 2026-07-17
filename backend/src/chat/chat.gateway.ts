import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string[]>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      const sockets = this.userSockets.get(userId) || [];
      sockets.push(client.id);
      this.userSockets.set(userId, sockets);
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, sockets] of this.userSockets.entries()) {
      const idx = sockets.indexOf(client.id);
      if (idx > -1) {
        sockets.splice(idx, 1);
        if (sockets.length === 0) this.userSockets.delete(userId);
        else this.userSockets.set(userId, sockets);
        break;
      }
    }
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: any) {
    this.server.to(`order_${payload.orderId}`).emit('newMessage', payload);
    if (payload.userId) {
      const sockets = this.userSockets.get(payload.userId);
      sockets?.forEach((sid) => {
        this.server.to(sid).emit('newMessage', payload);
      });
    }
  }

  @SubscribeMessage('joinOrder')
  handleJoinOrder(client: Socket, orderId: string) {
    client.join(`order_${orderId}`);
  }

  @SubscribeMessage('leaveOrder')
  handleLeaveOrder(client: Socket, orderId: string) {
    client.leave(`order_${orderId}`);
  }
}
