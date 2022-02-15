import { IGames } from './../../shared/interfaces/IGames';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() libraryView = false
  @Input() game:IGames = {
    title:'',
    price:0,
    desc:''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
