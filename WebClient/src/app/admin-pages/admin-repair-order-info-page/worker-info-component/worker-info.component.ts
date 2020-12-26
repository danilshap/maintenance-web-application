import { Component, Input } from "@angular/core";
import { WorkerViewData } from 'src/models/view-data/worker-view-data';

@Component({
  selector: 'worker-info',
  templateUrl: './worker-info.component.html',
})
export class WorkerInfoComponent{
  @Input()
  workerViewData!: WorkerViewData;
}
