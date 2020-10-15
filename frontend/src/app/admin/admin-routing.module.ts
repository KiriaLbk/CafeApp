import { NgModule } from '@angular/core';
import { OrderComponent } from './components/order/order.component';
import { AdminComponent } from './components/admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [AuthGuard],
    children: [
      { path: '', component: AdminComponent },
      { path: 'order', component: OrderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
export const routeComponents = [AdminComponent, OrderComponent];
