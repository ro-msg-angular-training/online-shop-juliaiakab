import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { productReducer } from './product.reducers';
import { userReducer } from './user.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  product: productReducer,
  user: userReducer,
};
