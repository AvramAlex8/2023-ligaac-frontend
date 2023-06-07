import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApplianceConsumption } from '../models/appliances-consumption.model';
import { Appliance } from '../models/appliance.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
  private baseUrl: string = 'consumption';

  constructor(private httpClient: HttpClient) { }
  
  public getConsumptionReportForAppliance(applianceId: number): Observable<ApplianceConsumption[]> {
    return of(this.mockConsumptionReportForAppliance());
    //return this.httpClient.get<ApplianceConsumption[]>('${environment.apiUrl}${this.baseUrl}/appliance/${applianceId}');
  }

  private mockConsumptionReportForAppliance(): ApplianceConsumption[] {
    return  [
      {
        applianceId: 1,
        consumptionWh: 500,
        startDate: new Date(2022, 12, 15, 10, 10),
        endDate: new Date(2022, 12, 16, 10, 10),
        id: 1,
      },
      {
        applianceId: 1,
        consumptionWh: 100,
        startDate: new Date(2022, 12, 14, 10, 10),
        endDate: new Date(2022, 12, 18, 10, 10),
        id: 1,
      },
      {
        applianceId: 1,
        consumptionWh: 300,
        startDate: new Date(2022, 12, 15, 10, 10),
        endDate: new Date(2022, 12, 20, 10, 10),
        id: 1,
      },
      {
        applianceId: 1,
        consumptionWh: 1100,
        startDate: new Date(2022, 12, 21, 10, 10),
        endDate: new Date(2022, 12, 22, 10, 10),
        id: 1,
      },
    ] as ApplianceConsumption[]
  }
}
