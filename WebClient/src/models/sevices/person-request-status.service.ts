import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonRequestStatus } from '../entities/person-request-statuses';

@Injectable()
export class PersonRequestStausesService{
  constructor(private http: HttpClient) {}

  // получить данные о статусах запросов людей для конкретной страницы
  getPersonRequestStetuses(page: number): any {
    return this.http.get<PersonRequestStatus[]>(`http://localhost:55280/api/PersonRequestStatus/${page}`);
  }

  // получить данные о таблице статусов запросов людей
  getPersonRequestStetusesTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/PersonRequestStatus');
  }
}
