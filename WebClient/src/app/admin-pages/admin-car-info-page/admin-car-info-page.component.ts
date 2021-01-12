import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CarViewData } from "src/models/view-data/car-view-data";
import { CarService } from "src/models/sevices/car.service";
import { IInfoPageComponent } from "src/models/interfaces/IInfoPageComponent";

@Component({
  selector: 'admin-car-info-page',
  templateUrl: './admin-car-info-page.component.html',
})
export class AdminCarInfoPageComponent implements OnInit, IInfoPageComponent{
  carViewData!: CarViewData;  // данные по автомобилю

  constructor(private router: Router,
              private carService: CarService,
              private location: Location,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    // получение данных из роутера
    this.activatedRoute.params.forEach((params: Params) => {
      // если данные по id есть, но этого быть не может)
      // то мы отправляем запрос на получение данных
      if (params.id !== undefined) {
        // получение даных для отображения
        this.carService.getCarViewData(params.id).subscribe((data: any) => {
          this.carViewData = data as CarViewData;
        });
      }
    });
  }

  // реализация интерефеса - вернуться назад
  goBack(): void { this.location.back(); }

  // реализация интерфеса - редактировать данные
  edit(): void { this.router.navigate(['admin/client_form', this.carViewData.id]); }
}
