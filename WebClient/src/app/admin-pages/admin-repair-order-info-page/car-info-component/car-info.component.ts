import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CarViewData } from "src/models/view-data/car-view-data";

@Component({
  selector: 'car-info',
  templateUrl: './car-info.component.html',
})
export class CarInfoComponent{
  @Input()
  carViewData!: CarViewData;  // данные для отображения данных об авто

  constructor(private router: Router){}

  // изменение данных о клиенте
  editCar(): void{
    this.router.navigate(['admin/car_form', this.carViewData.id]);
  }
}
