import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Detail } from "../entities/detail";

@Injectable()
export class DetailsService{
  // Details
  constructor(private http: HttpClient) {}

  // получить список деталей в зависимости от страницы данных
  getDetails(page: number): any {
    return this.http.get<Detail[]>(`http://localhost:55280/api/Details/${page}`);
  }

  // получить данные о таблице деталей
  getDetailsTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/Details');
  }
}
