import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Observable, of, from } from 'rxjs';
import { Http, Headers, Jsonp } from '@angular/http';
import { IUser } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string;


  constructor(private http: Http) {}

  regUser(url: string, user: IUser): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(url, user, { headers: headers })
      .pipe(map((response: any) => response.json()));
  }

  authUser(url: string, user: IUser): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, user, { headers: headers }).pipe(
      tap((date) => this.setCurrentUser(date)),
      map((response: any) => response.json())
    );
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('User'));
  }

  setCurrentUser(date: any): void {
    localStorage.setItem('User', JSON.parse(JSON.stringify(date))._body);
  }

  getTokenDecode(token: string): string {
    return jwt_decode(token);
  }

  getRoleFromToken(): string {
    return jwt_decode(JSON.parse(localStorage.getItem('User')).token).role;
  }

  isLoggedIn(): boolean {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      if (currentUser.token) {
        const token = this.getTokenDecode(currentUser.token);
        const currentTime = Math.round(new Date().getDate() / 1000);
        if (token['exp'] > currentTime) {
          return true;
        } else {
          this.logOut();
        }
      }
    }
    return false;
  }

  compareRoles(url: string): boolean{
    return url.split('').splice(1, ).join('').includes(this.getRoleFromToken());
  }

  deleteLastUrl(): void{
    localStorage.removeItem('last');
  }

  setLastUrl(last: string): void{
    localStorage.setItem('last', last);
  }
  getLastUrl(): string{
    return localStorage.getItem('last');
  }

  logOut(): void {
    localStorage.removeItem('User');
  }
}
