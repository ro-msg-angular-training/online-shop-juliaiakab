import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UserState } from '../state/user.state';

const selectUserData = (state: AppState) => state.user;

export const selectUser = createSelector(selectUserData, (state: UserState) => state.user);

export const selectIsLoading = createSelector(selectUserData, (state: UserState) => state.isLoading);
