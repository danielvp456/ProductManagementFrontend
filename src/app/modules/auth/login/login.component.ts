import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserStateService } from '../../../core/services/user-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStateService: UserStateService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.value) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.userStateService.updateUserRole(response.user.role);
          
          if(response.user.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          }
          if(response.user.role === 'user'){
            this.router.navigate(['/user/products']);
          }
        },
        error: (error) => {
          alert(error.message);
        }
      });
    }
  }
}
