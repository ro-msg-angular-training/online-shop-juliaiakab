import { Component, OnInit } from '@angular/core';
import { headers } from '../../mockup/headers';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/productInterface';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { LoginService } from 'src/app/services/login.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { DeleteProduct, GetProduct } from 'src/app/store/actions/product.actions';
import { selectIsLoading, selectProduct } from 'src/app/store/selectors/product.selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  headers = headers;
  id = -1;
  isLoading: boolean = false;
  deleted: boolean = false;
  errorMessage: string = '';
  product = {} as Product;
  admin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>
  ) {
    this.store.select(selectProduct).subscribe((product) => (this.product = product));
  }

  ngOnInit(): void {
    this.admin = this.loginService.isAdmin();
    this.id = this.route.snapshot.params.id;
    this.store.pipe(select(selectIsLoading)).subscribe((isLoading) => (this.isLoading = isLoading));
    this.store.dispatch(new GetProduct(this.id));
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
    this.router.navigate(['products/' + this.id + '/edit']);
  }

  delete(): void {
    if (this.loginService.isAdmin()) {
      this.store.dispatch(new DeleteProduct(this.id));
    } else {
      window.alert('Warning! Not authorized!');
    }
  }
}
