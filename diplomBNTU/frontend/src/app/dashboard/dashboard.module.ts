import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule, routingsComponents } from './dashboard-routing.module';

// Services

import { DashboardService } from './services/dashboard/dashboard.service';




@NgModule({
  declarations: [
    routingsComponents
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
