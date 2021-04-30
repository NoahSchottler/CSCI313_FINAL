import { Component, OnInit, ViewChild } from '@angular/core';
import { DBChatServiceService } from '../dbchat-service.service';
import { message } from '../message';
export type EditorType = 'displayLogin' | 'displayChat' ;
import { Bot } from '../bot';


@Component({
  selector: 'app-main-chat-window',
  templateUrl: './main-chat-window.component.html',
  styleUrls: ['./main-chat-window.component.css']
})
export class MainChatWindowComponent implements OnInit {
  editor: EditorType = 'displayLogin'; // defaults to show the login screen.
  @ViewChild('messageInput') inputMessageTB2; // accessing the reference element
 


  arr: message[] = [];
  inputName: string;
  showAddBot = false;
  bots: Bot[] = [];

  constructor(private chatService: DBChatServiceService) { }

  ngOnInit( ) {this.chatService.getMessages().subscribe(
    (mess: message[]) => {
      this.arr = mess;
    }
  );

  this.chatService.getBots().subscribe(data =>{
    this.bots = data;
  })
  }
  delete(){
    this.chatService.deleteAll();
  }

  addBotButton(){
    this.showAddBot = !this.showAddBot;
  }

   sendMessage(inputMesFromButton){
    const currentDate: number = Date.now();
   // resolve the adding of message to the database before clearing the chat box window.
   // this requires using two different variable names one sent in from the button and another for clearing.
   // I do not understand why, but even with using a promise if you use the same variable for both it does not work.
    Promise.resolve(this.chatService.addMessageToDB(currentDate,this.inputName,inputMesFromButton)).then(function() {
    });
    this.inputMessageTB2.nativeElement.value = '';
  

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