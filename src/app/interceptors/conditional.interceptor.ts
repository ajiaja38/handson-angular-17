import { HttpInterceptorFn } from '@angular/common/http';
import { BYPASS_LOGGING } from '../shared/constants/context.constant';

export const conditionalInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(BYPASS_LOGGING)) {
    return next(req);
  } else {
    // console.log(
    //   'conditionalInterceptor: BYPASS_LOGGING context is',
    //   req.context.get(BYPASS_LOGGING)
    // );
  }

  return next(req);
};
