import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PersonRequestService } from 'src/models/sevices/person-request.service';
import { PersonRequestViewData } from "src/models/view-data/person-request-view-data";

@Component({
  selector: 'person-reqest-card',
  templateUrl: './person-request-card.component.html',
})
export class PersonRequestCardComponent{
  hidden: boolean = true; // статус вывода карточки
  @Input() request!: PersonRequestViewData; // данные о заявке

  constructor(private router: Router,
              private personRequestService: PersonRequestService)
              {}

  removeRequest(): void {
    this.personRequestService.putPersonRequest(this.request.id, 'Отмена оформления заявки на ремонт').subscribe(
      (data: any) => { this.hidden = false; },
      (error: any) => {
        let errorMessage = error.message.split('$$$');
        alert(errorMessage[0]);
      }
    );
  }

  confirmRequest(): void {
    this.router.navigate(['admin/repair_order_form', this.request.id]);
  }
}
