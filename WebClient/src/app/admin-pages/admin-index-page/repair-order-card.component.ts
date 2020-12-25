import { Component, Input } from "@angular/core";
import { RepairOrderViewData } from 'src/models/view-data/repair-order-view-data';

@Component({
  selector: 'repair-order-component',
  templateUrl: './repair-order-card.component.html',
})
export class RepairOrderCardComponent{
  @Input()
  repairOrderViewData!: RepairOrderViewData;

  repairOrderStatus(): string {
    return this.repairOrderViewData.isReady ? 'ремонт завершен' : 'еще ремонтируется...';
  }
}
