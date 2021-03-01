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
  }

  // авторизация
  login(): void {
    this.message = 'Попытка авторизации...';

    this.user.userName = this.nickname.value;
    this.user.password = this.password.value;

    this.authService.login(this.user).subscribe(() => {
      this.authService.redirectTo = this.authService.isAuthentificated() ? '/admin/index' : this.authService.redirectTo;
      this.router.navigate([this.authService.redirectTo]);
    });
  }

  // выход из аккаунта
  logout(): void { this.authService.logout(); }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      nickname: [this.user.userName, [Validators.required]],
      password: [this.user.password, [Validators.required]]
    });
  }

  // геттеры для удобного использования
  get nickname(): any { return this.userFormGroup.controls.nickname; }
  get password(): any { return this.userFormGroup.controls.password; }
}
