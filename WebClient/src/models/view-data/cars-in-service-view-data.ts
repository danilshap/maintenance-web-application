import { MalfunctionViewData } from './malfunction-view-data';
import { CarViewData } from "./car-view-data";
import { WorkerViewData } from "./worker-view-data";

export class CarInServiceViewData{
  constructor(
    public carViewData: CarViewData,
    public workerViewData: WorkerViewData,
    public malfunctionsViewData: MalfunctionViewData[],
    public repairCost: number,
    public countOfMalfunctions: number
  ){}
}
