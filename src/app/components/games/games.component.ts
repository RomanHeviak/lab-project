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
  searchQuery:string = ''
  priceQuery:string = ''
  filteredGames:IGames[] = []

  ngOnInit(): void {
    this.games = this.gamesService.getGames()
    
    // this.gamesService.getListOfGames()
    // .subscribe(data => console.log(data))
  }

  onScroll(event:string){
    this.scroll.nativeElement.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }

  searchGame(query: string){
    this.searchQuery = query
    this.filteredGames = this.games.filter(el => el.title.toLocaleLowerCase().includes(query) || el.desc.includes(query));
  }

  onFilter(filter:string){
    this.priceQuery = filter
    this.filteredGames = this.games.filter(el => Number(el.price) <= Number(filter));
  }

  onInput(query: string){
    if(!query.length){
      this.searchQuery = ''
      this.filteredGames = this.games
    }
  }
  
}
