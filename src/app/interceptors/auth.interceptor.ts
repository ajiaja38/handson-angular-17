import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HomeService } from '../services/home.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(HomeService).getAuthToken();

  const newReq = req.clone({
    headers: req.headers.append('Authorization', authToken),
  });

  return next(newReq);
};
