import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { Product } from '../interfaces/productInterface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = AppConfig.API_ENDPOINT + '/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + '/' + id);
  }

  createProduct(product: Product): Observable<string> {
    return this.http.post(this.productsUrl, product, { responseType: 'text' });
  }

  editProduct(id: number, product: Product): Observable<string> {
    return this.http.put(this.productsUrl + '/' + id, product, { responseType: 'text' });
  }

  deleteProduct(id: number): Observable<{}> {
    return this.http.delete(this.productsUrl + '/' + id);
  }
}
