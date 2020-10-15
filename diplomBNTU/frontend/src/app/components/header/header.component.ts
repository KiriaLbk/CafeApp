import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  conditionDash: boolean;
  conditionAuth: boolean;
  conditionLogOut: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('dashboard')) {
          this.conditionLogOut = true;
          this.conditionAuth = false;
          this.conditionDash = false;
        } else if (event.url.includes('account')) {
          this.conditionAuth = false;
          this.conditionLogOut = true;
          this.conditionDash = true;
        } else if (event.url.includes('admin')) {
          this.conditionLogOut = true;
          this.conditionAuth = false;
          this.conditionDash = false;
        } else {
          this.conditionAuth = true;
          this.conditionLogOut = false;
          this.conditionDash = false;
        }
      }
    });
  }

  loginOut(): void{
    this.router.navigate(['/']);
  }

}
