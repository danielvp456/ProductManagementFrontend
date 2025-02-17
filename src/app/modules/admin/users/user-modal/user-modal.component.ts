import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-modal.component.html'
})
export class UserModalComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('User in modal:', this.user);
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      id: [this.user?._id || ''],
      name: [this.user?.name || '', [Validators.required]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      password: ['', this.user ? [] : [Validators.required, Validators.minLength(6)]],
      role: [this.user?.role || 'user', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Hay errores en el formulario. Revisa los campos en rojo.');
      return;
    }
    
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log('Form data before emit:', formData);
      this.save.emit(formData);
    }
  }
} 