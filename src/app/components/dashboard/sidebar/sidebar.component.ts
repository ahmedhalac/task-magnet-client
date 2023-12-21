import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isCollapsed = false;

  constructor() {}

  ngOnInit(): void {}

  toggleCollapse(): void {
    console.log('clicked');
    this.isCollapsed = !this.isCollapsed;
  }
}
