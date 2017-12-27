import {Component, ViewChild, Pipe, PipeTransform} from '@angular/core';
import {NavController, NavParams, Content, App, AlertController} from 'ionic-angular';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';
import {UserManager} from '../../providers/user-manager';
import {LoginPage} from '../login/login';
import {TimecardSearchPage} from "../timecard-search/timecard-search"
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";

@Pipe({name: 'keys', pure: false})
export class TimecardKeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)//.map(key => value[key]);
    }
}

@Component({
    selector: 'page-timecard',
    templateUrl: 'timecard.html'
})

export class TimecardPage {
    @ViewChild(Content) content: Content;


    debug: boolean;
    isIos: boolean = false;
    userId: any = '';
    currentUser: any = '';
    todaysTime: any;
    startDate: any;
    endDate: any;
    timecardHistory: any;
    currentDate: any;
    showSearchResults: boolean = false;
    noEntry: boolean = false;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userMgr: UserManager,
                private appCtrl: App,
                private taskMgr: TaskManager,
                private utils: Utils,
                private alertCtrl: AlertController,
                private conMgr: ConversionManager,
                private fcm: FCM) {

        this.debug = this.utils.returnDebug();
        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }


    ionViewDidEnter() {
        this.subscribeAgain();
        this.loadTodaysTime();
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

    loadTodaysTime(test?: any) {
        this.utils.presentLoading();
        let myTime = this.conMgr.convertDateTime(Date.now());
        this.currentDate = new Date(myTime).toISOString().slice(0, 10);
        this.startDate = new Date(Date.now()).toISOString();
        this.endDate = new Date(Date.now()).toISOString();
        this.taskMgr.loadTodaysTime(this.userId).then((response: any) => {

            if (response.data.length === 0) {
                this.noEntry = true;
            }

            this.todaysTime = response.data;
            let dupArray = [];
            for (let i = 0; i < this.todaysTime.length; i++) {
                let newEntryYear = this.todaysTime[i].timestamp.slice(0, 10);
                let newEntryTime = this.todaysTime[i].timestamp.slice(11);
                this.todaysTime[i].timestamp = newEntryYear + 'T' + newEntryTime;

                if (this.todaysTime[i].alt_timestamp === null) {
                    this.todaysTime[i].alt_timestamp = this.todaysTime[i].timestamp;
                }
                if (this.todaysTime[i].notes === "NULL") {
                    this.todaysTime[i].notes = '';
                }
                this.todaysTime[i].originalNotes = this.todaysTime[i].notes;

                if (this.todaysTime[i].alt_timestamp) {
                    let newYear = this.todaysTime[i].alt_timestamp.slice(0, 10);
                    let newTime = this.todaysTime[i].alt_timestamp.slice(11);
                    this.todaysTime[i].alt_timestamp = newYear + 'T' + newTime;
                    this.todaysTime[i].timestamp = this.todaysTime[i].alt_timestamp;

                    let compareMonthAndDay = this.todaysTime[i].alt_timestamp[5] + '' + this.todaysTime[i].alt_timestamp[6] + '' + this.todaysTime[i].alt_timestamp[8] + '' + this.todaysTime[i].alt_timestamp[9];
                    let compareCurrentDay = this.currentDate[5] + '' + this.currentDate[6] + '' + this.currentDate[8] + '' + this.currentDate[9];

                    if (compareMonthAndDay === compareCurrentDay) {
                        dupArray.push(this.todaysTime[i]);
                    }
                }
            }
            this.todaysTime = dupArray;
            this.utils.dismissLoading();
        });
        this.showSearchResults = false;
    }

    updateTodaysTimecard(id, newTime, repeatIndex, newestNote: string) {
        let notes = '';
        if (newestNote === '') {
            notes = "NULL"
        } else {
            notes = newestNote;
        }

        let newYear = newTime.slice(0, 10);
        let newestTime = newTime.slice(11, 19);
        let alt_timestamp = newYear + ' ' + newestTime;


        this.taskMgr.updateTimecard(this.userId, id, alt_timestamp, notes).then(res => {
            if (this.debug) {
                console.log('Timecard res ', JSON.stringify(res));
            }


            this.todaysTime[repeatIndex].alt_timestamp = newTime;
            this.todaysTime[repeatIndex].timestamp = newTime;
            this.todaysTime[repeatIndex].notes = newestNote;
            this.todaysTime[repeatIndex].originalNotes = newestNote;
        })
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

    logout() {
        this.userMgr.logout().then(response => {
            this.appCtrl.getRootNav().push(LoginPage);
        })
    }

    goToSearch() {
        this.navCtrl.push(TimecardSearchPage).then(response => {
            if (this.debug) {
                console.log('response', JSON.stringify(response));
            }

        });
    }

    // ability to create and delete entries

    // deleteEntry(entryObject, index, date?: any) {
    //     this.taskMgr.deleteTimecardEntry(this.userId, entryObject.id).then((response: any) => {
    //         if (response.code === 0 && !date) {
    //             this.todaysTime.splice(index, 1);
    //         }
    //         else if (response.code === 0 && date) {
    //             this.timecardHistory[date].splice(index, 1);
    //         }
    //     })
    // }

    // createNewEntry(object, date, altTime, status, notes) {
    //     let myStatusInt: number;
    //     if (status === '0') {
    //         myStatusInt = 0;
    //     } else {
    //         myStatusInt = 1;
    //     }
    //     let combinedDate = date + ' ' + altTime;
    //
    //     this.taskMgr.createNewTimecardEntry(this.userId, status, combinedDate, notes).then(response => {
    //         this.showCreateToday = false;
    //         let newAltComplete = this.currentDate + 'T' + altTime;
    //
    //         let newEntry = {
    //             "timestamp": newAltComplete,
    //             "notes": notes,
    //             "alt_timestamp": newAltComplete,
    //             "status": myStatusInt,
    //             "active": 1,
    //             "originalNotes": notes
    //         };
    //         this.todaysTime.push(newEntry);
    //         this.newDayEntry = {
    //             notes: '',
    //             time: '12:00',
    //             status: ""
    //         };
    //         this.todaysTime.sort(function (a, b) {
    //             return (a.alt_timestamp > b.alt_timestamp) ? 1 : ((b.alt_timestamp > a.alt_timestamp) ? -1 : 0);
    //         });
    //     })
    // }

}
