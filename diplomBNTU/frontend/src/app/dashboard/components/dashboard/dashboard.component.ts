import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MenuService } from '../../services/menu/menu.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { IMenu } from '../../models/menu';
import { IOrder } from '../../../admin/models/order';
import { Observable } from 'rxjs';
import {formatDate, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  condition: boolean;
  menu: Array<object>;
  dish: Observable<IMenu>;
  now = Date.now();
  price: string;

  constructor(
    private dashboardService: DashboardService,
    private menuService: MenuService
    ) { }

  ngOnInit(): void {
    const user: IMenu = {
      user: JSON.parse(localStorage.getItem('User')).user.login
    };
    this.dashboardService.postRequestDishes('http://localhost:3000/account/dish', user).subscribe((data) => this.getData(data));
  }

  getData(menu): void{
    (menu.length !== 0) ? this.menu = menu : this.menu = [{dishes: []}];
    console.log(this.menu);
    this.menu[0]['dishes'].length !== 0 ? this.condition = true : this.condition = false;
    this.price = this.menuService.getPriceDishes();
  }

  deleteDish(dish): void {
    const item: IMenu = {
      dish: dish.target.parentNode.parentNode.children[0].innerHTML.trim(),
      weight: dish.target.parentNode.parentNode.children[1].innerHTML.trim(),
      price: dish.target.parentNode.parentNode.children[2].children[0].innerHTML.trim(),
      canteen: localStorage.getItem('canteen'),
      user: JSON.parse(localStorage.getItem('User')).user.login
    };
    this.dashboardService.postRequest('http://localhost:3000/account/main/deletedishes', item).subscribe(data => {
      if (data.success){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Блюдо удалено из заказа',
          showConfirmButton: false,
          timer: 700
        });
        this.dashboardService.postRequestDishes('http://localhost:3000/account/dish'
        , {user: item.user}).subscribe((date) => this.getData(date));
      }
    });
  }

  addOrder(): void{
      registerLocaleData(localeRu, 'ru');
      const order: IOrder = {
      time: formatDate(this.now , 'dd-MM-yyyy, h:mm:ss', 'ru'),
      order: JSON.stringify(this.menu),
      user: JSON.parse(localStorage.getItem('User')).user.login,
      canteen: localStorage.getItem('canteen'),
      email: JSON.parse(localStorage.getItem('User')).user.email,
      sum: this.price
      };
      this.dashboardService.postRequest('http://localhost:3000/dashboard/order', order).subscribe(data => {
        if (data.success){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Заказ оформлен',
            showConfirmButton: false,
            timer: 1500
         });
        }
      });
      this.getData([]);
  }

}
