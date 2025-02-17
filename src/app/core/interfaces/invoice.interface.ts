import { User } from "./user.interface";

export interface InvoiceProduct {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive';
  };
  quantity: number;
  unitPrice: number;
}

export interface InvoiceResponse {
  _id: string;
  user: User;
  products: InvoiceProduct[];
  total: number;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
} 