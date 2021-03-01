import { RepairOrderViewForm } from 'src/models/view-form/repair-order-view-form';
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { RepairOrderViewData } from "../view-data/repair-order-view-data";
import { API_URL } from 'src/app/app-injection-token';

@Injectable()
export class RepairOrderService{
  constructor(private http: HttpClient, @Inject(API_URL) private apiUrl: string) { }

  // получение списка заявок на ремонт
  getRepairOrdersViewData(page: number): any {
    return this.http.get<RepairOrderViewData[]>(`${this.apiUrl}api/RepairOrderViewData/GetRepairOrderForView/${page}`);
  }

  getRepairOrdersTableInfo(): any {
    return this.http.get<any>(`${this.apiUrl}api/RepairOrderViewData/GetInfoTable`);
  }

  // полуение конкретной заявки на ремонт
  getRepairOrderViewData(id: number): any {
    return this.http.get(`${this.apiUrl}api/RepairOrderViewData/GetRepairOrder/${id}`);
  }

  // добавление новой заявки на ремонт
  // PostRepairOrder
  postRepairOrder(repairOrder: RepairOrderViewForm): any {
    return this.http.post(`${this.apiUrl}api/RepairOrderViewData/PostRepairOrder`, repairOrder);
  }

  // изменение статуса заявки на ремонт
  // PutRepairOrder
  putRepairOrder(id: number): any {
    return this.http.put(`${this.apiUrl}api/RepairOrderViewData/PutRepairOrder/${id}`, undefined, undefined);
  }
}
