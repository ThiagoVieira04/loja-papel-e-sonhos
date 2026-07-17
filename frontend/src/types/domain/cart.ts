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
