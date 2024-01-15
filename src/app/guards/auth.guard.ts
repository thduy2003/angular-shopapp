import { Injectable, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isTokenExpired = this.tokenService.isTokenExpired();
    const isUserIdValid = this.tokenService.getUserId() > 0;
    if(!isTokenExpired && isUserIdValid) {
      return true;
    } else {
      //Nếu không authenticated trả về trang login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
export const AuthGuardFn: CanActivateFn = (next:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).canActive(next, state)
}
