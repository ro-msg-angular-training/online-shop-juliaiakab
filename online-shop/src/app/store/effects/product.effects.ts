import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/productInterface';
import { ProductService } from 'src/app/services/product.service';
import {
  AddProduct,
  AddProductSuccess,
  DeleteProduct,
  DeleteProductSuccess,
  EditProduct,
  EditProductSuccess,
  EProductActions,
  GetAllProducts,
  GetAllProductsSuccess,
  GetProduct,
  GetProductSuccess,
} from '../actions/product.actions';

@Injectable()
export class ProductEffects {
  getProducts = createEffect(() =>
    this.actions.pipe(
      ofType<GetAllProducts>(EProductActions.GetAllProducts),
      switchMap(() => this.productService.getAllProducts()),
      switchMap((products: Product[]) => of(new GetAllProductsSuccess(products)))
    )
  );

  getProduct = createEffect(() =>
    this.actions.pipe(
      ofType<GetProduct>(EProductActions.GetProduct),
      map((action) => action.payload),
      switchMap((payload) =>
        this.productService.getProduct(payload).pipe(map((product) => new GetProductSuccess(product)))
      )
    )
  );

  addProduct = createEffect(() =>
    this.actions.pipe(
      ofType<AddProduct>(EProductActions.AddProduct),
      switchMap((action) =>
        this.productService.createProduct(action.payload).pipe(map(() => new AddProductSuccess(action.payload)))
      )
    )
  );

  addProductSuccess = createEffect(
    () =>
      this.actions.pipe(
        ofType<AddProductSuccess>(EProductActions.AddProductSuccess),
        tap(() => this.router.navigate(['products']))
      ),
    { dispatch: false }
  );

  editProduct = createEffect(() =>
    this.actions.pipe(
      ofType<EditProduct>(EProductActions.EditProduct),
      switchMap((action) =>
        this.productService
          .editProduct(action.id, action.product)
          .pipe(map(() => new EditProductSuccess(action.product)))
      )
    )
  );

  editProductSuccess = createEffect(
    () =>
      this.actions.pipe(
        ofType<EditProductSuccess>(EProductActions.EditProductSuccess),
        tap((product) => this.router.navigate(['products/' + product.product.id]))
      ),
    { dispatch: false }
  );

  deleteProduct = createEffect(() =>
    this.actions.pipe(
      ofType<DeleteProduct>(EProductActions.DeleteProduct),
      switchMap((action) =>
        this.productService.deleteProduct(action.id).pipe(map(() => new DeleteProductSuccess(action.id)))
      )
    )
  );

  deleteProductSuccess = createEffect(
    () =>
      this.actions.pipe(
        ofType<DeleteProductSuccess>(EProductActions.DeleteProductSuccess),
        tap((product) => this.router.navigate(['products/' + product.id]))
      ),
    { dispatch: false }
  );

  constructor(private actions: Actions, private productService: ProductService, private router: Router) {}
}
