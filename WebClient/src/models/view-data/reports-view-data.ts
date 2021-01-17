import { CarInServiceViewData } from "./cars-in-service-view-data";
import { MalfunctionViewData } from "./malfunction-view-data";

export class ReportsViewData{
  constructor(
    public malfunctionViewData: MalfunctionViewData[],
    public countOfMalfunctions: number,
    public priceOfMalfunctions: number,
    public carsInServicesViewData: CarInServiceViewData[]
  ){}
}
