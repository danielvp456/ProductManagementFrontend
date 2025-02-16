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
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
} 