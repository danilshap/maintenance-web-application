import { Injectable } from "@angular/core";
import { CarViewData } from "../view-data/car-view-data";

@Injectable()
export class CarService{
  // получение всех клиентов
  getCarsViewData(){}

  // получение конкретного клиента
  getCarViewData(id: number){}

  // добавление нового клиента
  postCarViewData(carViewData: CarViewData){}

  // изменение клиента
  putCarViewData(id: number, carViewData: CarViewData){}

  // получение количества машин в ремонте
  getCountOfCars(){}
}
