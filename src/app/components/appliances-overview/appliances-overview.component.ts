import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { combineLatest, filter } from 'rxjs';
import { ApplianceCategory } from 'src/app/models/appliance-category.model';
import { Appliance } from 'src/app/models/appliance.model';
import { ApplianceCategoryService } from 'src/app/services/appliance-category.service';
import { ApplianceService } from 'src/app/services/appliances.service';
@Component({
  selector: 'app-appliances-overview',
  templateUrl: './appliances-overview.component.html',
  styleUrls: ['./appliances-overview.component.scss']
})
export class AppliancesOverviewComponent implements OnInit, AfterViewInit{
  columns: string[] = [
    'id',
    'name',
    'consumptionWh',
    'applianceCategory',
    'active',
    'count',
    'actions',
  ];
  dataSource = new MatTableDataSource<Appliance>();
  appliances: Appliance[] = [];
  appliancesCount: number = 0;
  sortField: string | undefined;
  sortDir: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private applianceService: ApplianceService,
    private applianceCategoryService: ApplianceCategoryService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getAppliances(10, 0, null, null);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getAppliances(pageSize: number, offset: number, sortField: string | null, sortDir: string | null): void {
    combineLatest([
      this.applianceService.getAppliances(offset, pageSize, sortField, sortDir),
      this.applianceCategoryService.getApplianceCategories()
    ]).pipe(
      filter((r) => !!r[0] && !!r[1])
    ).subscribe(
      ([appliancesResult, applianceCategories]) => {
        this.appliancesCount = appliancesResult.totalCount;
        this.matchApplianceCategory(appliancesResult.appliances, applianceCategories);
        this.appliances = appliancesResult.appliances;
        this.dataSource.data = this.appliances;
      }
    )
  }
  private matchApplianceCategory(
    appliances: Appliance[],
    applianceCategories: ApplianceCategory[]
  ){
    appliances.forEach( (appliance) =>{
      const applianceCategory = applianceCategories.find(
        (ac) => ac.id == appliance.applianceCategoryId
      )
      appliance.applianceCategory = applianceCategory;
    })
  }
  onNavigateToDetails(row: Appliance): void{
    this.router.navigate([row.id], { relativeTo: this.route });
  }

  onNavigateToEdit(element: Appliance): void {
    const route = `edit/${element.id}`;
    this.router.navigate([route], {relativeTo: this.route});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.appliances = this.dataSource.filteredData;
  }

  onPageChanged(event: PageEvent): void{
    this.getAppliances(event.pageSize, event.pageIndex * event.pageSize, this.sort.active, this.sort.direction);
  }
  sortData(event: Sort) {
    this.getAppliances(this.paginator.pageSize, 0, event.active, event.direction);
    this.paginator.firstPage();
  }
}