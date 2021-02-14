import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mark } from '../entities/mark';

@Injectable()
export class MarksService{
  constructor(private http: HttpClient) {}

  getMarks(): any {
    return this.http.get<Mark[]>('http://localhost:55280/api/Marks');
  }
}
