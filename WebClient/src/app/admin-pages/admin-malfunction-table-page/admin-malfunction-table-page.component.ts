import { Component, OnInit } from "@angular/core";
import { MalfunctionService } from "src/models/sevices/malfunction.service";
import { MalfunctionViewData } from "src/models/view-data/malfunction-view-data";

@Component({
  selector: 'malfunction-table-page',
  templateUrl: './admin-malfunction-table-page.component.html'
})
export class AdminMalfunctionTablePageComponent implements OnInit{
  malfunctions!: MalfunctionViewData[];

  constructor(private malfuncationService: MalfunctionService){}

  ngOnInit(): void {
    this.malfuncationService.getMalfunctionsViewData().subscribe((data: any) => {
      this.malfunctions = data as MalfunctionViewData[];
    });
  }
}
