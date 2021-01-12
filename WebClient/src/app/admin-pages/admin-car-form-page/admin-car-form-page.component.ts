import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CarService } from 'src/models/sevices/car.service';
import { CarViewData } from 'src/models/view-data/car-view-data';

@Component({
    selector: 'admin-car-form-page',
    templateUrl: './admin-car-form-page.component.html',
})
export class AdminCarFormPageComponent implements OnInit{
  carViewData!: CarViewData;
  carForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private carService: CarService,
              private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
        // получение данных из роутера
        this.activatedRoute.params.forEach((params: Params) => {
          // если данные по id есть, но этого быть не может)
          // то мы отправляем запрос на получение данных
          if (params.id !== undefined) {
            // получение даных для отображения
            this.carService.getCarViewData(params.id).subscribe((data: any) => {
              this.carViewData = data as CarViewData;
              // создание класса для отображения и изменения формы
              this.carForm = this.fb.group({
                stateNumber: [ this.carViewData.stateNumber, [Validators.required]],
                color: [ this.carViewData.color, [Validators.required]],
                yearOfIssue: [ this.carViewData.yearOfIssue, [Validators.required]],
                markTitle: [ this.carViewData.markTitle, [Validators.required]],
                markModel: [ this.carViewData.markModel, [Validators.required]],
                name: [ this.carViewData.name, [Validators.required]],
                surname: [ this.carViewData.surname, [Validators.required]],
                patronymic: [ this.carViewData.patronymic, [Validators.required]],
                passport: [ this.carViewData.passport, [Validators.required]],
              });
            });
          }
        });
  }

  submit(): void{
    console.log(this.carForm.value);
  }
}
