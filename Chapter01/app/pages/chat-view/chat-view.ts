import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ChatsProvider} from '../../providers/chats-provider/chats-provider';
import {UserProvider} from '../../providers/user-provider/user-provider';

@Component({
  templateUrl: 'build/pages/chat-view/chat-view.html',
})
export class ChatViewPage {
  message: string;
  uid:string;
  interlocutor:string;
  str:string;
  chats:FirebaseListObservable<any>;  
  constructor(public nav:NavController, 
  params:NavParams, 
  public chatsProvider:ChatsProvider, 
  public af:AngularFire, 
  public userProvider:UserProvider) {
    
    this.uid = params.data.uid;
    this.interlocutor = params.data.interlocutor;
    
    // Get Chat Reference
    chatsProvider.getChatRef(this.uid, this.interlocutor)
    .then((chatRef:any) => {  
        this.chats = this.af.database.list(chatRef);
        this.scrollToBottom();
    });
  }
  
  scrollToBottom() {
      // TODO
  }
   
  sendMessage() {
      if(this.message) {
          let chat = {
              from: this.uid,
              message: this.message,
              type: 'message'
          };
          
          this.chats.push(chat);
          this.message = "";
      }
  };
  
  sendPicture() {
      let chat = {from: this.uid, type: 'picture', picture:null};
      this.userProvider.getPicture()
      .then((image) => {
          chat.picture =  image;
          this.chats.push(chat);
      });
  }
}
