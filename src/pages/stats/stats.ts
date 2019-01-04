import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events, Content, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';
import { Chart } from 'chart.js';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  @ViewChild('tcbcCanvas') tcbcCanvas;
  @ViewChild('pcbcCanvas') pcbcCanvas;
  loader: any;
  loading: Loading;
  tcbcChart: any;
  pcbcChart: any;
  PercentageCorrectByTopic: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.PercentageCorrectByTopic = {}
  }
  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    this.start()
  }

  getTestCompositionByCategories() {
    this.backendService.getTestCompositionByCategories().subscribe(data => {
      if (data.success) {
        this.tcbcChart = new Chart(this.tcbcCanvas.nativeElement, { 
          type: 'doughnut',
          data: {
              labels: data.data.labels,
              datasets: [{
                  label: 'Test Composition by Categories',
                  data: data.data.data,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                  ]
              }]
          }

      });
      }
    }, (error) => {
      console.log(error);
    });
  }

  getPercentageCorrectByCategories() {
    this.backendService.getPercentageCorrectByCategories().subscribe(data => {
      if (data.success) {
        this.pcbcChart = new Chart(this.pcbcCanvas.nativeElement, { 
          type: 'pie',
          data: {
              labels: data.data.labels,
              datasets: [{
                  label: 'Percentage Correct by Categories',
                  data: data.data.data,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                  ]
              }]
          }

      });
      
      }
    }, (error) => {
      console.log(error);
    });
  };

  getLeastPerformedCategories = function () {
    this.PercentageCorrectByTopic = {};
    this.backendService.getleastperformedcategories().subscribe(data => {
      if (data.success) {
        this.categories = data.data.data;
      }
    }, (error) => {
      console.log(error);
    });
  };


  doRefresh(refresher) {
    this.start()
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  start() {
    this.loader.present()
    setTimeout(() => {
      this.getPercentageCorrectByCategories();
      this.getTestCompositionByCategories();
      this.getLeastPerformedCategories();
    }, 1000);
    setTimeout(() => {
      this.loader.dismiss();
    }, 5000);

  }
}