import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, tap } from 'rxjs';
import { Auth } from '../models/auth.model';
import { Login } from '../models/login.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.baseUrl = this.config.getApiUrl();
  }

  login(credentials: Auth): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/auth/login`, credentials);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string {
    return this.cookieService.get('access_token');
  }

  setAccessToken(token: string): void {
    this.cookieService.set('access_token', token);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/logout`, {});
  }
}
