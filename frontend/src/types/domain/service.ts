import { Category } from "./category";

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
