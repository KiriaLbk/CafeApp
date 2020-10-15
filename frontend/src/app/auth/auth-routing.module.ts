import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegComponent } from './components/reg/reg.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'reg', component: RegComponent },
      { path: 'auth', component: AuthComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
export const routingComponents = [HomeComponent, RegComponent, AuthComponent];
