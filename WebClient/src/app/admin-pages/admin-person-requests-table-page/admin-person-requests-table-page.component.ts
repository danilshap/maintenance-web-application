import { Component, OnInit } from "@angular/core";
import { PersonRequestService } from "src/models/sevices/person-request.service";
import { PersonRequestViewData } from "src/models/view-data/person-request-view-data";

@Component({
  selector: 'person-requests-table-page',
  templateUrl: './admin-person-requests-table-page.component.html'
})
export class AdminPersonRequestsTablePageComponent implements OnInit{
  personRequests!: PersonRequestViewData[]; // коллекция марок автомобиля
  currentPage!: number; // конкретная страница таблицы
  maxPages!: number;  // максимальное олкичество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private personRequestService: PersonRequestService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.personRequestService.getPersonRequestsTableInfo(true).subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.personRequestService.getPersonRequests(page, true).subscribe((data: any) => {
      this.personRequests = data as PersonRequestViewData[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }

  getTableClassByStatus(status: string): string {
    return status === 'Отмена оформления заявки на ремонт' ? 'table-danger' : status === 'Заявка оформлена' ? 'table-success' : 'table-warning';
  }
}
