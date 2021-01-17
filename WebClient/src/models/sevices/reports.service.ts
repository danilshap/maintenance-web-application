import { ReportsViewData } from './../view-data/reports-view-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportsService{
  constructor(private http: HttpClient) {}

  getReports(): any {
    return this.http.get<ReportsViewData>('http://localhost:55280/api/ReportsViewData');
  }
}
