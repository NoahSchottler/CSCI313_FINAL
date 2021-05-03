import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { UsersService} from '../users.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private usersservice: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser(name: string, pass: string, pass_confirm: string){
    if(pass == pass_confirm){
      this.usersservice.addUser({username: name, password: pass});
      alert("Account created successfully.");
      this.router.navigate([`/login`]);
    }
    else{
      alert("Your input passwords did not match. Please double check spelling and try again.");
    }
  }

}
