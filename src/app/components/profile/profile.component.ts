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
    this.fbAuth.authState.subscribe((user) => {
      if (user) {
        this.user.email =  String(user.email)
        this.user.uid = user.uid
        this.user.username = String(user.displayName ?? '')
      }
    });
    
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
      this.user.username = username
    }
  }

  editUser() {
    this.editing = true;
  }
}
