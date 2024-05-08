import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const isAuthenticated: boolean = true;

  if (route.url[0].path === 'about') return true;

  if (!isAuthenticated) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
