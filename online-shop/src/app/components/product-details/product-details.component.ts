import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { headers } from '../../mockup/headers';
import { products } from '../../mockup/products';
import { Product } from '../../interfaces/productInterface';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  headers = headers;
  id: number = -1;
  deleted: boolean = false;
  errorMessage: string = '';
  product: Product = { id: -1, category: '', name: '', price: -1, description: '' };

  constructor(
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.http.get<Product>('http://localhost:3000/products/' + this.id).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        this.errorMessage = this.errorHandlerService.handleError(error);
      }
    );
  }

  addToCart(product: Product): void {
    this.shoppingCartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  delete(id: number): void {
    this.http.delete('http://localhost:3000/products/' + id).subscribe(
      () => {
        this.deleted = true;
      },
      (error) => {
        this.errorMessage = this.errorHandlerService.handleError(error);
      }
    );
  }
}
