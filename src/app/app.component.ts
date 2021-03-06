import {Component, ViewChild, OnInit} from '@angular/core';
import {Platform, NavController} from 'ionic-angular';
import {Keyboard} from '@ionic-native/keyboard';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';


import {UserManager} from '../providers/user-manager'
import {Utils} from '../utils/utils';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {SplashPage} from '../pages/splash/splash';

declare var FCMPlugin;

@Component({
    templateUrl: 'app.html'
})

export class MyApp implements OnInit {
    @ViewChild('ctsNav') nav: NavController;
    rootPage;
    nextPage;
    platform: Platform;


    constructor(platform: Platform,
                private statusBar: StatusBar,
                private keyboard: Keyboard,
                private splashscreen: SplashScreen,
                private userMgr: UserManager,
                private utils: Utils) {


        this.rootPage = SplashPage;
        this.utils.presentLoading();

        platform.ready().then(() => {
            let lastTimeBackPress = 0;
            let timePeriodToExit = 2000;

            this.statusBar.styleDefault();
            this.splashscreen.hide();
            // this.keyboard.disableScroll(true);


            // do we have a user in storage?
            this.userMgr.checkForToken().then(response => {

                if (response) {
                    this.nextPage = TabsPage;
                } else {
                    this.nextPage = LoginPage;
                }

                // now initialize userMgr vars
                return this.userMgr.initializeVars();


            }).then((response) => {
                setTimeout((nav, utils, page) => {
                    utils.dismissLoading();
                    nav.push(page);
                }, 500, this.nav, this.utils, this.nextPage);

            })
        });
    }

    ngOnInit() {
        //console.log('ngOnInit()');
    };


}
