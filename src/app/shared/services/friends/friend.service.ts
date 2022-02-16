import { AngularFireDatabase } from '@angular/fire/database';
import { IPeople } from './../../interfaces/IPeople';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  UID = '';

  getListOfPeople(): Observable<IPeople[]> {
    this.UID = JSON.parse(String(sessionStorage.getItem('currUser'))).user.uid;
    return this.http
      .get<Person>('https://api.tvmaze.com/people')
      .pipe(
        map((data: Person) =>
          data.map((el: Person) => ({ id: el.id, name: el.name }))
        )
      );
  }

  addFriend(person: IPeople) {
    this.db.list(`USERS/${this.UID}/friends`).set(String(person.id), person);
  }

  getMyFriends(): Observable<unknown[]> {
    return this.db.list<IPeople[]>(`USERS/${this.UID}/friends`).valueChanges();
  }

  deleteFriend(id: number) {
    this.db.list(`USERS/${this.UID}/friends`).remove(String(id));
  }
}
