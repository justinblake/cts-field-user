import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Utils} from '../../utils/utils';
import {CalendarController} from '../../components/ion2-calendar'
import {TaskManager} from "../../providers/task-manager";
import {UserManager} from "../../providers/user-manager";
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";

@Component({
    selector: 'page-timecard-search',
    templateUrl: 'timecard-search.html'
})
export class TimecardSearchPage {

    startDay: any = -1;
    isIos: boolean = false;
    endDay: any = -1;
    date: string;
    timecardHistory: any;
    currentUser: any = '';
    userId: any = '';
    showSearchResults: boolean = false;
    totalSearchSeconds: number = 0;
    holdArray: Array<any> = [];

    constructor(public navCtrl: NavController,
                public calendarCtrl: CalendarController,
                private utils: Utils,
                private taskMgr: TaskManager,
                private userMgr: UserManager,
                private conMgr: ConversionManager,
                private alertCtrl: AlertController,
                private fcm: FCM) {
        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }

    ionViewDidEnter() {
        this.subscribeAgain();
    }

    subscribeAgain() {
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(data => {
                if (data.param1 === 'alert') {
                    this.navCtrl.parent.select(3);
                } else if (data.param1 === 'additional_notes') {
                    this.presentAlert();
                } else if (data.param1 === "upcoming_task") {
                    this.taskMgr.loadHomePage(1);
                    this.navCtrl.parent.select(0);
                } else if (data.param1 === 'crews') {
                    this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    this.navCtrl.parent.select(1);
                }
            });
        }
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                    this.navCtrl.parent.select(0);
                }
            }]
        });
        alert.present();
    }

    dateRange() {
        this.showSearchResults = false;
        this.startDay = -1;
        this.calendarCtrl.openCalendar({
            pickMode: 'range',
            title: '',
            canBackwardsSelected: true,
            color: 'timecard',
            autoDone: true,
            from: new Date(Date.now() - 7884000000)
        }).then(res => {
            this.startDay = res.from.time;
            this.endDay = res.to.time;
            this.timecardSearch();
        })
            .catch(err => console.log(err))
    }

    updateEntry(num: number) {
        if (num === 0) {
            return this.startDay
        } else if (num === 1) {
            return this.endDay
        }
    }

    timecardSearch() {
        this.holdArray = [];
        this.utils.presentLoading();
        let hasTime = false;
        let tempStart = this.conMgr.convertDateTime(this.startDay + 86400000);
        let tempEnd = this.conMgr.convertDateTime(this.endDay + 86400000);

        this.taskMgr.loadTimeCardTotal(this.userId, tempStart, tempEnd).then((response: any) => {
                this.timecardHistory = response.data;

                if (response.data.length > 0) {
                    hasTime = true;
                }
                this.utils.dismissLoading();
            }
        );
        this.showSearchResults = true;
    }

    returnTime(time) {
        return this.conMgr.convertTimeToT(time);
    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }

    convertMilli(input) {
        let tempTime = new Date(input).toISOString().slice(0, 10);

        return this.conMgr.convertDate(tempTime);
    }

    convertSeconds(dateObject) {
        let timeObject = this.conMgr.secondsToTime(dateObject.total_seconds);

        if (timeObject.hour < 0 || timeObject.min < 0 || timeObject.sec < 0) {
            return "Incomplete"
        } else {
            if (this.holdArray.indexOf(dateObject.date) === -1) {
                this.totalSearchSeconds += dateObject.total_seconds;
                this.holdArray.push(dateObject.date);
            }
            return timeObject.hour + ' hrs ' + timeObject.min + ' min';
        }
    }

    convertTotalSeconds() {
        let timeObject = this.conMgr.secondsToTime(this.totalSearchSeconds);
        return timeObject.hour + ' hrs ' + timeObject.min + ' min';
    }

    // function to sort timecard data into their individual days
    groupBy(array, property) {
        let hash = {};
        for (let i = 0; i < array.length; i++) {
            if (!hash[array[i][property]]) hash[array[i][property]] = [];
            hash[array[i][property]].push(array[i]);
        }
        return hash;
    }

    searchDate(date) {
        return this.conMgr.convertDate(date)
    }
}
