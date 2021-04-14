import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cartItemInterface';
import { Product } from '../interfaces/productInterface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items: CartItem[] = [];

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
}
