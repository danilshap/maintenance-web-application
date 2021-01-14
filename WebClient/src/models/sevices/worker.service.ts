import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WorkerViewData } from "../view-data/worker-view-data";

@Injectable()
export class WorkerService{
  constructor(private http: HttpClient) {}

  // получение данных о всех работниках
  getWorkersViewData(): any {
    return this.http.get<WorkerViewData[]>('http://localhost:55280/api/WorkerViewData/GetWorkers');
  }

  // получение данных о конкретном работнике
  getWorkerViewData(id: number): any {
    return this.http.get<WorkerViewData>(`http://localhost:55280/api/WorkerViewData/GetWorker/${id}`);
  }

  // добавление нового работника
  postWorkerViewData(workerViewData: WorkerViewData){}

  // удаление работника
  deleteWorkerViewData(id: number){}
}
