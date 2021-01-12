import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { WorkerViewData } from 'src/models/view-data/worker-view-data';

@Component({
  selector: 'worker-info',
  templateUrl: './worker-info.component.html',
})
export class WorkerInfoComponent{
  @Input() workerViewData!: WorkerViewData;  // для отображения данных о работнике

  constructor(private router: Router){}

  // изменение данных о клиенте
  editWorker(): void{
    this.router.navigate(['admin/worker_form', this.workerViewData.id]);
  }
}
