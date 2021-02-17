import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkerService } from 'src/models/sevices/worker.service';
import { WorkerViewData } from 'src/models/view-data/worker-view-data';
import { SpecialtyService } from 'src/models/sevices/specialty.service';

@Component({
    selector: 'admin-worker-form-page',
    templateUrl: './admin-worker-form-page.component.html',
})
export class AdminWorkerFormPageComponent implements OnInit{
  workerViewData!: WorkerViewData;
  specialties!: string[];
  workerForm!: FormGroup;
  title = 'Добавление нового работника';

  constructor(private fb: FormBuilder,
              private workerService: WorkerService,
              private specialtyService: SpecialtyService,
              private location: Location,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    // получение данных из роутера
    this.activatedRoute.params.forEach(() => {
      this.specialtyService.getSpecialtiesStr().subscribe((data: any) => {
        this.specialties = data as string[];
      });
      this.createNewWorker();
      this.buildForm();
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

  // создание нового работника
  createNewWorker(): void {
    this.workerViewData = new WorkerViewData(
      0, '', '', '', '', '', 1, 'На работе. Свободен', ''
    );
  }

  submit(): void{
    this.workerViewData = new WorkerViewData(
      this.workerViewData.id,
      this.surname.value,
      this.name.value,
      this.patronymic.value,
      this.passport.value,
      this.discharge.value,
      this.workExperience.value,
      this.status.value,
      this.specialty.value
    );

    this.workerService.postWorkerViewData(this.workerViewData).subscribe(
      () => {this.location.back(); },
      (error: any) => { alert(error.message); }
    );
  }

  get surname(): any { return this.workerForm.controls.surname; }
  get name(): any { return this.workerForm.controls.name; }
  get patronymic(): any { return this.workerForm.controls.patronymic; }
  get passport(): any { return this.workerForm.controls.passport; }
  get discharge(): any { return this.workerForm.controls.discharge; }
  get workExperience(): any { return this.workerForm.controls.workExperience; }
  get status(): any { return this.workerForm.controls.status; }
  get specialty(): any { return this.workerForm.controls.specialty; }
}
