import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepairOrderService } from 'src/models/sevices/repair-order.service';
import { RepairOrderViewData } from 'src/models/view-data/repair-order-view-data';

@Component({
  selector: 'repair-orders-data-table',
  templateUrl: './admin-repair-orders-data-table.component.html'
})
export class AdminRepairOrdersDataTableComponent implements OnInit {
  repairOrders!: RepairOrderViewData[];
  currentPage!: number;
  maxPages!: number;
  maxCount!: number;

  constructor(private repairOrderService: RepairOrderService,
              private router: Router){}

  ngOnInit(): void {
    this.currentPage = 1;
    this.repairOrderService.getRepairOrdersViewData(this.currentPage).subscribe((data: any[]) => {
      this.repairOrders = data as RepairOrderViewData[];

      this.repairOrderService.getRepairOrdersTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
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
      () => {
        let order = this.repairOrders.filter(elem => elem.id === id)[0];
        order.isReady = !order?.isReady;
      },
      (error: any) => { alert(error.split('$$$')[0]); }
    );
  }

  getClassByStatus(status: boolean): string {
    return status ? 'table-success' : 'table-warning';
  }

  changePage(page: number): void {
    this.repairOrderService.getRepairOrdersViewData(page).subscribe((data: any[]) => {
      this.repairOrders = data as RepairOrderViewData[];

      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-outline-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-secondary');
      this.currentPage = page;
      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-outline-secondary');
    });
  }
}
