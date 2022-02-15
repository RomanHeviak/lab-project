import { AuthGuard } from './shared/services/guard/auth.guard';
import { FriendsComponent } from './components/friends/friends.component';
import { LibraryComponent } from './components/library/library.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'homepage', component:HomepageComponent,canActivate:[AuthGuard]},
  {path:'games', component:GamesComponent , outlet:"home"},
  {path:'library', component:LibraryComponent , outlet:"home"},
  {path:'friends', component:FriendsComponent , outlet:"home"},
  {path:'profile', component:ProfileComponent , outlet:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
