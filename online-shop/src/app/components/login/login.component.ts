import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/interfaces/userInterface';
import { Login } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormData: FormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, public router: Router) {}
  ngOnInit(): void {}

  get username() {
    return this.loginFormData.get('username');
  }

  get password() {
    return this.loginFormData.get('password');
  }

  login() {
    var user = {} as User;
    user.username = this.loginFormData.value.username;
    user.password = this.loginFormData.value.password;
    this.store.dispatch(new Login(user));
  }
}
