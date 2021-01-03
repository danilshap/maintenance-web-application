import { Component, Input } from '@angular/core';
import { CarViewData } from 'src/models/view-data/car-view-data';

@Component({
    selector: 'car-table-row',
    templateUrl: './cars-table-row.component.html',
})
export class CarsTableRowComponent{
    @Input() carViewData!: CarViewData; // данные об автомобиле
}
