import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DBChatServiceService } from './dbchat-service.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {

  location: string = 'fargo';
  locations: any[] = [];
  inputName: string;
  showAddBot = false;
  constructor(private firestore: AngularFirestore,private chatService: DBChatServiceService) { }
  ngOnInit( ) {
    //this.addLocationsToArray();
  }
  update(str: string)
  {
    let s = str.toLowerCase();
   
   if(s.includes("!weather")){
     s = str.substring(8,str.length);
     this.location = s; 
     this.locations.push(s);
     console.log("added" + s)
     console.log(this.locations[0])
     this.addLocationToDB(s);
   }
  }
  //store the location in the DB
  addLocationToDB(str: string) {
    let s = str.toLowerCase();
var citiesRef = this.firestore.collection("Location");

citiesRef.doc().set({
    Location: s
   });

  }
  single: any;
  message: string = "";
  id: string = '';
  
 
 
 

}
