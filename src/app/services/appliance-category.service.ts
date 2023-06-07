import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplianceCategory } from '../models/appliance-category.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environmentts/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplianceCategoryService {
  private baseUrl: string = 'applianceCategory';

  constructor(private httpClient: HttpClient) { }

  public getApplianceCategories(): Observable<ApplianceCategory[]>{
    return this.httpClient.get<ApplianceCategory[]>(`${environment.apiUrl}${this.baseUrl}`);
  }

  public getCategory(id: number): Observable<ApplianceCategory>{
    return this.httpClient.get<ApplianceCategory>(`${environment.apiUrl}${this.baseUrl}/${id}`);
  }
}