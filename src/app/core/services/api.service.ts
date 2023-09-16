import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/User';
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

  registerUser(data: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users/register`, data).pipe(
      catchError((error) => {
        return throwError(() => new error());
      })
    );
  }
}
