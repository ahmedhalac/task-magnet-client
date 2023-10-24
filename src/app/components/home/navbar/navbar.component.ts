import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() shouldHideMenuItems = false;
  selectedLanguage: string = '';

  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLanguageChange(): void {
    this.translateService.setDefaultLang(this.selectedLanguage);
  }

  navigateToHomePage(): void {
    this.router.navigate(['/']);
  }
}
