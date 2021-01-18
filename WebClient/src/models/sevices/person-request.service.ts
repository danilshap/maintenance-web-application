import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PersonRequestViewData } from "../view-data/person-request-view-data";
@Injectable()
export class PersonRequestService{
  constructor(private http: HttpClient){}

  getPersonRequests(): any {
    return this.http.get<PersonRequestViewData[]>('http://localhost:55280/api/PersonRequestViewData');
  }

  getPersonRequest(id: number): any {
    return this.http.get<PersonRequestViewData>(`http://localhost:55280/api/PersonRequestViewData/${id}`);
  }

  postPersonRequest(personRequest: PersonRequestViewData): any {
    return this.http.post('http://localhost:55280/api/PersonRequestViewData',
    personRequest,
    {headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'Access-Control-Allow-Methods')});
  }
}
