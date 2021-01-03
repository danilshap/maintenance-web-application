import { Component, Input } from '@angular/core';
import { WorkerViewData } from 'src/models/view-data/worker-view-data';

@Component({
  selector: 'workers-table-row',
  templateUrl: './workers-table-row.component.html',
})
export class WorkersTableRowComponent{
  @Input() workerViewData!: WorkerViewData; // данные о работнике

  // получить цвет строки для конкретного работника
  getColorForTableRow(): string{
    return this.workerViewData.status === 'уволен' ? 'table-danger' : this.workerViewData.status === 'На работе. Свободен' ? 'table-success' : 'table-warning';
  }
}
