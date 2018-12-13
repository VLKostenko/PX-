import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class CurrenciesService {

  constructor(private http: HttpClient) {}

  getCurrenciesCompare(first, second): Observable<any> {
    return this.http.get('https://min-api.cryptocompare.com/data/price?fsym=' + first + '&tsyms=' + second)
      .catch(error => {
      return Observable.throw(error);
    });
  }
  getCurrenciesChanges(first, second): Observable<any> {
    return this.http.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=' + first + '&tsyms=' + second)
      .catch(error => {
      return Observable.throw(error);
    });
  }
}