import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models';

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
    return this.http.get<Product>(`${this.api}/products/${id}`);
  }

  create(product: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(`${this.api}/products`, product);
  }

  update(id: number, product: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${this.api}/products/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/products/${id}`);
  }
}
