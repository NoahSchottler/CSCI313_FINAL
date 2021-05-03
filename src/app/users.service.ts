import { Injectable } from '@angular/core';
import { User } from  './User';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  USERS: User[] = [
    {username: 'nschottler',password:'112291'}
  ];
  loggedInUsername: string = "";

  getUsers(): User[] {
    return this.USERS;
  }

  addUser(user: User){
    this.USERS.push(user);
  }

  setLoggedIn(user: User): boolean{
    this.USERS.forEach((element, index) => {
      if(user.username == element.username && user.password == element.password){
        this.loggedInUsername = element.username;
        return true;
      }
    });
    if(this.loggedInUsername == ""){
      console.log("User was not found with the input credentials.");
      return false;
    }
    return false;
  }

  deleteUser(user: User){
    this.USERS.forEach((element, index) => {
      if(user.username == element.username && user.password == element.password){
        this.USERS.splice(index,1);
      }
    });
  }


}
