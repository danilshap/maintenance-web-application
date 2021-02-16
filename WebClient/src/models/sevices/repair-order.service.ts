import { RepairOrderViewForm } from 'src/models/view-form/repair-order-view-form';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RepairOrderViewData } from "../view-data/repair-order-view-data";

@Injectable()
export class RepairOrderService{
  constructor(private http: HttpClient) { }

  // получение списка заявок на ремонт
  getRepairOrdersViewData(page: number): any {
    return this.http.get<RepairOrderViewData[]>(`http://localhost:55280/api/RepairOrderViewData/GetRepairOrderForView/${page}`);
  }

  getRepairOrdersTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/RepairOrderViewData/GetInfoTable');
  }

  // полуение конкретной заявки на ремонт
  getRepairOrderViewData(id: number): any {
    return this.http.get(`http://localhost:55280/api/RepairOrderViewData/GetRepairOrder/${id}`);
  }

  // добавление новой заявки на ремонт
  // PostRepairOrder
  postRepairOrder(repairOrder: RepairOrderViewForm): any {
    return this.http.post('http://localhost:55280/api/RepairOrderViewData/PostRepairOrder', repairOrder);
  }

  // изменение статуса заявки на ремонт
  // PutRepairOrder
  putRepairOrder(id: number): any {
    return this.http.put(`http://localhost:55280/api/RepairOrderViewData/PutRepairOrder/${id}`, undefined, undefined);
  }
}
