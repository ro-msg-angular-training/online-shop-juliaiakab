import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cartItemInterface';
import { Product } from 'src/app/interfaces/productInterface';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(private shoppingCartService: ShoppingCartService, private http: HttpClient) {}
  items: Product[] = [];

  ngOnInit(): void {
    this.items = this.shoppingCartService.getItems();
  }

  private httpOptions = {
    headers: new HttpHeaders({
      //'Content-Type': 'application/json',
      responseType: 'text',
    }),
  };

  checkout(): void {
    const order = {
      customer: 'doej',
      products: this.items.map((product) => ({
        productId: product.id,
        quantity: 1,
      })),
    };
    console.log('Order: ' + JSON.stringify(order));
    this.http.post('http://localhost:3000/orders', order, this.httpOptions).subscribe({
      next: (data) => {
        console.log('In success: ' + data);
      },
      error: (error) => {
        console.error('There was an error!', error, error.message);
      },
    });

    /*.subscribe(
      () => {
        console.log('POST successful');
      },
      (response) => {
        console.log(response);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );*/
  }
}
