import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { headers } from '../../mockup/headers';
import { products } from '../../mockup/products';
import { Product } from '../../interfaces/productInterface';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Output() productAdded = new EventEmitter();

  headers = headers;
  id!: number;
  product!: Product;
  deleted: boolean;

  constructor(
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private http: HttpClient
  ) {
    this.deleted = false;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.http.get<Product>('http://localhost:3000/products/' + this.id).subscribe((product) => {
      this.product = product;
    });
  }

  addToCart(product: Product): void {
    this.shoppingCartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  delete(id: number): void {
    this.http.delete('http://localhost:3000/products/' + id).subscribe(
      () => {
        console.log('DELETE successful');
        this.deleted = true;
      },
      (response) => {
        console.log('DELETE error', response);
      }
    );
  }
}
