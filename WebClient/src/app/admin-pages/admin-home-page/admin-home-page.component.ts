import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-home-page',
  templateUrl: './admin-home-page.component.html',
  // подключение scss. Мы этого не учили, но так будет проще импортировать стили.
  // потому что при написании файла css для этого элемента очень много ненужного текста
  styleUrls: [],
})
export class AdminHomePageComponent {
  constructor(private router: Router){}

  // переход на строаницу авторизации
  logout(): void{
    this.router.navigate(['login']);
  }
}
