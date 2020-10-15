import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: object;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.order = this.adminService.getOrders()[this.adminService.getNumberOfOrder()];
  }

}
