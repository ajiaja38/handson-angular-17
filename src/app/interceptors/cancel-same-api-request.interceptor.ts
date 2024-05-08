import { HttpInterceptorFn } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

const pendingRequestObject: any = {};

export const cancelSameApiRequestInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const url = req.urlWithParams;
  const pendingRequest$ = pendingRequestObject[`${url}`];

  if (pendingRequest$) {
    pendingRequest$.next(); // STOP
  }

  const newRequests$ = new Subject<void>();
  pendingRequestObject[`${url}`] = newRequests$;
  return next(req).pipe(takeUntil(newRequests$));
};
