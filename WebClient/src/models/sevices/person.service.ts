import { Person } from './../entities/person';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PersonService{
  constructor(private http: HttpClient) {}

  // получить данные о персонах для конкретной страницы
  getPersons(page: number): any {
    return this.http.get<Person[]>(`http://localhost:55280/api/People/${page}`);
  }

  // получить данные о таблице людей
  getPersonsTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/People');
  }
}
