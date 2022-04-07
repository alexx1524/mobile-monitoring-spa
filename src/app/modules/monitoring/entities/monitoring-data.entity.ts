import { MonitoringData } from "src/generated-api/models";

export class MonitoringDataEntity implements MonitoringData {
  createdDate?: string;
  id?: string;
  nodeName?: string;
  operatingSystem?: string;
  updatedDate?: string;
  version?: string;
}
