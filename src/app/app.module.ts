import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {Storage, IonicStorageModule} from '@ionic/storage';
import {HttpModule, XHRBackend, RequestOptions, Http} from '@angular/http';
import {HttpInterceptor} from './http.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { UserDataProvider } from '../providers/user-data';
import { BackendProvider } from '../providers/backend';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { VerifyPage } from '../pages/verify/verify';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { TermsPage } from '../pages/terms/terms';
import { SupportPage } from '../pages/support/support';
import { PrivacyPage } from '../pages/privacy/privacy';
import { ProfilePage } from '../pages/profile/profile';
import { PhotoPage } from '../pages/photo/photo';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { SettingsPage } from '../pages/settings/settings';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { PaymentsPage } from '../pages/payments/payments';
import { AddSubscriptionPage } from '../pages/add-subscription/add-subscription';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';


declare var window;

export class MyErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    window.Ionic.handleNewError(err);
  }
}

export function httpInterceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, storage: Storage) {
  return new HttpInterceptor(xhrBackend, requestOptions, storage);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    LoginPage,
    VerifyPage,
    ProfilePage,
    PhotoPage,
    UpdateProfilePage,
    SettingsPage,
    AboutPage,
    TermsPage,
    PrivacyPage,
    SupportPage,
    SubscriptionPage,
    PaymentsPage,
    AddSubscriptionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    LoginPage,
    VerifyPage,
    ProfilePage,
    PhotoPage,
    UpdateProfilePage,
    SettingsPage,
    AboutPage,
    TermsPage,
    PrivacyPage,
    SupportPage,
    SubscriptionPage,
    PaymentsPage,
    AddSubscriptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    UserDataProvider,
    BackendProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: Http,
      useFactory: httpInterceptorFactory,
      deps: [XHRBackend, RequestOptions, Storage]
    },
  ]
})
export class AppModule {}
