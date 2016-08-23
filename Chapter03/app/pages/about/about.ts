import {Component} from '@angular/core';
import {LaunchNavigator} from 'ionic-native';
@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  venue:Array<number>;
  constructor() {
    this.venue = [30.8589, 75.8602];
  }
  
  navigate() {
    LaunchNavigator.navigate(this.venue)
    .then(data => {
      
    })
    .catch(()=> {
      console.log("Some Error Occured");
    });
  }
}
