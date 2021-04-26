import { EProductActions, ProductActions } from '../actions/product.actions';
import { initialProductState, ProductState } from '../state/product.state';

export const productReducer = (state = initialProductState, action: ProductActions): ProductState => {
  switch (action.type) {
    case EProductActions.GetAllProducts: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EProductActions.GetAllProductsSuccess: {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    }

    case EProductActions.GetProduct: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EProductActions.GetProductSuccess: {
      return {
        ...state,
        product: action.payload,
        isLoading: false,
      };
    }

    case EProductActions.AddProduct: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EProductActions.AddProductSuccess: {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }

    case EProductActions.EditProduct: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EProductActions.EditProductSuccess: {
      return {
        ...state,
        isLoading: false,
        product: action.product,
        products: [...state.products.filter((product) => product.id !== action.product.id), action.product],
      };
    }

    case EProductActions.DeleteProductSuccess: {
      return {
        ...state,
        isLoading: false,
        products: state.products.filter((products) => products.id !== action.id),
      };
    }

    default:
      return state;
  }
};
