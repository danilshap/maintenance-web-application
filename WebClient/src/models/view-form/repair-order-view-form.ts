import { MalfanctionViewForm } from './malfunctions-view-form';
import { CarViewData } from "../view-data/car-view-data";
import { ClientViewData } from "../view-data/client-view-data";

export class RepairOrderViewForm{
  constructor(
    public id: number,
    public clientViewData: ClientViewData,
    public carViewData: CarViewData,
    public worker: string,
    public malfunctionViewModels: MalfanctionViewForm[]
  )
  {}
}
