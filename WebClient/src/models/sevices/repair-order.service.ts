import { Injectable } from "@angular/core";

@Injectable()
export class RepairOrderService{

  // получение списка заявок на ремонт
  getRepairOrdersViewData(){}

  // полуение конкретной заявки на ремонт
  getRepairOrderViewData(id: number){}

  // получение объекта для оформления заявки на ремнт с заявкой персоны
  getRepairOrderWithPersonRequest(id: number){}

  // добавление новой заявки на ремонт
  postRepairOrder(repairOrder: any){}

  // изменение статуса заявки на ремонт
  putRepairOrder(id: number){}
}
