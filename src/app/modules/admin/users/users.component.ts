import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../core/interfaces/user.interface';
import { UserModalComponent } from './user-modal/user-modal.component';

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

  // Datos de ejemplo (después se reemplazarán con datos del backend)
  mockUsers: User[] = [
    {
      id: '1',
      name: 'John Admin',
      email: 'john@admin.com',
      role: 'admin'
    },
    {
      id: '2',
      name: 'Jane User',
      email: 'jane@user.com',
      role: 'user'
    }
  ];

  ngOnInit(): void {
    this.users = this.mockUsers;
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

  onUserSaved(user: User): void {
    if (user.id) {
      // Actualizar usuario existente
      this.users = this.users.map(u => u.id === user.id ? user : u);
    } else {
      // Crear nuevo usuario
      const newUser = {
        ...user
      };
      this.users.push(newUser);
    }
    this.closeModal();
  }

  onDeleteUser(userId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.users = this.users.filter(user => user.id !== userId);
    }
  }

  toggleUserStatus(user: User): void {
    this.users = this.users.map(u => u.id === user.id ? user : u);
  }
} 