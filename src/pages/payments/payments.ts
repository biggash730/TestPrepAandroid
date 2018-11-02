import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';
//import { LoginPage } from '../login/login';
//import { PhotoPage } from '../photo/photo';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  loader: any;
  loading: Loading;
  payments: any[]

  total: any = 0
  page: any = 1
  size: any = 20
  filter: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.payments = []
  }
  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    this.start()
  }

  newPayment() {
    this.events.subscribe('Payment: saved', () => {
      this.start()
    });
  }

  getList() {
    this.backendService.getPayments(this.filter).subscribe(data => {
      if (data.success) {
        this.payments = data.data;
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
    this.payments = []
    this.getList()
  }
}
