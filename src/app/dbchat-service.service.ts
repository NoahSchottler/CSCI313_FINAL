import { Injectable } from '@angular/core';
import {message} from './message'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBChatServiceService {
  collectionPath= 'chatlog';
  
  messages: Observable<message[]>;

  constructor(private firestore: AngularFirestore ) {   
    // What this line does is subscribes the message array observable to the 
    // firestore which acts as an observable emiting whenever .valuechanges calls. 
    // The .pipe map sorting thing sorts the information from the database in chronological order so that messages
    // are displayed  ordered by the time they arrived. 
    // by default firebases are not sorted so we need to sort the data from the database when it arrives in our code
    // in this spot here.
    this.messages=this.firestore.collection<message>(this.collectionPath).valueChanges().pipe(map(ev => ev.sort(function(a, b) {
      return a.date - b.date;
    })))
   
  }
 


  addMessageToDB(inputDate: number, inputUserName: string, inputMessage: string) {
   this.firestore.collection<message>(this.collectionPath).add({
    date: inputDate,
    userName: inputUserName,
    message: inputMessage
   });
  
   /** After a message is sent this checks what was said and does a bot response using a switch. The reason for the
    * setTimeout delay is if you do it at the same time sometimes the bots response shows up before the person message in the
    * array. If the message is one that does not detect any of the key words like !weather the switch just defaults and does nothing.
    */
   let responseMessage: string;
   let botName: string;

  switch (inputMessage.toLowerCase()){
    // reminder the cases are all lowercase so if you add another case/bot make sure it is all lower case.
    case "!weather":
      responseMessage= inputUserName+ ": Brrrr it is cold today in Fargo North Dakota";
      botName= "Weather bot";
      // if you want to use an API for weather send it in in place of responseMessage here as an optional parameter.
      // then add it to the database in botResponse maybe via some sort of switch?
      setTimeout(this.botResponse, 2000, this.firestore, responseMessage,botName,inputDate);
      break;

    case "!ndsu bison":
      responseMessage= inputUserName+ ": The North Dakota Bison won 42 to 20 against Eastern WA";
      botName= "Bison bot";
      setTimeout(this.botResponse, 2000, this.firestore, responseMessage,botName,inputDate);
      break;

      case "!joke":
        responseMessage= jokeRandomizer(inputUserName);
        botName= "Joke bot";
        setTimeout(this.botResponse, 2000, this.firestore, responseMessage,botName,inputDate);
        break;
  

    default:
        break;
  }


  
}

deleteAll( ): void {
  // This code is sloppy as hell and would not work when using it on a live server, but we are just using it for 
  // debugging purposes.
  this.firestore.collection(this.collectionPath)
  .get()
  .toPromise()
  .then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete();
  });
});
}

getMessages(){
  return this.messages;
}

botResponse(firestore: AngularFirestore, responseMessage: string, botName: string,inputDate :number){

firestore.collection<message>(this.collectionPath).add({
  date: inputDate+2000,
  userName: botName,
  message: responseMessage
 });

}

}




function jokeRandomizer(inputUserName: string): string {
 const num= Math.floor((Math.random() * 3) + 1); // generates a random number 1-3
 let responseMessage: string;
 switch(num){
   case 1:
    responseMessage= inputUserName+ ": What do you call a fake noodle? An impasta";
    return responseMessage;

   case 2:
    responseMessage= inputUserName+ ": What do you call an alligator in a vest? An investigator";
    return responseMessage;

    case 3:
    responseMessage= inputUserName+ ": What do we do with dead scientists? We barium!";
    return responseMessage;

    default:
      responseMessage= ": error in generating a joke sorry.";
      return responseMessage;
 }

}





