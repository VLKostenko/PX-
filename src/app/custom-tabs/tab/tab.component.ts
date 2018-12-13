import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  host: {
    "[class.hidden]": "!active",
  },
})
export class TabComponent {

  @Input('tabTitle') title: string;
  @Input() active: boolean = false;
  @Input() index: number;
  @Input() alreadyExists: boolean = false;
}