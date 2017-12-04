"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_native_1 = require("ionic-native");
var tabs_1 = require("../pages/tabs/tabs");
var login_1 = require("../pages/login/login");
var splash_1 = require("../pages/splash/splash");
var MyApp = (function () {
    function MyApp(platform, userMgr, loadingCtrl, utils) {
        //userMgr.isLoggedIn() ? this.rootPage = SplashPage : this.rootPage = SplashPage;
        var _this = this;
        this.userMgr = userMgr;
        this.loadingCtrl = loadingCtrl;
        this.utils = utils;
        // show the splash page while things get intitialized
        // also sets the root nav above the tabs nav
        this.rootPage = splash_1.SplashPage;
        this.utils.presentLoading();
        platform.ready().then(function () {
            console.log('Platform is ready');
            ionic_native_1.StatusBar.styleDefault();
            ionic_native_1.Splashscreen.hide();
            ionic_native_1.Keyboard.disableScroll(true);
            // do we have a user in storage?
            _this.userMgr.checkForToken().then(function (response) {
                if (response) {
                    _this.nextPage = tabs_1.TabsPage;
                }
                else {
                    _this.nextPage = login_1.LoginPage;
                }
                // now initialize userMgr vars
                return _this.userMgr.initializeVars();
            }).then(function (response) {
                // vars are initialized...
                // wait half a second before dismissing loading 
                // and pushing the nav stack
                // makes for a cleaner transition
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
__decorate([
    core_1.ViewChild('ctsNav')
], MyApp.prototype, "nav");
MyApp = __decorate([
    core_1.Component({
        templateUrl: 'app.html'
    })
], MyApp);
exports.MyApp = MyApp;
