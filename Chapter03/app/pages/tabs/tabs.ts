import {Component} from '@angular/core';
import {SpeakersPage} from '../speakers/speakers';
import {SchedulePage} from '../schedule/schedule';
import {AboutPage} from '../about/about';
@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = SpeakersPage;
  tab2Root: any = SchedulePage;
  tab3Root: any = AboutPage;
}
