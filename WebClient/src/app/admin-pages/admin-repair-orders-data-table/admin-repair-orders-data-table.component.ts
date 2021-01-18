import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RepairOrderService } from "src/models/sevices/repair-order.service";
import { RepairOrderViewData } from "src/models/view-data/repair-order-view-data";

@Component({
  selector: 'repair-orders-data-table',
  templateUrl: './admin-repair-orders-data-table.component.html'
})
export class AdminRepairOrdersDataTableComponent implements OnInit {
  repairOrders!: RepairOrderViewData[];

  constructor(private repairOrderService: RepairOrderService,
              private router: Router){}

  ngOnInit(): void {
    this.repairOrderService.getRepairOrdersViewData().subscribe((data: any[]) => {
      this.repairOrders = data as RepairOrderViewData[];
    });
  }

  // добавление нового клиента / перенаправление
  appendNewRepeirOrder(): void {
    this.router.navigate(['admin/repair_order_form']);
  }

  // показать информацию о работнике
  moreInfoByOrder(id: number): void {
    this.router.navigate(['/admin/repair_order', id]);
  }

  // изменение статтуса
  changeStatus(id: number): void {
    this.repairOrderService.putRepairOrder(id).subscribe(
      (data) => {
        let order = this.repairOrders.filter(elem => elem.id === id)[0];
        order.isReady = !order?.isReady;
      },
      (error) => { alert(error.split('$$$')[0]);}
    );
  }

  getClassByStatus(status: boolean): string {
    return status ? 'table-success' : 'table-warning';
  }
}
