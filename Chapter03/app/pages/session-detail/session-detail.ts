import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/session-detail/session-detail.html'
})
export class SessionDetail {
    session:any;
    constructor(public nav:NavController, public params: NavParams) {
        this.session = this.params.get('session');
    }
}