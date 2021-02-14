import { Component, OnInit } from "@angular/core";
import { Detail } from "src/models/entities/detail";
import { DetailsService } from "src/models/sevices/details.service";

@Component({
  selector: 'details-table-page',
  templateUrl: './admin-details-table-page.component.html'
})
export class AdminDetailsTablePageComponent implements OnInit {
  details!: Detail[];

  constructor(private detailsService: DetailsService){}

  ngOnInit(): void {
    this.detailsService.getDetails().subscribe((data: any) => {
      this.details = data as Detail[];
    });
  }
}
