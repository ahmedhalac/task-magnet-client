import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.endsWith('/refresh-token') ||
      request.url.endsWith('/auth/login')
    ) {
      return next.handle(request);
    }

    const accessToken = this.cookieService.get('access_token');
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        // Handle token expiration error and attempt to refresh the token.
        if (error.status === 401 && error.error === 'Token expired') {
          return this.authService.refreshToken().pipe(
            switchMap((response) => {
              this.cookieService.set('access_token', response.token);
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`,
                },
              });
              return next.handle(request);
            })
          );
        }
        throw error;
      })
    );
  }
}
