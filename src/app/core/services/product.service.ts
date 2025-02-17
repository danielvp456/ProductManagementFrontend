import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product } from '../interfaces/product.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllProducts(): Observable<Product[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Product[]>(`${this.baseUrl}/products`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createProduct(product: Omit<Product, '_id'>): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Product>(`${this.baseUrl}/products`, product, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(productId: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.baseUrl}/products/${productId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(productId: string, product: Omit<Product, '_id'>): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Product>(`${this.baseUrl}/products/${productId}`, product, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError = AuthService.prototype.handleError;
} 