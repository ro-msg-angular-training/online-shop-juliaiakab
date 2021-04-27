import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../app.config';
import { User } from '../interfaces/userInterface';
import { selectUser } from '../store/selectors/user.selectors';
import { AppState } from '../store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = AppConfig.API_ENDPOINT + '/login';

  isLoggedIn: boolean = false;
  username: string = '';
  roles: string[] = [];

  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.store
      .select(selectUser)
      .subscribe(
        (user) => (
          (this.username = user.username), (this.roles = user.roles), (this.isLoggedIn = user.username ? true : false)
        )
      );
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user).pipe(
      tap((data) => {
        this.isLoggedIn = true;
        this.username = user.username;
        this.roles = data.roles;
      }),
      catchError((err) => {
        this.isLoggedIn = false;
        console.log('Login error. Wrong credentials.');
        return throwError(err);
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  isAdmin(): boolean {
    return this.roles.includes('admin');
  }

  isCustomer(): boolean {
    return this.roles.includes('customer');
  }

  getRoles(): string[] {
    return this.roles;
  }
}
