import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MalfunctionViewData } from "../view-data/malfunction-view-data";

@Injectable()
export class MalfunctionService{
  constructor(private http: HttpClient){}

  getMalfunctionsViewData(page: number): any {
    return this.http.get<MalfunctionViewData[]>(`http://localhost:55280/api/MalfunctionViewData/GetMalfunctions/${page}`);
  }

  getMalfunctionsTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/MalfunctionViewData/InfoTable');
  }
}
