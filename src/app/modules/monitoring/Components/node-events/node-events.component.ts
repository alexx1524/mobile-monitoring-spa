import { Component, Input} from '@angular/core';
import { MonitoringDataEntity } from '../../entities/monitoring-data.entity';
import * as moment from 'moment';
import { NodeEventEntity } from '../../entities/node-event.entity';
import { NodeEventService } from '../../../../../generated-api/services/node-event.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-node-events',
  templateUrl: './node-events.component.html',
  styleUrls: ['./node-events.component.scss']
})
export class NodeEventsComponent {
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
      .pipe(
        map((value) => value.map((rawEntity) => Object.assign(new NodeEventEntity(), rawEntity)))
      )
      .subscribe(response => {
          this.dataSource = response;
        },
        errors => {
          console.error(errors);
        }
      );
    return [];
  }
}
