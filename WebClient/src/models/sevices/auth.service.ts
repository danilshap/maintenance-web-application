import { Inject, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { API_URL } from "src/app/app-injection-token";
import { User } from "../entities/user";
import { UserService } from "./user.service";
import { tap } from 'rxjs/operators';

export const ACCESS_TOKEN_KEY = 'access_token';

@Injectable()
export class AuthService{
  redirectTo = '/login';
  user: User = new User('', '', '');

  constructor(
    private userService: UserService,
    private jwtHelper: JwtHelperService) {}

  login(user: User): Observable<boolean>{
    this.user.userName = user.userName;
    this.user.password = user.password;

    return this.userService.canLoginUser(user).pipe(
      tap((token: any) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token)
      })
    );
  }

  isAuthentificated(): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void { localStorage.removeItem(ACCESS_TOKEN_KEY); }
}
