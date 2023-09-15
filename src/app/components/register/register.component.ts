import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      country: '',
      password: '',
    });
  }
  onSubmit(): void {
    if (!this.registerForm.valid) {
      console.log('You have entered invalid data');
    } else {
      this.registerUser(this.registerForm.value);
      this.registerForm.reset();
    }
  }

  registerUser(data: User): void {
    this.apiService.registerUser(data).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }
}
