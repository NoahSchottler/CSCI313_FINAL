import { Component, OnInit } from '@angular/core';
import { DBChatServiceService } from '../dbchat-service.service';
import { message } from '../message';
export type EditorType = 'displayLogin' | 'displayChat' ;


@Component({
  selector: 'app-main-chat-window',
  templateUrl: './main-chat-window.component.html',
  styleUrls: ['./main-chat-window.component.css']
})
export class MainChatWindowComponent implements OnInit {
  editor: EditorType = 'displayLogin'; // defaults to show the login screen.

  arr: message[] = [];
  inputName: string;

  constructor(private chatService: DBChatServiceService) { }

  ngOnInit( ) {this.chatService.getMessages().subscribe(
    (mess: message[]) => {
      this.arr = mess;
    }
  );
  }
  delete(){
    this.chatService.deleteAll();
  }

  sendMessage(inputMessageTB: string){
    const currentDate: number = Date.now();
    this.chatService.addMessageToDB(currentDate,this.inputName,inputMessageTB);
    }


  selectUserName(userNameInput: string){
    if (userNameInput.length > 0){
    this.inputName=userNameInput;
    this.toggleEditor("displayChat");
  }else{
      alert("Please enter a non blank username.")
      }
    }
  logout(){
    this.toggleEditor("displayLogin");
    this.inputName="";
  }

  toggleEditor(type: EditorType) { // this is what we use to send in a message to change from login screen to chat screen or vice versa
    this.editor = type;
  }

  get displayLoginEditor() {
    return this.editor === 'displayLogin';
  }

  get displayChat() {
    return this.editor === 'displayChat';
  }


}
