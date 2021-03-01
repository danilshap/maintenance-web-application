import { ReportsViewData } from './../view-data/reports-view-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportsService{
  constructor(private http: HttpClient) {}

  getReports(): any {
    return this.http.get<ReportsViewData>('http://localhost:55280/api/ReportsViewData/Get');
  }

  getFreeWorkers(): any {
    return this.http.get<number>('http://localhost:55280/api/ReportsViewData/GetCountOfFreeWorker',
    {headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'Access-Control-Allow-Methods')});
  }

  getCarsInService(): any {
    return this.http.get<number>('http://localhost:55280/api/ReportsViewData/GetCountOfCarsInService',
    {headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'Access-Control-Allow-Methods')});
  }
}
