import { Address } from './../entities/address';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddressesService{
  constructor(private http: HttpClient) {}

  getAddresses(page: number): any {
    return this.http.get<Address[]>(`http://localhost:55280/api/Addresses/${page}`);
  }

  getAddressesTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/Addresses');
  }
}
