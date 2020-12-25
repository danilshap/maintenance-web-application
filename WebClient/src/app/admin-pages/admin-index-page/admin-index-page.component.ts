import { CarViewData } from './../../../models/view-data/car-view-data';
import { RepairOrderViewData } from './../../../models/view-data/repair-order-view-data';
import { Component } from '@angular/core';
import { ClientViewData } from 'src/models/view-data/client-view-data';
import { WorkerViewData } from 'src/models/view-data/worker-view-data';
import { MalfunctionViewData } from 'src/models/view-data/malfunction-view-data';

@Component({
  selector: 'admin-index-page',
  templateUrl: './admin-index-page.component.html',
})
export class AdminIndexPageComponent {
  repairOrdersViewData: RepairOrderViewData[];
  constructor() {
    this.repairOrdersViewData = [
      new RepairOrderViewData(1, new Date(), 1, new Date(), false,
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
        1),
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
      [])];
  }
}

