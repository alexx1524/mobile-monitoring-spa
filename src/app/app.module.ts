import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { ApiModule } from '../generated-api/api.module';
import { GetConfigApiService } from './system/get-config-api.service';
import { ApiConfiguration } from '../generated-api/api-configuration';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MonitoringModule,
    ApiModule.forRoot({ rootUrl: 'https://localhost:7184' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
