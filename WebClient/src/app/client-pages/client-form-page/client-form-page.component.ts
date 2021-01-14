import { PersonRequestService } from './../../../models/sevices/person-request.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PersonRequestViewData } from "src/models/view-data/person-request-view-data";

@Component({
  selector: 'client-form-page',
  templateUrl: './client-form-page.component.html',
})
export class ClientFormPageComponent implements OnInit {
  personRequestViewData!: PersonRequestViewData;
  personRequestForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private personRequestService: PersonRequestService){}

  ngOnInit(): void {
    this.createNewPersonRequest();
    this.buildForm();
  }

  // формирование формы
  buildForm(): void {
    this.personRequestForm = this.fb.group({
      id: [this.personRequestViewData.id],
      surname: [this.personRequestViewData.surname, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      name: [this.personRequestViewData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      patronymic: [this.personRequestViewData.patronymic, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      passport: [this.personRequestViewData.passport, [Validators.required, Validators.minLength(8)]],
      telephone: [this.personRequestViewData.telephone,  [Validators.required, Validators.minLength(10)]],
      descriptionOfTheProblem: [this.personRequestViewData.descriptionOfTheProblem, [Validators.required, Validators.minLength(10)]]
    });
  }

  // создание нового запроса персоны
  createNewPersonRequest(): void {
    this.personRequestViewData = new PersonRequestViewData(
      0, '', '', '', '', '', '', ''
    );
  }

  get surname(): any { return this.personRequestForm.controls.surname; }
  get name(): any { return this.personRequestForm.controls.name; }
  get patronymic(): any { return this.personRequestForm.controls.patronymic; }
  get passport(): any { return this.personRequestForm.controls.passport; }
  get telephone(): any { return this.personRequestForm.controls.telephone; }
  get descriptionOfTheProblem(): any { return this.personRequestForm.controls.descriptionOfTheProblem; }
}
