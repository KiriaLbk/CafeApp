import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  orders: Array<object>;
  numberOfOrder: number;

  constructor(
    private http: Http,
  ) { }

  getOrder(): Observable<any>{
    return this.http.get('http://localhost:3000/admin/getorders').pipe(
      map(response => JSON.parse(response['_body'])),
      map((res) => {
        res.forEach(element => {
          element.order = JSON.parse(element.order);
        });
        return res;
      })
    );
  }

  saveOrders(orders): void{
    this.orders = orders;
  }

  saveNumberOfOrder(num): void{
    this.numberOfOrder = num;
  }

  getOrders(): Array<object>{
    return this.orders;
  }

  getNumberOfOrder(): number{
    return this.numberOfOrder;
  }

}
