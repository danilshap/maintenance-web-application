import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RepairOrderViewData } from "../view-data/repair-order-view-data";

@Injectable()
export class RepairOrderService{
  constructor(private http: HttpClient) { }

  // получение списка заявок на ремонт
  getRepairOrdersViewData(){
    return this.http.get<RepairOrderViewData[]>('http://localhost:55280/api/RepairOrderViewData/GetRepairOrderForView');
  }

  // полуение конкретной заявки на ремонт
  getRepairOrderViewData(id: number): any {
    return this.http.get(`http://localhost:55280/api/RepairOrderViewData/GetRepairOrder/${id}`);
  }

  // получение объекта для оформления заявки на ремнт с заявкой персоны
  getRepairOrderWithPersonRequest(id: number){}

  // добавление новой заявки на ремонт
  postRepairOrder(repairOrder: any){
    
  }

  // изменение статуса заявки на ремонт
  // PutRepairOrder
  putRepairOrder(id: number){
    return this.http.put(`http://localhost:55280/api/RepairOrderViewData/PutRepairOrder/${id}`, undefined, undefined);
  }
}
