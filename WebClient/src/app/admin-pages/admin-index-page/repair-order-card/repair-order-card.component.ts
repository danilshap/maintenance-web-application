import { IDate } from 'src/models/interfaces/IDate';
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { RepairOrderViewData } from 'src/models/view-data/repair-order-view-data';
import { RepairOrderService } from 'src/models/sevices/repair-order.service';

@Component({
  selector: 'repair-order-component',
  templateUrl: './repair-order-card.component.html',
})
export class RepairOrderCardComponent implements IDate{
  @Input() repairOrderViewData!: RepairOrderViewData;

  constructor(private router: Router, private repairOrderService: RepairOrderService){}

  repairOrderStatus(): string {
    return this.repairOrderViewData.isReady ? 'ремонт завершен' : 'еще ремонтируется...';
  }

  completeRepair(): void {
    this.repairOrderService.putRepairOrder(this.repairOrderViewData.id).subscribe(
      (data) => {this.repairOrderViewData.isReady = true;},
      (error) => { alert(error.split('$$$')[0]);}
    );
  }

  moreInfoByOrder(): void {
    this.router.navigate(['/admin/repair_order', this.repairOrderViewData.id]);
  }

  showCorrectDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }
}
