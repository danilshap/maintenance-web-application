import { Address } from './../entities/address';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddressesService{
  constructor(private http: HttpClient) {}

  getAddresses(): any {
    return this.http.get<Address[]>('http://localhost:55280/api/Addresses');
  }

  // TODO: добавить функции для формирования запроса на получение конкретного адреса,
  // отправка данных на изменение адреса, добавление адреса и удаления заданного адреса
}
