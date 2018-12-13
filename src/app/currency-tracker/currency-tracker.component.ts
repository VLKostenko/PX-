import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CurrenciesService } from '../currencies.service';
import { Observable } from 'rxjs/Observable';
// import { RoundPipe } from '../round.pipe';

@Component({
  selector: 'app-currency-tracker',
  templateUrl: './currency-tracker.component.html',
  styleUrls: ['./currency-tracker.component.scss'],
  providers: [CurrenciesService],
})
export class CurrencyTrackerComponent implements OnInit {

  // currencies
  _currenciesArrayBTC;
  _currenciesArrayETH;
  _currenciesArrayDASH;
  _currenciesArrayLTC;
  _currenciesArrayNMC;
  _currenciesArrayDOGE;
  _currenciesArrayUSD;
  // currency compare
  _currencieBTCUSD = {
    price: 0,
    oldPrice: 0,
    difference: 0,
    differencePercent: 0,
    increase: false,
    decrease: false
  };
  _currencieBTCTRY = {
    price: 0,
    oldPrice: 0,
    difference: 0,
    differencePercent: 0,
    increase: false,
    decrease: false
  };
  _currencieETHUSD = {
    price: 0,
    oldPrice: 0,
    difference: 0,
    differencePercent: 0,
    increase: false,
    decrease: false
  };
  _currencieETHTRY = {
    price: 0,
    oldPrice: 0,
    difference: 0,
    differencePercent: 0,
    increase: false,
    decrease: false
  };
  _currencieDASHUSD = {
    price: 0,
    oldPrice: 0,
    difference: 0,
    differencePercent: 0,
    increase: false,
    decrease: false
  };
  _currencieLTCTRY = {
    price: 0,
    oldPrice: 0,
    difference: 0,
    differencePercent: 0,
    increase: false,
    decrease: false
  };
  _currencieNMCUSD = {
    price: 0,
    oldPrice: 0,
    difference: 0,
    differencePercent: 0,
    increase: false,
    decrease: false
  };
  _currencieETHBTC = {
    price: 0,
    oldPrice: 0,
    difference: 0,
    differencePercent: 0,
    increase: false,
    decrease: false
  };
  _currencieDOGEBTC = {
    price: 0,
    oldPrice: 0,
    difference: 0,
    differencePercent: 0,
    increase: false,
    decrease: false
  };
  // _currenciesPairs = [
  //   ['BTC', 'USD'],
  //   ['BTC', 'TRY'],
  //   ['ETH', 'USD'],
  //   ['ETH', 'TRY'],
  //   ['DASH', 'USD'],
  //   ['LTC', 'TRY'],
  //   ['NMC', 'USD'],
  //   ['ETH', 'BTC'],
  //   ['DOGE', 'BTC']
  // ];
  animateTicker: boolean = true;
  pauseTicker: boolean = false;
  clickedTicker: boolean = false;
  activeCurrencyBlock: number;
  activeCurrencyBlockMobile: number = 0;
  currenciesArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  private swipeCoord?: [number, number];
  private swipeTime?: number;

  @HostListener('click', ['$event']) onClick(e) {
    this.clickedTicker = true;
  }

  constructor(
    private currenciesService: CurrenciesService
  ) {}

  getCurrenciesCompare() {
    this.currenciesService.getCurrenciesCompare('BTC','USD')
      .subscribe(result => {
        if ( Math.floor(result.USD) === 0 ) {
          if ( this._currencieBTCUSD.price !== result.USD ) {
            this._currencieBTCUSD.price = Math.ceil(result.USD * 1000) / 1000;
          }
        } else {
          if ( this._currencieBTCUSD.price !== result.USD ) {
            this._currencieBTCUSD.price = result.USD;
          }
        }
      });
    this.currenciesService.getCurrenciesCompare('BTC','TRY')
      .subscribe(result => {
        if ( Math.floor(result.TRY) === 0 ) {
          if ( this._currencieBTCTRY.price !== result.TRY ) {
            this._currencieBTCTRY.price = Math.ceil(result.TRY * 1000) / 1000;
          }
        } else {
          if ( this._currencieBTCTRY.price !== result.TRY ) {
            this._currencieBTCTRY.price = result.TRY;
          }
        }
      });
    this.currenciesService.getCurrenciesCompare('ETH','USD')
      .subscribe(result => {
        if ( Math.floor(result.USD) === 0 ) {
          if ( this._currencieETHUSD.price !== result.USD ) {
            this._currencieETHUSD.price = Math.ceil(result.USD * 1000) / 1000;
          }
        } else {
          if ( this._currencieETHUSD.price !== result.USD ) {
            this._currencieETHUSD.price = result.USD;
          }
        }
      });
    this.currenciesService.getCurrenciesCompare('ETH','TRY')
      .subscribe(result => {
        if ( Math.floor(result.TRY) === 0 ) {
          if ( this._currencieETHTRY.price !== result.TRY ) {
            this._currencieETHTRY.price = Math.ceil(result.TRY * 1000) / 1000;
          }
        } else {
          if ( this._currencieETHTRY.price !== result.TRY ) {
            this._currencieETHTRY.price = result.TRY;
          }
        }
      });
    this.currenciesService.getCurrenciesCompare('DASH','USD')
      .subscribe(result => {
        if ( Math.floor(result.USD) === 0 ) {
          if ( this._currencieDASHUSD.price !== result.USD ) {
            this._currencieDASHUSD.price = Math.ceil(result.USD * 1000) / 1000;
          }
        } else {
          if ( this._currencieDASHUSD.price !== result.USD ) {
            this._currencieDASHUSD.price = result.USD;
          }
        }
      });
    this.currenciesService.getCurrenciesCompare('LTC','TRY')
      .subscribe(result => {
        if ( Math.floor(result.TRY) === 0 ) {
          if ( this._currencieLTCTRY.price !== result.TRY ) {
            this._currencieLTCTRY.price = Math.ceil(result.TRY * 1000) / 1000;
          }
        } else {
          if ( this._currencieLTCTRY.price !== result.TRY ) {
            this._currencieLTCTRY.price = result.TRY;
          }
        }
      });
    this.currenciesService.getCurrenciesCompare('NMC','USD')
      .subscribe(result => {
        if ( Math.floor(result.USD) === 0 ) {
          if ( this._currencieNMCUSD.price !== result.USD ) {
            this._currencieNMCUSD.price = Math.ceil(result.USD * 1000) / 1000;
          }
        } else {
          if ( this._currencieNMCUSD.price !== result.USD ) {
            this._currencieNMCUSD.price = result.USD;
          }
        }
      });
    this.currenciesService.getCurrenciesCompare('ETH','BTC')
      .subscribe(result => {
        if ( Math.floor(result.BTC) === 0 ) {
          if ( this._currencieETHBTC.price !== result.BTC ) {
            this._currencieETHBTC.price = result.BTC;
          }
        } else {
          if ( this._currencieETHBTC.price !== result.BTC ) {
            this._currencieETHBTC.price = result.BTC;
          }
        }
      });
    this.currenciesService.getCurrenciesCompare('DOGE','BTC')
      .subscribe(result => {
        if ( Math.floor(result.BTC) === 0 ) {
          if ( this._currencieDOGEBTC.price !== result.BTC ) {
            this._currencieDOGEBTC.price = result.BTC;
          }
        } else {
          if ( this._currencieDOGEBTC.price !== result.BTC ) {
            this._currencieDOGEBTC.price = result.BTC;
          }
        }
      });
  }

  getCurrenciesChanges() {
    this.currenciesService.getCurrenciesChanges('BTC','USD')
      .subscribe(result => {
        // console.log(result);
        this._currencieBTCUSD.difference = this._currencieBTCUSD.price - result.BTC.USD;
        // ( (a — b) / [ (a + b) / 2 ] ) * 100 %
        this._currencieBTCUSD.differencePercent = Math.ceil(
          ( (this._currencieBTCUSD.price - result.BTC.USD) /
            ( (this._currencieBTCUSD.price + result.BTC.USD) / 2 )
          ) * 100000000) / 100000000;
        if ( this._currencieBTCUSD.price >= result.BTC.USD ) {
          this._currencieBTCUSD.increase = true;
          this._currencieBTCUSD.decrease = false;
        } else {
          this._currencieBTCUSD.increase = false;
          this._currencieBTCUSD.decrease = true;
        }
      });
    this.currenciesService.getCurrenciesChanges('BTC','TRY')
      .subscribe(result => {
        this._currencieBTCTRY.difference = this._currencieBTCTRY.price - result.BTC.TRY;
        // ( (a — b) / [ (a + b) / 2 ] ) * 100 %
        this._currencieBTCTRY.differencePercent = Math.ceil(
          ( (this._currencieBTCTRY.price - result.BTC.TRY) /
            ( (this._currencieBTCTRY.price + result.BTC.TRY) / 2 )
          ) * 100 * 1000) / 1000;
        if ( this._currencieBTCTRY.price >= result.BTC.TRY ) {
          this._currencieBTCTRY.increase = true;
          this._currencieBTCTRY.decrease = false;
        } else {
          this._currencieBTCTRY.increase = false;
          this._currencieBTCTRY.decrease = true;
        }
      });
    this.currenciesService.getCurrenciesChanges('ETH','USD')
      .subscribe(result => {
        this._currencieETHUSD.difference = this._currencieETHUSD.price - result.ETH.USD;
        // ( (a — b) / [ (a + b) / 2 ] ) * 100 %
        this._currencieETHUSD.differencePercent = Math.ceil(
          ( (this._currencieETHUSD.price - result.ETH.USD) /
            ( (this._currencieETHUSD.price + result.ETH.USD) / 2 )
          ) * 100 * 1000) / 1000;
        if ( this._currencieETHUSD.price >= result.ETH.USD ) {
          this._currencieETHUSD.increase = true;
          this._currencieETHUSD.decrease = false;
        } else {
          this._currencieETHUSD.increase = false;
          this._currencieETHUSD.decrease = true;
        }
      });
    this.currenciesService.getCurrenciesChanges('ETH','TRY')
      .subscribe(result => {
        this._currencieETHTRY.difference = this._currencieETHTRY.price - result.ETH.TRY;
        // ( (a — b) / [ (a + b) / 2 ] ) * 100 %
        this._currencieETHTRY.differencePercent = Math.ceil(
          ( (this._currencieETHTRY.price - result.ETH.TRY) /
            ( (this._currencieETHTRY.price + result.ETH.TRY) / 2 )
          ) * 100 * 1000) / 1000;
        if ( this._currencieETHTRY.price >= result.ETH.TRY ) {
          this._currencieETHTRY.increase = true;
          this._currencieETHTRY.decrease = false;
        } else {
          this._currencieETHTRY.increase = false;
          this._currencieETHTRY.decrease = true;
        }
      });
    this.currenciesService.getCurrenciesChanges('DASH','USD')
      .subscribe(result => {
        this._currencieDASHUSD.difference = this._currencieDASHUSD.price - result.DASH.USD;
        // ( (a — b) / [ (a + b) / 2 ] ) * 100 %
        this._currencieDASHUSD.differencePercent = Math.ceil(
          ( (this._currencieDASHUSD.price - result.DASH.USD) /
            ( (this._currencieDASHUSD.price + result.DASH.USD) / 2 )
          ) * 100 * 1000) / 1000;
        if ( this._currencieDASHUSD.price >= result.DASH.USD ) {
          this._currencieDASHUSD.increase = true;
          this._currencieDASHUSD.decrease = false;
        } else {
          this._currencieDASHUSD.increase = false;
          this._currencieDASHUSD.decrease = true;
        }
      });
    this.currenciesService.getCurrenciesChanges('LTC','TRY')
      .subscribe(result => {
        this._currencieLTCTRY.difference = this._currencieLTCTRY.price - result.LTC.TRY;
        // ( (a — b) / [ (a + b) / 2 ] ) * 100 %
        this._currencieLTCTRY.differencePercent = Math.ceil(
          ( (this._currencieLTCTRY.price - result.LTC.TRY) /
            ( (this._currencieLTCTRY.price + result.LTC.TRY) / 2 )
          ) * 100 * 1000) / 1000;
        if ( this._currencieLTCTRY.price >= result.LTC.TRY ) {
          this._currencieLTCTRY.increase = true;
          this._currencieLTCTRY.decrease = false;
        } else {
          this._currencieLTCTRY.increase = false;
          this._currencieLTCTRY.decrease = true;
        }
      });
    this.currenciesService.getCurrenciesChanges('NMC','USD')
      .subscribe(result => {
        this._currencieNMCUSD.difference = this._currencieNMCUSD.price - result.NMC.USD;
        // ( (a — b) / [ (a + b) / 2 ] ) * 100 %
        this._currencieNMCUSD.differencePercent = Math.ceil(
          ( (this._currencieNMCUSD.price - result.NMC.USD) /
            ( (this._currencieNMCUSD.price + result.NMC.USD) / 2 )
          ) * 100 * 1000) / 1000;
        if ( this._currencieNMCUSD.price >= result.NMC.USD ) {
          this._currencieNMCUSD.increase = true;
          this._currencieNMCUSD.decrease = false;
        } else {
          this._currencieNMCUSD.increase = false;
          this._currencieNMCUSD.decrease = true;
        }
      });
    this.currenciesService.getCurrenciesChanges('ETH','BTC')
      .subscribe(result => {
        this._currencieETHBTC.difference = this._currencieETHBTC.price - result.ETH.BTC;
        // ( (a — b) / [ (a + b) / 2 ] ) * 100 %
        this._currencieETHBTC.differencePercent = Math.ceil(
          ( (this._currencieETHBTC.price - result.ETH.BTC) /
            ( (this._currencieETHBTC.price + result.ETH.BTC) / 2 )
          ) * 100 * 1000) / 1000;
        if ( this._currencieETHBTC.price >= result.ETH.BTC ) {
          this._currencieETHBTC.increase = true;
          this._currencieETHBTC.decrease = false;
        } else {
          this._currencieETHBTC.increase = false;
          this._currencieETHBTC.decrease = true;
        }
      });
    this.currenciesService.getCurrenciesChanges('DOGE','BTC')
      .subscribe(result => {
        this._currencieDOGEBTC.difference = this._currencieDOGEBTC.price - result.DOGE.BTC;
        // ( (a — b) / [ (a + b) / 2 ] ) * 100 %
        this._currencieDOGEBTC.differencePercent = Math.ceil(
          ( (this._currencieDOGEBTC.price - result.DOGE.BTC) /
            ( (this._currencieDOGEBTC.price + result.DOGE.BTC) / 2 )
          ) * 100 * 1000) / 1000;
        if ( this._currencieDOGEBTC.price >= result.DOGE.BTC) {
          this._currencieDOGEBTC.increase = true;
          this._currencieDOGEBTC.decrease = false;
        } else {
          this._currencieDOGEBTC.increase = false;
          this._currencieDOGEBTC.decrease = true;
        }
      });
  }

  toggleModal(modal: number) {
    if ( this.activeCurrencyBlock === modal ) {
      this.activeCurrencyBlock = null;
    } else {
      this.activeCurrencyBlock = modal;
    }
  }

  slideToCurrency(control: number) {
    this.activeCurrencyBlockMobile = control;
  }

  swipeCurrencyMobile(e: TouchEvent, when: string, currentBlock: number): void {
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    const time = new Date().getTime();

    if ( when === 'start' ) {
      this.swipeCoord = coord;
      this.swipeTime = time;
    }

    else if ( when === 'end' ) {
      const direction = [coord[0] - this.swipeCoord[0], 0];
      const duration = time - this.swipeTime;

      if ( duration < 1000 //Short enough
        && Math.abs(direction[0]) > 30 ) {  //Long enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        // console.log(swipe, currentBlock);
        if ( swipe === 'next' ) {
          if ( currentBlock + 1 === this.currenciesArray.length ) {
            this.activeCurrencyBlockMobile = 0;
          } else {
            this.activeCurrencyBlockMobile = currentBlock + 1;
          }
        } else {
          if ( currentBlock === 0 ) {
            this.activeCurrencyBlockMobile = this.currenciesArray.length - 1;
          } else {
            this.activeCurrencyBlockMobile = currentBlock - 1;
          }
        }
      }
    }
  }

  ngOnInit() {
    this.getCurrenciesCompare();
    this.getCurrenciesChanges();
    setInterval(() => {
      this.getCurrenciesCompare();
      this.getCurrenciesChanges();
    }, 1000 * 30);
  }


}
