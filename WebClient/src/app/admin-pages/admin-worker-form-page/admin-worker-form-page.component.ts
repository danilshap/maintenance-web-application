import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkerService } from 'src/models/sevices/worker.service';
import { WorkerViewData } from 'src/models/view-data/worker-view-data';

@Component({
    selector: 'admin-worker-form-page',
    templateUrl: './admin-worker-form-page.component.html',
})
export class AdminWorkerFormPageComponent implements OnInit{
  workerViewData!: WorkerViewData;
  workerForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private workerService: WorkerService,
              private location: Location,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    // получение данных из роутера
    this.activatedRoute.params.forEach((params: Params) => {
      // если данные по id есть, но этого быть не может)
      // то мы отправляем запрос на получение данных
      if (params.id !== undefined) {
        // получение даных для отображения
        this.workerService.getWorkerViewData(params.id).subscribe((data: any) => {
          this.workerViewData = data as WorkerViewData;
          this.buildForm();
        });
      }
    });
  }

  // функция для построения запроса
  buildForm(): void {
    // создание класса для отображения и изменения формы
    this.workerForm = this.fb.group({
      id: [this.workerViewData.id],
      surname: [ this.workerViewData.surname, [Validators.required]],
      name: [ this.workerViewData.name, [Validators.required]],
      patronymic: [ this.workerViewData.patronymic, [Validators.required]],
      passport: [ this.workerViewData.passport, [Validators.required]],
      discharge: [ this.workerViewData.discharge, [Validators.required]],
      workExperience: [ this.workerViewData.workExperience, [Validators.required]],
      status: [ this.workerViewData.status, [Validators.required]],
      specialty: [ this.workerViewData.specialty, [Validators.required]]
    });
  }

  // вернуться назад
  goBack(): void {
    this.location.back();
  }

  get surname(): any { return this.workerForm.controls.surname; }
  get name(): any { return this.workerForm.controls.surname; }
  get patronymic(): any { return this.workerForm.controls.patronymic; }
  get passport(): any { return this.workerForm.controls.passport; }
  get discharge(): any { return this.workerForm.controls.discharge; }
  get workExperience(): any { return this.workerForm.controls.workExperience; }
  get status(): any { return this.workerForm.controls.status; }
  get specialty(): any { return this.workerForm.controls.specialty; }
}
