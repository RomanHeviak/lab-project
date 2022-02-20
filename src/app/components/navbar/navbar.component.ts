import { LoginService } from '../../shared/services/login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private loginService: LoginService) { }


  logOut(){
    this.loginService.logOut()
    window.location.reload()
  }

}
