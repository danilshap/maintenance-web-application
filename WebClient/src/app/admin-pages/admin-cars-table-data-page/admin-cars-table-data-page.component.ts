import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/models/sevices/car.service';
import { CarViewData } from 'src/models/view-data/car-view-data';

@Component({
  selector: 'admin-car-table-data-page',
  templateUrl: './admin-cars-table-data-page.component.html',
})
export class AdminCarsTableDataPageComponent implements OnInit{
  carsViewData!: CarViewData[];

  constructor(private router: Router, private carService: CarService){}

  ngOnInit(): void {
    this.carService.getCarsViewData().subscribe((data: any[]) => {
      this.carsViewData = data as CarViewData[];
    });
  }

  appendNewCar(): void {
    this.router.navigate(['admin/car_form']);
  }

  editCar(id: number): void{
    this.router.navigate(['admin/car_form', id]);
  }

  infoCar(id: number): void{
    this.router.navigate(['admin/car_info', id]);
  }
}
