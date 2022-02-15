import { IGames } from './../../shared/interfaces/IGames';
import { GamesService } from './../../shared/services/games/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(private gamesService:GamesService) { }

  games:IGames[] = []
  searchQuery:string = ''
  priceQuery:string = ''

  ngOnInit(): void {
    this.games = this.gamesService.getGames()
    
    // this.gamesService.getListOfGames()
    // .subscribe(data => console.log(data))
  }

  searchGame(query: string){
    this.searchQuery = query
  }

  onFilter(filter:string){
    this.priceQuery = filter
  }

  onInput(query: string){
    if(!query.length){
      this.searchQuery = ''
    }
  }

  
  
}
