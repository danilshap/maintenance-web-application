import { CarInServiceViewData } from "./cars-in-service-view-data";

export class ReportsViewData{
  constructor(
    public malfunctionsViewData: any[],
    public countOfMalfunctions: number,
    public priceOfMalfunctions: number,
    public carsInServicesViewData: CarInServiceViewData[]
  ){}
}
