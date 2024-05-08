import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('Class logging interceptor: ', req);

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // console.log('Class logging interceptor: ', event);
        }
      })
    );
  }
}
