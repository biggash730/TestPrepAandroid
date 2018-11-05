import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events } from 'ionic-angular';
import { Slides } from 'ionic-angular';
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
  selector: 'page-take-test',
  templateUrl: 'take-test.html',
})
export class TakeTestPage {
  @ViewChild(Slides) slides: Slides;
  data: any
  loader: any;
  loading: Loading;
  kinds: any[]
  types: any[]
  categories: any[]


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.data = {}
    this.kinds = []
    this.types = []
    this.categories = []
  }
  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    this.slides.lockSwipes(true);
    
    this.start()
  }

  kindSelected(id){
    this.data.kindId = id;
this.getTypes(id);
  }

  getkinds() {
    this.backendService.getKinds().subscribe(data => {
      if (data.success) {
        this.kinds = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getTypes(kindId) {
    this.backendService.getTypes(kindId).subscribe(data => {
      if (data.success) {
        this.types = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  start() {
    this.getkinds()
  }
}
