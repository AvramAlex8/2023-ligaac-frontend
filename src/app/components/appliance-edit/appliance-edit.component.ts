import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, Observable } from 'rxjs';
import { ApplianceCategory } from 'src/app/models/appliance-category.model';
import { Appliance } from 'src/app/models/appliance.model';
import { ApplianceCategoryService } from 'src/app/services/appliance-category.service';
import { ApplianceService } from 'src/app/services/appliances.service';

@Component({
  selector: 'app-appliance-edit',
  templateUrl: './appliance-edit.component.html',
  styleUrls: ['./appliance-edit.component.scss']
})
export class ApplianceEditComponent implements OnInit{
  public form: FormGroup = new FormGroup({});
  public applianceCategories$: Observable<Array<ApplianceCategory>> = new Observable<[]>();
  public id: string | null=null;

  constructor(
    public applianceCategoryService: ApplianceCategoryService,
    public applianceService: ApplianceService,
    private route: ActivatedRoute,
    private router: Router) 
  {
    this.createForm()
  }

  ngOnInit(): void {
    this.applianceCategories$ = this.applianceCategoryService.getApplianceCategories();
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')
      if (!this.id) {
        this.router.navigate(['/', 'appliances']);
        return;
      }
      this.applianceService.getAppliance(+this.id)
        .pipe(
          filter((r) => !!r)
        )
        .subscribe(appliance => {
          this.form.patchValue(appliance);
        });
    });
  }

  onSubmit(): void {
     if (this.form.invalid) return;

     const appliance: Appliance = { ...this.form.value };
     if (this.id == null) return;
     this.applianceService
     .updateAppliance(+this.id, appliance)
     .pipe(first())
     .subscribe(() => {
       alert('Appliance successfully edited!');
       this.router.navigate(['../'], { relativeTo: this.route });
     });
  }

  private createForm() {
    this.form = new FormGroup({
      name: new FormControl<string>(''),
      consumption: new FormControl<number>(1),
      count: new FormControl<number>(1),
      active: new FormControl<boolean>(false, [Validators.required]),
      applianceCategoryId: new FormControl<number | null>(null, [Validators.required])
    })
  }
}