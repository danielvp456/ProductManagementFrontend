import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RegisterRequest, RegisterResponse } from '../interfaces/auth.interface';
import { UpdateUserRequest, User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  createUser(userData: RegisterRequest): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/users`,
      userData,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userId: string, userData: UpdateUserRequest): Observable<User> {
    // Eliminar el campo password si está vacío
    if (userData.password === '') {
      delete userData.password;
    }

    return this.http.put<User>(
      `${this.baseUrl}/users/${userId}`,
      userData,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/users/${userId}`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/users/register`,
      userData
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => errorMessage);
  }
} 