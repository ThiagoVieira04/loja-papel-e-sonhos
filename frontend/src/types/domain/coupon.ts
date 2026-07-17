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
