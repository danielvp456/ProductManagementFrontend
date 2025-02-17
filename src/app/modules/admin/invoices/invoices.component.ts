import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceResponse } from '../../../core/interfaces/invoice.interface';
import { InvoiceDetailsModalComponent } from './invoice-details-modal/invoice-details-modal.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InvoiceDetailsModalComponent],
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit {
  invoices: InvoiceResponse[] = [];
  searchTerm: string = '';
  selectedDateRange: string = 'all';
  showModal = false;
  selectedInvoice: InvoiceResponse | null = null;
  startDate: string = '';
  endDate: string = '';

  // Datos de ejemplo (después se reemplazarán con datos del backend)
  mockInvoices: InvoiceResponse[] = [
    {
      user: {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      },
      products: [
        {
          product: {
            name: 'Gaming Laptop',
            description: 'High-performance gaming laptop',
            price: 1299.99,
            stock: 10,
            status: 'active'
          },
          quantity: 1,
          unitPrice: 1299.99
        }
      ],
      total: 1299.99,
      purchaseDate: '2024-01-15'
    }
  ];

  ngOnInit(): void {
    this.invoices = this.mockInvoices;
  }

  get filteredInvoices(): InvoiceResponse[] {
    return this.invoices.filter(invoice => {
      const matchesSearch = 
        invoice.user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        invoice.user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const invoiceDate = new Date(invoice.purchaseDate);
      let matchesDate = true;

      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        matchesDate = invoiceDate >= start && invoiceDate <= end;
      } else {
        switch (this.selectedDateRange) {
          case 'today':
            matchesDate = this.isToday(invoiceDate);
            break;
          case 'week':
            matchesDate = this.isThisWeek(invoiceDate);
            break;
          case 'month':
            matchesDate = this.isThisMonth(invoiceDate);
            break;
          default:
            matchesDate = true;
        }
      }

      return matchesSearch && matchesDate;
    });
  }

  openModal(invoice: InvoiceResponse): void {
    this.selectedInvoice = invoice;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedInvoice = null;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  private isThisWeek(date: Date): boolean {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return date >= weekStart && date <= weekEnd;
  }

  private isThisMonth(date: Date): boolean {
    const today = new Date();
    return date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  }
} 