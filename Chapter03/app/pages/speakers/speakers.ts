import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ConfProvider} from '../../providers/conf-provider';
import {SpeakerDetail} from '../speaker-detail/speaker-detail';
import {Network, Connection} from 'ionic-native';
import {Subscription} from 'rxjs/Rx';

@Component({
  templateUrl: 'build/pages/speakers/speakers.html',
})
export class SpeakersPage {
  offline:any;
  speakers:Array<any>;
  disconnectSubscription:Subscription;
  onlineSubscription:Subscription;
  constructor(public confProvider:ConfProvider, public nav: NavController) {    
    confProvider.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
    
    this.disconnectSubscription = Network.onDisconnect().subscribe(()=> {
      this.offline = true;
    });
    
    this.onlineSubscription = Network.onConnect().subscribe(()=> {
      this.offline = false;
    });
  }
  
  speakerDetail(speaker) {
    this.nav.push(SpeakerDetail, {speaker: speaker});
  }
  
  isOnline () {
        let networkState = Network.connection;
        return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;
  }
  
  ionViewDidEnter() {
     this.offline = !this.isOnline();
  }
}
