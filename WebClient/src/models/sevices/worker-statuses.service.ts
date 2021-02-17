import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkerStatus } from './../entities/worker-statuses';

@Injectable()
export class WorkerStatusesService{
  constructor(private http: HttpClient) {}

  // получить данные о персонах для конкретной страницы
  getWorkerStatuses(page: number): any {
    return this.http.get<WorkerStatus[]>(`http://localhost:55280/api/WorkerStatus/${page}`);
  }

  // получить данные о таблице людей
  getWorkerStatusesTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/WorkerStatus');
  }
}
