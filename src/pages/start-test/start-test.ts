import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events, Content, ViewController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
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
  selector: 'page-start-test',
  templateUrl: 'start-test.html',
})
export class StartTestPage {
  data: any
  loader: any;
  loading: Loading;
  questions: any[]
  attemptedQuestions: any[]
  question: any
  counter: any
  counterDate: any
  totalQuestions = 0;
  questionNumber = 1;
  interval : any


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events, private viewCtrl: ViewController) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.data = {results:{}}
    this.question = {}
    //this.data = this.navParams.data;
  }
  ionViewDidLoad() {
    this.start()
  }
  ionViewWillEnter() {
  }

  goBack() {
    if (this.questionNumber > 1) {
      this.questionNumber--;
      this.question = this.questions[this.questionNumber - 1];
    }
  }
  goToNext() {
    if (this.questionNumber < this.totalQuestions) {
      this.questionNumber++;
      this.question = this.questions[this.questionNumber - 1];
    }
  }
  startTest() {
    var obj = { categoryIds: this.data.categoryIds, numberOfQuestions: this.data.numberOfQuestions };
    this.loader.present();
    this.backendService.getQuestions(obj).subscribe(data => {
      this.loader.dismissAll();
      if (data.success) {
        this.questions = data.data;
        this.totalQuestions = data.data.length
        this.question = this.questions[this.questionNumber - 1]
        this.beginTest()
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

  cancelTest() {
    let alert = this.alertCtrl.create({
      title: 'Cancel Test',
      message: 'Do you want to cancel this test?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  beginTest() {
    var self = this
    if (this.data.timedTest) {
      this.counter = 60 * this.data.numberOfMinutes;
      this.interval = setInterval(() => {
        if (self.counter === 0) {
          self.submit();
        }
        else {
          self.counter--;
          self.counterDate = new Date(0, 0, 0, 0, 0, 0, 0).setSeconds(self.counter);
        }
      }, 1000);
    }

  }

  submit() {
    let alert = this.alertCtrl.create({
      title: 'Submit Answers',
      message: 'Do you want to submit your answers for review?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            clearInterval(this.interval)
            this.markQuestions()
          }
        }
      ]
    });
    alert.present();
  }

  markQuestions() {
    this.loader.present();
    this.backendService.markQuestions(this.questions).subscribe(data => {
      this.loader.dismissAll();
      if (data.success) {
        this.viewCtrl.dismiss(data.data)
      }
      else {
        this.loader.dismissAll();
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
    this.data = this.navParams.data;
    this.startTest()
  }
}
