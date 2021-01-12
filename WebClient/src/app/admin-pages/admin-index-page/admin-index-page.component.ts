import { RepairOrderViewData } from './../../../models/view-data/repair-order-view-data';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RepairOrderService } from 'src/models/sevices/repair-order.service';

@Component({
  selector: 'admin-index-page',
  templateUrl: './admin-index-page.component.html',
})
export class AdminIndexPageComponent implements OnInit {
  // данные о заявках на ремонт
  repairOrdersViewData: RepairOrderViewData[] = [];

  constructor(private router: Router, private repairOrderService: RepairOrderService) {}

  ngOnInit(): void {
    // плдучение данных о заявках на ремонт
    this.repairOrderService.getRepairOrdersViewData().subscribe((data: any[]) => {
      this.repairOrdersViewData = data as RepairOrderViewData[];
    });
  }

  // добавление нового клиента / перенаправление
  appendNewRepeirOrder(): void {
    this.router.navigate(['admin/repair_order_form']);
  }
}

