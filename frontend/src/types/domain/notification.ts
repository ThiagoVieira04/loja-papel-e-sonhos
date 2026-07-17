export interface Notification {
  id: string;
  userId: string;
  orderId?: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}
