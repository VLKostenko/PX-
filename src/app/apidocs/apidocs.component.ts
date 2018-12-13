import { AfterContentInit, Component } from '@angular/core';
import { ApiDocsService } from '../apidocs.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-apidocs',
  templateUrl: './apidocs.component.html',
  styleUrls: ['./apidocs.component.scss'],
  providers: [ApiDocsService]
})

export class ApidocsComponent implements AfterContentInit {

  api: any = {};
  apiNames: Array<string> = ['common', 'user-groups', 'exchange', 'wallet', 'pos'];
  generalTab: string;
  currentLanguage: string;

  commonRequestUrl: Array<any> = [];
  commonResponseBody: Array<any> = [];
  commonResponseCode: Array<any> = [];
  commonResponseHeaders: Array<any> = [];
  commonRequestResult: Array<any> = [];

  userGroupsRequestUrl: Array<any> = [];
  userGroupsResponseBody: Array<any> = [];
  userGroupsResponseCode: Array<any> = [];
  userGroupsResponseHeaders: Array<any> = [];
  userGroupsRequestResult: Array<any> = [];

  exchangeRequestUrl: Array<any> = [];
  exchangeResponseBody: Array<any> = [];
  exchangeResponseCode: Array<any> = [];
  exchangeResponseHeaders: Array<any> = [];
  exchangeRequestResult: Array<any> = [];

  walletRequestUrl: Array<any> = [];
  walletResponseBody: Array<any> = [];
  walletResponseCode: Array<any> = [];
  walletResponseHeaders: Array<any> = [];
  walletRequestResult: Array<any> = [];

  posRequestUrl: Array<any> = [];
  posResponseBody: Array<any> = [];
  posResponseCode: Array<any> = [];
  posResponseHeaders: Array<any> = [];
  posRequestResult: Array<any> = [];

  listOfPages;
  modalVisible: boolean = false;

  constructor(
    private apiDocsService: ApiDocsService
  ) {}

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  getApiDocsList() {
    this.apiDocsService.getDocsApi('list')
      .subscribe(result => {
        this.listOfPages = [{path: this.generalTab}].concat(result.apis);
      });
  }
  getApiDocsPage() {
    this.apiNames.forEach((type) => {
      const API = this.api[type] = {
        typesArray: [],
        path: [],
        api: [],
        apiTypes: [],
        apiParams: [],
        models: [],
        params: [],
        openedInfo: [],
      };

      this.apiDocsService.getDocsApi(type)
        .subscribe(result => {
          result.apis.forEach(element => {
            // get type of method ( public or private )
            API.typesArray.push(element.path);
            API.path.push(element.path);
            element.operations.forEach(element => {
              API.api.push(element);
            });
          });
          API.api.forEach(element => {
            element.referral_models = this.getReferralModelsFromElement( element, this.api[type] );
            API.apiParams.push( element.parameters );
          });
          for (let key in result.models) {
            if (result.models.hasOwnProperty(key)) {
              API.models[key] = result.models[key].properties;
            }
          }
          API.typesArray.forEach(element => {
            if ( element.indexOf('private') >= 0 ) {
              API.apiTypes.push('Private');
            } else {
              API.apiTypes.push('Public');
            }
          });
        });
    });

  }

  getReferralModelsFromElement( element, api ) {
    let referral_models = [];
    if( typeof element.type !== 'undefined' ) {
      const tmp_properties = api.models[element.type];
      referral_models.push( element.type );
      const getTypesFromModels = function( real_properties ) {
        for (let key in real_properties) {
          if (real_properties.hasOwnProperty(key) ) {
            if (typeof real_properties[key].$ref !== 'undefined' ) {
              referral_models.push(real_properties[key].$ref);
            } else if (
              typeof real_properties[key].items !== 'undefined' &&
              typeof real_properties[key].items.$ref !== 'undefined'
            ) {
              referral_models.push(real_properties[key].items.$ref);
            }
          }
        }
        return referral_models;
      };
      referral_models = getTypesFromModels( tmp_properties );
      const filter_unique = function( value, index, self ) {
        return self.indexOf(value) === index;
      };
      referral_models = referral_models.filter( filter_unique );
      for( let i = 0; i < referral_models.length; i++ ) {
        referral_models = getTypesFromModels( api.models[ referral_models[i] ] );
      }
      referral_models = referral_models.filter( filter_unique );
      return referral_models;
    }
  }

  formSubmit(path, method, value, index, jsonFile) {
    if ( method === 'POST' ) {
      Object.keys(value).forEach(k => (!value[k] && value[k] !== undefined) && delete value[k]);
      // console.log(value);
      this.apiDocsService.parametersCheck(path, value)
        .subscribe(
            result => {
          // console.log('result', result);
          // console.log('get headers', result.headers);
          // console.log(jsonFile);
          if ( jsonFile.slice(4) === 'common.json' ) {
            this.commonRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.commonResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.commonResponseBody[index] = 'no content';
            }
            this.commonResponseCode[index] = result.status;
            this.commonResponseHeaders[index] = result.headers;
            this.commonRequestResult[index] = true;
          } else if ( jsonFile.slice(4) === 'user-groups.json' ) {
            this.userGroupsRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.userGroupsResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.userGroupsResponseBody[index] = 'no content';
            }
            this.userGroupsResponseCode[index] = result.status;
            this.userGroupsResponseHeaders[index] = result.headers;
            this.userGroupsRequestResult[index] = true;
          } else if ( jsonFile.slice(4) === 'exchange.json' ) {
            this.exchangeRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.exchangeResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.exchangeResponseBody[index] = 'no content';
            }
            this.exchangeResponseCode[index] = result.status;
            this.exchangeResponseHeaders[index] = result.headers;
            this.exchangeRequestResult[index] = true;
          } else if ( jsonFile.slice(4) === 'wallet.json' ) {
            this.walletRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.walletResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.walletResponseBody[index] = 'no content';
            }
            this.walletResponseCode[index] = result.status;
            this.walletResponseHeaders[index] = result.headers;
            this.walletRequestResult[index] = true;
          } else if ( jsonFile.slice(4) === 'pos.json' ) {
            this.posRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.posResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.posResponseBody[index] = 'no content';
            }
            this.posResponseCode[index] = result.status;
            this.posResponseHeaders[index] = result.headers;
            this.posRequestResult[index] = true;
          }
        },
          error => {
            if ( jsonFile.slice(4) === 'common.json' ) {
              this.commonRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.commonResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.commonResponseBody[index] = 'no content';
              }
              this.commonResponseCode[index] = error.status;
              this.commonResponseHeaders[index] = error.headers;
              this.commonRequestResult[index] = true;
            } else if ( jsonFile.slice(4) === 'user-groups.json' ) {
              this.userGroupsRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.userGroupsResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.userGroupsResponseBody[index] = 'no content';
              }
              this.userGroupsResponseCode[index] = error.status;
              this.userGroupsResponseHeaders[index] = error.headers;
              this.userGroupsRequestResult[index] = true;
            } else if ( jsonFile.slice(4) === 'exchange.json' ) {
              this.exchangeRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.exchangeResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.exchangeResponseBody[index] = 'no content';
              }
              this.exchangeResponseCode[index] = error.status;
              this.exchangeResponseHeaders[index] = error.headers;
              this.exchangeRequestResult[index] = true;
            } else if ( jsonFile.slice(4) === 'wallet.json' ) {
              this.walletRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.walletResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.walletResponseBody[index] = 'no content';
              }
              this.walletResponseCode[index] = error.status;
              this.walletResponseHeaders[index] = error.headers;
              this.walletRequestResult[index] = true;
            } else if ( jsonFile.slice(4) === 'pos.json' ) {
              this.posRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.posResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.posResponseBody[index] = 'no content';
              }
              this.posResponseCode[index] = error.status;
              this.posResponseHeaders[index] = error.headers;
              this.posRequestResult[index] = true;
            }
        }
          );
    } else {
      this.apiDocsService.getParameters(path)
        .subscribe(
            result => {
          // console.log('result', result);
          // console.log(jsonFile);
          if ( jsonFile.slice(4) === 'common.json' ) {
            this.commonRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.commonResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.commonResponseBody[index] = 'no content';
            }
            this.commonResponseCode[index] = result.status;
            this.commonResponseHeaders[index] = result.headers;
            this.commonRequestResult[index] = true;
          } else if ( jsonFile.slice(4) === 'user-groups.json' ) {
            this.userGroupsRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.userGroupsResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.userGroupsResponseBody[index] = 'no content';
            }
            this.userGroupsResponseCode[index] = result.status;
            this.userGroupsResponseHeaders[index] = result.headers;
            this.userGroupsRequestResult[index] = true;
          } else if ( jsonFile.slice(4) === 'exchange.json' ) {
            this.exchangeRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.exchangeResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.exchangeResponseBody[index] = 'no content';
            }
            this.exchangeResponseCode[index] = result.status;
            this.exchangeResponseHeaders[index] = result.headers;
            this.exchangeRequestResult[index] = true;
          } else if ( jsonFile.slice(4) === 'wallet.json' ) {
            this.walletRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.walletResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.walletResponseBody[index] = 'no content';
            }
            this.walletResponseCode[index] = result.status;
            this.walletResponseHeaders[index] = result.headers;
            this.walletRequestResult[index] = true;
          } else if ( jsonFile.slice(4) === 'pos.json' ) {
            this.posRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
            if ( JSON.stringify(result.body) ) {
              this.posResponseBody[index] = JSON.stringify(result.body);
            } else {
              this.posResponseBody[index] = 'no content';
            }
            this.posResponseCode[index] = result.status;
            this.posResponseHeaders[index] = result.headers;
            this.posRequestResult[index] = true;
          }
        },
          error => {
            if ( jsonFile.slice(4) === 'common.json' ) {
              this.commonRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.commonResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.commonResponseBody[index] = 'no content';
              }
              this.commonResponseCode[index] = error.status;
              this.commonResponseHeaders[index] = error.headers;
              this.commonRequestResult[index] = true;
            } else if ( jsonFile.slice(4) === 'user-groups.json' ) {
              this.userGroupsRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.userGroupsResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.userGroupsResponseBody[index] = 'no content';
              }
              this.userGroupsResponseCode[index] = error.status;
              this.userGroupsResponseHeaders[index] = error.headers;
              this.userGroupsRequestResult[index] = true;
            } else if ( jsonFile.slice(4) === 'exchange.json' ) {
              this.exchangeRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.exchangeResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.exchangeResponseBody[index] = 'no content';
              }
              this.exchangeResponseCode[index] = error.status;
              this.exchangeResponseHeaders[index] = error.headers;
              this.exchangeRequestResult[index] = true;
            } else if ( jsonFile.slice(4) === 'wallet.json' ) {
              this.walletRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.walletResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.walletResponseBody[index] = 'no content';
              }
              this.walletResponseCode[index] = error.status;
              this.walletResponseHeaders[index] = error.headers;
              this.walletRequestResult[index] = true;
            } else if ( jsonFile.slice(4) === 'pos.json' ) {
              this.posRequestUrl[index] = 'http://showcase.draglet.com/gateway' + path;
              if ( JSON.stringify(error.body) ) {
                this.posResponseBody[index] = JSON.stringify(error.body);
              } else {
                this.posResponseBody[index] = 'no content';
              }
              this.posResponseCode[index] = error.status;
              this.posResponseHeaders[index] = error.headers;
              this.posRequestResult[index] = true;
            }
          });
    }
  }

  setGeneralTabName() {
    this.generalTab = '/../' + (this.currentLanguage === 'tr' ? 'Genel' : 'General');
    if (this.listOfPages) {
      this.listOfPages[0].path = this.generalTab;
    }
  }

  getApiDocs() {
    this.getApiDocsList();
    this.getApiDocsPage();
  }

  checkLocalStorage() {
    const storageLanguage = localStorage.getItem('language');
    if (storageLanguage !== this.currentLanguage) {
      this.currentLanguage = storageLanguage;
      this.setGeneralTabName();
    }
  }

  localStorageInterval() {
    setInterval(() => {
      this.checkLocalStorage();
    }, 1000);

  }

  ngAfterContentInit() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.localStorageInterval();
    this.setGeneralTabName();
    this.getApiDocs();
  }


}
