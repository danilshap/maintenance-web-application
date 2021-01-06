import { Component } from '@angular/core';
import { WorkerViewData } from 'src/models/view-data/worker-view-data';

@Component({
  selector: 'admin-worker-info-page',
  templateUrl: 'admin-worker-info-page.component.html',
})
export class AdminWorkerInfoPageComponent{
  workerViewData: WorkerViewData | undefined;
}
