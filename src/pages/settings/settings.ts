import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';
import { Storage } from '@ionic/storage';

import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
import { TermsPage } from '../terms/terms';
import { SupportPage } from '../support/support';
import { PrivacyPage } from '../privacy/privacy';
import { SubscriptionPage } from '../subscription/subscription';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public userService: UserDataProvider, public backendService: BackendProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SettingsPage');
  }
  ionViewWillEnter(){
    }
  openProfile(){
    this.navCtrl.push(ProfilePage);
  }

  openTerms(){
    this.navCtrl.push(TermsPage);
  }
  openAbout(){
    this.navCtrl.push(AboutPage);
  }
  openPrivacy(){
    this.navCtrl.push(PrivacyPage);
  }
  openSupport(){
    this.navCtrl.push(SupportPage);
  }
  openSubscription(){
    this.navCtrl.push(SubscriptionPage);
  }
}
