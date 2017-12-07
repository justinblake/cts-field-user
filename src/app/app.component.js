import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { UserManager } from '../providers/user-manager';
import { Utils } from '../utils/utils';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SplashPage } from '../pages/splash/splash';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, keyboard, splashscreen, userMgr, utils) {
        var _this = this;
        this.statusBar = statusBar;
        this.keyboard = keyboard;
        this.splashscreen = splashscreen;
        this.userMgr = userMgr;
        this.utils = utils;
        this.rootPage = SplashPage;
        this.utils.presentLoading();
        platform.ready().then(function () {
            var lastTimeBackPress = 0;
            var timePeriodToExit = 2000;
            _this.statusBar.styleDefault();
            _this.splashscreen.hide();
            _this.keyboard.disableScroll(true);
            // do we have a user in storage?
            // do we have a user in storage?
            _this.userMgr.checkForToken().then(function (response) {
                if (response) {
                    _this.nextPage = TabsPage;
                }
                else {
                    _this.nextPage = LoginPage;
                }
                // now initialize userMgr vars
                return _this.userMgr.initializeVars();
            }).then(function (response) {
                setTimeout(function (nav, utils, page) {
                    utils.dismissLoading();
                    nav.push(page);
                }, 500, _this.nav, _this.utils, _this.nextPage);
            });
        });
    }
    MyApp.prototype.ngOnInit = function () {
        //console.log('ngOnInit()');
    };
    ;
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map