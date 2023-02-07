import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api = 'https://young-sands-07814.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/product/${id}`);
  }
}
