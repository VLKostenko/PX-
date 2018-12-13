import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  showSuccess: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  register (subscribeForm: NgForm) {
    this.showSuccess = true;
    this.http.post('/subscribe', {
      email: subscribeForm.value.email,
    }).subscribe();

    console.log('Successful registration');
  }

}
