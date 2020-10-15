import { map } from 'rxjs/operators';
import { Http, Headers, Jsonp } from '@angular/http';
import {Observable, of, from} from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginService {

  constructor(
    private http: Http
  ) { }

  checkLogin(url: string, user: IUser): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url,
    user,
    {headers: (headers)}).pipe(
      map((response: any) => response.json())
      );
  }

}
