import { Component, Input, OnInit } from '@angular/core';
import { DBChatServiceService } from '../dbchat-service.service';

@Component({
  selector: 'app-add-bot',
  templateUrl: './add-bot.component.html',
  styleUrls: ['./add-bot.component.css']
})
export class AddBotComponent implements OnInit {

  constructor(private chatService: DBChatServiceService) { } 

  ngOnInit(): void {
  }

  botCase:string;
  botName:string;
  botResponse:string;

  submitAdd(){
    this.chatService.addBot(this.botName,this.botCase,this.botResponse);
  }
}
