import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/entities/user';
import { AuthService } from 'src/models/sevices/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  user: User = new User('', '', 'template');
  message: string = '';
  userFormGroup!: FormGroup;

  constructor(public authService: AuthService,
              private router: Router,
              private fb: FormBuilder)
  {
    this.setMessage();
  }

  // получить сообщение
  setMessage(): void {
    this.message = this.authService.isLoginIn ? 'Авторизация прошла успешно' : '';
  }

  // авторизация
  login(): void {
    this.message = 'Попытка авторизации...';

    this.user.userName = this.nickname.value;
    this.user.password = this.password.value;

    this.authService.login(this.user).subscribe((data: any) => {
      this.authService.isLoginIn = data as boolean;

      this.authService.redirectTo = this.authService.isLoginIn ? '/admin/index' : this.authService.redirectTo;

      // tslint:disable-next-line:new-parens
      localStorage.setItem('login', JSON.stringify({'time': new Date().getTime(), 'status': this.authService.isLoginIn, 'user': this.user.userName}));

      this.router.navigate([this.authService.redirectTo]);
    });
  }

  // выход из аккаунта
  logout(): void {
    this.authService.logout();
    this.setMessage();
  }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      nickname: [this.user.userName, [Validators.required]],
      password: [this.user.password, [Validators.required]]
    });
  }

  get nickname(): any { return this.userFormGroup.controls.nickname; }
  get password(): any { return this.userFormGroup.controls.password; }
}
