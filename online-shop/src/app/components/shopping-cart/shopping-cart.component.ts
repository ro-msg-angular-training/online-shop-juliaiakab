import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cartItemInterface';
import { Order } from 'src/app/interfaces/orderInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  items: CartItem[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.items = this.shoppingCartService.getItems();
  }

  checkout(): void {
    const order: Order = {
      customer: 'doej',
      products: this.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    this.http.post('http://localhost:3000/orders', order, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage = 'Your order has been placed successfully!';
        this.shoppingCartService.dropCart();
        this.items = [];
      },
      error: (error) => {
        this.errorMessage = this.errorHandlerService.handleError(error);
      },
    });
  }
}
