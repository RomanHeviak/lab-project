import { IGames } from './../../shared/interfaces/IGames';
import { GamesService } from './../../shared/services/games/games.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private gamesService: GamesService) { }
  maxPrice = ''
  minPrice = ''
  priceFilter = ''

  genresFilter:string[] = []

  allGenres = this.gamesService.allGenres

  @Input() minMaxPrice:string[] = []
  @Output() genresQuery = new EventEmitter<string[]>()
  @Output() priceQuery = new EventEmitter<string>()

  ngOnInit(): void {
    this.minPrice = this.minMaxPrice[0]
    this.maxPrice = this.minMaxPrice[1]
  }

  filterPrice(price:string){
    this.priceFilter = price
    this.priceQuery.emit(this.priceFilter)
  }

  onCheckBox(event:string){
    if(this.genresFilter.includes(event)){
      this.genresFilter = this.genresFilter.filter(el => el !== event)
    }else{
      this.genresFilter.push(event)
    }
    this.genresQuery.emit(this.genresFilter)
  }

}
