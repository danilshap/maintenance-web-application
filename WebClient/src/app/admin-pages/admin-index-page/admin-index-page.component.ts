import { RepairOrderViewData } from './../../../models/view-data/repair-order-view-data';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'admin-index-page',
  templateUrl: './admin-index-page.component.html',
})
export class AdminIndexPageComponent implements OnInit {
  repairOrdersViewData: RepairOrderViewData[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<RepairOrderViewData[]>('http://localhost:55280/api/RepairOrderViewData/GetRepairOrderForView')
    .subscribe((data: any[]) => {
      this.repairOrdersViewData = data as RepairOrderViewData[];
    });
  }

  appendNewRepeirOrder(): void {
    this.router.navigate(['admin/repair_order_form']);
  }
}

