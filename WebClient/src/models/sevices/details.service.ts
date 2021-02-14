import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Detail } from "../entities/detail";

@Injectable()
export class DetailsService{
  // Details
  constructor(private http: HttpClient) {}

  getDetails(): any {
    return this.http.get<Detail[]>('http://localhost:55280/api/Details');
  }

  // TODO: добавить функции для формирования запроса на получение конкретной детали,
  // отправка данных на изменение деали, добавление детали и удаления заданной детали
}
