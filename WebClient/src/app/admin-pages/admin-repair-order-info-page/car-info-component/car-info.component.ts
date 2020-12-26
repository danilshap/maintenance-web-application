import { Component, Input } from "@angular/core";
import { CarViewData } from "src/models/view-data/car-view-data";

@Component({
  selector: 'car-info',
  templateUrl: './car-info.component.html',
})
export class CarInfoComponent{
  @Input()
  carViewData!: CarViewData;
}
