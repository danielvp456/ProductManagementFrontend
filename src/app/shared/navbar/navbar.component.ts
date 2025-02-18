import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserStateService } from '../../core/services/user-state.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private userStateService = inject(UserStateService);
  private cartService = inject(CartService);
  isMobileMenuOpen = false;
  userRole: string = '';
  cartItemCount: number = 0;

  constructor(private router: Router) {
    this.userStateService.userRole$.subscribe(role => {
      this.userRole = role;
    });
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const userRole = JSON.parse(user).role;
        this.userStateService.updateUserRole(userRole);
      }
    }
  }

  get isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('user');
    }
    return false;
  }

  get isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.userStateService.clearUserRole();
    }
    this.router.navigate(['/login']);
  }
}
