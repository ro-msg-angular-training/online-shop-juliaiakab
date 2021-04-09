import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../../products';
import { headers } from '../../headers';
import { Product } from '../../interfaces/productInterface';
import { ShoppingCartService } from '../../services/shopping-cart.service';

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

  addToCart(product: Product): void {
    this.shoppingCartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  constructor(private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.product = products.filter((product) => product.id == this.id)[0];
  }
}
