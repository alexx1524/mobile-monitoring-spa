import {AfterViewInit, Component, Input} from '@angular/core';
import {MonitoringDataEntity} from '../../entities/monitoring-data.entity';
import * as moment from 'moment';
import { NodeEventEntity } from '../../entities/node-event.entity';
import { NodeEventService } from '../../../../../generated-api/services/node-event.service';
import { NodeEvent } from '../../../../../generated-api/models/node-event';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-nodeevents',
  templateUrl: './nodeevents.component.html',
  styleUrls: ['./nodeevents.component.scss']
})
export class NodeeventsComponent {
  dataSource: NodeEventEntity[] = [];
  node: MonitoringDataEntity | null = null;

  displayedColumns: string[] = [
    'date',
    'name',
    'description',
  ];

  @Input() set setNode(node: MonitoringDataEntity | null) {
    this.node = node;

    if (!this.node) {
      this.dataSource = [];
    } else if (this.node.id) {
      this.fetchNodeEvents(this.node.id);
    }
  }

  constructor(private eventsService: NodeEventService) {
  }

  public getUpdatedDate(item: NodeEventEntity): string {
    return moment(item.date).toDate().toLocaleString();
  }

  public getDescription(name: string): string {
    return 'Какое-то описание события';
  }

  private fetchNodeEvents(nodeId: string): NodeEventEntity[] {
    this.eventsService.getEventBynodeNodeId(nodeId)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: NodeEvent[]) => {
          this.dataSource = [];
          if (response && response.length) {
            this.dataSource = response.map((rawEntity) => Object.assign(new NodeEventEntity(), rawEntity));
          }
        },
        (errors) => {
          console.error(errors);
        }
      );
    return [];
  }
}
