import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events, Content } from 'ionic-angular';
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
  @ViewChild('pageTop') pageTop: Content;
  data: any
  loader: any;
  loading: Loading;
  kinds: any[]
  types: any[]
  categories: any[]
  questions: any[]


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.data = {}
    this.kinds = []
    this.types = []
    this.categories = []
    this.questions = []

  }
  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    this.slides.lockSwipes(true);

    this.start()
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

  kindSelected(id) {
    this.data.kindId = id;
    this.loader.present();
    this.backendService.getTypes(id).subscribe(data => {
      this.loader.dismissAll();
      if (data.success) {
        this.types = data.data;
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'System Error',
          subTitle: data.message,
          buttons: ['OK']
        });
        alert.present();
      }
    }, (error) => {
      this.loader.dismissAll();
      console.log(error);
    });
    this.loader.dismissAll();
  }

  typeSelected(id) {
    this.data.kindId = id;
    this.loader.present();
    this.backendService.getCategories(id).subscribe(data => {
      this.loader.dismissAll();
      if (data.success) {
        this.categories = data.data;
        this.data.SelectAll = false;
        this.goToNext();
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'System Error',
          subTitle: data.message,
          buttons: ['OK']
        });
        alert.present();
      }
    }, (error) => {
      this.loader.dismissAll();
      console.log(error);
    });
    this.loader.dismissAll();
  }

  goBack() {
    //var i  = this.slides.getActiveIndex();
    this.slides.lockSwipes(false);
    this.slides.slidePrev()    
    this.slides.lockSwipes(true);
  }
  goToNext(){
    //var i  = this.slides.getActiveIndex();
    this.slides.lockSwipes(false);
    this.slides.slideNext()    
    this.slides.lockSwipes(true);
  }
  selectAllCategories() {    
    var state = this.data.SelectAll;
    this.categories.forEach(function(x) {
      x.selected = state
    })
  }
  continue(){
    var self = this;
    this.data.categoryNames = "";
    this.data.categories = [];
    this.data.categoryIds = [];
    this.categories.forEach(function(x){
      if(x.selected){
        self.data.categories.push(x);
        self.data.categoryIds.push(x.id)
        self.data.categoryNames = self.data.categoryNames+x.name+", ";
      }
    });
    if(this.data.categories.length == 0){
      let alert = self.alertCtrl.create({
        title: 'Select Categories',
        subTitle: "Please select at least  1 category",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    var lnt = self.data.categoryNames.length - 2;
    self.data.categoryNames = self.data.categoryNames.substring(0, lnt);
    self.data.numberOfMinutes = 15;
    self.data.numberOfQuestions = 30;
    self.data.timedTest = false;
    this.pageTop.scrollToTop();
    this.goToNext();
  }

  startTest() {
    var obj = {categoryIds: this.data.categoryIds, numberOfQuestions: this.data.numberOfQuestions};
    this.loader.present();
    this.backendService.getQuestions(obj).subscribe(data => {
      this.loader.dismissAll();
      if (data.success) {
        this.questions = data.data;
        this.goToNext();
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'System Error',
          subTitle: data.message,
          buttons: ['OK']
        });
        alert.present();
      }
    }, (error) => {
      this.loader.dismissAll();
      console.log(error);
    });
    this.loader.dismissAll();
  }

 

  start() {
    this.getkinds()
  }
}
