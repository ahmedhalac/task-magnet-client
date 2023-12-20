import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { RegisterUser, UserResponse } from '../models/user.model';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    this.baseUrl = this.config.getApiUrl();
  }

  registerUser(data: RegisterUser): Observable<RegisterUser> {
    return this.http
      .post<RegisterUser>(`${this.baseUrl}/users/register`, data)
      .pipe(
        catchError((error) => {
          return throwError(() => new error());
        })
      );
  }

  getLoggedInUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/get-user`).pipe(
      catchError((error) => {
        return throwError(() => new error());
      })
    );
  }
}
