import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AdminService } from '../../services/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  order: Array<object>;
  condition: boolean;

  constructor(
     private adminService: AdminService,
     private router: Router
  ) { }

  ngOnInit(): void {
    this.adminService.getOrder().subscribe((data) => this.getDate(data));
  }

  getDate(orders): void{
    (orders === {}) ? this.condition = true : this.order = orders;
  }

  goToOrder(order): void{
    this.adminService.saveNumberOfOrder($(order.target).index());
    this.adminService.saveOrders(this.order);
    this.router.navigate(['admin/order']);
  }

}
