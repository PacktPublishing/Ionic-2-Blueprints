import {Component} from '@angular/core';
import {NavController, Storage, LocalStorage} from 'ionic-angular';
import {Calendar, Toast, SocialSharing} from 'ionic-native';  
import {Control} from '@angular/common';
import {ConfProvider} from '../../providers/conf-provider';
import {SessionDetail} from '../session-detail/session-detail';
import 'rxjs/Rx';

@Component({
  templateUrl: 'build/pages/schedule/schedule.html',
})
export class SchedulePage {
  filterControl: Control = new Control('');
  days:any;
  totalDays:Array<any>;
  storage = new Storage(LocalStorage);
  favorite:Array<any>;
  constructor(public nav:NavController, public confProvider: ConfProvider) {
     confProvider.getSchedule()
    .then(data => {
      this.days = data;
      this.totalDays = JSON.parse(JSON.stringify(data));
    });
        
    // Handling Favorite List
    this.storage.get('favorite')
    .then(data => {
        if(!data) {
          data = "[]";
        }
        this.favorite = JSON.parse(data);
    });
    
    // Observable for Searchbar
    this.filterControl.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .map(v => v.toLowerCase().trim())
    .subscribe(value => {
      this.search(value);
    });
    
  }
  
  openSession(session) {
      this.nav.push(SessionDetail, {session: session});
  }
  
  favoriteSession(session) {
    let favoriteList = this.favorite.map(fav => {
      return fav.title
    });

    if(favoriteList.indexOf(session.title) < 0) {
      this.favorite.push(session);
      this.storage.set('favorite', JSON.stringify(this.favorite));
      let start_date = new Date(session.start_time);
      let end_date = new Date(session.end_time);
      Calendar.createEvent(session.title, session.place, session.abstract, start_date, end_date)
      .then(data => {
        Toast.show("Session Added to Calender", "2000", "center")
        .subscribe(() => {
        });  
      })
      .catch(error => {
        console.log(error);
      });
    } else {
        Toast.show("Already Added to Calender", "2000", "center")
        .subscribe(()=> {
        }); 
    }
  }
  
  shareSession(session) {
    let shareString = `Check this amazing talk, ${session.title} at Conference name on ${session.day}`;
    SocialSharing.share(shareString, session.title, null, session.web_url);
  }
  
  // Search Logic
  search(value) {
    this.days = JSON.parse(JSON.stringify(this.totalDays));
    this.days = this.days.filter(day => {
        day.sessions = day.sessions.filter(session => {
          let selected = false;
          if(session.space.toLowerCase().indexOf(value) >= 0) {
            selected = true;
          }
          if(session.title.toLowerCase().indexOf(value) >= 0) {
            selected = true;
          }
          if(session.abstract && session.abstract.toLowerCase().indexOf(value) >= 0) {
            selected = true;
          }
          if(session.speakers) {
             session.speakers.forEach(speaker => {
              if(speaker.name.toLowerCase().indexOf(value) >=0) {
                selected = true;
                return;
              }
            });
          }
          return selected;
        }); 
        
        if(day.sessions.length > 0) {
          return true;  
        }
      });
  }
}


