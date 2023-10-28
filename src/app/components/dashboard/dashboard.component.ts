import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.cookieService.delete('access_token');
        location.reload();
      },
      error: (err) => console.error(err),
    });
  }
}
