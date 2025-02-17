import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private platformId = inject(PLATFORM_ID);
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user && JSON.parse(user).role === 'admin') {
        return true;
      }
      if (user) {
        this.router.navigate(['/products']);
        return false;
      }
    }
    
    this.router.navigate(['/login']);
    return false;
  }
} 