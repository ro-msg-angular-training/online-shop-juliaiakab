import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cartItemInterface';
import { Product } from '../interfaces/productInterface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items: any[] = [];

  addToCart(product: Product): void {
    /*const itemAlreadyInCart = this.items.find((item) => item.id == product.id);
    if (itemAlreadyInCart) {
      itemAlreadyInCart.quantity++;
      console.log('Already in cart: ', itemAlreadyInCart.name, itemAlreadyInCart.quantity);
    } else {
      this.items.push({ ...product, quantity: 1 });
      console.log('Item just added to cart', this.items[-1].name, this.items[-1].quantity);
    }*/
    this.items.push(product);
  }

  getItems(): Product[] {
    return this.items;
  }
}
