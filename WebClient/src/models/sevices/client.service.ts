import { Injectable } from "@angular/core";
import { ClientViewData } from "../view-data/client-view-data";

@Injectable()
export class ClientService{
  // получение списка клиентов
  getClientsViewData(){}

  // получение конкретного клиента
  getClientViewData(id: number){}

  // добавление нового клиента
  postClientViewData(clientViewData: ClientViewData){}

  // изменение клиента
  putClientViewData(id: number, clientViewData: ClientViewData){}
}
