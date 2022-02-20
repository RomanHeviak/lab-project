import { GamesService } from './../../shared/services/games/games.service';
import { IGames } from './../../shared/interfaces/IGames';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() libraryView = false
  @Input() game:IGames = {
    id:0,
    title:'',
    price:0,
    desc:''
  }
  @Output() addedGameId = new EventEmitter<number>()
  
  constructor(private gameService: GamesService) { }

  addToLibrary(game:IGames){
    this.gameService.addToLibrary(game)
    this.addedGameId.emit(game.id)
  }

}
