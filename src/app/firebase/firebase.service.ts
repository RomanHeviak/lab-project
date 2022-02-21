import { IPeople } from './../shared/interfaces/IPeople';
import { IGames } from './../shared/interfaces/IGames';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  getDataFromDB(uid:string, query:string){
    return this.db.list(`USERS/${uid}/${query}`).valueChanges();
  }

  addTo(uid:String, item:IGames | IPeople, query:string){
    this.db.list(`USERS/${uid}/${query}`).set(String(item.id), item);
  }
}
