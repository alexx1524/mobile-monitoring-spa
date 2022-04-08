import { Component, OnInit } from '@angular/core';
import { MonitoringDataEntity } from '../../entities/monitoring-data.entity';
import { MonitoringService } from '../../../../../generated-api/services/monitoring.service';
import { MonitoringData } from '../../../../../generated-api/models/monitoring-data';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import * as moment from 'moment';

@UntilDestroy()
@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  dataSource: MonitoringDataEntity[] = [];

  displayedColumns: string[] = [
    'nodeName',
    'updatedDate',
    'clientVersion',
    'os'
  ];

  constructor(private monitoringService: MonitoringService) { }

  ngOnInit(): void {
    this.fetchMonitoringData();
  }

  private fetchMonitoringData() {
    this.monitoringService
      .getMonitoringList()
      .pipe(untilDestroyed(this))
      .subscribe(
        (data: MonitoringData[]) => {
          try {
            if (data && data.length) {
              this.dataSource = data.map((rawEntity) => Object.assign(new MonitoringDataEntity(), rawEntity));
            }
          } catch (e) {
            console.error(e);
          }
        });
  }

  public getUpdatedDate(item: MonitoringDataEntity): string {
    return moment(item.updatedDate ?? item.createdDate).toDate().toLocaleString();
  }
}
