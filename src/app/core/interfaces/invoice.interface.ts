import { User } from "./user.interface";

export interface InvoiceProduct {
  product: {
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
  user: User;
  products: InvoiceProduct[];
  total: number;
  purchaseDate: string;
} 