import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();

  updateUserRole(role: string) {
    this.userRoleSubject.next(role);
  }

  clearUserRole() {
    this.userRoleSubject.next('');
  }
} 