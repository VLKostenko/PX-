import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import "rxjs/Rx";

@Injectable()
export class CurrentLocationService {

  private _apiUrl = 'https://ipapi.co/json';

  constructor(private http: HttpClient) {}

  getCurrentLocation() {
    return this.http.get(this._apiUrl);
  }
}