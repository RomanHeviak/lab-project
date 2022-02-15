import { IUser } from './../../interfaces/IUser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private fbAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  getAge(): Observable<unknown> {
    const uid = JSON.parse(String(sessionStorage.getItem('currUser'))).user.uid;
    return this.db
      .list(`USERS/${uid}/age`)
      .valueChanges()
      .pipe(map((data) => data[0]));
  }

  updateUser(data: IUser) {
    let uid = JSON.parse(String(sessionStorage.getItem('currUser'))).user.uid;
    this.fbAuth.authState.subscribe((user) => {
      if (user) {
        user.updateProfile({
          displayName: data.username,
        });
      }
    });
    this.db.list(`USERS/${uid}/age`).set('age', String(data.age));
  }
}
