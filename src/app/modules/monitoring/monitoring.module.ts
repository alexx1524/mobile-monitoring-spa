import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './pages/monitoring/monitoring.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    MonitoringComponent
  ],
    imports: [
        CommonModule,
        MonitoringRoutingModule,
        MatTableModule
    ]
})
export class MonitoringModule { }
