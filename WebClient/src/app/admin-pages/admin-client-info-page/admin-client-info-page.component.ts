import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ClientService } from 'src/models/sevices/client.service';
import { ClientViewData } from 'src/models/view-data/client-view-data';
import { IInfoPageComponent } from 'src/models/interfaces/IInfoPageComponent';
import { IDate } from 'src/models/interfaces/IDate';

@Component({
  selector: 'admin-client-info-page',
  templateUrl: './admin-client-info-page.component.html'
})
export class AdminClientInfoPageComponent implements OnInit, IInfoPageComponent, IDate{
  clientViewData!: ClientViewData;  // данные о клиенте

  constructor(private router: Router,
              private clientService: ClientService,
              private location: Location,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    // получение данных из роутера
    this.activatedRoute.params.forEach((params: Params) => {
      // если данные по id есть, но этого быть не может)
      // то мы отправляем запрос на получение данных
      if (params.id !== undefined) {
        // получение даных для отображения
        this.clientService.getClientViewData(params.id).subscribe((data: any) => {
          this.clientViewData = data as ClientViewData;
        });
      }
    });
  }

  // реализация интерфейса - вернуться назад
  goBack(): void { this.location.back(); }

  // реализация интерфеса - редактирование данных
  edit(): void {
    this.router.navigate(['admin/client_form', this.clientViewData.id]);
  }

  // показать нормальную дату
  showCorrectDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }
}
