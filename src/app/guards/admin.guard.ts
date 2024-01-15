import { Injectable, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserResponse } from '../responses/user/user.response';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  userResponse?: UserResponse | null;
  constructor(private tokenService: TokenService, private router: Router, private userService: UserService) {}
  canActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isTokenExpired = this.tokenService.isTokenExpired();
    const isUserIdValid = this.tokenService.getUserId() > 0;
    this.userResponse = this.userService.getUserFromLocalStorage();
    const isAdmin = this.userResponse?.role.name === 'ADMIN';

    if(!isTokenExpired && isUserIdValid && isAdmin) {
      return true;
    } else {
      //Nếu không authenticated trả về trang login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
export const AdminGuardFn: CanActivateFn = (next:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AdminGuard).canActive(next, state)
}
