import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { authInterceptor } from './interceptors/auth.interceptor';
import { conditionalInterceptor } from './interceptors/conditional.interceptor';
import LoggingInterceptor from './interceptors/logging.interceptor';
import { loggingInterceptor } from './interceptors/loggingFn.interceptor';
import { cancelSameApiRequestInterceptor } from './interceptors/cancel-same-api-request.interceptor';
import { retryInterceptor } from './interceptors/retry.interceptor';
import { simpleCacheInterceptor } from './interceptors/simple-cache.interceptor';
import { simpleCacheWithExpiryTimeInterceptor } from './interceptors/simple-cache-with-expiry-time.interceptor';
import { refreshTokenInterceptor } from './interceptors/refresh-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor,
        loggingInterceptor,
        conditionalInterceptor,
        cancelSameApiRequestInterceptor,
        retryInterceptor,
        simpleCacheInterceptor,
        simpleCacheWithExpiryTimeInterceptor,
        refreshTokenInterceptor,
      ]),
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
    provideStore(),
  ],
};
