import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../core/interfaces/user.interface';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserService } from '../../../core/services/user.service';
import { RegisterRequest } from '../../../core/interfaces/auth.interface';
import { ApiError } from '../../../core/interfaces/error.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, UserModalComponent],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';
  showModal = false;
  selectedUser: User | null = null;
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading users. Please try again later.';
        this.isLoading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  get filteredUsers(): User[] {
    return this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(user: User | null = null): void {
    this.selectedUser = user;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  showMessage(message: string, isError: boolean = false) {
    if (isError) {
      this.error = message;
      this.successMessage = null;
    } else {
      this.successMessage = message;
      this.error = null;
    }
    setTimeout(() => {
      this.error = null;
      this.successMessage = null;
    }, 3000);
  }

  onUserSaved(userData: any): void {
    if (userData.id) {
      const updateData = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        password: userData.password
      };
      
      this.userService.updateUser(userData.id, updateData).subscribe({
        next: (updatedUser) => {
          this.users = this.users.map(u => u._id === updatedUser._id ? updatedUser : u);
          this.closeModal();
          this.showMessage('User updated successfully');
        },
        error: (error: ApiError) => this.showMessage(error.message, true)
      });
    } else {
      const createData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role
      };
      
      this.userService.createUser(createData).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
          this.showMessage('User created successfully');
        },
        error: (error: ApiError) => this.showMessage(error.message, true)
      });
    }
  }

  onDeleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user._id !== userId);
          this.showMessage('User deleted successfully');
        },
        error: (error: ApiError) => this.showMessage(error.message, true)
      });
    }
  }

  toggleUserStatus(user: User): void {
    this.users = this.users.map(u => u._id === user._id ? user : u);
  }
} 