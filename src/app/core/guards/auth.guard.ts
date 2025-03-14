import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private platformId = inject(PLATFORM_ID);
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const userObj = JSON.parse(user);
        // Si es admin, redirigir al dashboard de admin
        if (userObj.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
          return false;
        }
        return true;
      }
    }
    
    this.router.navigate(['/login']);
    return false;
  }
} 