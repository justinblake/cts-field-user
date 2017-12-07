import { Component, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams, Content, App, AlertController } from 'ionic-angular';
import { TaskManager } from '../../providers/task-manager';
import { Utils } from '../../utils/utils';
import { UserManager } from '../../providers/user-manager';
import { LoginPage } from '../login/login';
import { TimecardSearchPage } from "../timecard-search/timecard-search";
import { ConversionManager } from "../../providers/conversion-manager";
import { FCM } from "@ionic-native/fcm";
var TimecardKeysPipe = /** @class */ (function () {
    function TimecardKeysPipe() {
    }
    TimecardKeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value); //.map(key => value[key]);
    };
    return TimecardKeysPipe;
}());
export { TimecardKeysPipe };
var TimecardPage = /** @class */ (function () {
    function TimecardPage(navCtrl, navParams, userMgr, appCtrl, taskMgr, utils, alertCtrl, conMgr, fcm) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.taskMgr = taskMgr;
        this.utils = utils;
        this.alertCtrl = alertCtrl;
        this.conMgr = conMgr;
        this.fcm = fcm;
        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    TimecardPage.prototype.ionViewDidEnter = function () {
        this.subscribeAgain();
        this.loadTodaysTime();
    };
    TimecardPage.prototype.subscribeAgain = function () {
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
    TimecardPage.prototype.presentAlert = function () {
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
    TimecardPage.prototype.loadTodaysTime = function (test) {
        var _this = this;
        this.utils.presentLoading();
        var myTime = this.conMgr.convertDateTime(Date.now());
        this.currentDate = new Date(myTime).toISOString().slice(0, 10);
        this.startDate = new Date(Date.now()).toISOString();
        this.endDate = new Date(Date.now()).toISOString();
        this.taskMgr.loadTodaysTime(this.userId).then(function (response) {
            if (response.data.length === 0) {
                _this.noEntry = true;
            }
            _this.todaysTime = response.data;
            var dupArray = [];
            for (var i = 0; i < _this.todaysTime.length; i++) {
                var newEntryYear = _this.todaysTime[i].timestamp.slice(0, 10);
                var newEntryTime = _this.todaysTime[i].timestamp.slice(11);
                _this.todaysTime[i].timestamp = newEntryYear + 'T' + newEntryTime;
                if (_this.todaysTime[i].alt_timestamp === null) {
                    _this.todaysTime[i].alt_timestamp = _this.todaysTime[i].timestamp;
                }
                if (_this.todaysTime[i].notes === "NULL") {
                    _this.todaysTime[i].notes = '';
                }
                _this.todaysTime[i].originalNotes = _this.todaysTime[i].notes;
                if (_this.todaysTime[i].alt_timestamp) {
                    var newYear = _this.todaysTime[i].alt_timestamp.slice(0, 10);
                    var newTime = _this.todaysTime[i].alt_timestamp.slice(11);
                    _this.todaysTime[i].alt_timestamp = newYear + 'T' + newTime;
                    _this.todaysTime[i].timestamp = _this.todaysTime[i].alt_timestamp;
                    var compareMonthAndDay = _this.todaysTime[i].alt_timestamp[5] + '' + _this.todaysTime[i].alt_timestamp[6] + '' + _this.todaysTime[i].alt_timestamp[8] + '' + _this.todaysTime[i].alt_timestamp[9];
                    var compareCurrentDay = _this.currentDate[5] + '' + _this.currentDate[6] + '' + _this.currentDate[8] + '' + _this.currentDate[9];
                    if (compareMonthAndDay === compareCurrentDay) {
                        dupArray.push(_this.todaysTime[i]);
                    }
                }
            }
            _this.todaysTime = dupArray;
            _this.utils.dismissLoading();
        });
        this.showSearchResults = false;
    };
    TimecardPage.prototype.updateTodaysTimecard = function (id, newTime, repeatIndex, newestNote) {
        var _this = this;
        var notes = '';
        if (newestNote === '') {
            notes = "NULL";
        }
        else {
            notes = newestNote;
        }
        var newYear = newTime.slice(0, 10);
        var newestTime = newTime.slice(11, 19);
        var alt_timestamp = newYear + ' ' + newestTime;
        this.taskMgr.updateTimecard(this.userId, id, alt_timestamp, notes).then(function (res) {
            console.log('Timecard res ', JSON.stringify(res));
            _this.todaysTime[repeatIndex].alt_timestamp = newTime;
            _this.todaysTime[repeatIndex].timestamp = newTime;
            _this.todaysTime[repeatIndex].notes = newestNote;
            _this.todaysTime[repeatIndex].originalNotes = newestNote;
        });
    };
    // function to sort timecard data into their individual days
    // function to sort timecard data into their individual days
    TimecardPage.prototype.groupBy = 
    // function to sort timecard data into their individual days
    function (array, property) {
        var hash = {};
        for (var i = 0; i < array.length; i++) {
            if (!hash[array[i][property]])
                hash[array[i][property]] = [];
            hash[array[i][property]].push(array[i]);
        }
        return hash;
    };
    TimecardPage.prototype.logout = function () {
        var _this = this;
        this.userMgr.logout().then(function (response) {
            _this.appCtrl.getRootNav().push(LoginPage);
        });
    };
    TimecardPage.prototype.goToSearch = function () {
        this.navCtrl.push(TimecardSearchPage).then(function (response) {
            console.log('response', JSON.stringify(response));
        });
    };
    return TimecardPage;
}());
export { TimecardPage };
//# sourceMappingURL=timecard.js.map