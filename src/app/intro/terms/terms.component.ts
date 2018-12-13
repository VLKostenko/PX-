import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  currentLanguage: string;

  constructor(private modalService: ModalService) {
  }

  openModal() {
    this.modalService.openModal();
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
