import { RouterReducerState } from '@ngrx/router-store';
import { initialProductState, ProductState } from './product.state';
import { initialUserState, UserState } from './user.state';

export interface AppState {
  router?: RouterReducerState;
  product: ProductState;
  user: UserState;
}

export const initialAppState: AppState = {
  product: initialProductState,
  user: initialUserState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
