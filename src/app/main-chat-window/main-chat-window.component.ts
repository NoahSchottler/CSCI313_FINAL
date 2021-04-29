import { Component, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { DBChatServiceService } from '../dbchat-service.service';
import { message } from '../message';
export type EditorType = 'displayLogin' | 'displayChat' ;


@Component({
  selector: 'app-main-chat-window',
  templateUrl: './main-chat-window.component.html',
  styleUrls: ['./main-chat-window.component.css']
})
export class MainChatWindowComponent implements OnInit {
  
  constructor(private chatService: DBChatServiceService) { }

  editor: EditorType = 'displayLogin'; // defaults to show the login screen.
  @ViewChild('messageInput') inputMessageTB; // accessing the reference element

  arr: message[] = [];
  inputName: string;

  showAddBot = false;

  ngOnInit( ) {this.chatService.getMessages().subscribe(
    (mess: message[]) => {
      this.arr = mess;
    }
  );

  }
  delete(){
    this.chatService.deleteAll();
  }

  addBotButton(){
    this.showAddBot = !this.showAddBot;
  }

  sendMessage(inputMessageTB: string){
    const currentDate: number = Date.now();
    this.chatService.addMessageToDB(currentDate,this.inputName,inputMessageTB);
    this.inputMessageTB.nativeElement.value = ' ';
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
