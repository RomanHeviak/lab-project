import { map } from 'rxjs/operators';
import { IGames } from './../../interfaces/IGames';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  allGames:IGames[] = []
  allGenres:string[] = []

  getGames(){
    let arr = []
    for(let i = 0; i < 100000; i++){
      let item = {
        id:i+1,
        title: `Game Title ${i+1}`,
        price: i+50,
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
        genre: i % 2 === 0 ? 'action' : 'race'
      }
      if(!this.allGenres.includes(item.genre)){
        this.allGenres.push(item.genre)
      }
      arr.push(item)
    }
    this.allGames = arr
    return arr
  }

  // getListOfGames(){
  //   return this.http.get('https://store.steampowered.com/api/appdetails?appids=10')
  // }

  addToLibrary(game:IGames){
    let uid = JSON.parse(String(sessionStorage.getItem('currUser'))).user.uid
    this.db.list(`USERS/${uid}/library`).set(String(game.id),game)
  }

  getMyGames(){
    let uid = JSON.parse(String(sessionStorage.getItem('currUser'))).user.uid
    return  this.db.list(`USERS/${uid}/library`).valueChanges()
  }

  getMyGamesIds(){
    let uid = JSON.parse(String(sessionStorage.getItem('currUser'))).user.uid
    return  this.db.list(`USERS/${uid}/library`).valueChanges()
    .pipe(
      map((data:any) => data.map((el:IGames) => el.id))
    )
  }

  getMaxPrice(arr:IGames[]){
    return String(Math.max(...arr.map(el => el.price)))
  }

  getMinPrice(arr:IGames[]){
    return String(Math.min(...arr.map(el => el.price)))
  }
}


// let arr = [
//   { title: `Fortnite`,
//   price: 500,
//   desc: `Lorem ipsum dolor sit amet, 
//   consectetur adipisicing elit. Exercitationem animi 
//   sed aut explicabo quis totam, aliquam eligendi molestiae.`,
//   img:'https://cdn2.unrealengine.com/7up-v2-3840x2160-e11fc91a84d6.jpg',
//   genre:'action'
// },
// { title: `GTA V`,
// price: 1500,
// desc: `Lorem ipsum dolor sit amet, 
// consectetur adipisicing elit. Exercitationem animi 
// sed aut explicabo quis totam, aliquam eligendi molestiae.`,
// img:'https://www.overclockers.ua/news/games/129692-grand-theft-auto-v-1.jpg',
// genre:'race'
// },
// { title: `Counter-Strike Global Offience`,
// price: 500,
// desc: `Lorem ipsum dolor sit amet, 
// consectetur adipisicing elit. Exercitationem animi 
// sed aut explicabo quis totam, aliquam eligendi molestiae.`,
// img:'https://sm.ign.com/ign_ru/screenshot/default/1counter-strike-global-offensive_373t.jpg',
// genre:'arcade'
// },
// { title: `PUBG`,
// price: 500,
// desc: `Lorem ipsum dolor sit amet, 
// consectetur adipisicing elit. Exercitationem animi 
// sed aut explicabo quis totam, aliquam eligendi molestiae.`,
// img:'https://ixbt.online/live/images/original/15/09/22/2020/08/29/48a9f04534.jpg',
// genre:'arcade'
// }
// ]