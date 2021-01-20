import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../entities/user";

@Injectable()
export class UserService{
  constructor(private http: HttpClient){}

  // отправка запроса для аутентификации
  canLoginUser(user: User): any{
    return this.http.post<boolean>('http://localhost:55280/api/UsersProcess/CanLogin', user, {headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'Access-Control-Allow-Methods')});
  }
}
