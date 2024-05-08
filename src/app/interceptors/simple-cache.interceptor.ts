import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { of, tap } from 'rxjs';

const cache: any = {};

export const simpleCacheInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.urlWithParams;
  const responseCache = cache[`${url}`];

  if (responseCache) {
    return of(responseCache);
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        cache[`${url}`] = event.clone({
          status: 204,
        });
      }
    })
  );
};
