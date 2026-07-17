export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  cpf?: string;
  avatar?: string;
  role: "CUSTOMER" | "ADMIN" | "STAFF";
  points: number;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label?: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  type: string;
  _count?: { products: number; services: number };
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  category: Category;
  price: number;
  promotionalPrice?: number;
  stock: number;
  weight?: number;
  productionDays: number;
  sku?: string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  videoUrl?: string;
  images: ProductImage[];
  views: number;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  category: Category;
  price: number;
  estimatedTime?: string;
  requiredDocs?: string;
  requiresUpload: boolean;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  createdAt: string;
}

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

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  type: string;
  value: number;
  minValue?: number;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  expiresAt?: string;
}

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

export interface CartItem {
  id: string;
  type: "product" | "service";
  name: string;
  price: number;
  quantity: number;
  image?: string;
  productId?: string;
  serviceId?: string;
  file?: string;
  description?: string;
}
