import { Product } from './../models/product.models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _shoppingCart: Product[] = [];

  constructor() {}

  addProduct(product: Product): void {
    this._shoppingCart.push(product);
  }

  get shoppingCart(): Product[] {
    return this._shoppingCart;
  }

  getTotal(): number {
    return this._shoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
