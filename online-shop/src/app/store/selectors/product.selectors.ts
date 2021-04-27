import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ProductState } from '../state/product.state';

const selectProductData = (state: AppState) => state.product;

export const selectProductList = createSelector(selectProductData, (state: ProductState) => state.products);

export const selectProduct = createSelector(selectProductData, (state: ProductState) => state.product);

export const selectIsLoading = createSelector(selectProductData, (state: ProductState) => state.isLoading);
