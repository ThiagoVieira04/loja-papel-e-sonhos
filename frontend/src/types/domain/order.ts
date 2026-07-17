import { User } from "./user";
import { Product } from "./product";
import { Service } from "./service";
import { Coupon } from "./coupon";
import { Message } from "./message";

export type OrderStatus =
  | "PENDING"
  | "PAYMENT_CONFIRMED"
  | "IN_PRODUCTION"
  | "AWAITING_APPROVAL"
  | "CORRECTION"
  | "FINISHED"
  | "READY_FOR_PICKUP"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: string;
  userId: string;
  user: User;
  status: OrderStatus;
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  paymentMethod?: "PIX" | "CREDIT_CARD" | "BOLETO" | "MONEY";
  paymentStatus: "PENDING" | "APPROVED" | "DECLINED" | "REFUNDED";
  items: OrderItem[];
  coupon?: Coupon;
  shippingAddress?: string;
  trackingCode?: string;
  createdAt: string;
  messages: Message[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string;
  serviceId?: string;
  product?: Product;
  service?: Service;
  quantity: number;
  price: number;
  total: number;
  files?: string;
  description?: string;
}
