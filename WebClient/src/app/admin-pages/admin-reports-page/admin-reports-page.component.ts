import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ReportsService } from "src/models/sevices/reports.service";
import { ReportsViewData } from "src/models/view-data/reports-view-data";

@Component({
  selector: 'admin-reports-page',
  templateUrl: './admin-reports-page.component.html'
})
export class AdminReportsPageComponent implements OnInit {
  reportsViewData!: ReportsViewData;

  constructor(private reportsService: ReportsService){}

  ngOnInit(): void {
    this.reportsService.getReports().subscribe((data: any) => {
      this.reportsViewData = data as ReportsViewData;
    });
  }

  isMalfunctionsData(): boolean {
    return this.reportsViewData.malfunctionViewData === undefined || this.reportsViewData.malfunctionViewData.length !== 0;
  }
}
