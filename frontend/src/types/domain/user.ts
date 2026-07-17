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
