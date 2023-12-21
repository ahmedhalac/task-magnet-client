import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, finalize, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ConfigService } from 'src/app/core/services/config.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private baseUrl: string;

  constructor(private authService: AuthService, private config: ConfigService) {
    this.baseUrl = this.config.getApiUrl();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              if (res) {
                this.authService.setAccessToken(res.token);
                request = this.addToken(request, res.token);
                return next.handle(request);
              } else {
                this.authService.logout();
                return throwError(() => new Error(error));
              }
            }),
            catchError((refreshError) => {
              this.authService.logout();
              return throwError(() => new Error(refreshError));
            }),
            finalize(() => {
              this.isRefreshing = false;
            })
          );
        } else {
          return throwError(() => new Error(error));
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
