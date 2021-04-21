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
  header: string[] = ['name', 'price', 'quantity'];

  itemz: CartItem[] = [
    { id: 34, category: 'a Cat', description: '222', name: ' ee', price: 34, quantity: 2 },
    { id: 34, category: 'a Cat', description: '222', name: ' aa', price: 34, quantity: 2 },
  ];

  constructor(private shoppingCartService: ShoppingCartService, private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.items = this.shoppingCartService.getItems();
  }
  columnNames = ['name', 'price', 'quantity'];
  checkout(): void {
    const order: Order = {
      customer: 'doej',
      products: this.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    this.shoppingCartService.createOrder(order).subscribe({
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
