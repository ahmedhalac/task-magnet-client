import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Auth } from '../models/auth.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    this.baseUrl = this.config.getApiUrl();
  }

  login(data: Auth): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/auth/login`, data).pipe(
      catchError((error) => {
        return throwError(() => new error());
      })
    );
  }
}
