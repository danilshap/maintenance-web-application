import { WorkerStatus } from './../../../models/entities/worker-statuses';
import { Component, OnInit } from "@angular/core";
import { WorkerStatusesService } from "src/models/sevices/worker-statuses.service";

@Component({
  selector: 'worker-statuses-page',
  templateUrl: './admin-worker-statuses-table-page.component.html'
})
export class AdminWorkerStatusesTablePageComponent implements OnInit {
  workerStatuses!: WorkerStatus[]; // коллекция марок автомобиля
  currentPage!: number; // конкретная страница таблицы
  maxPages!: number;  // максимальное олкичество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private workerStausesService: WorkerStatusesService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.workerStausesService.getWorkerStatusesTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.workerStausesService.getWorkerStatuses(page).subscribe((data: any) => {
      this.workerStatuses = data as WorkerStatus[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
