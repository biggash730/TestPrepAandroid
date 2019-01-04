import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
  
})
export class VerifyPage {
  phoneNumber:string;
  code: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider, public storage: Storage) {
    userService.setPage("Verify")
  }

  ionViewDidLoad() {
    this.storage.get(this.userService.PHONENUMBER).then((val) => {
      //console.log(val)
      if(val)this.phoneNumber = JSON.parse(val)
    });
  }

  verify(){
    if (!this.code) {
      let alert = this.alertCtrl.create({
          title:'Verification Code Error', 
          subTitle:'Please enter your verification code',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present(); 
var obj = {
  phoneNumber: this.phoneNumber,
  code: this.code
}
      this.backendService.verify(obj).subscribe(data => {
          loader.dismiss();
          if(data.success) 
            {
              let alert = this.alertCtrl.create({
                title:'Logon Complete', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
              this.userService.setLoggedIn()
              this.userService.setCurrentUser(data.data)
              this.userService.setToken(data.data.token)
              this.navCtrl.setRoot(HomePage)
            }
            else{
              let alert = this.alertCtrl.create({
                title:'Logon Failed', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
            }
        }, (error) => {
            loader.dismiss();
            console.log(error);
      });
      loader.dismiss();
    }
    }
}
