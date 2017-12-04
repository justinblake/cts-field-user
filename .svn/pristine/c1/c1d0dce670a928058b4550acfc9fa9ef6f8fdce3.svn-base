"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_native_1 = require("ionic-native");
var tabs_1 = require("../tabs/tabs");
var utils_1 = require("../../utils/utils");
var LoginPage = (function () {
    function LoginPage(platform, navCtrl, navParams, userMgr, utils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userMgr = userMgr;
        this.utils = utils;
        this.isLoggedIn = false;
        this.credentials = {
            email: '',
            password: ''
        };
        //this.isLoggedIn = this.userMgr.isLoggedIn();
        //console.log('IS LOGGED IN? ' + this.isLoggedIn);
        this.platform = platform;
        this.platform.ready().then(function () {
            //StatusBar.styleDefault();
            //Splashscreen.hide();
            ionic_native_1.Keyboard.disableScroll(true);
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        //this.isLoggedIn = this.userMgr.isLoggedIn();
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        // fix for android hiding the text input //
        this.platform.ready().then(function () {
            ionic_native_1.Keyboard.disableScroll(true);
        });
        // disable back button to fix navigation //
        // otherwise back button could take you back to tasks //
        this.platform.registerBackButtonAction(function () {
            //do nothing....
        });
        this.isLoggedIn = this.userMgr.isLoggedIn();
        console.log('ionViewDidEnter LoginPage');
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        // reverse android keyboard workaround //
        this.platform.ready().then(function () {
            ionic_native_1.Keyboard.disableScroll(false);
        });
        this.platform.registerBackButtonAction(function () {
            //this.navCtrl.pop();
        });
    };
    /** used to enable/disable login button */
    LoginPage.prototype.disableForm = function () {
        return this.credentials.email.trim().length < 1 || this.credentials.password.trim().length < 1;
    };
    // yep //
    LoginPage.prototype.trimNotes = function () {
        this.credentials.email = this.credentials.email.trim();
    };
    /** log the user in */
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        this.utils.presentLoading('Logging in...');
        var credentials = {};
        Object.assign(credentials, this.credentials);
        console.log("" + utils_1.Utils.toJson(this.credentials));
        this.userMgr.authenticate(credentials).then(function (valid) {
            _this.utils.dismissLoading();
            if (valid) {
                _this.navCtrl.push(tabs_1.TabsPage);
            }
            else {
                var msg = "Unable to log you in. Check your username and password and try again";
                _this.utils.presentToast(msg, true, 'OK');
            }
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    core_1.Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    })
], LoginPage);
exports.LoginPage = LoginPage;
