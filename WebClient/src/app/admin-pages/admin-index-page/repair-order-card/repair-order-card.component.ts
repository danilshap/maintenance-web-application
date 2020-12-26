import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { RepairOrderViewData } from 'src/models/view-data/repair-order-view-data';

@Component({
  selector: 'repair-order-component',
  templateUrl: './repair-order-card.component.html',
})
export class RepairOrderCardComponent{
  @Input()
  repairOrderViewData!: RepairOrderViewData;

  constructor(private router: Router){
  }

  repairOrderStatus(): string {
    return this.repairOrderViewData.isReady ? 'ремонт завершен' : 'еще ремонтируется...';
  }

  completeRepair(): void {
    this.repairOrderViewData.isReady = true;
  }

  moreInfoByOrder(): void {
    this.router.navigate(['/admin/repair_order', this.repairOrderViewData.id]);
  }
}
