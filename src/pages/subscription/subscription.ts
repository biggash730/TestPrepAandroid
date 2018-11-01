import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';
import { timingSafeEqual } from 'crypto';
//import { LoginPage } from '../login/login';
//import { PhotoPage } from '../photo/photo';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {
  loader: any;
  active: any;
  loading: Loading;
  subscriptions: any[]

  total: any = 0
  page: any = 1
  size: any = 20
  filter: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    //this.start();
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }
  ionViewWillEnter() {
    this.start()
  }

  AddSubscription() {
    //this.navCtrl.push(UpdateProfilePage);
  }

  ViewPayments() {
    //this.navCtrl.push(PhotoPage);
  }

  newSubscription() {
    this.events.subscribe('Subscription: saved', () => {
      this.start()
    });
  }
  getActive() {
    let self = this
    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present().then(() => {
      self.backendService.getActiveSubscription().subscribe(data => {
        loader.dismissAll();
        if (data.success) {
          self.active = data.data;
        }
      }, (error) => {
        loader.dismissAll();
      });
    })
  }

  getList(){
    this.backendService.getSubscriptions(this.filter).subscribe(data => {
      if (data.success) {
        this.subscriptions = data.data;
        this.total = data.total
      }
    }, (error) => {
      console.log(error);
    });
  }

  loadMore() {
    let self = this
    self.filter.pager.page = self.filter.pager.page + 1;
    self.getList()
  }

  doRefresh(refresher) {    
    this.start()
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  start() {
    this.page = 1;
    this.filter = { pager: { page: this.page, size: this.size } };
    this.active = {};
    this.getActive()
    this.getList()
  }

}
