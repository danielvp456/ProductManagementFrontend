import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/interfaces/product.interface';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ProductService } from '../../../core/services/product.service';

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
  isLoading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los productos. Por favor, intente nuevamente.';
        this.isLoading = false;
        console.error('Error loading products:', error);
      }
    });
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
    this.isLoading = true;
    this.error = null;

    if (product._id) {
      // Update existing product
      const updateData = {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        status: product.status
      };

      this.productService.updateProduct(product._id, updateData).subscribe({
        next: (updatedProduct) => {
          this.products = this.products.map(p => p._id === product._id ? updatedProduct : p);
          this.isLoading = false;
          this.closeModal();
          alert('Product updated successfully');
        },
        error: (error) => {
          this.error = 'Error updating product. Please try again.';
          this.isLoading = false;
          console.error('Error updating product:', error);
        }
      });
    } else {
      // Create new product (existing code)
      const newProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        status: product.status || 'active'
      };

      this.productService.createProduct(newProduct).subscribe({
        next: (createdProduct) => {
          this.products.push(createdProduct);
          this.isLoading = false;
          this.closeModal();
          alert('Product created successfully');
        },
        error: (error) => {
          this.error = 'Error creating product. Please try again.';
          this.isLoading = false;
          console.error('Error creating product:', error);
        }
      });
    }
  }

  onDeleteProduct(productId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.isLoading = true;
      this.error = null;

      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product._id !== productId);
          this.isLoading = false;
          alert('Producto eliminado exitosamente');
        },
        error: (error) => {
          this.error = 'Error al eliminar el producto. Por favor, intente nuevamente.';
          this.isLoading = false;
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  toggleProductStatus(product: Product): void {
    const newStatus = product.status === 'active' ? 'inactive' : 'active';
    const updateData: Omit<Product, '_id'> = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      status: newStatus as 'active' | 'inactive'
    };

    this.isLoading = true;
    this.error = null;

    this.productService.updateProduct(product._id, updateData).subscribe({
      next: (updatedProduct) => {
        this.products = this.products.map(p => p._id === product._id ? updatedProduct : p);
        this.isLoading = false;
        alert('Product status updated successfully');
      },
      error: (error) => {
        this.error = 'Error updating product status. Please try again.';
        this.isLoading = false;
        console.error('Error updating product status:', error);
      }
    });
  }

  updateStock(product: Product, increment: boolean): void {
    const newStock = increment ? product.stock + 1 : product.stock - 1;
    if (newStock >= 0) {
      const updateData = {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: newStock,
        status: product.status
      };

      this.isLoading = true;
      this.error = null;

      this.productService.updateProduct(product._id, updateData).subscribe({
        next: (updatedProduct) => {
          this.products = this.products.map(p => p._id === product._id ? updatedProduct : p);
          this.isLoading = false;
          alert('Product stock updated successfully');
        },
        error: (error) => {
          this.error = 'Error updating product stock. Please try again.';
          this.isLoading = false;
          console.error('Error updating product stock:', error);
        }
      });
    }
  }
} 