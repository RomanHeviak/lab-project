import { IPeople } from './../../shared/interfaces/IPeople';
import { FriendService } from './../../shared/services/friends/friend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  searchQuery = ''
  people:IPeople[] = []
  myFriends:IPeople[] = []
  myFriendIds: number[] = []
  loading = true

  constructor(private friendService : FriendService) { }

  ngOnInit(): void {
    this.searchQuery = ''

    this.friendService.getListOfPeople()
    .subscribe(data => this.people = data)

    this.friendService.getMyFriends()
    .subscribe(friends => {
      this.myFriends = friends as IPeople[]
      this.myFriendIds = this.myFriends.map((el:IPeople) => el.id)
      this.loading = false
    })
  }

  onInput(data:string){
    if(!data.length){
      this.searchQuery = ''
    }
  }

  searchFriend(query:string){
    this.searchQuery = query
  }

  addFriend(person:IPeople){
    this.friendService.addFriend(person)
  }

  deleteFriend(id:number){
    this.myFriends = this.myFriends.filter(friend => friend.id !== id)
    this.friendService.deleteFriend(id)
  }

}
