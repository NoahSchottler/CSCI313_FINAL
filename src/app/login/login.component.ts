import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersservice: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  login(name: string, pass: string){
    if(this.usersservice.setLoggedIn({username: name, password: pass})){
      this.router.navigate([`/chat`]);
    }
    else{
      alert("Your username/password were not recognized.");
    }

  }

}
