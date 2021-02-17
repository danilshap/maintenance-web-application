import { Component, OnInit } from '@angular/core';
import { PersonRequestStatus } from 'src/models/entities/person-request-statuses';
import { PersonRequestStausesService } from 'src/models/sevices/person-request-status.service';

@Component({
  selector: 'person-request-statuses-table-page',
  templateUrl: './admin-person-request-statuses-table-page.component.html'
})
export class AdminPersonRequestStatusesTablePageComponent implements OnInit {
  personRequestStatuses!: PersonRequestStatus[]; // коллекция марок автомобиля
  currentPage!: number; // конкретная страница таблицы
  maxPages!: number;  // максимальное олкичество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private personRequestStatusService: PersonRequestStausesService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.personRequestStatusService.getPersonRequestStetusesTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.personRequestStatusService.getPersonRequestStetuses(page).subscribe((data: any) => {
      this.personRequestStatuses = data as PersonRequestStatus[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
