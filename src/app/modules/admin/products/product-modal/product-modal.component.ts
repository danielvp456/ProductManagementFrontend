import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-modal.component.html'
})
export class ProductModalComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Product>();

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name || '', [Validators.required]],
      description: [this.product?.description || '', [Validators.required]],
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      stock: [this.product?.stock || 0, [Validators.required, Validators.min(0)]],
      status: [this.product?.status || 'active']
    });
  }

  onStatusChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.productForm.get('status')?.setValue(isChecked ? 'active' : 'inactive');
    console.log("status changed");
    console.log(this.productForm.value);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = {
        ...this.productForm.value,
        _id: this.product?._id
      };
      this.save.emit(productData);
    }
  }
} 