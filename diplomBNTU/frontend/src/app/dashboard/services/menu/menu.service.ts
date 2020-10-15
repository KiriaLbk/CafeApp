import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  price: string;

  constructor() { }

  setPriceDishes(date): void{
    const res = date.reduce((summa, element) => summa + element.dishes.reduce((sum, current) => sum +
    (+current.price.match(/[0-9]+/g)[0] * 100 + +current.price.match(/[0-9]+/g)[1]), 0), 0);
    const penny = res % 100;
    const ruble = Math.trunc(res / 100);
    const result = `${ruble}р. ${penny}коп.`;
    this.price = result;
  }

  getPriceDishes(): string{
    return this.price;
  }

}
