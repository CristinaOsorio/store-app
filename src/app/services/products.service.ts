import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError, zip } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api = `${environment.API_URL}/api`;

  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.api}/products`)
      .pipe(
        map((products) =>
          products.map((item) => ({ ...item, taxes: 0.16 * item.price }))
        )
      );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no ha sido encontrado.');
        }
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Error en el servidor.');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No autorizado.');
        }
        return throwError('Ups...');
      })
    );
  }

  readAndUpdate(id: number, title: string) {
    this.getProduct(id)
      .pipe(
        switchMap((product) =>
          this.update(product.id, {
            title,
          })
        )
      )
      .subscribe((data) => console.log(data));

    zip(this.getProduct(id), this.update(id, { title })).subscribe(
      (response) => {
        const [read, updated] = response;
        console.log(read, updated);
      }
    );
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
