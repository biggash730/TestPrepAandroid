import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { UserDataProvider } from '../providers/user-data';
import { BackendProvider } from '../providers/backend';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { SettingsPage } from '../pages/settings/settings';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { TakeTestPage } from '../pages/take-test/take-test';
import { ResultsPage } from '../pages/results/results';
import { StatsPage } from '../pages/stats/stats';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  user: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController, public userService: UserDataProvider, public storage: Storage, public backendService: BackendProvider, public events: Events) {
    this.user = { name: "" }
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.events.subscribe('Profile: Updated', () => {
        this.refreshUser();
      })

      //get user
      this.storage.get(this.userService.HAS_LOGGED_IN).then((val) => {

        //console.log(val)
        var res = JSON.parse(val);
        if (res) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = IntroPage;
        }

        //get user
        this.getUser()
      });


    });
  }

  getUser() {
    this.storage.get(this.userService.CURRENT_USER).then((val) => {
      //console.log(val)
      if (val) this.user = JSON.parse(val)
    });
  }

  refreshUser() {
    this.backendService.getProfile().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.storage.set(this.userService.CURRENT_USER, JSON.stringify(data.data))
        this.user = data.data;
      }
    }, (error) => {
    });
  }

  openPage(page: string) {
    switch (page) {
      case "home":
        this.nav.setRoot(HomePage);
        break;
      case "settings":
        this.nav.setRoot(SettingsPage);
        break;
      case "subscriptions":
        this.nav.setRoot(SubscriptionPage);
        break;
      case "test":
        this.nav.setRoot(TakeTestPage);
        break;
      case "results":
        this.nav.setRoot(ResultsPage);
        break;
      case "stats":
        this.nav.setRoot(StatsPage);
        break;
      default:
        this.nav.setRoot(HomePage);
        break;
    }

  }

  logout() {
    //let self = this
    let alert = this.alertCtrl.create({
      title: 'App Logout',
      message: 'Are you sure you want to be logged out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Cancel the request');
            this.backendService.logout().subscribe(data => {
              //console.log(data)
              if (data.success) {
                this.storage.remove(this.userService.HAS_LOGGED_IN)
                this.nav.setRoot(IntroPage);
              }
            }, (error) => {
              console.log(error);
            });
          }
        }
      ]
    });
    alert.present();

  }
}
