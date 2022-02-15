import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  validationData = {
    errMessage:''
  }

  constructor(private router:Router, private fbAuth: AngularFireAuth) { }

  async logIn(loginData:FormGroup){
    try {
      const result = await this.fbAuth.signInWithEmailAndPassword(loginData.value.email, loginData.value.password);
      this.router.navigateByUrl('/homepage(home:games)');
      sessionStorage.setItem('currUser',JSON.stringify(result))
    } catch (err:any) {
      this.validationData.errMessage = err.message
      this.router.navigate(['/']);
    }
  }

  async logOut(){
    sessionStorage.clear()
    await this.fbAuth.signOut();
    this.router.navigate(['/']);
  }


}
