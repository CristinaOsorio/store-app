import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _shoppingCart: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  constructor() {}

  addProduct(product: Product): void {
    this._shoppingCart.push(product);
    this.cart.next(this.shoppingCart);
  }

  get shoppingCart(): Product[] {
    return this._shoppingCart;
  }

  getTotal(): number {
    return this._shoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
