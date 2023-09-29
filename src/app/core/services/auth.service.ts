import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
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
    return this.http
      .post<Login>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          this.cookieService.set('access_token', res.token);
        })
      );
  }

  refreshToken(): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/auth/refresh-token`, {});
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }
}
