import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, ionicBootstrap} from 'ionic-angular';
import {JSONP_PROVIDERS, Jsonp} from '@angular/http';
import {StatusBar, InAppBrowser} from 'ionic-native';
import {ConfProvider} from './providers/conf-provider';
import {TabsPage} from './pages/tabs/tabs';
import {FavoritePage} from './pages/favorite/favorite';

@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  pages:any;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    
    this.pages = [
      {page:TabsPage, title: 'Home'},
      {page:FavoritePage, title: 'Favorite'}
    ];
  }
  
  openPage(page) {
    this.nav.push(page);
  }
  
  openLink(url,target, options="location=no") {
    InAppBrowser.open(url,target,options)
  }
}

ionicBootstrap(MyApp, [ConfProvider, JSONP_PROVIDERS]);
