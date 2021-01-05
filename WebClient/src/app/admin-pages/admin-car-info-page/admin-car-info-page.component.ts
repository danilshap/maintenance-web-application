import { Component, OnInit } from "@angular/core";
import { CarViewData } from "src/models/view-data/car-view-data";

@Component({
  selector: 'admin-car-info-page',
  templateUrl: './admin-car-info-page.component.html',
})
export class AdminCarInfoPageComponent implements OnInit{
  carViewData: CarViewData | undefined;

  ngOnInit(): void {
    this.carViewData = new CarViewData(1, 'stateNumber', 'color', 1, 'title', 'title', 'surname', 'name', 'patronymic', 'passport');
  }
}
