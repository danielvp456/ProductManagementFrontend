import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/interfaces/product.interface';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.map(product => ({
          _id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          image: product.image,
          status: product.status
        }));
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  addToCart(product: Product): void {
    console.log('Adding to cart:', product);
    const productToAdd: Product = {
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
      status: product.status
    };
    
    this.cartService.addToCart(productToAdd);
    alert(`${product.name} has been added to your cart`);
  }
} 