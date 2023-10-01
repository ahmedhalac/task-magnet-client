import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}
  logout(): void {
    this.authService.logout().subscribe({
      next: (_) => console.log('You have been logged out'),
      error: (err) => console.error(err),
    });
  }
}
