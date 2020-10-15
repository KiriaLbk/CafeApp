import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../auth/guard/auth.guard';

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [AuthGuard],
    children: [
      { path: '', component: MainComponent},
      { path: 'menu', component: MenuComponent},
      { path: 'dashboard', component: DashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
export const routingsComponents = [DashboardComponent, MainComponent, MenuComponent];
