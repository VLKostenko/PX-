import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CurrentLocationService } from '../current.location.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [CurrentLocationService, Location]
})
export class FooterComponent implements OnInit {

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    // close footer dropdowns
    this.languageDropdown = false;
  }

  languageDropdown: boolean = false;
  footerBlack: boolean = false;
  currentLanguage: string = 'English';
  userCountry: any;

  constructor(
    private translate: TranslateService,
    private currentLocationService: CurrentLocationService,
    private location: Location,
    private router: Router
  ) {

    router.events.subscribe((val) => {
      if ( val instanceof NavigationEnd) {
        this.footerBlack = this.router.url === '/';
      }
    });
  }

  switchLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translate.use(language);
    this.languageDropdown = false;
    this.currentLanguage = language;

    if ( localStorage.getItem('language') === 'tr' ) {
      this.currentLanguage = 'Türkçe';
    } else {
      this.currentLanguage = 'English';
    }
  }

  getCurrentLocation() {
    this.currentLocationService.getCurrentLocation()
      .subscribe(response => {
        this.userCountry = response;

        if ( localStorage.getItem('language') !== null ) {
          this.translate.setDefaultLang(localStorage.getItem('language'));
          if ( localStorage.getItem('language') === 'tr' ) {
            this.currentLanguage = 'Türkçe';
          } else {
            this.currentLanguage = 'English';
          }
        } else {
          if ( this.userCountry.country_name === 'Turkey' ) {
            this.translate.setDefaultLang('tr');
            localStorage.setItem('language', 'tr');
            this.currentLanguage = 'Türkçe';
          } else {
            this.translate.setDefaultLang('en');
            localStorage.setItem('language', 'en');
            this.currentLanguage = 'English';
          }
        }
        console.log('User country:', this.userCountry.country_name)
      });
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  toggleLanguageDropdown($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.languageDropdown = !this.languageDropdown;
  }

}
