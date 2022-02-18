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
  genresQuery:string[] = []
  priceQuery:string = ''
  filteredGames:IGames[] = []
  minMaxPrice:string[] = []
  loading = true


  ngOnInit(): void {
    this.games = this.gamesService.getGames()
    
    this.gamesService.getMyGamesIds()
    .subscribe(data => {
      this.myGamesIds = data
      this.games = this.games.filter(el => !this.myGamesIds.includes(el.id))
      this.filteredGames = this.games
      this.minMaxPrice.push(this.gamesService.getMinPrice(this.games))
      this.minMaxPrice.push(this.gamesService.getMaxPrice(this.games))
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
    let res = this.games.filter(el => el.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || el.desc.includes(query));
    this.filteredGames = res.length ? res : []
  }

  onPriceFilter(filter:string){
    this.priceQuery = filter
    let res =  this.games.filter(el => Number(el.price) <= Number(filter));
    if(this.genresQuery.length){
      res = res.filter(el => this.genresQuery.includes(String(el.genre)))
    }
    this.filteredGames = res.length ? res : []
  }

  onGenresFilter(filter:string[]){
    this.genresQuery = filter
    let res = this.games.filter(el => filter.includes(String(el.genre)))
    if(!this.genresQuery.length){
      res = this.games
    }
    if(this.priceQuery){
      res = res.filter(el => Number(el.price) <= Number(this.priceQuery));
    }
    this.filteredGames = res
  }

  onInput(query: string){
    if(!query.length){
      this.searchQuery = ''
      if(this.genresQuery.length || this.priceQuery){
        this.onGenresFilter(this.genresQuery)
        this.onPriceFilter(this.priceQuery)
      }else {
        this.filteredGames = this.games
      }
    }
  }
  
}
