import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  username: string = '';
  roles: string[] = [];
  redirectUrl: string = '';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', user).pipe(
      tap((data) => {
        this.isLoggedIn = true;
        this.username = user.username;
        this.roles = data.roles;
        console.log('Roles: ' + this.roles);
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

  getRoles(): string[] {
    return this.roles;
  }

  isAdmin(): boolean {
    return this.roles.includes('admin');
  }

  isCustomer(): boolean {
    return this.roles.includes('customer');
  }
}
