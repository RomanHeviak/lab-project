import { IGames } from './../../shared/interfaces/IGames';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit , OnChanges {
  constructor(private router: Router) {}
  @Input() games:IGames[] = []
  @Output() scrollToTop = new EventEmitter<string>();
  pageSlice:IGames[] = this.games
  endIndex:number = 9

  pageSize = 9;
  pageSizeOptions: number[] = [3,6,9,12];

  libraryView = false

  onPagination(event:PageEvent){
    this.endIndex = event.pageSize
    let startIndex = event.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize
    if(endIndex > this.games.length){
      endIndex = this.games.length
    }
    this.pageSlice = this.games.slice(startIndex,endIndex)
    this.scrollToTop.emit('scroll')
  }

  ngOnChanges() {
    this.pageSlice = this.games.slice(0, this.endIndex)
  }

  ngOnInit(): void {
    if(this.router.url === '/homepage(home:library)'){
      this.libraryView = true
    }
  }
  
}
