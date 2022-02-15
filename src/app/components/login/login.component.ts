import { LoginService } from '../../shared/services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  valid = this.loginService.validationData;

  loginData = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    if (sessionStorage.getItem('currUser')) {
      this.router.navigateByUrl('/homepage');
    }
  }

  signIn(event: Event) {
    event.preventDefault();
    this.valid.errMessage = '';
    if (this.loginData.valid) {
      this.loginService.logIn(this.loginData);
    } else {
      this.valid.errMessage = 'Please enter email and password!';
    }
    this.loginData.reset();
  }
}
