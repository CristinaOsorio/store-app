import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api = `${environment.API_URL}/api`;

  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/products/${id}`);
  }

  getProductByPage(offset?: number, limit?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.api}/products`, { params });
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
