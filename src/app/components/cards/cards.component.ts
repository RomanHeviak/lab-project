import { GamesService } from './../../shared/services/games/games.service';
import { IGames } from './../../shared/interfaces/IGames';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  constructor(private router: Router,private gamesService: GamesService) {}
  @Input() games:IGames[] = []
  @Input() searchQuery:string = ''
  @Input() priceQuery:string = ''

  libraryView = false

  ngOnInit(): void {
    if(this.router.url === '/homepage(home:library)'){
      this.libraryView = true
    }
    this.priceQuery = this.gamesService.getMaxPrice()
  }
}
