import { HttpInterceptorFn } from '@angular/common/http';
import { retry, RetryConfig } from 'rxjs';

const defaultRetryConfig: RetryConfig = {
  count: 3,
  delay: 2000,
  resetOnSuccess: false,
};

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(retry(defaultRetryConfig));
};
