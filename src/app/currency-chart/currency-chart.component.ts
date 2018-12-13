import { Component, OnInit } from '@angular/core';
import { multi } from '../data';

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.scss']
})
export class CurrencyChartComponent {

  single: any[];
  multi: any[];

  view: any[] = [190, 40];

  // options
  gradient = true;

  colorScheme = {
    domain: ['#a97bdb', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor() {
    Object.assign(this, {multi})
  }

  onSelect(event) {
    // console.log(event);
  }
  ngOnInit () {

  }

}
