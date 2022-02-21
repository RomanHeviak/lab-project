import { UserService } from './../user/user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { IPeople } from './../../interfaces/IPeople';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/firebase/firebase.service';

export interface Person {
  id: number;
  url: string;
  name: string;
  country: Object;
  birthday: string;
  deathday?: string | number;
  gender: string;
  image: Object;
  updated: number;
  _links: Object;
  map(arg0: (el: Person) => { id: number; name: string }): any;
}

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private userService: UserService,
    private fbService: FirebaseService
  ) {}

  UID = this.userService.getUID();

  getListOfPeople(): Observable<IPeople[]> {
    return this.http
      .get<Person>('https://api.tvmaze.com/people')
      .pipe(
        map((data: Person) =>
          data.map((el: Person) => ({ id: el.id, name: el.name }))
        )
      );
  }

  addFriend(person: IPeople) {
    this.fbService.addTo(this.UID, person, 'friends');
  }

  getMyFriends(): Observable<unknown[]> {
    return this.fbService.getDataFromDB(this.UID, 'friends');
  }

  deleteFriend(id: number) {
    this.db.list(`USERS/${this.UID}/friends`).remove(String(id));
  }
}
