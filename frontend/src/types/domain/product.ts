import { Category } from "./category";

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
