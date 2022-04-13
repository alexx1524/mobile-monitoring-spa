import { NodeEvent } from '../../../../generated-api/models/node-event';
import * as moment from 'moment';

export class NodeEventEntity implements NodeEvent {
  date?: string;
  name?: string;

  constructor(date?: string, name?: string) {
    this.date = date;
    this.name = name;
  }

  public get Date(): string {
    return moment(this.date).toDate().toLocaleString();
  }

  public get Description(): string {
    return 'Какое-то описание события';
  }
}
