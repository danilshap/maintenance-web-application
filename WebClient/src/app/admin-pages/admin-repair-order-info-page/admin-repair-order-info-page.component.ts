import { RepairOrderViewData } from 'src/models/view-data/repair-order-view-data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RepairOrderService } from 'src/models/sevices/repair-order.service';
import { IDate } from 'src/models/interfaces/IDate';

@Component({
  selector: 'repair-order-info-page',
  templateUrl: './admin-repair-order-info-page.component.html',
})
export class RepairOrderInfoPageComponent implements OnInit, IDate {
  repairOrderViewData!: RepairOrderViewData;  // данные для отображения

  // констркутор с использованием внедрения зависимостей
  constructor(private activatedRoute: ActivatedRoute,
              private repairOrderService: RepairOrderService){}

  // метод который работает при инициализации объекта.
  ngOnInit(): void {
    // получение данных из роутера
    this.activatedRoute.params.forEach((params: Params) => {
      // если данные по id есть, но этого быть не может)
      // то мы отправляем запрос на получение данных
      if (params.id !== undefined) {
        // получение даных для отображения
        this.repairOrderService.getRepairOrderViewData(params.id).subscribe((data: any) => {
          this.repairOrderViewData = data as RepairOrderViewData;
        });
      }
    });
  }

  // корректный вывод данных для статуса
  repairOrderStatus(): string {
    return this.repairOrderViewData.isReady ? 'ремонт завершен' : 'еще ремонтируется...';
  }

  // преобразование даты в читаемую
  showCorrectDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }
}
