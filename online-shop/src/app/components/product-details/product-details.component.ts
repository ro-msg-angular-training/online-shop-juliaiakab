import { Component, OnInit } from '@angular/core';
import { headers } from '../../mockup/headers';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/productInterface';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductService } from 'src/app/services/product.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  headers = headers;
  id = -1;
  deleted: boolean = false;
  errorMessage: string = '';
  product = {} as Product;
  admin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private productService: ProductService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.admin = this.loginService.isAdmin();
    console.log('Admin?', this.admin);
    this.id = this.route.snapshot.params.id;
    this.productService.getProduct(this.id).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        this.errorMessage = this.errorHandlerService.handleError(error);
      }
    );
  }

  addToCart(product: Product): void {
    if (this.loginService.isCustomer()) {
      this.shoppingCartService.addToCart(product);
      window.alert('Your product has been added to the cart!');
    } else {
      window.alert('Warning! Not authorized!');
    }
  }

  edit(): void {
    this.router.navigate(['products/' + this.product.id + '/edit']);
  }

  delete(): void {
    if (this.loginService.isAdmin()) {
      this.productService.deleteProduct(this.id).subscribe(
        () => {
          this.deleted = true;
        },
        (error) => {
          this.errorMessage = this.errorHandlerService.handleError(error);
        }
      );
    } else {
      window.alert('Warning! Not authorized!');
    }
  }
}
