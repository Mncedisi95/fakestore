import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Authentication guard to protect routes from unauthorized access.
 * @param route - The activated route snapshot.
 * @param state - The router state snapshot.
 * @returns {boolean | UrlTree} true if the user is authenticated, otherwise a navigation command to the login page.
 */
export const authGuard: CanActivateFn = (route, state) : boolean | UrlTree => {

  // Injecting the AuthService using inject()
  const authService = inject(AuthService); 

  // Injecting the Router using inject()
  const router = inject(Router)

  // Check if the user is logged in
  if (authService.isLoggedIn()) {
    return true;
  }

  // If not logged in, navigate to the login page with optional query params
  return router.createUrlTree(['/login'], {
    //preserve the attempted URL
    queryParams: { returnUrl: state.url }, 
  });

};
