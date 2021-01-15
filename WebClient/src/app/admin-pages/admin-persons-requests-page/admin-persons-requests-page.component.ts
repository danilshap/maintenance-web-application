import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonRequestService } from "src/models/sevices/person-request.service";
import { PersonRequestViewData } from 'src/models/view-data/person-request-view-data';

@Component({
  selector: 'admin-persons-requests-page',
  templateUrl: './admin-persons-requests-page.component.html'
})
export class AdminPersonsRequestsPageComponent implements OnInit {
  requests!: PersonRequestViewData[];

  constructor(private personsRequestService: PersonRequestService)
              {}

  ngOnInit(): void {
    this.personsRequestService.getPersonRequests().subscribe((data: any[]) => {
      this.requests = data as PersonRequestViewData[];
    });
  }
}
