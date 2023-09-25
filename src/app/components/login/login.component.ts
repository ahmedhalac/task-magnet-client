import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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

  login(loginData: Auth) {
    this.authService.login(loginData).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err),
    });
  }
}
