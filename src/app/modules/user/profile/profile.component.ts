import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../core/interfaces/user.interface';
import { UserService } from '../../../core/services/user.service';
import { InvoiceService } from '../../../core/services/invoice.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userProfile: User;
  newPassword: string = '';
  stats = {
    totalPurchases: 0,
    totalSpent: 0,
    lastPurchase: null as Date | null
  };

  constructor(
    private userService: UserService,
    private invoiceService: InvoiceService
  ) {
    const userStr = localStorage.getItem('user');
    this.userProfile = userStr ? JSON.parse(userStr) : null;
  }

  ngOnInit(): void {
    this.loadPurchaseStats();
  }

  loadPurchaseStats(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (invoices) => {
        this.stats.totalPurchases = invoices.length;
        this.stats.totalSpent = invoices.reduce((total, inv) => total + inv.total, 0);
        if (invoices.length > 0) {
          this.stats.lastPurchase = new Date(invoices[0].purchaseDate);
        }
      },
      error: (error) => {
        console.error('Error loading purchase stats:', error);
      }
    });
  }

  updateProfile(): void {
    if (!this.userProfile) return;

    const updateData = {
      name: this.userProfile.name,
      email: this.userProfile.email,
      ...(this.newPassword ? { password: this.newPassword } : {})
    };

    this.userService.updateUser(this.userProfile._id, updateData).subscribe({
      next: (updatedUser) => {
        // Mantener el ID del usuario al actualizar
        const updatedUserWithId = {
          ...updatedUser,
          id: this.userProfile._id // Aseguramos que el ID se mantiene
        };
        
        // Actualizar el localStorage con el usuario completo
        localStorage.setItem('user', JSON.stringify(updatedUserWithId));
        this.userProfile = updatedUserWithId;
        this.newPassword = '';
        alert('Profile updated successfully');
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        alert(error.message);
      }
    });
  }
} 