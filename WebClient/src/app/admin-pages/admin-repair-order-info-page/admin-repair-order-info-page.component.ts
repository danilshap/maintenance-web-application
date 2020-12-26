import { RepairOrderViewData } from 'src/models/view-data/repair-order-view-data';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { MalfunctionViewData } from 'src/models/view-data/malfunction-view-data';
import { WorkerViewData } from 'src/models/view-data/worker-view-data';
import { CarViewData } from 'src/models/view-data/car-view-data';
import { ClientViewData } from 'src/models/view-data/client-view-data';
import { Detail } from 'src/models/entities/detail';

@Component({
  selector: 'repair-order-info-page',
  templateUrl: './admin-repair-order-info-page.component.html',
})
export class RepairOrderInfoPageComponent implements OnInit {
  id?: number;
  repairOrderViewData: RepairOrderViewData;

  // констркутор с использованием внедрения зависимостей
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute){
                this.repairOrderViewData = new RepairOrderViewData(1, new Date(), 1, new Date(), false,
                new ClientViewData(
                  1,
                  'surname',
                  'name',
                  'patronymic',
                  'passprt',
                  new Date(),
                  'telephone',
                  'street',
                  'building',
                  undefined),
                new CarViewData(1,
                  'stateNumber',
                  'color',
                  2020,
                  'mark',
                  'model',
                  'surname',
                  'name',
                  'patronymic',
                  'passport'),
                new WorkerViewData(
                  1,
                  'surname',
                  'name',
                  'patronymic',
                  'passport',
                  'discharge',
                  1,
                  'status',
                  'specialty'
                ),
                [
                  new MalfunctionViewData(
                    1, 'title', 1, [new Detail(1, 'title', 1, []), new Detail(1, 'title', 1, []), new Detail(1, 'title', 1, [])]
                  ),
                  new MalfunctionViewData(
                    1, 'title', 1, [new Detail(1, 'title', 1, []), new Detail(1, 'title', 1, []), new Detail(1, 'title', 1, [])]
                  ),
                  new MalfunctionViewData(
                    1, 'title', 1, [new Detail(1, 'title', 1, []), new Detail(1, 'title', 1, []), new Detail(1, 'title', 1, [])]
                  )
                ]);
              }

  // метод который работает при инициализации объекта.
  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      this.id = +params['id'];
    });
  }

  repairOrderStatus(): string {
    return this.repairOrderViewData.isReady ? 'ремонт завершен' : 'еще ремонтируется...';
  }
}
