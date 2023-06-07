import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, filter, first, tap } from 'rxjs';
import { Appliance } from 'src/app/models/appliance.model';
import { ApplianceCategoryService } from 'src/app/services/appliance-category.service';
import { ApplianceService } from 'src/app/services/appliances.service';
import { ConsumptionService } from 'src/app/services/consumption.service';

@Component({
  selector: 'app-appliance-details',
  templateUrl: './appliance-details.component.html',
  styleUrls: ['./appliance-details.component.scss']
})
export class ApplianceDetailsComponent implements OnInit {
  public appliance: Appliance | null = null;
  public consumptionData: any[] = [];

  constructor(
    private applianceService: ApplianceService,
    private applianceCategoryService: ApplianceCategoryService,
    private consumptionService: ConsumptionService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/', 'appliances']);
        return;
      }
      this.applianceService.getAppliance(+id)
        .pipe(
          filter((r) => !!r),
          concatMap((appliance) => {
          this.appliance = appliance;
          return this.applianceCategoryService.getCategory(appliance.applianceCategoryId);
        }),
        tap((applianceCategory) => {
          if (this.appliance){
            this.appliance.applianceCategory = applianceCategory;
          }
        }),
        concatMap(() => this.consumptionService.getConsumptionReportForAppliance(+id)))
        .subscribe(consumption => {
          if(this.appliance)
          {
            this.consumptionData = [
              {
                name: this.appliance?.name,
                series: consumption.sort((c1, c2) => new Date(c1.startDate).getTime() - new Date(c2.startDate).getTime())
                .map(c => { 
                  return {
                  name: `${c.startDate.toDateString()} - ${c.endDate}`,
                  value: c.consumptionWh
                  } 
                  
            })
            
          }
        ]
          } 
        });
    });
  }
}