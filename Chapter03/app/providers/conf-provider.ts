import {Injectable} from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class ConfProvider {
    public speakers:any;
    public schedule:any;
    storage = new Storage(LocalStorage);
    url:string = 'http://lanyrd.com/2015/campjsnews/schedule/481ea3897063c7d5.v1.json?callback=JSONP_CALLBACK';
    offline_url:string = 'data/data.json';
    request:any;
    data:any;
    constructor(public jsonp: Jsonp, public http:Http) {
      this.request =  this.jsonp.request(this.url);
    }
    
    load() {
      if(this.data) {
        return Promise.resolve(this.data);
      }
      
      let promise = new Promise((resolve) => {
          this.request.subscribe(data => {
            this.data = this.processData(data.json());
            this.storage.set('offline_data', JSON.stringify(this.data));
            resolve(this.data);
          },
          error => {
             this.storage.get('offline_data')
             .then(data => {
                if(data) {
                  this.data = JSON.parse(data);
                  resolve(this.data);
                } else {
                  this.http.get(this.offline_url).subscribe(data => {
                    this.data = this.processData(data.json());
                    this.storage.set('offline_data', JSON.stringify(this.data));
                    resolve(this.data);
                  });
                }
              });
          });
      });
      
      return promise;
    }
        
    processData(data) {
      data.speakers = [];
      data.speakersName = [];
      data.sessions.forEach(day => {
        day.display = true;
        day.sessions.forEach(session => {
          session.speakers.forEach(newSpeaker => {
             let index = data.speakersName.indexOf(newSpeaker.name);
             if( index < 0) {
                 newSpeaker.sessions = [];
                 newSpeaker.sessions.push({title: session.title, abstract:session.abstract});
                 data.speakersName.push(newSpeaker.name);
                 data.speakers.push(newSpeaker);
             } else {
                 data.speakers[index].sessions.push({title: session.title, abstract:session.abstract});
             }
             
          });
        });
      })
      delete data.speakersName;
      return data;
    }
    
    getSpeakers() {
      return this.load().then(data => {
        let newSpeakerArray = this.addAlphabets(this.sort(data.speakers));  
        return newSpeakerArray;
      });
    }
    
    getSchedule() {
      return this.load().then(data => {
        return data.sessions;
      });
    }
   
    sort(speakers) {
      let list = speakers;
      list.sort(function(a, b) {
        if(a.name > b.name) {
          return 1;
        }
        if(a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return list;
    }


    addAlphabets(items) {
      let currentChar = "";
      let newArray = [];
      items.forEach(function(item, index) {
        var char = item.name[0].toLowerCase();
        if(currentChar != char) {
            newArray.push({type:"title", value: char.toUpperCase()});
            currentChar = char;
        }
        newArray.push(item);
      });
      
      return newArray;
    } 
    
}