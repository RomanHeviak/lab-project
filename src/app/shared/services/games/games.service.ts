import { FirebaseService } from './../../../firebase/firebase.service';
import { UserService } from './../user/user.service';
import { map } from 'rxjs/operators';
import { IGames } from './../../interfaces/IGames';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private db: AngularFireDatabase, private userService: UserService,private fbService: FirebaseService) {}

  UID = this.userService.getUID();
  allGenres: string[] = ['Indie','Action','Adventure'];

  getGames() {
    let res = []
    for (let i = 0; i < 10000; i++) {
      let item = {
        id: i + 1,
        title: `Game Title ${i + 1}`,
        price: Math.floor(Math.random() * 10000)+ 1,
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
        genre: this.allGenres[Math.floor(Math.random() * 3)]
      };
      res.push(item);
    }
    return res;
  }

  addToLibrary(game: IGames) {
    this.fbService.addTo(this.UID,game,'library')
  }

  getMyGames(): Observable<unknown[]> {
    return this.fbService.getDataFromDB(this.UID,'library')
  }

  getMyGamesIds(): Observable<number[]> {
    return this.fbService.getDataFromDB(this.UID,'library')
    .pipe(map((data: any) => data.map((el: IGames) => el.id)));
  }

  getMaxPrice(arr: IGames[]) {
    return Math.max(...arr.map((el) => el.price));
  }

  getMinPrice(arr: IGames[]) {
    return Math.min(...arr.map((el) => el.price));
  }
}
