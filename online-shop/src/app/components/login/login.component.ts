import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  redirectUrl: string = '';

  loginFormData: FormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  get username() {
    return this.loginFormData.get('username');
  }

  get password() {
    return this.loginFormData.get('password');
  }

  login() {
    var user = <User>{};
    user.username = this.loginFormData.value.username;
    user.password = this.loginFormData.value.password;
    this.loginService.login(user).subscribe(
      () => {
        window.alert('Login successful');
        this.router.navigate(['/']);
      },
      () => {
        window.alert('Warning! Wrong credentials.');
      }
    );
  }
}
