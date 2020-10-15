import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule, routeComponents } from './admin-routing.module';
import { AdminService } from './services/admin/admin.service';



@NgModule({
  declarations: [
    routeComponents
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
