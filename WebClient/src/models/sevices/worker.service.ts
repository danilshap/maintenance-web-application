import { Injectable } from "@angular/core";
import { WorkerViewData } from "../view-data/worker-view-data";

@Injectable()
export class WorkerService{
  // получение данных о всех работниках
  getWorkersViewData(){}

  // получение данных о конкретном работнике
  getWorkerViewData(id: number){}

  // добавление нового работника
  postWorkerViewData(workerViewData: WorkerViewData){}

  // удаление работника
  deleteWorkerViewData(id: number){}
}
