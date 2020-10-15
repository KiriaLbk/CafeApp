import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot
  , RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MainComponent } from '../../dashboard/components/main/main.component';
import { AdminComponent } from '../../admin/components/admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanDeactivate<AdminComponent>, CanActivate, CanDeactivate<MainComponent>, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = state.url;
    return this.checkLogin(url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }
  canDeactivate(
    component: MainComponent | AdminComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.deactivateUser();
  }

  deactivateUser(): boolean{
    if (confirm('Вы уверены, что хотите выйти?')){
      this.authService.logOut();
      this.authService.deleteLastUrl();
      return true;
    }
    else{
      return false;
    }
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()){
      if (this.authService.compareRoles(url)) {
        this.authService.setLastUrl(url);
        return true;
      }
    }
    this.router.navigate([`/`]);
    return false;
  }
}
