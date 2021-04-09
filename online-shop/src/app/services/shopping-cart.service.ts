import { Injectable } from '@angular/core';
import { Product } from '../interfaces/productInterface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items: Product[] = [];

  addToCart(product: Product): void {
    this.items.push(product);
  }

  getItems(): Product[] {
    return this.items;
  }
}
