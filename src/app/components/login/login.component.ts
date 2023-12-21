import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.redirectToDashboardIfAuthenticated();
  }

  redirectToDashboardIfAuthenticated(): void {
    if (this.authService.isAuthenticated()) {
      this.navigateToDasboard();
    }
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  onSubmit(): void {
    const loginData: Auth = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.login(loginData);
  }

  navigateToDasboard(): void {
    this.router.navigate(['/dashboard']);
  }

  login(loginData: Auth) {
    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.cookieService.set('access_token', res?.token);
        this.navigateToDasboard();
      },
      error: (err) => this.toastr.error('Invalid username or password'),
    });
  }
}
