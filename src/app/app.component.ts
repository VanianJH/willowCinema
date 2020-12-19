import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  whichItem = 0;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        default: {
          // console.log(event)
          // console.log('new url: ', event['url'])
          if(event['url']==='/frontpage') {
            this.whichItem = 0
          } else if (event['url']==='/movies') {
            this.whichItem = 1
          } else if(event['url']!==undefined && event['url']!==null && event['url'].length>2){
            this.whichItem = 2
          }
        }
      }
    });
  }


}
