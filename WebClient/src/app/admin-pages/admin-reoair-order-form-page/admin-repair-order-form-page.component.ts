import { MalfunctionViewData } from './../../../models/view-data/malfunction-view-data';
import { PersonRequestService } from './../../../models/sevices/person-request.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorkerService } from 'src/models/sevices/worker.service';
import { RepairOrderService } from 'src/models/sevices/repair-order.service';
import { MalfunctionService } from 'src/models/sevices/malfunction.service';
import { PersonRequestViewData } from 'src/models/view-data/person-request-view-data';
import { ClientViewData } from 'src/models/view-data/client-view-data';
import { CarViewData } from 'src/models/view-data/car-view-data';
import { RepairOrderViewForm } from 'src/models/view-form/repair-order-view-form';
import { MalfanctionViewForm } from 'src/models/view-form/malfunctions-view-form';

@Component({
  selector: 'admimn-repair-order-form-page',
  templateUrl: './admin-repair-order-form-page.component.html'
})
export class AdminRepairOrderFormPageComponent implements OnInit{
  repairOrderViewForm!: RepairOrderViewForm;  // данные для отображения
  workersString!: string[]; // список рабоников
  malfunctionViewData!: MalfunctionViewData[]; // список неисправностей
  isClientOwner!: boolean; // проверка явлется ли клиент влядельцем авто
  repairOrderForm!: FormGroup; // строим форму
  summ: number = 0;
  personRequestId!: number;
  personProblem?: string;

  constructor(private repairOrderService: RepairOrderService,
              private personRequestService: PersonRequestService,
              private workerService: WorkerService,
              private malfunctionService: MalfunctionService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder){
  }

  ngOnInit(): void {
    // получение данных из роутера
    this.activatedRoute.params.forEach((params: Params) => {
      // если данные по id есть, но этого быть не может)
      // то мы отправляем запрос на получение данных
      if (params.id !== undefined) {
        this.personRequestId = params.id;
        // получение даных для отображения
        this.personRequestService.getPersonRequest(params.id).subscribe((data: any) => {
          // строрим данные с заявкой персоны
          this.createRepairOrder(data as PersonRequestViewData);
          // строим данные фломы
          this.buildForm();
        });
      } else {
        // строим аболютно новые данные
        this.createNewRepairOrder();
        // строим данные фломы
        this.buildForm();
      }
    });

    this.workerService.getWorkersString().subscribe((data: any[]) => {
      this.workersString = data as string[];
    });

    this.malfunctionService.getMalfunctionsViewData().subscribe((data: any[]) => {
      this.malfunctionViewData = data;
    })

    this.isClientOwner = false;
  }

  // создание переменной для отображения с использованием данных
  createRepairOrder(personRequestViewData: PersonRequestViewData): void {
    this.personProblem = personRequestViewData.descriptionOfTheProblem;

    // добавление данных по клиенту
    let clientData = new ClientViewData(
      0,
      personRequestViewData.surname,
      personRequestViewData.name,
      personRequestViewData.patronymic,
      personRequestViewData.passport,
      new Date(),
      personRequestViewData.telephone,
      '',
      '',
      undefined
    );

    this.repairOrderViewForm =  new RepairOrderViewForm(
      0, clientData,
      new CarViewData(
        0, '', '', new Date().getFullYear(), '', '', '', '', '', ''
      ), '', []
    );
  }

  // создание новой заявки
  createNewRepairOrder(): void {
    this.repairOrderViewForm =  new RepairOrderViewForm(
      0,
      new ClientViewData(
        0, '', '', '', '', new Date(), '', '', '', undefined
      ),
      new CarViewData(
        0, '', '', new Date().getFullYear(), '', '', '', '', '', ''
      ), '', []
    );
  }

  // построение формы
  buildForm(): void {
    this.repairOrderForm = this.fb.group({
      surname: [this.repairOrderViewForm.clientViewData.surname, [Validators.required]],
      name: [this.repairOrderViewForm.clientViewData.name, [Validators.required]],
      patronymic: [this.repairOrderViewForm.clientViewData.patronymic, [Validators.required]],
      passport: [this.repairOrderViewForm.clientViewData.passport, [Validators.required]],
      dateOfBorn: [formatDate(this.repairOrderViewForm.clientViewData.dateOfBorn, 'yyyy-MM-dd', 'en'), [Validators.required]],
      telephoneNumber: [this.repairOrderViewForm.clientViewData.telephoneNumber, [Validators.required]],
      street: [this.repairOrderViewForm.clientViewData.street, [Validators.required]],
      building: [this.repairOrderViewForm.clientViewData.building, [Validators.required]],
      flat: [this.repairOrderViewForm.clientViewData.flat],
      stateNumber: [this.repairOrderViewForm.carViewData.stateNumber, [Validators.required]],
      color: [this.repairOrderViewForm.carViewData.color, [Validators.required]],
      yearOfIssue: [this.repairOrderViewForm.carViewData.yearOfIssue, [Validators.required]],
      markTitle: [this.repairOrderViewForm.carViewData.markTitle, [Validators.required]],
      markModel: [this.repairOrderViewForm.carViewData.markModel, [Validators.required]],
      surnameOwner: [this.repairOrderViewForm.carViewData.surname, [Validators.required]],
      nameOwner: [this.repairOrderViewForm.carViewData.name, [Validators.required]],
      patronymicOwner: [this.repairOrderViewForm.carViewData.patronymic, [Validators.required]],
      passportOwner: [this.repairOrderViewForm.carViewData.passport, [Validators.required]],
      worker: [this.repairOrderViewForm.worker, [Validators.required]],
      isClientOwner: [this.isClientOwner]
    });
  }


  // при изменении статуса, мы отключам валидацию у клиентов
  clientIsOwner(): void {
    if(this.isClientOwner){
      this.surnameOwner.setValidators([Validators.required]);
      this.nameOwner.setValidators([Validators.required]);
      this.patronymicOwner.setValidators([Validators.required]);
      this.passportOwner.setValidators([Validators.required]);
    } else {
      this.surnameOwner.clearValidators();
      this.nameOwner.clearValidators();
      this.patronymicOwner.clearValidators();
      this.passportOwner.clearValidators();
    }

    this.isClientOwner = !this.isClientOwner;
  }

  onChange(id: number): void {
    this.malfunctionViewData.forEach((elem) => {
      if(elem.id === id) {
        elem.isSelected = !elem.isSelected;
      }
    });

    this.summ = 0;
    this.malfunctionViewData.filter((elem) => elem.isSelected).forEach((elem) => {
      this.summ += elem.price;
    });
  }

  onSubmit(): void {
    this.repairOrderViewForm = new RepairOrderViewForm(
      0,
      this.createClientDataForSubmit(),
      this.createCarDataForSubmit(),
      this.worker.value,
      this.malfunctionViewData.filter(m => m.isSelected).map(m => new MalfanctionViewForm(m.id, m.title, m.price))
    );

    this.repairOrderService.postRepairOrder(this.repairOrderViewForm).subscribe(
      () => {
        if (this.personRequestId !== undefined) {
          this.personRequestService.putPersonRequest(this.personRequestId, 'Заявка оформлена').subscribe(() => this.toIndex());
        } else this.toIndex();
      },
      (error: any) => alert(error.message)
    );
  }

  // создание данных о клиенте для отправки запроса
  createClientDataForSubmit(): ClientViewData{
    return new ClientViewData(0, this.surname.value, this.name.value, this.patronymic.value, this.passport.value,
                              this.dateOfBorn.value, this.telephoneNumber.value, this.street.value, this.building.value, this.flat.value);
  }

  // создание данных о автомобиля для отпарвки запроса
  createCarDataForSubmit() : CarViewData {
    return new CarViewData(0,
      this.stateNumber.value,
      this.color.value,
      this.yearOfIssue.value,
      this.markTitle.value,
      this.markModel.value,
      this.isClientOwner ? this.surname.value: this.surnameOwner.value,
      this.isClientOwner ? this.name.value: this.nameOwner.value,
      this.isClientOwner ? this.patronymic.value: this.patronymicOwner.value,
      this.isClientOwner ? this.passport.value: this.passportOwner.value,
      )
  }

  toIndex(): void {
    window.location.href = "http://localhost:4200/admin/index";
  }

  selectedMalfunctions(): boolean {
    return this.malfunctionViewData.filter((elem) => elem.isSelected).length > 0;
  }

  get surname(): any { return this.repairOrderForm.controls.surname; }
  get name(): any { return this.repairOrderForm.controls.name; }
  get patronymic(): any { return this.repairOrderForm.controls.patronymic; }
  get passport(): any { return this.repairOrderForm.controls.passport; }
  get dateOfBorn(): any { return this.repairOrderForm.controls.dateOfBorn; }
  get telephoneNumber(): any { return this.repairOrderForm.controls.telephoneNumber; }
  get street(): any { return this.repairOrderForm.controls.street; }
  get building(): any { return this.repairOrderForm.controls.building; }
  get flat(): any { return this.repairOrderForm.controls.flat; }
  get stateNumber(): any { return this.repairOrderForm.controls.stateNumber; }
  get yearOfIssue(): any { return this.repairOrderForm.controls.yearOfIssue; }
  get markTitle(): any { return this.repairOrderForm.controls.markTitle; }
  get markModel(): any { return this.repairOrderForm.controls.markModel; }
  get color(): any { return this.repairOrderForm.controls.color; }
  get surnameOwner(): any { return this.repairOrderForm.controls.surnameOwner; }
  get nameOwner(): any { return this.repairOrderForm.controls.nameOwner; }
  get patronymicOwner(): any { return this.repairOrderForm.controls.patronymicOwner; }
  get passportOwner(): any { return this.repairOrderForm.controls.passportOwner; }
  get worker(): any { return this.repairOrderForm.controls.worker; }
}
