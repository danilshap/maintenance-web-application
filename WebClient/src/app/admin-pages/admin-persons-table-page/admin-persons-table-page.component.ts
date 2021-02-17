import { Component, OnInit } from "@angular/core";
import { Person } from "src/models/entities/person";
import { PersonService } from "src/models/sevices/person.service";

@Component({
  selector: 'persons-table-page',
  templateUrl: './admin-persons-table-page.component.html'
})
export class AdminPersonsTablePageComponent implements OnInit{
  persons!: Person[]; // коллекция марок автомобиля
  currentPage!: number; // конкретная страница таблицы
  maxPages!: number;  // максимальное олкичество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private personsService: PersonService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.personsService.getPersonsTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.personsService.getPersons(page).subscribe((data: any) => {
      this.persons = data as Person[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
