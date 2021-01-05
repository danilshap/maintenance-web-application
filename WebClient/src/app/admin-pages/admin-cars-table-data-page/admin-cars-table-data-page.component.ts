import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-car-table-data-page',
  templateUrl: './admin-cars-table-data-page.component.html',
})
export class AdminCarsTableDataPageComponent{
  constructor(private router: Router){}

  appendNewCar(): void {
    this.router.navigate(['admin/car_form']);
  }
}
