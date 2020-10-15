import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { IMenu } from '../../models/menu';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: Observable<IMenu>;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.menu = this.dashboardService.getMenu();
  }

  addToDashboard(date): void{
    const dish: IMenu = {
      dish: date.target.parentNode.parentNode.children[0].innerHTML.trim(),
      weight: date.target.parentNode.parentNode.children[1].innerHTML.trim(),
      price: date.target.parentNode.parentNode.children[2].children[0].innerHTML.trim(),
      canteen: localStorage.getItem('canteen'),
      user: JSON.parse(localStorage.getItem('User')).user.login
    };
    this.dashboardService.postRequest('http://localhost:3000/account/menu/dishes', dish).subscribe(data => {
      if (data.success){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Блюдо добавлено',
          showConfirmButton: false,
          timer: 700
        });
      }
    });
  }

}
