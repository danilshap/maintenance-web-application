import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthentificated()) {
      this.authService.user.userName = this.authService.user.userName;
      return true;
    } else {
      this.authService.redirectTo = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
