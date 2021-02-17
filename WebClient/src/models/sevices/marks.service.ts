import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mark } from '../entities/mark';

@Injectable()
export class MarksService{
  constructor(private http: HttpClient) {}

  // получить данные о марках для конкретной страницы
  getMarks(page: number): any {
    return this.http.get<Mark[]>(`http://localhost:55280/api/Marks/${page}`);
  }

  // получить данные о таблице деталей
  getMarksTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/Marks');
  }
}
