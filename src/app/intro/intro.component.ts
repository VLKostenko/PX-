import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  providers: [ModalService],
})
export class IntroComponent implements OnInit {

  constructor(public modalService: ModalService) {
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

  ngOnInit() {
  }

}
