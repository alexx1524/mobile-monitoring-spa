import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MonitoringDataEntity } from '../../entities/monitoring-data.entity';
import { MonitoringService } from '../../../../../generated-api/services/monitoring.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, filter, interval, merge, Subject, takeUntil } from 'rxjs';
import { MonitoringDataSearchResult, MonitoringSearchCriteria } from '../../../../../generated-api/models';
import { MatCheckboxChange } from '@angular/material/checkbox';


@UntilDestroy()
@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements AfterViewInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  autoUpdate$ = new BehaviorSubject(true);

  dataSource: MonitoringDataEntity[] = [];

  displayedColumns: string[] = [
    'nodename',
    'updateddate',
  ];

  resultsLength = 0;
  isLoadingResults = true;
  selectedNode: MonitoringDataEntity | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private monitoringService: MonitoringService) { }

  ngAfterViewInit() {
    // При изменении сортировки нужно переключить пагинацию на первую станицу
    this.sort.sortChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.paginator.pageIndex = 0));

    // при изменении сортировки или страницы в пагинатор нужно запрашивать данные с сервера
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.fetchMonitoringData();
      });

    // подписка на периодическое обновление
    interval(30000)
      .pipe(filter(_ => this.autoUpdate$.value))
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
        this.fetchMonitoringData();
      });

    this.fetchMonitoringData();
  }

  private fetchMonitoringData() {
    const searchCriteria: MonitoringSearchCriteria = {
      pageNumber: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize,
      sorting: {
        fieldName: this.sort.active,
        direction: this.sort.direction === 'asc' ? 0 : 1
      }
    };

    this.isLoadingResults = true;
    this.monitoringService
      .postMonitoringSearch(searchCriteria)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: MonitoringDataSearchResult) => {

          if (response && response.items) {
            try {
              this.dataSource = response.items
                .map((rawEntity) => Object.assign(new MonitoringDataEntity(), rawEntity));
              this.resultsLength = response.totalCount ?? 0;
            } catch (e) {
              console.error(e);
            }
          }
          this.isLoadingResults = false;
        },
        (errors) => {
          console.error(errors);
          this.isLoadingResults = false;
        }
      );
  }

  public getUpdatedDate(item: MonitoringDataEntity): string {
    return moment(item.updatedDate ?? item.createdDate).toDate().toLocaleString();
  }

  public autoUpdatedChanged(event: MatCheckboxChange): void {
    this.autoUpdate$.next(event.checked);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
