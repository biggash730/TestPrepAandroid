import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';
import { PaymentsPage } from '../payments/payments';
//import { LoginPage } from '../login/login';
//import { PhotoPage } from '../photo/photo';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-subscription',
  templateUrl: 'add-subscription.html',
})
export class AddSubscriptionPage {
  loader: any;
  loading: Loading;
  plans: any[]

  total: any = 0
  page: any = 1
  size: any = 2000
  filter: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.plans = []
  }
  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    this.start()
  }

  getPlans() {
    this.backendService.getSubscriptionPlans().subscribe(data => {
      if (data.success) {
        this.plans = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  doRefresh(refresher) {
    this.start()
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  AddSubscription(planId) {
    var self = this;
    let alert = this.alertCtrl.create({
      title: 'Add Subscription',
      message: 'Do you really want to add this Pubscription Plan?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let self = this
            let loader = this.loadingCtrl.create({
              content: "Adding Subscription"
            });
            loader.present().then(() => {
              self.backendService.addSubscriptionPlan(planId).subscribe(data => {
                loader.dismissAll();
                if (data.success) {
                  self.navCtrl.pop();
                }
              }, (error) => {
                loader.dismissAll();
              });
            })
          }
        }
      ]
    });
    alert.present();
  }

  start() {
    this.page = 1;
    this.filter = { pager: { page: this.page, size: this.size } };
    this.plans = []
    this.getPlans()
  }
}
