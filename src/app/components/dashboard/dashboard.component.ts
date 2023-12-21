import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  username = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(): void {
    this.apiService.getLoggedInUser().subscribe({
      next: (res) => {
        this.username = res?.data?.userName;
      },
      error: (err) => console.error(err),
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.cookieService.delete('access_token');
        this.router.navigate(['/']);
        //location.reload();
      },
      error: (err) => console.error(err),
    });
  }
}
