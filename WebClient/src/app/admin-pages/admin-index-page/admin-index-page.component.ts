import { RepairOrderViewData } from './../../../models/view-data/repair-order-view-data';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RepairOrderService } from 'src/models/sevices/repair-order.service';
import { ReportsService } from 'src/models/sevices/reports.service';

@Component({
  selector: 'admin-index-page',
  templateUrl: './admin-index-page.component.html',
  styleUrls: ['./admin-index-page.component.css'],
})
export class AdminIndexPageComponent implements OnInit {
  // данные о заявках на ремонт
  repairOrdersViewData: RepairOrderViewData[] = [];
  countOfFreeWorkers!: number;
  countOfCarsInService!: number;
  currentPage!: number;
  maxPages!: number;
  maxCount!: number;

  constructor(private router: Router,
              private repairOrderService: RepairOrderService,
              private reportsService: ReportsService)
  {}

  ngOnInit(): void {
    this.currentPage = 1;
    // плдучение данных о заявках на ремонт
    this.repairOrderService.getRepairOrdersViewData(this.currentPage).subscribe((data: any[]) => {
      this.repairOrdersViewData = data as RepairOrderViewData[];

      this.repairOrderService.getRepairOrdersTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });

    this.reportsService.getFreeWorkers().subscribe((data: any) => {
      this.countOfFreeWorkers = data as number;
    });

    this.reportsService.getCarsInService().subscribe((data: any) => {
      this.countOfCarsInService = data as number;
    });
  }

  // добавление нового клиента / перенаправление
  appendNewRepeirOrder(): void {
    this.router.navigate(['admin/repair_order_form']);
  }

  // есть ли свободные работники для оформления новой заявки
  haveFreeWorkers(): boolean {
    return this.repairOrdersViewData.filter(ro => ro.isReady === false).length > 2;
  }


  changePage(page: number): void {
    this.repairOrderService.getRepairOrdersViewData(page).subscribe((data: any[]) => {
      this.repairOrdersViewData = data as RepairOrderViewData[];

      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-outline-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-secondary');
      this.currentPage = page;
      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-outline-secondary');
    });
  }
}

