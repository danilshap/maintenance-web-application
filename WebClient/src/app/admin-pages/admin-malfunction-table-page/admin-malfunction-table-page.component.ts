import { Component, OnInit } from '@angular/core';
import { MalfunctionService } from 'src/models/sevices/malfunction.service';
import { MalfunctionViewData } from 'src/models/view-data/malfunction-view-data';

@Component({
  selector: 'malfunction-table-page',
  templateUrl: './admin-malfunction-table-page.component.html'
})
export class AdminMalfunctionTablePageComponent implements OnInit{
  malfunctions!: MalfunctionViewData[]; // список неисправностей
  currentPage!: number; // конкретная страница таблицы
  maxPages!: number;  // максимальное олкичество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private malfuncationService: MalfunctionService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.malfuncationService.getMalfunctionsTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.malfuncationService.getMalfunctionsViewData(page).subscribe((data: any) => {
      this.malfunctions = data as MalfunctionViewData[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
