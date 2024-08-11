import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isAuthenticated()) {
      this.router.navigateByUrl("/lessons");
    }
  }

  onSubmit() {
    let username = this.loginForm.value.email as string;
    let password = this.loginForm.value.password as string;

    this.authService.login({ username, password }).subscribe({
      error: (errors) => {
        this.loginForm.controls.password.setErrors({authError: errors.error.message});
      },
      complete: () => {
        if (this.authService.isAuthenticated()){
          this.router.navigateByUrl("/lessons");
        }
      }
    });
  }
}
