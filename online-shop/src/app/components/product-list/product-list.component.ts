import { Component, OnInit } from '@angular/core';
import { headers } from '../../mockup/headers';
import { LoginService } from 'src/app/services/login.service';
import { AppState } from 'src/app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectIsLoading, selectProductList } from 'src/app/store/selectors/product.selectors';
import { GetAllProducts } from 'src/app/store/actions/product.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any;
  isLoading: boolean = false;
  headers = headers;
  admin: boolean = false;

  constructor(private loginService: LoginService, private store: Store<AppState>) {}

  ngOnInit() {
    this.products = this.store.pipe(take(1), select(selectProductList));
    this.store.pipe(select(selectIsLoading)).subscribe((isLoading) => (this.isLoading = isLoading));
    this.admin = this.loginService.isAdmin();
    this.store.dispatch(new GetAllProducts());
  }
}
