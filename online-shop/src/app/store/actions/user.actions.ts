import { Action } from '@ngrx/store';
import { User } from 'src/app/interfaces/userInterface';

export enum EUserActions {
  Login = '[User] Login',
  LoginSuccess = '[User] Login Success',
}

export class Login implements Action {
  public readonly type = EUserActions.Login;
  constructor(public payload: User) {}
}

export class LoginSuccess implements Action {
  public readonly type = EUserActions.LoginSuccess;
  constructor(public payload: User) {}
}

export type UserActions = Login | LoginSuccess;
