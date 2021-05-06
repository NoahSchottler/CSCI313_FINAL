import { Component, Input, OnInit } from '@angular/core';
import { DBChatServiceService } from '../dbchat-service.service';
import { Bot } from '../bot';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-bot',
  templateUrl: './add-bot.component.html',
  styleUrls: ['./add-bot.component.css']
})
export class AddBotComponent implements OnInit {

  constructor(private chatService: DBChatServiceService) { } 

  ngOnInit(): void {
    this.fetchData();
  }

  botCase:string;
  botName:string;
  botResponse:string;
  bots: Bot[] = [];

  fetchData(){
    this.chatService.getBots().subscribe(data =>{
      this.bots = data;
    })
    this.chatService.bots =this.bots;
  }

  submitAdd(){
    const newBot: Bot = {
      botName: this.botName,
      botCase: this.botCase,
      botResponse: this.botResponse
    }
    for(let i = 0; i<this.bots.length;i++) {
      if(newBot.botName = this.bots[i].botName)
      return;
    }
    this.chatService.addBot(newBot).subscribe(data => {
      console.log(data);
      this.fetchData();
    })
  }
}
