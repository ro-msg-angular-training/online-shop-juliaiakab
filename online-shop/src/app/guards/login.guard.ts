import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  user = <User>{};
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isUserLoggedIn()) {
      const userRole = this.loginService.getRoles();
      if (route.data.role && userRole.indexOf(route.data.role) === -1) {
        window.alert('Warning! Not authorized!');
        //this.router.navigate(['login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['login']);
    window.alert('You need to log in first.');
    return false;
  }
}
