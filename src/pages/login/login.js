import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { TabsPage } from '../tabs/tabs';
import { UserManager } from '../../providers/user-manager';
import { TaskManager } from '../../providers/task-manager';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Utils } from '../../utils/utils';
var LoginPage = /** @class */ (function () {
    function LoginPage(platform, navCtrl, navParams, userMgr, taskMgr, utils, alertCtrl, iab) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userMgr = userMgr;
        this.taskMgr = taskMgr;
        this.utils = utils;
        this.alertCtrl = alertCtrl;
        this.iab = iab;
        this.platform = platform;
        this.platform.ready().then(function () {
            Keyboard.disableScroll(true);
        });
        this.appVersion = this.utils.returnAppVersion();
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        if (this.debug) {
            console.log('ionViewDidLoad LoginPage');
        }
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        this.platform.ready().then(function () {
            Keyboard.disableScroll(true);
        });
        // disable back button to fix navigation //
        // otherwise back button could take you back to tasks //
        this.platform.registerBackButtonAction(function () {
            //do nothing....
        });
        this.isLoggedIn = this.userMgr.isLoggedIn();
        if (this.debug) {
            console.log('ionViewDidEnter LoginPage');
        }
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        // reverse android keyboard workaround //
        this.platform.ready().then(function () {
            Keyboard.disableScroll(false);
        });
        this.platform.registerBackButtonAction(function () {
            //this.navCtrl.pop();
        });
    };
    /** used to enable/disable login button */
    /** used to enable/disable login button */
    LoginPage.prototype.disableForm = /** used to enable/disable login button */
    function () {
        return this.credentials.email.trim().length < 1 || this.credentials.password.trim().length < 1;
    };
    // yep //
    // yep //
    LoginPage.prototype.trimNotes = 
    // yep //
    function () {
        this.credentials.email = this.credentials.email.trim();
    };
    LoginPage.prototype.validateEmail = function (email) {
        var _this = this;
        var data = { "email": email };
        this.taskMgr.validateEmail(data).then(function (res) {
            if (res.code === 0) {
                _this.validEmail = true;
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Email Not Found',
                    message: 'The email address was not found. Please select cancel to re-enter your email address or select CTS Home to get more information about the CTS suite of tools.',
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: function () {
                                if (_this.debug) {
                                    console.log('Cancel clicked');
                                }
                            }
                        },
                        {
                            text: 'CTS Home',
                            handler: function () {
                                var options = "location=no";
                                _this.iab.create("https://www.cleartasksolutions.com/#contact", "_system", options);
                            }
                        }
                    ]
                });
                alert_1.present();
                _this.showEmailPrompt = true;
            }
        });
    };
    LoginPage.prototype.backToEmail = function () {
        this.credentials.email = '';
        this.validEmail = false;
    };
    /** log the user in */
    /** log the user in */
    LoginPage.prototype.doLogin = /** log the user in */
    function () {
        var _this = this;
        this.utils.presentLoading('Logging in...');
        var credentials = {};
        Object.assign(credentials, this.credentials);
        console.log('credentials ', JSON.stringify(credentials));
        this.userMgr.md5Password(credentials).then(function (res) {
            console.log('res ', JSON.stringify(res));
            credentials.password = res.md5Pass;
            _this.userMgr.authenticate(credentials).then(function (valid) {
                _this.utils.dismissLoading();
                if (valid) {
                    _this.navCtrl.push(TabsPage);
                }
                else {
                    var msg = "Unable to log you in. Check your username and password and try again";
                    _this.utils.presentToast(msg, true, 'OK');
                }
            });
        });
    };
    LoginPage.prototype.showPasswordReset = function () {
        this.showEmail = true;
    };
    LoginPage.prototype.resetPassword = function () {
        this.taskMgr.resetPassword(this.resetEmail);
        this.resetEmail = '';
        this.showEmail = false;
    };
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map