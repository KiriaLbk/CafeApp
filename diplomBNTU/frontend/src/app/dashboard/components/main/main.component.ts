import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Observable} from 'rxjs';
import { ICanteen } from '../../models/canteen';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  canteens: Observable<ICanteen>;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.canteens = this.dashboardService.getCanteens();
  }

  nextMenu(canteen): void{
    const name = canteen.target.parentNode.children[0].innerHTML;
    this.dashboardService.setCanteen(name);
    this.router.navigate(['/account/menu']);
  }

}
