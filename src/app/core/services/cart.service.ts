import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../interfaces/product.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private platformId = inject(PLATFORM_ID);
  
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Cargar carrito del localStorage solo si estamos en el navegador
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems.next(JSON.parse(savedCart));
      }
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product): void {
    const currentItems = [...this.cartItems.value];
    // Buscamos si el producto específico ya existe en el carrito
    const existingItem = currentItems.find(item => item._id === product._id);

    if (existingItem) {
      // Si el producto ya existe, incrementamos su cantidad
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      // Si es un producto nuevo, lo añadimos como un nuevo item
      const newItem: CartItem = {
        ...product,
        quantity: 1
      };
      this.cartItems.next([...currentItems, newItem]);
    }

    this.saveToLocalStorage();
  }

  updateQuantity(itemId: string, quantity: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map(item => 
      item._id === itemId ? { ...item, quantity } : item
    );
    this.cartItems.next(updatedItems);
    this.saveToLocalStorage();
  }

  removeItem(itemId: string): void {
    const filteredItems = this.cartItems.value.filter(item => item._id !== itemId);
    this.cartItems.next(filteredItems);
    this.saveToLocalStorage();
  }

  clearCart(): void {
    this.cartItems.next([]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cart');
    }
  }

  private saveToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
    }
  }
} 