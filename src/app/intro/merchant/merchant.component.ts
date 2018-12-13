import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {

  currentLanguage: string;
  modalVisible: boolean = false;

  constructor() {
  }

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  checkLocalStorage() {
    if ( localStorage.getItem('language') === 'tr' ) {
      this.currentLanguage = 'tr';
    } else {
      this.currentLanguage = 'en';
    }
  }

  localStorageInterval() {
    setInterval(() => {
       this.checkLocalStorage();
    }, 1000);

  }

  ngOnInit() {
    this.checkLocalStorage();
    this.localStorageInterval();
  }


}
