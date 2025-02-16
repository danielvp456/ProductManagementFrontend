import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Invoice } from '../interfaces/product.interface';
import { InvoiceResponse } from '../interfaces/invoice.interface';
import { AuthService } from './auth.service';

interface InvoiceRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllInvoices(): Observable<InvoiceResponse[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<InvoiceResponse[]>(`${this.baseUrl}/invoices`, { headers })
      .pipe(catchError(this.handleError));
  }

  createInvoice(items: InvoiceRequest): Observable<Invoice> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Invoice>(`${this.baseUrl}/invoices`, items, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError = AuthService.prototype.handleError;
} 