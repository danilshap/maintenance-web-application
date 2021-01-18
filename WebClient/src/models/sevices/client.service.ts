import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientViewData } from "../view-data/client-view-data";

@Injectable()
export class ClientService{
  constructor(private http: HttpClient) {}

  // получение списка клиентов
  getClientsViewData(){
    return this.http.get<ClientViewData[]>('http://localhost:55280/api/ClientViewData');
  }

  // получение конкретного клиента
  getClientViewData(id: number){
    return this.http.get<ClientViewData>(`http://localhost:55280/api/ClientViewData/${id}`);
  }

  // добавление нового клиента
  postClientViewData(clientViewData: ClientViewData): any {
    return this.http.post('http://localhost:55280/api/ClientViewData',
    clientViewData,
    {headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'Access-Control-Allow-Methods')});
  }

  // изменение клиента
  putClientViewData(id: number, clientViewData: ClientViewData){}
}
