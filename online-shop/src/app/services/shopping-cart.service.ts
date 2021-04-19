import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { CartItem } from '../interfaces/cartItemInterface';
import { Order } from '../interfaces/orderInterface';
import { Product } from '../interfaces/productInterface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items: CartItem[] = [];
  private orderUrl = AppConfig.API_ENDPOINT + '/cart';
  private cartUrl = AppConfig.API_ENDPOINT + '/orders';

  constructor(private http: HttpClient) {}

  addToCart(product: Product): void {
    const itemAlreadyInCart = this.items.find((item) => item.id == product.id);
    if (itemAlreadyInCart) {
      itemAlreadyInCart.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  dropCart(): void {
    this.items = [];
  }

  createOrder(order: Order): Observable<string> {
    return this.http.post(this.orderUrl, order, { responseType: 'text' });
  }
}
