import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/models/sevices/car.service';
import { CarViewData } from 'src/models/view-data/car-view-data';

@Component({
  selector: 'admin-car-table-data-page',
  templateUrl: './admin-cars-table-data-page.component.html',
})
export class AdminCarsTableDataPageComponent implements OnInit{
  collection!: CarViewData[];
  currentPage!: number;
  maxPages!: number;
  maxCount!: number;

  constructor(private router: Router, private carService: CarService){}

  ngOnInit(): void {
    this.currentPage = 1;
    this.carService.getCarsViewData(this.currentPage).subscribe((data: any[]) => {
      this.collection = data as CarViewData[];

      this.carService.getCarsTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
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

  changePage(page: number): void {
    this.carService.getCarsViewData(page).subscribe((data: any[]) => {
      this.collection = data as CarViewData[];

      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-outline-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-secondary');
      this.currentPage = page;
      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-outline-secondary');
    });
  }
}
