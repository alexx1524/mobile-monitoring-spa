import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './pages/monitoring/monitoring.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    MonitoringComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class MonitoringModule { }
