import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpecialtyService{
  constructor(private http: HttpClient) {}

  getSpecialties(): any {
    return this.http.get('http://localhost:55280/api/Specialties/GetSpecialtiesStr');
  }
}
