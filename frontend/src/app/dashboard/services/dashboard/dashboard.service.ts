import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { MenuService } from '../menu/menu.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: Http,
    private menuService: MenuService
  ) { }

  getCanteens(): Observable<any>{
    return this.http.get('http://localhost:3000/account/canteen').pipe(
      map(response => JSON.parse(response['_body']))
    );
  }

  getMenu(): Observable<any>{
    return this.http.get('http://localhost:3000/account/menuone').pipe(
      map(response => JSON.parse(response['_body'])),
      map(item => {
        let list = [];
        let arr = [];
        let arrlist = {};
        item.forEach((element, index) => {
          if (element.category){
            if (index !== 0) {
              arrlist['dishes'] = arr;
              list.push(arrlist);
              arrlist = {};
            }
            arr = [];
            arrlist['category'] = element.category;
          }
          else {
            arr.push(element);
          }
        });
        arrlist['dishes'] = arr;
        list.push(arrlist);
        console.log(list);
        return list;
      })
      );
  }

  postRequest(url, dish): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url,
    dish,
    {headers: (headers)}).pipe(map((response: any) => response.json()));
  }

  setCanteen(canteen): void{
    localStorage.setItem('canteen', canteen);
  }

  postRequestDishes(url, dish): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url,
    dish,
    {headers: (headers)})
    .pipe(
      map((response: any) => response.json()),
      map(it => it.sort((a, b) => {
        return a.canteen.localeCompare(b.canteen);
      })),
      map(item => {
        let list = [];
        let arr = [];
        let group = [];
        let arrlist = {};
        item.forEach((element, index) => {
          if (!group.includes(element.canteen)){
            if (index !== 0) {
              arrlist['dishes'] = arr;
              list.push(arrlist);
              arrlist = {};
            }
            arr = [];
            arrlist['canteen'] = element.canteen;
            arr.push(element);
            group.push(element.canteen);
          }
          else {
            arr.push(element);
          }
        });
        arrlist['dishes'] = arr;
        list.push(arrlist);
        this.menuService.setPriceDishes(list);
        return list;
      })
      );
  }
}
