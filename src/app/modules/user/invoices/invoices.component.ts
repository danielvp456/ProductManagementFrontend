import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceResponse } from '../../../core/interfaces/invoice.interface';
import { InvoiceService } from '../../../core/services/invoice.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit {
  invoices: InvoiceResponse[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (response) => {
        this.invoices = response;
      },
      error: (error) => {
        console.error('Error loading invoices:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-semibold';
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return baseClasses;
    }
  }
} 