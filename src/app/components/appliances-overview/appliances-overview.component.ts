import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { combineLatest, filter, first } from 'rxjs';
import { ApplianceCategory } from 'src/app/models/appliance-category.model';
import { Appliance } from 'src/app/models/appliance.model';
import { ApplianceCategoryService } from 'src/app/services/appliance-category.service';
import { ApplianceService } from 'src/app/services/appliances.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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

  hiddenColumnsMobile = ['id', 'applianceCategory', 'active'];
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
    private route: ActivatedRoute, 
    private breakpointObserver: BreakpointObserver) { }
  ngOnInit(): void {
    this.getAppliances(10, 0, null, null);
    this.breakpointObserver
    .observe([Breakpoints.XSmall])
    .pipe(first())
    .subscribe(result => {
      this.columns = result.matches ? this.columns.filter(c => !this.hiddenColumnsMobile.includes(c)) :
      this.columns;
    });
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

  onDelete(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this appliance?')){
        this.applianceService
        .deleteAppliance(id)
        .pipe(first())
        .subscribe(() => {
          alert('Appliance succesfully deleted!');
          this.getAppliances(
            this.paginator.pageSize,
            this.paginator.pageIndex * this.paginator.pageSize,
            this.sort.active,
            this.sort.direction
          );
        })
    }
  }
  sortData(event: Sort) {
    this.getAppliances(this.paginator.pageSize, 0, event.active, event.direction);
    this.paginator.firstPage();
  }
}