import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environmentts/environment';
import { Appliance } from '../models/appliance.model';
import { PaginatedListResponse } from '../models/paginated-list-response.model';
@Injectable({
  providedIn: 'root'
})
export class ApplianceService {
  private baseUrl: string = "appliance";
  
  constructor(private httpClient: HttpClient) { }
  public getAppliances(offset: number, pageSize: number, sortField: string | null, sortDir: string | null): Observable<PaginatedListResponse<Appliance>> {
    let url = `${environment.apiUrl}${this.baseUrl}?offset=${offset}&pageSize=${pageSize}`;
    if (sortField) {
      url += `&sortField=${sortField}`;
    }
    if (sortDir) {
      url += `&sortDir=${sortDir}`;
    }
    return this.httpClient.get<PaginatedListResponse<Appliance>>(url);
  }
  public getAppliance(id: number): Observable<Appliance>{
    return this.httpClient.get<Appliance>(`${environment.apiUrl}${this.baseUrl}/${id}`);
  }

  public addAppliance(appliance: Appliance): Observable<Appliance> {
    return this.httpClient.post<Appliance>(`${environment.apiUrl}${this.baseUrl}`, appliance);
  }
  public updateAppliance(id:number,appliance: Appliance): Observable<Appliance> {
    return this.httpClient.put<Appliance>(`${environment.apiUrl}${this.baseUrl}/${id}`, appliance);
  }
  public deleteAppliance(id:number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}${this.baseUrl}/${id}`);
  }
}