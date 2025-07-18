
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,  Router,  RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router = inject(Router)
  const auth = inject(AuthService)
  if(auth.handleAuth()){
    return true;
  }else{
    return router.createUrlTree(['/login'])
    
  }
};
