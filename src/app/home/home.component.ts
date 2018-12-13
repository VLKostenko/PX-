import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  modalVisible: boolean = false;
  activeLink1: boolean = false;
  activeLink2: boolean = false;
  activeLink3: boolean = false;

  constructor() {}

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  ngOnInit() {
  }

}
