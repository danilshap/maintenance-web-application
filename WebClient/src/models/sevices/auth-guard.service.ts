import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const login = JSON.parse(localStorage.login);
    if (login.status && new Date().getTime() - login.time <= 600000) {
      this.authService.user.userName = login.user;
      return true;
    }
    else {
      this.authService.redirectTo = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
