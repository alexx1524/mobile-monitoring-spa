import { NodeEvent } from '../../../../generated-api/models/node-event';

export class NodeEventEntity implements NodeEvent {
  date?: string;
  name?: string;
}
