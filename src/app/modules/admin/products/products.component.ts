import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/interfaces/product.interface';
import { ProductModalComponent } from './product-modal/product-modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductModalComponent],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  showModal = false;
  selectedProduct: Product | null = null;

  // Datos de ejemplo (después se reemplazarán con datos del backend)
  mockProducts: Product[] = [
    {
      _id: '1',
      name: 'Gaming Laptop',
      description: 'High-performance gaming laptop',
      price: 1299.99,
      stock: 15,
      status: 'active'
    },
    {
      _id: '2',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      price: 29.99,
      stock: 50,
      status: 'active'
    }
  ];

  ngOnInit(): void {
    this.products = this.mockProducts;
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(product: Product | null = null): void {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
  }

  onProductSaved(product: Product): void {
    if (product._id) {
      // Actualizar producto existente
      this.products = this.products.map(p => p._id === product._id ? product : p);
    } else {
      // Crear nuevo producto
      const newProduct = {
        ...product
      };
      this.products.push(newProduct);
    }
    this.closeModal();
  }

  onDeleteProduct(productId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.products = this.products.filter(product => product._id !== productId);
    }
  }

  toggleProductStatus(product: Product): void {
    product.status = product.status === 'active' ? 'inactive' : 'active';
    this.products = this.products.map(p => p._id === product._id ? product : p);
  }

  updateStock(product: Product, increment: boolean): void {
    const newStock = increment ? product.stock + 1 : product.stock - 1;
    if (newStock >= 0) {
      product.stock = newStock;
      this.products = this.products.map(p => p._id === product._id ? product : p);
    }
  }
} 