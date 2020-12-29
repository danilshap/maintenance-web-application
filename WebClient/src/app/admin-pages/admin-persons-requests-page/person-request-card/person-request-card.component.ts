import { Component, Input } from '@angular/core';
import { PersonRequestViewData } from "src/models/view-data/person-request-view-data";

@Component({
  selector: 'person-reqest-card',
  templateUrl: './person-request-card.component.html',
})
export class PersonRequestCardComponent{
  @Input()
  request!: PersonRequestViewData;
}
