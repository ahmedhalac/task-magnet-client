import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  selectedLanguage: string = '';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  onLanguageChange(): void {
    this.translateService.setDefaultLang(this.selectedLanguage);
  }
}
