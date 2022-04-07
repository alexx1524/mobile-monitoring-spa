import { Component, OnInit } from '@angular/core';
import { MonitoringDataEntity } from '../../entities/monitoring-data.entity';
import { MonitoringService } from '../../../../../generated-api/services/monitoring.service';
import { MonitoringData } from '../../../../../generated-api/models/monitoring-data';
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

  constructor(private monitoringService : MonitoringService) { }

  ngOnInit(): void {
    this.monitoringService
      .getMonitoringList()
      .subscribe(
        (data: MonitoringData[]) => {
          try {
            if (data && data.length) {
              this.dataSource = data.map((rawEntity) => Object.assign(new MonitoringDataEntity(), rawEntity));
            }
          }
          catch (e) {
            console.error(e)
          }
    });
  }

}
