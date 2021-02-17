import { Specialty } from './../../../models/entities/specialty';
import { Component, OnInit } from '@angular/core';
import { SpecialtyService } from 'src/models/sevices/specialty.service';

@Component({
  selector: 'specialties-table-page',
  templateUrl: './admin-specialties-table-page.component.html'
})
export class AdminSpecialtiesTablePageComponent implements OnInit {
  specialties!: Specialty[]; // коллекция марок автомобиля
  currentPage!: number; // конкретная страница таблицы
  maxPages!: number;  // максимальное олкичество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private specialtiesService: SpecialtyService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.specialtiesService.getSpecialtiesTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.specialtiesService.getSpecialties(page).subscribe((data: any) => {
      this.specialties = data as Specialty[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
