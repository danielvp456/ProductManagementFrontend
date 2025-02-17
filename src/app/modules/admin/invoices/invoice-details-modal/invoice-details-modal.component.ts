import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceResponse } from '../../../../core/interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-details-modal.component.html'
})
export class InvoiceDetailsModalComponent {
  @Input() invoice: InvoiceResponse | null = null;
  @Output() close = new EventEmitter<void>();
} 