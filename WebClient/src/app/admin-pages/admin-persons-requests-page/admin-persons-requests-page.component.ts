import { Component } from "@angular/core";
import { PersonRequestViewData } from 'src/models/view-data/person-request-view-data';

@Component({
  selector: 'admin-persons-requests-page',
  templateUrl: './admin-persons-requests-page.component.html'
})
export class AdminPersonsRequestsPageComponent{
  requests: PersonRequestViewData[] = [];

  constructor() {
    this.requests = [
      new PersonRequestViewData(1, 'name', 'surname', '', 'patronymic', 'telephone', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde nesciunt atque perspiciatis repudiandae? Eaque neque possimus delectus dolorum blanditiis accusantium aliquam officia at! Sed sapiente velit totam earum sequi et.', 'status'),
      new PersonRequestViewData(2, 'name', 'surname', '', 'patronymic', 'telephone', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde nesciunt atque perspiciatis repudiandae? Eaque neque possimus delectus dolorum blanditiis accusantium aliquam officia at! Sed sapiente velit totam earum sequi et.', 'status'),
      new PersonRequestViewData(3, 'name', 'surname','', 'patronymic', 'telephone', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde nesciunt atque perspiciatis repudiandae? Eaque neque possimus delectus dolorum blanditiis accusantium aliquam officia at! Sed sapiente velit totam earum sequi et.', 'status'),
      new PersonRequestViewData(4, 'name', 'surname','', 'patronymic', 'telephone', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde nesciunt atque perspiciatis repudiandae? Eaque neque possimus delectus dolorum blanditiis accusantium aliquam officia at! Sed sapiente velit totam earum sequi et.', 'status'),
      new PersonRequestViewData(5, 'name', 'surname','', 'patronymic', 'telephone', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde nesciunt atque perspiciatis repudiandae? Eaque neque possimus delectus dolorum blanditiis accusantium aliquam officia at! Sed sapiente velit totam earum sequi et.', 'status'),
      new PersonRequestViewData(6, 'name', 'surname','', 'patronymic', 'telephone', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde nesciunt atque perspiciatis repudiandae? Eaque neque possimus delectus dolorum blanditiis accusantium aliquam officia at! Sed sapiente velit totam earum sequi et.', 'status'),
      new PersonRequestViewData(7, 'name', 'surname','', 'patronymic', 'telephone', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde nesciunt atque perspiciatis repudiandae? Eaque neque possimus delectus dolorum blanditiis accusantium aliquam officia at! Sed sapiente velit totam earum sequi et.', 'status'),
      new PersonRequestViewData(8, 'name', 'surname','', 'patronymic', 'telephone', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde nesciunt atque perspiciatis repudiandae? Eaque neque possimus delectus dolorum blanditiis accusantium aliquam officia at! Sed sapiente velit totam earum sequi et.', 'status'),
    ];
  }
}
