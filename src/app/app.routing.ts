import { RouterModule, Routes } from '@angular/router';
import { CurrencyTrackerComponent } from './currency-tracker/currency-tracker.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CurrencyChartComponent } from './currency-chart/currency-chart.component';
import { SignupComponent } from './register/signup/signup.component';
import { LoginComponent } from './register/login/login.component';
import { ForgotComponent } from './register/forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { SubscribeComponent } from './register/subscribe/subscribe.component';
import { IntroComponent } from './intro/intro.component';
import { ExchangeComponent } from './intro/exchange/exchange.component';
import { MerchantComponent } from './intro/merchant/merchant.component';
import { ApiComponent } from './intro/api/api.component';
import { TermsComponent } from './intro/terms/terms.component';
import { CorporateComponent } from './intro/corporate/corporate.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { ApidocsComponent } from './apidocs/apidocs.component';
import { LimitsComponent } from './limits/limits.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'limits', component: LimitsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'apidocs', component: ApidocsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'register',
    component: RegisterComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'subscribe', component: SubscribeComponent },
    ]},
  {
    path: '',
    component: IntroComponent,
    children: [
      { path: 'exchange', component: ExchangeComponent },
      { path: 'merchant', component: MerchantComponent },
      { path: 'api', component: ApiComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'corporate', component: CorporateComponent },
    ]
  }
];

export const AppRouting = RouterModule.forRoot(routes, {
  useHash: false
});