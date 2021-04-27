import { User } from 'src/app/interfaces/userInterface';

export interface UserState {
  user: User;
  isLoading: boolean;
}

export const initialUserState: UserState = {
  user: {} as User,
  isLoading: false,
};
