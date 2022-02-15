import { UserService } from './../../shared/services/user/user.service';
import { IUser } from './../../shared/interfaces/IUser';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private fbAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  user: IUser = { email: '', uid: '' };

  editing = false;
  loading = true

  ngOnInit(): void {
   let sesionUser = JSON.parse(String(sessionStorage.getItem('currUser'))).user

   this.user.username = sesionUser.displayName
   this.user.email = sesionUser.email
    
    this.userService.getAge()
    .subscribe(data => {
      this.user.age = data
      this.loading = false
    })
  }

  updateUser(username: string, email: string, age: string) {
    this.editing = false;
    let data = {
      username: username,
      email: email,
      age: age,
      uid: String(this.user.uid),
    };
    if (this.user.username !== username || (age.length && this.user.age !== age)) {
      this.userService.updateUser(data);
    }
  }

  editUser() {
    this.editing = true;
  }
}
