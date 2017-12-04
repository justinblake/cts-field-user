import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/** Splash page */

@Component({
    selector: 'page-splash',
    templateUrl: 'splash.html'
})
export class SplashPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SplashPage');
    }

    ionViewDidEnter() {

    }


}
