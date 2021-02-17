import { Component, OnInit } from '@angular/core';
import { Mark } from 'src/models/entities/mark';
import { MarksService } from 'src/models/sevices/marks.service';

@Component({
  selector: 'marks-table-page',
  templateUrl: './admin-marks-table-page.component.html'
})
export class AdminMarksTablePageComponent implements OnInit{
  marks!: Mark[]; // коллекция марок автомобиля
  currentPage!: number; // конкретная страница таблицы
  maxPages!: number;  // максимальное олкичество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private marksService: MarksService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.marksService.getMarksTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.marksService.getMarks(page).subscribe((data: any) => {
      this.marks = data as Mark[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
