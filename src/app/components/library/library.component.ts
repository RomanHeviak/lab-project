import { IGames } from './../../shared/interfaces/IGames';
import { GamesService } from './../../shared/services/games/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(private gamesService:GamesService) { }

  games:IGames[] = []
  loading = true

  ngOnInit(): void {
     this.gamesService.getMyGames()
     .subscribe(data => {
       this.games = data as IGames[]
       this.loading = false
     })
  }

}
