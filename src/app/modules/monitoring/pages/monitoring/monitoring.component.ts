import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MonitoringDataEntity } from '../../entities/monitoring-data.entity';
import { MonitoringService } from '../../../../../generated-api/services/monitoring.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { MonitoringDataSearchResult, MonitoringSearchCriteria } from '../../../../../generated-api/models';

@UntilDestroy()
@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements AfterViewInit {
  dataSource: MonitoringDataEntity[] = [];

  displayedColumns: string[] = [
    'NodeName',
    'UpdatedDate',
    'Version',
    'OperatingSystem'
  ];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private monitoringService: MonitoringService) { }

  ngAfterViewInit() {
    // При изменении сортировки нужно переключить пагинацию на первую станицу
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // при изменении сортировки или страницы в пагинатор нужно запрашивать данные с сервера
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.fetchMonitoringData();
    });

    this.fetchMonitoringData();
  }

  private fetchMonitoringData() {
    const searchCriteria: MonitoringSearchCriteria = {
      pageNumber: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize,
      sorting: {
        fieldName: this.sort.active.replace(/^\w/, (c) => c.toUpperCase()),
        direction: this.sort.direction === 'asc' ? 0 : 1
      }
    };

    this.isLoadingResults = true;
    this.monitoringService
      .postMonitoringSearch(searchCriteria)
      .pipe(untilDestroyed(this))
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
}
