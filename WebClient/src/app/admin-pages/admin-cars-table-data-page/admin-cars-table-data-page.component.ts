import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/models/sevices/car.service';
import { CarViewData } from 'src/models/view-data/car-view-data';

@Component({
  selector: 'admin-car-table-data-page',
  templateUrl: './admin-cars-table-data-page.component.html',
})
export class AdminCarsTableDataPageComponent implements OnInit{
  collection!: CarViewData[]; // коллекция автомобилей
  currentPage!: number; // конкретная страница таблицы
  maxPages!: number;  // максимальное олкичество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private router: Router, private carService: CarService){}

  ngOnInit(): void {
    // определение текущей страницы при загрузки
    this.currentPage = 1;
    // отправляем запрос на сервер с дополнительным запросом на получение данных о
    // таблице автомобилей
    this.sendData(this.currentPage, () => {
      this.carService.getCarsTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // переадресация на страницу добавления нового авто
  appendNewCar(): void {
    this.router.navigate(['admin/car_form']);
  }

  // переадресация на страницу редактирования автомобиля
  editCar(id: number): void{
    this.router.navigate(['admin/car_form', id]);
  }

  // переадресация на страницу просмотра подробной информации об автомобиле
  infoCar(id: number): void{
    this.router.navigate(['admin/car_info', id]);
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.carService.getCarsViewData(page).subscribe((data: any[]) => {
      this.collection = data as CarViewData[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
