import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { HomeService } from '../services/home.service';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(HomeService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return authService.getRefreshToken().pipe(
          switchMap((response: string) => {
            authService.setAuthToken(response);
            req = req.clone({
              headers: req.headers.append('Authorization', response),
            });

            return next(req);
          }),
          catchError((err) => throwError(() => err.message))
        );
      }

      return throwError(() => err.message);
    })
  );
};
