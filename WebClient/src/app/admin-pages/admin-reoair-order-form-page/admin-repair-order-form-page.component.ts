import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'admimn-repair-order-form-page',
  templateUrl: './admin-repair-order-form-page.component.html'
})
export class AdminRepairOrderFormPageComponent implements OnInit{
  isClientOwner: boolean;

  constructor(){
    this.isClientOwner = false;
  }

  ngOnInit(): void {
  }

  clientIsOwner(): void {
    this.isClientOwner = !this.isClientOwner;
  }
}
