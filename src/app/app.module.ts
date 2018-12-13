import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MaterializeModule } from "angular2-materialize";
import { DragScrollModule } from 'ngx-drag-scroll';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RoundPipe } from './round.pipe';
import { SafePipe } from './safe.pipe';
import { RemoveMinusPipe} from './remove.minus.pipe';
import { ScrollEventModule } from 'ngx-scroll-event';
import { TabModule } from 'angular-tabs-component';
import { TabsComponent } from './custom-tabs/tabs/tabs.component';
import { TabComponent } from './custom-tabs/tab/tab.component';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { CurrencyTrackerComponent } from './currency-tracker/currency-tracker.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CurrencyChartComponent } from './currency-chart/currency-chart.component';
import { SignupComponent } from './register/signup/signup.component';
import { LoginComponent } from './register/login/login.component';
import { ForgotComponent } from './register/forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { SubscribeComponent } from './register/subscribe/subscribe.component';
import { ExchangeComponent } from './intro/exchange/exchange.component';
import { MerchantComponent } from './intro/merchant/merchant.component';
import { ApiComponent } from './intro/api/api.component';
import { TermsComponent } from './intro/terms/terms.component';
import { CorporateComponent } from './intro/corporate/corporate.component';
import { IntroComponent } from './intro/intro.component';
import { LimitsComponent } from './limits/limits.component';
import { ApidocsComponent } from './apidocs/apidocs.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { FilterPipe } from './filter.pipe';
import { ApiDocsPathPipe } from './apidocs-path.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyTrackerComponent,
    HomeComponent,
    FooterComponent,
    CurrencyChartComponent,
    SignupComponent,
    LoginComponent,
    ForgotComponent,
    RegisterComponent,
    RoundPipe,
    FilterPipe,
    SafePipe,
    RemoveMinusPipe,
    SubscribeComponent,
    ExchangeComponent,
    MerchantComponent,
    ApiComponent,
    TermsComponent,
    CorporateComponent,
    IntroComponent,
    LimitsComponent,
    ApidocsComponent,
    FaqComponent,
    ContactComponent,
    TabsComponent,
    TabComponent,
    ApiDocsPathPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRouting,
    // RouterModule.forRoot(routes),
    HttpClientModule,
    NgxChartsModule,
    Angular2FontawesomeModule,
    MaterializeModule,
    DragScrollModule,
    ScrollEventModule,
    TabModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
