import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { VerifyPage } from '../verify/verify';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  
})
export class LoginPage {
  phoneNumber:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider, public storage: Storage) {
    userService.setPage("Login")
  }

  ionViewDidLoad() {
    this.storage.get(this.userService.PHONENUMBER).then((val) => {
      console.log(val)
      if(val){
        
      }
      this.phoneNumber = JSON.parse(val)
    });
  }

  login(){
    if (!this.phoneNumber) {
      let alert = this.alertCtrl.create({
          title:'Phone Number Error', 
          subTitle:'Please enter a valid phone number',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Logon Initiated..."
      });
      loader.present();  

      this.backendService.login(this.phoneNumber).subscribe(data => {
          //console.log(data)
          loader.dismiss();
          if(data.success) 
            {
              let alert = this.alertCtrl.create({
                title:'Verify to complete logon', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
              this.userService.setPhoneNumber(this.phoneNumber)
              this.navCtrl.setRoot(VerifyPage)
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
