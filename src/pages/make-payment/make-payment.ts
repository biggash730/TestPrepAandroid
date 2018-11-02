import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';
//import { PhotoPage } from '../photo/photo';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-make-payment',
  templateUrl: 'make-payment.html',
})
export class MakePaymentPage {
  loader: any;
  subscription: any;
  formData: any;
  loading: Loading;
  networks = [
    { provider: 'mtn-gh', name: 'MTN Mobile Money' },
    { provider: 'airtel-gh', name: 'Airtel Money' },
    { provider: 'tigo-gh', name: 'Tigo Cash' },
    { provider: 'vodafone-gh', name: 'Vodafone Cash' }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events) {
      this.subscription = {};
      this.subscription = this.navParams.data;
      this.formData = {subscriptionId: this.subscription.id, amount: this.subscription.amount};

    this.loader = this.loadingCtrl.create({
      content: ""
    });
    
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }
  ionViewWillEnter() {
  }

  confirmPayment() {
    var self = this;
    let alert = this.alertCtrl.create({
      title: 'Confirm Payment',
      message: 'Do you want to confirm payment for this subscription?',
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
            self.backendService.confirmPayment(self.formData).subscribe(data => {
              if (data.success) {
                let alert = self.alertCtrl.create({
                  title: 'Payment Initiated Successful',
                  subTitle: data.message,
                  buttons: ['OK']
                });
                alert.present();
                //self.events.publish('Subscription: saved');
                self.navCtrl.pop();
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
