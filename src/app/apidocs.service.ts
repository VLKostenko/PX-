import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class ApiDocsService {

  constructor(private http: HttpClient) {}

  getDocsApi(pageType): Observable<any> {
    return this.http.get('/get-api-doc', {
      params: {type: pageType},
      responseType: 'json'
    })
      .catch(error => {
        return Observable.throw(error);
      });
  }

  parametersCheck(path, data): Observable<any> {
    return this.http.post('http://showcase.draglet.com/gateway' + path, data, {observe: 'response'})
      // .catch(error => {
      //   return Observable.throw(error);
      // });
  }
  getParameters(path): Observable<any> {
    return this.http.get('http://showcase.draglet.com/gateway' + path, {observe: 'response'})
      // .catch(error => {
      //   return Observable.throw(error);
      // });
  }

}
