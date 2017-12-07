import { Component, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { NavController, App, Modal, Content, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { DrivingDirectionsPage } from '../driving-directions/driving-directions';
import { LoginPage } from '../login/login';
import { GoogleMapsManager } from '../../providers/google-maps-manager';
import { Geolocation } from '@ionic-native/geolocation';
import { TaskManager } from '../../providers/task-manager';
import { UserManager } from '../../providers/user-manager';
import { Utils } from '../../utils/utils';
import { Animations } from '../../animations/animations';
import { Diagnostic } from "@ionic-native/diagnostic";
import { ConversionManager } from "../../providers/conversion-manager";
import { FCM } from "@ionic-native/fcm";
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value);
    };
    return KeysPipe;
}());
export { KeysPipe };
var NextDayPage = /** @class */ (function () {
    function NextDayPage(navCtrl, userMgr, appCtrl, taskMgr, mapsManager, geolocation, utils, callNumber, diagnostic, conMgr, alertCtrl, fcm) {
        this.navCtrl = navCtrl;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.taskMgr = taskMgr;
        this.mapsManager = mapsManager;
        this.geolocation = geolocation;
        this.utils = utils;
        this.callNumber = callNumber;
        this.diagnostic = diagnostic;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.user = this.userMgr.getUser();
        this.userId = this.user.userId;
        this.role_id = this.user.role_id;
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.divState = 'collapse';
    }
    NextDayPage.prototype.ionViewDidEnter = function () {
        this.loadTomorrowsTasks(this.userId);
        this.subscribeAgain();
    };
    NextDayPage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.navCtrl.parent.select(3);
                }
                else if (data.param1 === 'additional_notes') {
                    _this.presentAlert();
                }
                else if (data.param1 === "upcoming_task") {
                    _this.presentFutureAlert();
                }
                else if (data.param1 === 'crews') {
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    NextDayPage.prototype.presentAlert = function () {
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
    NextDayPage.prototype.presentFutureAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Dispatched',
            message: 'You have been assigned a new task. Please accept or reject before continuing',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.taskMgr.loadHomePage(0);
                        _this.loadTomorrowsTasks(_this.userId);
                    }
                }]
        });
        alert.present();
    };
    /** logs the user out of the app */
    /** logs the user out of the app */
    NextDayPage.prototype.logout = /** logs the user out of the app */
    function () {
        var _this = this;
        this.userMgr.logout().then(function (response) {
            _this.appCtrl.getRootNav().push(LoginPage);
        });
    };
    NextDayPage.prototype.toggleDivState = function () {
        var states = {
            expand: 'collapse',
            collapse: 'expand'
        };
        this.divState = states[this.divState];
    };
    NextDayPage.prototype.loadTomorrowsTasks = function (userId) {
        var _this = this;
        this.utils.presentLoading();
        this.taskMgr.loadNextDayTaskByDate(userId).then(function (response) {
            _this.nextDayTask = response;
            if (_this.nextDayTask.data === {}) {
                _this.showTasks = false;
                _this.utils.dismissLoading();
            }
            else {
                _this.showTasks = true;
                _this.user = response.user;
                var myKey1 = Object.keys(_this.nextDayTask.data);
                for (var m = 0; m < myKey1.length; m++) {
                    var firstKey = _this.nextDayTask.data[Object.keys(_this.nextDayTask.data)[m]];
                    firstKey.sort(function (a, b) {
                        return (a.task_start_time > b.task_start_time) ? 1 : ((b.task_start_time > a.task_start_time) ? -1 : 0);
                    });
                }
                _this.utils.dismissLoading();
            }
        });
    };
    NextDayPage.prototype.openRejectModal = function (statusId, taskId, dateKey, taskIndex, notes) {
        var _this = this;
        var modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss(function (data) {
            if (data.save === true) {
                _this.setStatus(statusId, taskId, dateKey, taskIndex, data.notes);
            }
        });
    };
    NextDayPage.prototype.showContractorInfo = function (index) {
        if (this.showContractor === index) {
            this.showContractor = -1;
        }
        else {
            this.showContractor = index;
        }
    };
    NextDayPage.prototype.showDrivingDirections = function (lat, lon) {
        var _this = this;
        this.utils.presentLoading();
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.utils.presentToast("Please enable your location in device settings", true);
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please enable your location in device settings", true);
            _this.utils.dismissLoading();
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(function (resp) {
            if (locEnabled) {
                var destination_1 = lat + "," + lon;
                _this.geolocation.getCurrentPosition({ timeout: 15000 }).then(function (position) {
                    var origin = position.coords.latitude + "," + position.coords.longitude;
                    return _this.mapsManager.getDirections(origin, destination_1);
                }).then(function (response) {
                    var params = {
                        directions: response
                    };
                    setTimeout(function () {
                        _this.navCtrl.push(DrivingDirectionsPage, params);
                        _this.utils.dismissLoading();
                    }, 2000);
                }).catch(function (error) {
                    _this.utils.dismissLoading();
                    if (_this.debug) {
                        console.log("ERROR: " + Utils.toJson(error));
                    }
                    _this.utils.presentToast("Please enable your location in device settings", true);
                });
            }
            if (locEnabled === false) {
                _this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    };
    NextDayPage.prototype.expandDateTasks = function (index) {
        if (this.expandDate === index) {
            this.expandDate = -1;
        }
        else {
            this.expandDate = index;
        }
    };
    NextDayPage.prototype.expandTask = function (id, index) {
        if (this.expandTaskId === id && this.taskId === index) {
            if (!this.isIos) {
                this.content.scrollTo(0, 0, 300).then(function (res) {
                });
            }
            this.expandTaskId = -1;
            this.taskId = -1;
        }
        else {
            if (!this.isIos) {
                this.content.scrollTo(0, ((index * 50) + 50), 300).then(function (res) {
                });
            }
            this.expandTaskId = id;
            this.taskId = index;
        }
    };
    NextDayPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    NextDayPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    return NextDayPage;
}());
export { NextDayPage };
//# sourceMappingURL=next-day.js.map