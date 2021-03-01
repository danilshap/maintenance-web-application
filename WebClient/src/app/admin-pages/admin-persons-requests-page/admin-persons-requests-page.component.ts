import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonRequestService } from "src/models/sevices/person-request.service";
import { PersonRequestViewData } from 'src/models/view-data/person-request-view-data';

@Component({
  selector: 'admin-persons-requests-page',
  templateUrl: './admin-persons-requests-page.component.html',
  styleUrls: ['./admin-persons-requests-page.component.css']
})
export class AdminPersonsRequestsPageComponent implements OnInit {
  requests!: PersonRequestViewData[];
  currentPage!: number; // конкретная страница таблицы
  maxPages!: number;  // максимальное олкичество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private personRequestService: PersonRequestService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.personRequestService.getPersonRequestsTableInfo(false).subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.personRequestService.getPersonRequests(this.currentPage, false).subscribe((data: any[]) => {
      this.requests = data as PersonRequestViewData[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
