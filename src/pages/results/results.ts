import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events, Content, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  loader: any;
  loading: Loading;
  results: any[]

  total: any = 0
  page: any = 1
  size: any = 20
  filter: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.results = []
  }
  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    this.start()
  }

  getList() {
    this.loader.present()
    this.backendService.getResults(this.filter).subscribe(data => {
      this.loader.dismissAll();
      if (data.success) {
        this.results = data.data;
        this.total = data.total
      }
    }, (error) => {
      this.loader.dismissAll();
      console.log(error);
    });
  }

  loadMore() {
    this.filter.page = this.filter.page + 1;
    this.getList()
  }

  doRefresh(refresher) {
    this.start()
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  start() {
    this.page = 1;
    this.filter = { page: this.page, size: this.size };
    this.results = []
    this.getList()
  }
}