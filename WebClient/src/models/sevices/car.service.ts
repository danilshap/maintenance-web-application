import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CarViewData } from "../view-data/car-view-data";

@Injectable()
export class CarService{
  constructor(private http: HttpClient) {}

  // получение всех клиентов
  getCarsViewData(){
    return this.http.get<CarViewData[]>('http://localhost:55280/api/CarViewData');
  }

  // получение конкретного клиента
  getCarViewData(id: number){
    return this.http.get<CarViewData>(`http://localhost:55280/api/CarViewData/${id}`);
  }

  // добавление нового клиента
  postCarViewData(carViewData: CarViewData): any{
    return this.http.post('http://localhost:55280/api/CarViewData',
     carViewData,
      {headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'Access-Control-Allow-Methods')});
  }

  // изменение клиента
  putCarViewData(id: number, carViewData: CarViewData){}

  // получение количества машин в ремонте
  getCountOfCars(){}
}
