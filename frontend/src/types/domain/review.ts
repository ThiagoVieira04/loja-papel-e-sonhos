export interface Review {
  id: string;
  userId: string;
  user: { id: string; name: string; avatar?: string };
  productId?: string;
  serviceId?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}
