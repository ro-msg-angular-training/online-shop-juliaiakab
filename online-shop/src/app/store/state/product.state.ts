import { Product } from 'src/app/interfaces/productInterface';

export interface ProductState {
  products: Product[];
  product: Product;
  isLoading: boolean;
}

export const initialProductState: ProductState = {
  product: {} as Product,
  products: [],
  isLoading: false,
};
