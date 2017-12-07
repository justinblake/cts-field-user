import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { TaskManager } from '../../providers/task-manager';
import { Utils } from '../../utils/utils';
import { UserManager } from '../../providers/user-manager';
import { LoginPage } from '../login/login';
import { ConversionManager } from "../../providers/conversion-manager";
import { FCM } from "@ionic-native/fcm";
var AlertsPage = /** @class */ (function () {
    function AlertsPage(navCtrl, navParams, userMgr, appCtrl, taskMgr, utils, callNumber, conMgr, alertCtrl, fcm) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.taskMgr = taskMgr;
        this.utils = utils;
        this.callNumber = callNumber;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.pushAlert = navParams.get('message');
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.isCordova = this.taskMgr.returnPlatform().isCordova;
    }
    AlertsPage.prototype.ionViewDidEnter = function () {
        this.loadAlerts();
        this.subscribeAgain();
    };
    AlertsPage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.loadAlerts();
                }
                else if (data.param1 === 'additional_notes') {
                    _this.presentAlert();
                }
                else if (data.param1 === "upcoming_task") {
                    _this.taskMgr.loadHomePage(1);
                    _this.navCtrl.parent.select(0);
                }
                else if (data.param1 === 'crews') {
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    AlertsPage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.parent.select(0);
                    }
                }]
        });
        alert.present();
    };
    // presentDemoAlert() {
    //     let alert = this.alertCtrl.create({
    //         title: 'I got the update',
    //         message: 'I got the update',
    //         cssClass: 'myAlerts',
    //         buttons: ['OK']
    //     });
    //
    //     alert.present();
    // }
    // presentDemoAlert() {
    //     let alert = this.alertCtrl.create({
    //         title: 'I got the update',
    //         message: 'I got the update',
    //         cssClass: 'myAlerts',
    //         buttons: ['OK']
    //     });
    //
    //     alert.present();
    // }
    AlertsPage.prototype.loadAlerts = 
    // presentDemoAlert() {
    //     let alert = this.alertCtrl.create({
    //         title: 'I got the update',
    //         message: 'I got the update',
    //         cssClass: 'myAlerts',
    //         buttons: ['OK']
    //     });
    //
    //     alert.present();
    // }
    function () {
        var _this = this;
        this.utils.presentLoading();
        this.alertsLoaded = false;
        this.taskMgr.getEmployeeAlerts().then(function (response) {
            if (_this.debug) {
                console.log('response ', JSON.stringify(response));
            }
            if (response.data.length === 0) {
                _this.hasAlerts = false;
            }
            else {
                _this.hasAlerts = true;
            }
            _this.alerts = response;
            _this.user = response.userdata;
            _this.alertsLoaded = true;
            if (_this.debug) {
                console.log('this.pushAlert', JSON.stringify(_this.pushAlert));
                console.log('this.alerts', JSON.stringify(_this.alerts));
            }
            _this.utils.dismissLoading();
        }).catch(function (error) {
            _this.utils.dismissLoading();
            setTimeout(function () {
                _this.utils.toastError(error);
            }, 500);
        });
    };
    AlertsPage.prototype.loadAgain = function () {
        this.didLoad = true;
    };
    AlertsPage.prototype.callPhone = function (number) {
        if (this.isCordova) {
            this.callNumber.callNumber(number, false)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
    };
    // demoUpdate() {
    //     console.log("I have received the update");
    //     this.presentDemoAlert();
    // }
    // demoUpdate() {
    //     console.log("I have received the update");
    //     this.presentDemoAlert();
    // }
    AlertsPage.prototype.readMessage = 
    // demoUpdate() {
    //     console.log("I have received the update");
    //     this.presentDemoAlert();
    // }
    function (i) {
        var _this = this;
        var holdObj = {
            alertId: this.alerts.data[i].id
        };
        if (this.alerts.data[i].viewed !== 1) {
            this.taskMgr.markEmployeeAlertRead(holdObj).then(function (response) {
                _this.alerts.data[i].time_stamp_viewed = response.data.time_stamp_viewed;
                _this.taskMgr.badgeNumber -= 1;
            }).catch(function (error) {
                _this.utils.dismissLoading();
                setTimeout(function () {
                    _this.utils.toastError(error);
                }, 500);
            });
        }
        if (this.displayAlert != i) {
            this.displayAlert = i;
        }
        else {
            this.displayAlert = -1;
        }
        this.alerts.data[i].viewed = 1;
    };
    AlertsPage.prototype.logout = function () {
        var _this = this;
        this.userMgr.logout().then(function (response) {
            _this.appCtrl.getRootNav().push(LoginPage);
        });
    };
    AlertsPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    return AlertsPage;
}());
export { AlertsPage };
//# sourceMappingURL=alerts.js.map