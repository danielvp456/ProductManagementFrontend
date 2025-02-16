import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../core/interfaces/product.interface';
import { CartService } from '../../../core/services/cart.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0 && newQuantity <= item.stock) {
      this.cartService.updateQuantity(item._id, newQuantity);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item._id);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  checkout(): void {
    const items = this.cartItems.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }));

    this.invoiceService.createInvoice({ items }).subscribe({
      next: (response) => {
        this.cartService.clearCart();
        // Aquí podrías redirigir a una página de confirmación
        this.router.navigate(['/invoice-success']);
      },
      error: (error) => {
        console.error('Error creating invoice:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }
} 