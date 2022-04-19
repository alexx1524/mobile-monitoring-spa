import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { MonitoringDataEntity } from '../../entities/monitoring-data.entity';
import { NodeEventEntity } from '../../entities/node-event.entity';
import { NodeEventService } from '../../../../../generated-api/services/node-event.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {map, switchMap} from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject, empty, filter, interval, Observable, Subject, takeUntil} from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-node-events',
  templateUrl: './node-events.component.html',
  styleUrls: ['./node-events.component.scss']
})
export class NodeEventsComponent implements  AfterViewInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  autoUpdate$ = new BehaviorSubject(true);
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
      this.fetchNodeEvents()
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.dataSource = value;
        },
        errors => {
          console.error(errors);
        });
    }
  }

  constructor(private eventsService: NodeEventService) {
  }

  ngAfterViewInit() {
    // подписка на периодическое обновление
    interval(2000)
      .pipe(filter(_ => this.autoUpdate$.value))
      .pipe(filter(_ => this.node?.id !== null))
      .pipe(switchMap(_ => this.fetchNodeEvents()))
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
          this.dataSource = value;
        },
        errors => {
          console.error(errors);
        });
  }

  public autoUpdatedChanged(event: MatCheckboxChange): void {
    this.autoUpdate$.next(event.checked);
  }

  private fetchNodeEvents(): Observable<NodeEventEntity[]> {
    if (!this.node?.id) {
      return empty();
    }
    return this.eventsService.getEventBynodeNodeId(this.node?.id ?? '')
        .pipe(untilDestroyed(this))
        .pipe(map((value) =>
          value.map<NodeEventEntity>((rawEntity) => new NodeEventEntity(rawEntity.date, rawEntity.name))));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
