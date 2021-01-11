import { RepairOrderViewData } from 'src/models/view-data/repair-order-view-data';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'repair-order-info-page',
  templateUrl: './admin-repair-order-info-page.component.html',
})
export class RepairOrderInfoPageComponent implements OnInit {
  id?: number;
  repairOrderViewData!: RepairOrderViewData;

  // констркутор с использованием внедрения зависимостей
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient){}

  // метод который работает при инициализации объекта.
  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      this.id = +params['id'];
    });

    this.http.get(`http://localhost:55280/api/RepairOrderViewData/GetRepairOrder/${this.id}`)
      .subscribe((data: any) => {
        this.repairOrderViewData = data as RepairOrderViewData;
        console.log(data);
      });
  }

  repairOrderStatus(): string {
    return this.repairOrderViewData.isReady ? 'ремонт завершен' : 'еще ремонтируется...';
  }

  showCorrectDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }
}
