import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames(){
    let arr = []
//     let arr = [
//       { title: `Fortnite`,
//       price: 500,
//       desc: `Lorem ipsum dolor sit amet, 
//       consectetur adipisicing elit. Exercitationem animi 
//       sed aut explicabo quis totam, aliquam eligendi molestiae.`,
//       img:'https://cdn2.unrealengine.com/7up-v2-3840x2160-e11fc91a84d6.jpg'
//     },
//     { title: `GTA V`,
//     price: 1500,
//     desc: `Lorem ipsum dolor sit amet, 
//     consectetur adipisicing elit. Exercitationem animi 
//     sed aut explicabo quis totam, aliquam eligendi molestiae.`,
//     img:'https://www.overclockers.ua/news/games/129692-grand-theft-auto-v-1.jpg'
//   },
//   { title: `Counter-Strike Global Offience`,
//   price: 500,
//   desc: `Lorem ipsum dolor sit amet, 
//   consectetur adipisicing elit. Exercitationem animi 
//   sed aut explicabo quis totam, aliquam eligendi molestiae.`,
//   img:'https://sm.ign.com/ign_ru/screenshot/default/1counter-strike-global-offensive_373t.jpg'
// },
// { title: `PUBG`,
// price: 500,
// desc: `Lorem ipsum dolor sit amet, 
// consectetur adipisicing elit. Exercitationem animi 
// sed aut explicabo quis totam, aliquam eligendi molestiae.`,
// img:'https://ixbt.online/live/images/original/15/09/22/2020/08/29/48a9f04534.jpg'
// }
    // ]
    for(let i = 0; i < 100; i++){
      arr.push( {
        title: `Game Title ${i+1}`,
        price: i+50,
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
        img: i%2 === 0 ? 'https://cdn2.unrealengine.com/7up-v2-3840x2160-e11fc91a84d6.jpg' : 'https://escorenews.com/media/news/n25015.jpeg'
      })
    }
    return arr
  }

  getListOfGames(){
    return this.http.get('https://store.steampowered.com/api/appdetails?appids=10')
  }

  getMaxPrice(){
    return String(Math.max(...this.getGames().map(el => el.price)))
  }

  getMinPrice(){
    return String(Math.min(...this.getGames().map(el => el.price)))
  }
}
