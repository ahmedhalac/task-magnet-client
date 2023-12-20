import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  username = '';
  isCollapsed = false;

  constructor(private apiService: ApiService) {}

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

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
