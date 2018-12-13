import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { fadeAnimation } from '../router.animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeAnimation]
})
export class RegisterComponent implements OnInit {

  constructor(private _location: Location) {
  }
  backClicked() {
    this._location.back();
  }

  ngOnInit() {
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
