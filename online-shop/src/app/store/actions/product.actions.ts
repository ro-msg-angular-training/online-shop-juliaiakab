import { Action } from '@ngrx/store';
import { Product } from 'src/app/interfaces/productInterface';

export enum EProductActions {
  GetAllProducts = '[Product] Get All Products',
  GetAllProductsSuccess = '[Product] Get All Products Success',
  GetProduct = '[Product] Get Product',
  GetProductSuccess = '[Product] Get Product Success',
  AddProduct = '[Product] Add Product',
  AddProductSuccess = '[Product] Add Product Success',
  EditProduct = '[Product] Edit Product',
  EditProductSuccess = '[Product] Edit Product Success',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
}

export class GetAllProducts implements Action {
  public readonly type = EProductActions.GetAllProducts;
  constructor() {}
}

export class GetAllProductsSuccess implements Action {
  public readonly type = EProductActions.GetAllProductsSuccess;
  constructor(public payload: Product[]) {}
}

export class GetProduct implements Action {
  public readonly type = EProductActions.GetProduct;
  constructor(public payload: number) {}
}

export class GetProductSuccess implements Action {
  public readonly type = EProductActions.GetProductSuccess;
  constructor(public payload: Product) {}
}

export class AddProduct implements Action {
  public readonly type = EProductActions.AddProduct;
  constructor(public payload: Product) {}
}

export class AddProductSuccess implements Action {
  public readonly type = EProductActions.AddProductSuccess;
  constructor(public payload: Product) {}
}

export class EditProduct implements Action {
  public readonly type = EProductActions.EditProduct;
  constructor(public id: number, public product: Product) {}
}

export class EditProductSuccess implements Action {
  public readonly type = EProductActions.EditProductSuccess;
  constructor(public product: Product) {}
}

export class DeleteProduct implements Action {
  public readonly type = EProductActions.DeleteProduct;
  constructor(public id: number) {}
}

export class DeleteProductSuccess implements Action {
  public readonly type = EProductActions.DeleteProductSuccess;
  constructor(public id: number) {}
}

export type ProductActions =
  | GetAllProducts
  | GetAllProductsSuccess
  | GetProduct
  | GetProductSuccess
  | AddProduct
  | AddProductSuccess
  | EditProduct
  | EditProductSuccess
  | DeleteProduct
  | DeleteProductSuccess;
