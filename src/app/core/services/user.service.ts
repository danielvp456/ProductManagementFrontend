import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RegisterRequest, RegisterResponse } from '../interfaces/auth.interface';
import { UpdateUserRequest, User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  updateUser(userId: string, userData: UpdateUserRequest): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<User>(
      `${this.baseUrl}/users/${userId}`,
      userData,
      { headers }
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

  private handleError = AuthService.prototype.handleError;
} 