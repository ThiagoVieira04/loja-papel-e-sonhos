export interface Message {
  id: string;
  orderId?: string;
  userId: string;
  senderId: string;
  content?: string;
  file?: string;
  isRead: boolean;
  createdAt: string;
  user: { id: string; name: string; avatar?: string; role: string };
}
