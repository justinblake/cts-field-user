import {Component, ViewChild, Pipe, PipeTransform} from '@angular/core';
import {NavController, NavParams, Content, App, AlertController} from 'ionic-angular';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';
import {UserManager} from '../../providers/user-manager';
import {LoginPage} from '../login/login';
import {TimecardSearchPage} from "../timecard-search/timecard-search"
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";
import {StorageService} from "../../providers/storage-service";
import {SplashScreen} from '@ionic-native/splash-screen';

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
    role_id: number;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userMgr: UserManager,
                private appCtrl: App,
                private taskMgr: TaskManager,
                private utils: Utils,
                private alertCtrl: AlertController,
                private conMgr: ConversionManager,
                private fcm: FCM,
                private storage: StorageService,
                private splashscreen: SplashScreen) {

        this.debug = this.utils.returnDebug();
        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.role_id = this.currentUser.role_id;
    }


    ionViewDidEnter() {
        this.subscribeAgain();
        this.loadTodaysTime();
    }

    subscribeAgain() {
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(data => {
                if (data.param1 === 'alert') {
                    if (data.project !== 'null') {
                        this.taskMgr.saveAlertDispatch(data.task, data.project, true);
                        this.navCtrl.parent.select(0);
                    } else {
                        if (this.role_id === 3) {
                            this.navCtrl.parent.select(2);
                        } else {
                            this.navCtrl.parent.select(3);
                        }
                    }
                } else if (data.param1 === 'additional_notes') {
                    this.presentAlert();
                } else if (data.param1 === "upcoming_task") {
                    this.taskMgr.loadHomePage(1);
                    this.navCtrl.parent.select(0);
                } else if (data.param1 === 'crews') {
                    this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    this.navCtrl.parent.select(1);
                } else if (data.param1 === 'User Update') {
                    let tempNumber = parseInt(data.managesTasks);
                    let tempRole = parseInt(data.userRole);
                    this.storage.get('user').then((res1: any) => {
                        res1.manages_tasks = tempNumber;
                        res1.role_id = tempRole;
                        this.storage.update('user', res1).then((res: any) => {
                            this.reload();
                        })
                    });
                }
            });
        }
    }

    reload() {
        this.splashscreen.show();
        window.location.reload();
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
            } else if (response.data.length > 0) {
                this.noEntry = false;
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
            console.log('todaysTime ', JSON.stringify(this.todaysTime));
        });
        this.showSearchResults = false;
    }

    convertToMilliseconds(time) {
        return Date.parse(time);
    }

    updateTodaysTimecard(id, newTime, repeatIndex, newestNote: string) {
        console.log("newTime ", newTime);
        console.log('repeatIndex ', repeatIndex);
        console.log('this.todaysTime[repeatIndex] ', JSON.stringify(this.todaysTime[repeatIndex]));
        console.log('this.todaysTime[repeatIndex - 1] ', JSON.stringify(this.todaysTime[repeatIndex - 1]));
        console.log('this.todaysTime[repeatIndex + 1] ', JSON.stringify(this.todaysTime[repeatIndex + 1]));


        let newTimeMinusZ = newTime.slice(0, 19);
        let newEntryInMilliseconds = Date.parse(newTimeMinusZ);
        let currentTimeInMilliseconds = Date.parse(new Date().toLocaleString());
        let lengthOfTimeEntries = this.todaysTime.length;

        let previousEntry = 0;
        let nextEntry = 0;

        if (repeatIndex > 0 && repeatIndex < (lengthOfTimeEntries - 1)) {
            previousEntry = Date.parse(this.todaysTime[(repeatIndex - 1)].alt_timestamp);
            nextEntry = Date.parse(this.todaysTime[(repeatIndex + 1)].alt_timestamp);
            console.log('previousEntry ', previousEntry);
            console.log('nextEntry ', nextEntry);
        }
        else if (repeatIndex > 0 && repeatIndex === (lengthOfTimeEntries - 1)) {
            previousEntry = Date.parse(this.todaysTime[(repeatIndex - 1)].alt_timestamp);

            console.log('previousEntry ', previousEntry);

        }
        else if (repeatIndex === 0 && lengthOfTimeEntries >= 2) {
            nextEntry = Date.parse(this.todaysTime[(repeatIndex + 1)].alt_timestamp);
            console.log('nextEntry ', nextEntry);
        }


        console.log('newEntryInMilliseconds ', newEntryInMilliseconds);
        console.log('currentTimeInMilliseconds ', currentTimeInMilliseconds);
        console.log('lengthOfTimeEntries ', lengthOfTimeEntries);


        // this is the first entry and only entry in the timecard
        if (repeatIndex === 0 && lengthOfTimeEntries === 1) {
            if (newEntryInMilliseconds > currentTimeInMilliseconds) {
                console.log('sorry, that is past the current time');
                this.presentTimecardErrorAlert(2);
            } else {
                console.log('this is valid');
                this.saveValidatedEntries(id, newTime, repeatIndex, newestNote);
            }
        }
        // this is the first entry and there are additional entries
        else if (repeatIndex === 0 && lengthOfTimeEntries > 1) {

            if (newEntryInMilliseconds > nextEntry) {
                console.log('sorry, that is past the current time 2 ');
                this.presentTimecardErrorAlert(1);
            } else {
                console.log('this is valid 2');
                this.saveValidatedEntries(id, newTime, repeatIndex, newestNote);
            }
        }
        // this is a middle timecard entry but no the last
        else if (repeatIndex > 0 && repeatIndex < (lengthOfTimeEntries - 1)) {
            if ((newEntryInMilliseconds > previousEntry) && (newEntryInMilliseconds < nextEntry)) {
                console.log('This works');
                this.saveValidatedEntries(id, newTime, repeatIndex, newestNote);
            } else if (newEntryInMilliseconds > nextEntry) {
                console.log('This does not work');
                this.presentTimecardErrorAlert(1);
            } else if (newEntryInMilliseconds < previousEntry) {
                console.log('This does not work');
                this.presentTimecardErrorAlert(0);
            }
        }
        // this is the last entry
        else if (repeatIndex > 0 && repeatIndex === (lengthOfTimeEntries - 1)) {
            if ((newEntryInMilliseconds > previousEntry) && (newEntryInMilliseconds < currentTimeInMilliseconds)) {
                console.log('lkjansdfljhbasdf');
                this.saveValidatedEntries(id, newTime, repeatIndex, newestNote);
            } else if (newEntryInMilliseconds < previousEntry) {
                console.log('This does not work');
                this.presentTimecardErrorAlert(0);
            } else if (newEntryInMilliseconds > currentTimeInMilliseconds) {
                console.log('lkjansdfljhbasdf');
                console.log('This does not work');
                this.presentTimecardErrorAlert(2);
            }
        }

    }

    saveValidatedEntries(id, newTime, repeatIndex, newestNote: string) {
        let notes = '';
        if (newestNote === '') {
            notes = "NULL"
        } else {
            notes = newestNote;
        }

        let newYear = newTime.slice(0, 10);
        let newestTime = newTime.slice(11, 19);
        let alt_timestamp = newYear + ' ' + newestTime;


        this.taskMgr.updateTimecard(this.userId, id, alt_timestamp, notes).then((res: any) => {
            if (this.debug) {
                console.log('Timecard res ', JSON.stringify(res));
            }

            this.todaysTime[repeatIndex].alt_timestamp = newTime;
            this.todaysTime[repeatIndex].timestamp = newTime;
            this.todaysTime[repeatIndex].notes = newestNote;
            this.todaysTime[repeatIndex].originalNotes = newestNote;
            this.todaysTime[repeatIndex].id = res.data.msg
        })
    }


    presentTimecardErrorAlert(problem: number) {

        let msg = '';

        // new time is earlier than the previous entry
        if (problem === 0) {
            msg = 'The new entry is earlier than the previous entry. Please change your ' +
                'new entry to after the previous entry\'s time'
        }

        // new time is later than the next entry
        else if (problem === 1) {
            msg = 'The new entry is later than the next entry. Please change your ' +
                'new entry to before the next entry\'s time'
        }

        // new time is later than the current time
        else if (problem === 2) {
            msg = 'Your new entry is later than the current time. Please change your new entry to be before the present time'
        }

        let alert = this.alertCtrl.create({
            title: 'Timecard Entry Error',
            message: msg,
            cssClass: 'myAlerts',
            buttons: [{
                text: 'OK',
                role: 'cancel'
            }]
        });
        alert.present();
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

}
