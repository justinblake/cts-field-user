import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Utils } from '../../utils/utils';
import { CalendarController } from '../../components/ion2-calendar';
import { TaskManager } from "../../providers/task-manager";
import { UserManager } from "../../providers/user-manager";
import { ConversionManager } from "../../providers/conversion-manager";
import { FCM } from "@ionic-native/fcm";
var TimecardSearchPage = /** @class */ (function () {
    function TimecardSearchPage(navCtrl, calendarCtrl, utils, taskMgr, userMgr, conMgr, alertCtrl, fcm) {
        this.navCtrl = navCtrl;
        this.calendarCtrl = calendarCtrl;
        this.utils = utils;
        this.taskMgr = taskMgr;
        this.userMgr = userMgr;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    TimecardSearchPage.prototype.ionViewDidEnter = function () {
        this.subscribeAgain();
    };
    TimecardSearchPage.prototype.subscribeAgain = function () {
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
    TimecardSearchPage.prototype.presentAlert = function () {
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
    TimecardSearchPage.prototype.dateRange = function () {
        var _this = this;
        this.showSearchResults = false;
        this.startDay = -1;
        this.calendarCtrl.openCalendar({
            pickMode: 'range',
            title: '',
            canBackwardsSelected: true,
            color: 'timecard',
            autoDone: true,
            from: new Date(Date.now() - 7884000000)
        }).then(function (res) {
            _this.startDay = res.from.time;
            _this.endDay = res.to.time;
        })
            .catch(function (err) { return console.log(err); });
    };
    TimecardSearchPage.prototype.updateEntry = function (num) {
        if (num === 0) {
            return this.startDay;
        }
        else if (num === 1) {
            return this.endDay;
        }
    };
    TimecardSearchPage.prototype.timecardSearch = function () {
        var _this = this;
        this.holdArray = [];
        this.utils.presentLoading();
        var hasTime = false;
        var tempStart = this.conMgr.convertDateTime(this.startDay + 86400000);
        var tempEnd = this.conMgr.convertDateTime(this.endDay + 86400000);
        this.taskMgr.loadTimeCardTotal(this.userId, tempStart, tempEnd).then(function (response) {
            _this.timecardHistory = response.data;
            if (response.data.length > 0) {
                hasTime = true;
            }
            _this.utils.dismissLoading();
        });
        this.showSearchResults = true;
    };
    TimecardSearchPage.prototype.returnTime = function (time) {
        return this.conMgr.convertTimeToT(time);
    };
    TimecardSearchPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    TimecardSearchPage.prototype.convertSeconds = function (dateObject) {
        var timeObject = this.conMgr.secondsToTime(dateObject.total_seconds);
        if (timeObject.hour < 0 || timeObject.min < 0 || timeObject.sec < 0) {
            return "Incomplete";
        }
        else {
            if (this.holdArray.indexOf(dateObject.date) === -1) {
                this.totalSearchSeconds += dateObject.total_seconds;
                this.holdArray.push(dateObject.date);
            }
            return timeObject.hour + ' hrs ' + timeObject.min + ' min';
        }
    };
    TimecardSearchPage.prototype.convertTotalSeconds = function () {
        var timeObject = this.conMgr.secondsToTime(this.totalSearchSeconds);
        return timeObject.hour + ' hrs ' + timeObject.min + ' min';
    };
    // function to sort timecard data into their individual days
    // function to sort timecard data into their individual days
    TimecardSearchPage.prototype.groupBy = 
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
    TimecardSearchPage.prototype.searchDate = function (date) {
        return this.conMgr.convertDate(date);
    };
    return TimecardSearchPage;
}());
export { TimecardSearchPage };
//# sourceMappingURL=timecard-search.js.map