import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { ApiService } from 'src/app/core/services/api.service';
import { errorMessages } from 'src/app/shared/constants/form-error-messages.const';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessages = errorMessages;
  shouldShowErrorMessages = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerUser(this.registerForm.value);
    } else {
      this.shouldShowErrorMessages = true;
    }
  }

  registerUser(data: User): void {
    this.apiService.registerUser(data).subscribe({
      next: () => {
        this.registerForm.reset();
        this.shouldShowErrorMessages = false;
      },
      error: (err) => console.error(err),
    });
  }
}
