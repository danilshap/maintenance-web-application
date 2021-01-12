import { CarViewData } from './car-view-data';
import { ClientViewData } from './client-view-data';
import { MalfunctionViewData } from './malfunction-view-data';
import { WorkerViewData } from './worker-view-data';

// класс для предоставления заявок на ремонт
export class RepairOrderViewData {
  // конструктор со свойствами класса
  constructor(
    public id: number,  // id - заявки на ремонт
    public dateOfTheApplication: Date, // дата обращения
    public price: number,  // стоимость ремонта
    public dateOfCompletion: Date, // примерная дата завершения
    public isReady: boolean, // выполнен ли ремонт
    public clientViewData: ClientViewData, // данные о клиенте
    public carViewData: CarViewData, // данные о авто
    public workerViewData: WorkerViewData, // данные о работниках
    public malfunctionViewModels: MalfunctionViewData[], // данные о неисправностях
  ) {}
}
