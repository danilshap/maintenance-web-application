import { Address } from './../../../models/entities/address';
import { Component, OnInit } from '@angular/core';
import { AddressesService } from 'src/models/sevices/adresses.service';

@Component({
  selector: 'addrress-table-page',
  templateUrl: './admin-address-table-page.component.html',
})
export class AdminAddressTablePageComponent implements OnInit {
  adresses!: Address[]; // список адресов
  currentPage!: number; // конкретная страиница для перелистывания
  maxPages!: number;  // макисамльное количество страниц
  maxCount!: number;  // максимальное количество данных

  constructor(private addressesService: AddressesService){}

  ngOnInit(): void {
    // определение текущей страницы
    this.currentPage = 1;
    this.sendData(this.currentPage, () => {
      this.addressesService.getAddressesTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.addressesService.getAddresses(page).subscribe((data: any[]) => {
      this.adresses = data as Address[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
