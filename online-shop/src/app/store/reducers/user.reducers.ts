import { EUserActions, UserActions } from '../actions/user.actions';
import { initialUserState, UserState } from '../state/user.state';

export const userReducer = (state = initialUserState, action: UserActions): UserState => {
  switch (action.type) {
    case EUserActions.Login: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EUserActions.Login: {
      return {
        isLoading: false,
        user: action.payload,
      };
    }

    default:
      return state;
  }
};
