import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-advantages',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements OnInit {

  constructor(private modalService: ModalService) {
  }

  openModal() {
    this.modalService.openModal();
  }

  ngOnInit() {
  }

}
