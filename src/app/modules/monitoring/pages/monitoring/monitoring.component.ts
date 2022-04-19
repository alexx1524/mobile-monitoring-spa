import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MonitoringDataEntity } from '../../entities/monitoring-data.entity';
import { MonitoringService } from '../../../../../generated-api/services/monitoring.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MonitoringData } from '../../../../../generated-api/models';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { HubConnection } from '@microsoft/signalr';


@UntilDestroy()
@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements AfterViewInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  autoUpdate$ = new BehaviorSubject(true);
  dataSource = new MatTableDataSource<MonitoringDataEntity>();
  signalrConnection: HubConnection | undefined;

  displayedColumns: string[] = [
    'nodename',
    'updateddate',
  ];

  resultsLength = 0;
  isLoadingResults = true;
  selectedNode: MonitoringDataEntity | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private monitoringService: MonitoringService) {
  }

  ngAfterViewInit() {
    this.fetchMonitoringData();
    this.CreateSignalrConnection();
  }

  private fetchMonitoringData() {
    this.isLoadingResults = true;
    this.monitoringService
      .getMonitoringList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (items: MonitoringData[]) => {
          this.dataSource = new MatTableDataSource<MonitoringDataEntity>(items
            .map((rawEntity) => Object.assign(new MonitoringDataEntity(), rawEntity)));

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
    this.signalrConnection?.stop().then(() => {
      // eslint-disable-next-line no-console
      console.info('SignalR connection is stopped');
    });
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private CreateSignalrConnection(): void {
    this.signalrConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + 'monitoring-data')
      .build();

    this.signalrConnection.start().then(function () {
      // eslint-disable-next-line no-console
      console.info('SignalR connected successfully');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    this.signalrConnection.on('onNewMonitoringDataAdded', (data: MonitoringData) => {
      const entity = { ...data } as MonitoringDataEntity;
      this.dataSource.data.push(entity);
      this.dataSource.data = [...this.dataSource.data];
    });
  }
}
