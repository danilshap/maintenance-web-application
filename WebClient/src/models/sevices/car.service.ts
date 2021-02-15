import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CarViewData } from "../view-data/car-view-data";

@Injectable()
export class CarService{
  constructor(private http: HttpClient) {}

  // получение всех клиентов
  getCarsViewData(page: number): any{
    return this.http.get<CarViewData[]>(`http://localhost:55280/api/CarViewData/GetCars/${page}`);
  }

  getCarsTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/CarViewData/InfoTable');
  }

  // получение конкретного клиента
  getCarViewData(id: number): any{
    return this.http.get<CarViewData>(`http://localhost:55280/api/CarViewData/GetCar/${id}`);
  }

  // добавление нового клиента
  postCarViewData(carViewData: CarViewData): any{
    return this.http.post('http://localhost:55280/api/CarViewData/PostCar',
     carViewData,
    {headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'Access-Control-Allow-Methods')});
  }

  // изменение клиента
  putCarViewData(id: number, carViewData: CarViewData): any{
    return this.http.put(`http://localhost:55280/api/CarViewData/PutCar/${id}`, carViewData, {headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'Access-Control-Allow-Methods')});
  }
}
