import {
  HttpEventType,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { of, tap } from 'rxjs';

interface CacheEntry {
  response: HttpResponse<any>;
  timestamp: number;
}

const cache: any = {};
const cacheDuration = 5 * 60 * 1000;

export const simpleCacheWithExpiryTimeInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const currentTime = Date.now();

  const url = req.urlWithParams;
  const cacheEntry: CacheEntry = cache[`${url}`];
  const { response: responseCache, timestamp: cacheTimestamp } = cacheEntry;

  const isExpired = currentTime - cacheTimestamp > cacheDuration;

  if (responseCache && !isExpired) {
    return of(responseCache);
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        cache[`${url}`] = {
          response: event,
          timestamp: currentTime,
        };
      }
    })
  );
};
