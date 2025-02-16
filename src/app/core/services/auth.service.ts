import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../interfaces/auth.interface';
import { ApiError } from '../interfaces/error.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, {
      email,
      password
    }).pipe(
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: ApiError;
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = {
        statusCode: 500,
        error: 'Client Error',
        message: error.error.message,
        timestamp: new Date().toISOString(),
        path: error.url || ''
      };
    } else {
      // Error del servidor
      errorMessage = error.error;
    }

    return throwError(() => errorMessage);
  }
} 