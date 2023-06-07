import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplianceCreateComponent } from './components/appliance-create/appliance-create.component';
import { ApplianceDetailsComponent } from './components/appliance-details/appliance-details.component';
import { AppliancesOverviewComponent } from './components/appliances-overview/appliances-overview.component';
import { HomeComponent } from './components/home/home.component';
import { ApplianceEditComponent } from './components/appliance-edit/appliance-edit.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'appliances', component: AppliancesOverviewComponent },
  { path: 'appliances/create', component: ApplianceCreateComponent },
  { path: 'appliances/:id', component: ApplianceDetailsComponent },
  { path: 'appliances/edit/:id', component: ApplianceEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }