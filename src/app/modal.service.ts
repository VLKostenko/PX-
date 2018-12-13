import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
  modalVisible: boolean = false;
  modalVisibleChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.modalVisibleChange.subscribe((value) => {
      this.modalVisible = value;
    });
  }

  openModal() {
    this.modalVisibleChange.next(true);
  }

  closeModal() {
    this.modalVisibleChange.next(false);
  }
}