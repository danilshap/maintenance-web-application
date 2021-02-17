import { Component, OnInit } from "@angular/core";
import { Detail } from "src/models/entities/detail";
import { DetailsService } from "src/models/sevices/details.service";

@Component({
  selector: 'details-table-page',
  templateUrl: './admin-details-table-page.component.html'
})
export class AdminDetailsTablePageComponent implements OnInit {
  details!: Detail[]; // список деталей
  currentPage!: number; // конкретная страиница для перелистывания
  maxPages!: number;  // макисамльное количество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private detailsService: DetailsService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.detailsService.getDetailsTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.detailsService.getDetails(page).subscribe((data: any) => {
      this.details = data as Detail[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
