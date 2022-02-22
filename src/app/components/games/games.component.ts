import { IGames } from './../../shared/interfaces/IGames';
import { GamesService } from './../../shared/services/games/games.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(private gamesService:GamesService) { }

  @ViewChild('scroll')
  scroll!: ElementRef;

  games:IGames[] = []
  myGamesIds:number[] = []
  searchQuery:string = ''
  genresQuery:string = ''
  priceQuery:string = ''
  loading = true


  ngOnInit(): void {
    this.games = this.gamesService.getGames()
    
    this.gamesService.getMyGamesIds()
    .subscribe(data => {
      this.myGamesIds = data
      this.games = this.games.filter(el => !this.myGamesIds.includes(el.id))
      this.loading = false
    })
  }

  onScroll(event:string){
    this.scroll.nativeElement.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }

  searchGame(query: string){
    this.searchQuery = query
  }

  onPriceFilter(filter:string){
    this.priceQuery = filter
  }

  onGenresFilter(filter:string[]){
    this.genresQuery = filter.join(' ')
  }

  onInput(query: string){
    if(!query.length){
      this.searchQuery = ''
    }
  }
  
}
