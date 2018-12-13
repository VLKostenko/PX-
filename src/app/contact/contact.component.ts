import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ModalService],
})
export class ContactComponent implements OnInit {

  @Input() initialValue: string;
  @Output() modelChange = new EventEmitter();

  formCategory: string;
  showSuccess: boolean = false;
  currentLanguage: string;

  constructor(
    private http: HttpClient,
    public modalService: ModalService
  ) {}

  contact (contactForm: NgForm) {
    this.showSuccess = true;
    this.http.post('/reach', {
      contact: contactForm.value.category,
      name: contactForm.value.name,
      email: contactForm.value.email,
      message: contactForm.value.message,
    }).subscribe();
    // console.log(this.formCategory);
    // console.log(contactForm.value);
    console.log('Successful registration');
  }

  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  get modalVisible(): boolean {
    return this.modalService.modalVisible;
  }

  change(newValue) {
    this.modelChange.emit(newValue);
    this.formCategory = newValue;
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
