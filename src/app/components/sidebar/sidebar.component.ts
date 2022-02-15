import { GamesService } from './../../shared/services/games/games.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private gamesService: GamesService) { }
  maxPrice = ''
  priceFilter = ''

  @Output() priceQuery = new EventEmitter<string>()

  ngOnInit(): void {
    this.maxPrice = this.gamesService.getMaxPrice()
  }

  filterPrice(price:string){
    this.priceFilter = price
    this.priceQuery.emit(this.priceFilter)
  }

}
