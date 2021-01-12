import { IDate } from 'src/models/interfaces/IDate';
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { RepairOrderViewData } from 'src/models/view-data/repair-order-view-data';

@Component({
  selector: 'repair-order-component',
  templateUrl: './repair-order-card.component.html',
})
export class RepairOrderCardComponent implements IDate{
  @Input() repairOrderViewData!: RepairOrderViewData;

  constructor(private router: Router){}

  repairOrderStatus(): string {
    return this.repairOrderViewData.isReady ? 'ремонт завершен' : 'еще ремонтируется...';
  }

  completeRepair(): void {
    this.repairOrderViewData.isReady = true;
  }

  moreInfoByOrder(): void {
    this.router.navigate(['/admin/repair_order', this.repairOrderViewData.id]);
  }

  showCorrectDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }
}
