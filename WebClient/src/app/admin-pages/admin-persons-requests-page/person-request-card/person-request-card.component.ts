import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PersonRequestViewData } from "src/models/view-data/person-request-view-data";

@Component({
  selector: 'person-reqest-card',
  templateUrl: './person-request-card.component.html',
})
export class PersonRequestCardComponent{
  // статус вывода карточки
  hidden: boolean = true;

  // данные о заявке
  @Input()
  request!: PersonRequestViewData;

  constructor(private router: Router){}

  removeRequest(): void {
    // TODO:: построить запрос на сервер для удаления заявки
    this.hidden = false;
  }
}
