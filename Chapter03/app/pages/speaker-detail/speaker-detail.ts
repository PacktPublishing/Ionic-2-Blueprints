import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Network, Connection} from 'ionic-native';
import {Subscription} from 'rxjs/Rx';
import {SessionDetail} from '../session-detail/session-detail';

@Component({
    templateUrl: 'build/pages/speaker-detail/speaker-detail.html'
})

export class SpeakerDetail {
    offline:any;
    speaker:any;
    disconnectSubscription:Subscription;
    onlineSubscription:Subscription;
    constructor(public nav:NavController, public params:NavParams) {
        this.speaker = this.params.get('speaker');   
        this.disconnectSubscription = Network.onDisconnect().subscribe(()=> {
            this.offline = true;
        });
        this.onlineSubscription = Network.onConnect().subscribe(()=> {
            this.offline = false;
        });
    }
    
    openSession(session) {
        this.nav.push(SessionDetail, {session: session});
    }
    
    isOnline () {
        let networkState = Network.connection;
        return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;
    }
    
    ionViewDidEnter() {
     this.offline = !this.isOnline();
    }
}
