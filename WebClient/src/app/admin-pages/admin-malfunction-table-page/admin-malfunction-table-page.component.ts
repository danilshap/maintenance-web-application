import { Component, OnInit } from "@angular/core";
import { MalfunctionService } from "src/models/sevices/malfunction.service";
import { MalfunctionViewData } from "src/models/view-data/malfunction-view-data";

@Component({
  selector: 'malfunction-table-page',
  templateUrl: './admin-malfunction-table-page.component.html'
})
export class AdminMalfunctionTablePageComponent implements OnInit{
  malfunctions!: MalfunctionViewData[];
  currentPage!: number;
  maxPages!: number;
  maxCount!: number;

  constructor(private malfuncationService: MalfunctionService){}

  ngOnInit(): void {
    this.currentPage = 1;
    this.malfuncationService.getMalfunctionsViewData(1).subscribe((data: any) => {
      this.malfunctions = data as MalfunctionViewData[];

      this.malfuncationService.getMalfunctionsTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  changePage(page: number): void {
    this.malfuncationService.getMalfunctionsViewData(page).subscribe((data: any[]) => {
      this.malfunctions = data as MalfunctionViewData[];

      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-outline-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-secondary');
      this.currentPage = page;
      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-outline-secondary');
    });
  }
}
