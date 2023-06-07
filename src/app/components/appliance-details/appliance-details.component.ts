import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, filter, first, tap } from 'rxjs';
import { Appliance } from 'src/app/models/appliance.model';
import { ApplianceCategoryService } from 'src/app/services/appliance-category.service';
import { ApplianceService } from 'src/app/services/appliances.service';

@Component({
  selector: 'app-appliance-details',
  templateUrl: './appliance-details.component.html',
  styleUrls: ['./appliance-details.component.scss']
})
export class ApplianceDetailsComponent implements OnInit {
  public appliance: Appliance | null = null;
  
  constructor(
    private applianceService: ApplianceService,
    private applianceCategoryService: ApplianceCategoryService,
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
        }))
        .subscribe();
    });
  }
 
}