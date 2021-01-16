import { Detail } from '../entities/detail';

// класс для представления данных о неисправностях
export class MalfunctionViewData{
  public isSelected: boolean;
  // констркутор
  constructor(
    public id: number,  // id - неисправности
    public title: string, // название неисправности
    public price: number, // количество времени на устранение неисправности
    public details: Detail[] // список деталей которые необходимы для устранения неисправности
  ){
    this.isSelected = false;
  }
}
