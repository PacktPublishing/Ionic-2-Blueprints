import {Component} from '@angular/core';
import {NavController, LocalStorage, Storage} from 'ionic-angular';
import {SessionDetail} from '../session-detail/session-detail';

@Component({
    templateUrl : 'build/pages/favorite/favorite.html'
})
export class FavoritePage {
    storage = new Storage(LocalStorage);
    favorites:Array<any>;
    constructor(public nav:NavController) {
        this.storage.get('favorite')
        .then(data => {
           this.favorites = JSON.parse(data); 
        })
        .catch(()=> {
            this.favorites = [];
        });
        
    }
    
    openSession(session) {
        this.nav.push(SessionDetail, {session: session});
    }
    
    deleteSession(index) {
        this.favorites.splice(index,1);
        this.storage.set('favorite', JSON.stringify(this.favorites));
    }
    
}