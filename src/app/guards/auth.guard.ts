import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  /**
   * inject auth service
   * @property {AuthService} authService
   */
  const authService = inject(AuthService)

  /**
   * inject router
   * @property {Router} router
   */
  const router = inject(Router)

  // check for logged-in user
  if(authService.isLoggedIn()){
    return true
  }
  else {
    // navigate to login page or component
    router.navigate(['/login'])
    return false
  }

};
