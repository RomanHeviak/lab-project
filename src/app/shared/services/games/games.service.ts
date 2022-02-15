import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames(){
    return [
      {
        title: 'Game Title 1',
        price: 200,
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
      },{
        title: 'Game Title 2',
        price: 400,
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
      },{
        title: 'Game Title 3',
        price: 600,
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
      },{
        title: 'Game Title 4',
        price: 800,
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
      },{
        title: 'Game Title 5',
        price: 1200,
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
      },{
        title: 'Game Title 6',
        price: 2200,
        desc: `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. Exercitationem animi 
        sed aut explicabo quis totam, aliquam eligendi molestiae.`,
      },
    ];
  }

  getListOfGames(){
    return this.http.get('https://store.steampowered.com/api/appdetails?appids=10')
  }

  getMaxPrice(){
    return String(Math.max(...this.getGames().map(el => el.price)))
  }
}
