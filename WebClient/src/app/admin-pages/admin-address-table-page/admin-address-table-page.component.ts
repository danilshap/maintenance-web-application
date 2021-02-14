import { Address } from './../../../models/entities/address';
import { Component, OnInit } from "@angular/core";
import { AddressesService } from "src/models/sevices/adresses.service";

@Component({
  selector: 'addrress-table-page',
  templateUrl: './admin-address-table-page.component.html',
})
export class AdminAddressTablePageComponent implements OnInit {
  adresses!: Address[]; // список адресов

  constructor(private addressesService: AddressesService){}

  ngOnInit(): void {
    this.addressesService.getAddresses().subscribe((data: any) => {
      this.adresses = data as Address[];
    });
  }
}
