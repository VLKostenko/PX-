import { Component } from '@angular/core';
import { fadeAnimation } from './router.animations';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})

export class AppComponent {

  isLoading: boolean = false;


  constructor(private router: Router, private translate: TranslateService) {

    translate.setDefaultLang('en');

    // subscribe to our router's event here
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => this.isLoading = false, 500);
    }

    // Set loading state to false in both of the below events to hide the loader in case a request fails
    if (event instanceof NavigationCancel) {
      setTimeout(() => this.isLoading = false, 500);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => this.isLoading = false, 500);
    }
  }

  public getRouterOutletState(outlet) {
    if ( this.router.url !== '/' ) {
      return outlet.isActivated ? outlet.activatedRoute : '';
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if ( !(event instanceof NavigationEnd) ) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
