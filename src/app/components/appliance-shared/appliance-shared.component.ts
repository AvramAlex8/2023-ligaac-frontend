import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlHasError } from 'src/app/common/form-helper';
import { ApplianceCategory } from 'src/app/models/appliance-category.model';

@Component({
  selector: 'app-appliance-shared',
  templateUrl: './appliance-shared.component.html',
  styleUrls: ['./appliance-shared.component.scss']
})
export class ApplianceSharedComponent {
  @Input() form!: FormGroup;
  @Input() applianceCategories: Array<ApplianceCategory> = [];

  public formControlHasError = FormControlHasError;

  get name(): FormControl<string> {
    return this.form.get('name') as FormControl<string>;
  }

  get consumptionWh(): FormControl<number> {
    return this.form.get('consumptionWh') as FormControl<number>;
  }

  get count(): FormControl<number> {
    return this.form.get('count') as FormControl<number>;
  }

  get applianceCategoryId(): FormControl<number> {
    return this.form.get('applianceCategoryId') as FormControl<number>;
  }

  get active(): FormControl<boolean> {
    return this.form.get('active') as FormControl<boolean>;
  }
}