import { User } from "./user.interface";
import { InvoiceProduct } from "./invoice.interface";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  status: 'active' | 'inactive';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Invoice {
  _id: string;
  user: User;
  products: InvoiceProduct[];
  total: number;
  purchaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
} 