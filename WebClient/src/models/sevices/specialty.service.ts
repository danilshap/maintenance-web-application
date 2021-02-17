import { Specialty } from './../entities/specialty';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpecialtyService{
  constructor(private http: HttpClient) {}

  getSpecialtiesStr(): any {
    return this.http.get('http://localhost:55280/api/Specialties/GetSpecialtiesStr');
  }

    // получить данные о персонах для конкретной страницы
    getSpecialties(page: number): any {
      return this.http.get<Specialty[]>(`http://localhost:55280/api/Specialties/GetSpecialties/${page}`);
    }

    // получить данные о таблице людей
    getSpecialtiesTableInfo(): any {
      return this.http.get<any>('http://localhost:55280/api/Specialties/GetTableInfo');
    }
}
