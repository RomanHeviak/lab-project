import { map } from 'rxjs/operators';
import { IGames } from './../../interfaces/IGames';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private db: AngularFireDatabase) {}

  UID = '';
  allGames: IGames[] = [];
  allGenres: string[] = ['Indie','Action','Adventure'];

  getGames() {
    this.UID = JSON.parse(String(sessionStorage.getItem('currUser'))).user.uid;
    let arr = [];
    for (let i = 0; i < 10000; i++) {
      let item = {
        id: i + 1,
        title: `Game Title ${i + 1}`,
        price: Math.floor(Math.random() * 10000),
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
        genre: this.allGenres[Math.floor(Math.random() * 3)]
      };
      //case if i have API to collect all available genres
      // if (!this.allGenres.includes(item.genre)) {
      //   this.allGenres.push(item.genre);
      // }
      arr.push(item);
    }
    this.allGames = arr;
    return arr;
  }

  addToLibrary(game: IGames) {
    this.db.list(`USERS/${this.UID}/library`).set(String(game.id), game);
  }

  getMyGames(): Observable<unknown[]> {
    return this.db.list(`USERS/${this.UID}/library`).valueChanges();
  }

  getMyGamesIds(): Observable<number[]> {
    let uid = JSON.parse(String(sessionStorage.getItem('currUser'))).user.uid;
    return this.db
      .list(`USERS/${uid}/library`)
      .valueChanges()
      .pipe(map((data: any) => data.map((el: IGames) => el.id)));
  }

  getMaxPrice(arr: IGames[]) {
    return String(Math.max(...arr.map((el) => el.price)));
  }

  getMinPrice(arr: IGames[]) {
    return String(Math.min(...arr.map((el) => el.price)));
  }
}
