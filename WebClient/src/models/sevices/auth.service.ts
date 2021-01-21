import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../entities/user";
import { UserService } from "./user.service";

@Injectable()
export class AuthService{
  isLoginIn: boolean = false;
  redirectTo = '/login';
  user: User = new User('', '', '');

  constructor(private userService: UserService, private router: Router) {}

  login(user: User): Observable<boolean>{
    this.user.userName = user.userName;
    this.user.password = user.password;

    return this.userService.canLoginUser(user);
  }

  logout(): void {
    this.isLoginIn = false;
  }
}
