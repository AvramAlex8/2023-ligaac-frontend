import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApplianceCreateComponent } from './components/appliance-create/appliance-create.component';
import { ApplianceDetailsComponent } from './components/appliance-details/appliance-details.component';
import { ApplianceSharedComponent } from './components/appliance-shared/appliance-shared.component';
import { AppliancesOverviewComponent } from './components/appliances-overview/appliances-overview.component';
import { HomeComponent } from './components/home/home.component';
import { SecurityInterceptor } from './interceptors/security.interceptor';
import { ApplianceEditComponent } from './components/appliance-edit/appliance-edit.component';
const MaterialModules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatOptionModule,
  MatSelectModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppliancesOverviewComponent,
    ApplianceDetailsComponent,
    ApplianceSharedComponent,
    ApplianceCreateComponent,
    ApplianceEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }