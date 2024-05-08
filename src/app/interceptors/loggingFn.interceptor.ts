import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log(`Logging Interceptor Req: `, req);

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(`Logging Interceptor Res: `, event);
      }
    })
  );
};
