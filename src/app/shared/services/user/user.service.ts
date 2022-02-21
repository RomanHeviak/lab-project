import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/firebase/firebase.service';

export interface UserEditData {
  username:string,
  age:string
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private fbAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private fbService: FirebaseService
  ) {}


  getUID() {
    let uid = JSON.parse(String(sessionStorage.getItem('currUser'))).user.uid
    if(uid){
      return uid
    }else {
      return ''
    }
  }

  getAge(): Observable<unknown> {
    return this.fbService.getDataFromDB(this.getUID(),'age')
    .pipe(map((data) => data[0]));
  }

  updateUser(data: UserEditData) {
    this.fbAuth.authState.subscribe((user) => {
      if (user) {
        user.updateProfile({
          displayName: data.username,
        });
      }
    });
    this.db.list(`USERS/${this.getUID()}/age`).set('age', data.age);
  }
}
