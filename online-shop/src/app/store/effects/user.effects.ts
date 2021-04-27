import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { EUserActions, Login, LoginSuccess } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  login = createEffect(() =>
    this.actions.pipe(
      ofType<Login>(EUserActions.Login),
      switchMap((action) => this.loginService.login(action.payload).pipe(map(() => new LoginSuccess(action.payload))))
    )
  );

  loginSuccess = createEffect(
    () =>
      this.actions.pipe(
        ofType<LoginSuccess>(EUserActions.LoginSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  constructor(private actions: Actions, private loginService: LoginService, private router: Router) {}
}
