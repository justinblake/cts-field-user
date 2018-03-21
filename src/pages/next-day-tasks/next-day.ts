import {Component, ViewChild, Pipe, PipeTransform} from '@angular/core';
import {NavController, NavParams, App, Modal, Content, AlertController} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';

import {LoginPage} from '../login/login';
import {TaskManager} from '../../providers/task-manager';
import {UserManager} from '../../providers/user-manager';
import {Utils} from '../../utils/utils';
import {Animations} from '../../animations/animations';
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";
import {SingleUpcomingTaskPage} from "../single-upcoming-task/single-upcoming-task";

import {InAppBrowser} from '@ionic-native/in-app-browser';


@Pipe({name: 'myKeys', pure: false})
export class KeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value);
    }
}

@Component({
    selector: 'page-next-day',
    templateUrl: 'next-day.html',
    animations: [
        Animations.expandCollapse
    ]
})

export class NextDayPage {
    @ViewChild(Content) content: Content;

    debug: boolean;
    nextDayTask: any = '';
    user: any;
    divState: string = 'hide';
    showTasks = false;
    newStart: any = '';
    isIos: boolean = false;
    showContractor: number = -1;
    expandDate: number = -1;
    expandTaskId: number = -1;
    taskId: number = -1;
    userId: any = '';
    role_id: number = -1;
    dispatchAlert: any;

    alertTask: any = 0;
    alertId: number;

    alertObject: any = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userMgr: UserManager,
                private appCtrl: App,
                private taskMgr: TaskManager,
                private utils: Utils,
                private callNumber: CallNumber,
                private conMgr: ConversionManager,
                private alertCtrl: AlertController,
                private fcm: FCM,
                private iab: InAppBrowser) {

        this.debug = this.utils.returnDebug();
        this.user = this.userMgr.getUser();
        this.userId = this.user.userId;
        this.role_id = this.user.role_id;
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.divState = 'collapse';

        this.alertTask = navParams.get('task');
        this.alertId = navParams.get('alert_id');
    }

    ionViewDidEnter() {
        console.log('ion view did enter');
        let alertDispatch = this.taskMgr.returnDispatchAlert();
        if (alertDispatch.hasDispatchAlert === true) {
            this.alertTask = alertDispatch.alertTaskId;
            this.alertId = alertDispatch.alertId;
        }
        this.loadTomorrowsTasks(this.userId);
        this.subscribeAgain();
    }

    ionViewWillLeave() {
        this.alertTask = -1;
        this.alertId = -1;
        this.expandTaskId = -1;
        this.taskMgr.clearDispatchAlert();
        this.taskMgr.clearAlertMessage();
    }


    subscribeAgain() {
        if (this.utils.FCMFlagDebug()) {
            console.log('this.alertTask pre ', JSON.stringify(this.alertTask));
            console.log('this.alertId pre ', JSON.stringify(this.alertId));
            this.fcm.onNotification().subscribe(data => {
                console.log('data ', JSON.stringify(data));
                if (data.param1 === 'alert') {

                    if (data.project !== 'null') {
                        this.alertTask = data.task;
                        this.alertId = data.project;
                        this.loadTomorrowsTasks(this.userId);
                    } else {
                        this.navCtrl.parent.select(3);
                    }
                } else if (data.param1 === 'additional_notes') {
                    this.presentAlert();
                } else if (data.param1 === "upcoming_task") {
                    this.presentFutureAlert();
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

    presentFutureAlert() {
        let alert = this.alertCtrl.create({
            title: 'New Task Dispatched',
            message: 'You have been assigned a new task. Please accept or reject before continuing',
            cssClass: 'myAlerts',
            buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                    this.taskMgr.loadHomePage(0);
                    this.loadTomorrowsTasks(this.userId);
                }
            }]
        });
        alert.present();
    }

    /** logs the user out of the app */
    logout() {
        this.userMgr.logout().then(response => {
            this.appCtrl.getRootNav().push(LoginPage);
        })
    }

    toggleDivState() {
        let states = {
            expand: 'collapse',
            collapse: 'expand'
        };
        this.divState = states[this.divState];
    }

    loadTomorrowsTasks(userId) {
        this.alertObject = {};
        this.utils.presentLoading();
        this.taskMgr.loadNextDayTaskByDate(userId).then((response: any) => {
            this.nextDayTask = response;

            if (this.nextDayTask.data === {}) {
                this.showTasks = false;
                this.utils.dismissLoading();
            }
            else {
                this.showTasks = true;
                this.user = response.user;
                let myKey1 = Object.keys(this.nextDayTask.data);
                for (let m = 0; m < myKey1.length; m++) {
                    let firstKey = this.nextDayTask.data[Object.keys(this.nextDayTask.data)[m]];
                    firstKey.sort(function (a, b) {
                        return (a.task_start_time > b.task_start_time) ? 1 : ((b.task_start_time > a.task_start_time) ? -1 : 0);
                    });
                }
                console.log('this.alertTask in next day', JSON.stringify(this.alertTask));
                if (this.alertTask && this.alertTask !== -1) {
                    this.expandTaskId = parseInt(this.alertTask);
                    this.dispatchAlert = parseInt(this.alertTask);
                    let passedAlert = this.taskMgr.returnAlertMessage();
                    if (passedAlert.hasAlertBody === true) {
                        this.alertObject = passedAlert.alertObject;

                        if (this.alertObject.viewed === 0) {
                            this.alertObject.viewedBoolean = false;
                        } else {
                            this.alertObject.viewedBoolean = true;
                        }


                        this.taskMgr.clearDispatchAlert();
                        this.taskMgr.clearAlertMessage();
                    } else {
                        this.taskMgr.getSingleAlert(userId, this.alertId).then((res: any) => {
                            console.log('res ', JSON.stringify(res));
                            this.alertObject = res.data[0];
                            // this.alertBody = res.data[0].alert_description;
                            this.taskMgr.clearDispatchAlert();
                            this.taskMgr.clearAlertMessage();

                            if (res.data[0].viewed !== 1) {
                                let holdObj = {
                                    alertId: this.alertId
                                };
                                this.taskMgr.markEmployeeAlertRead(holdObj).then((response: any) => {
                                    // this.taskMgr.badgeNumber -= 1;
                                })
                            }

                        })
                    }
                }
                // console.log('this.nextDayTask ', JSON.stringify(this.nextDayTask));
                this.utils.dismissLoading();
            }
        })
    }

    setStatus = (statusId: number, taskId: number, dateKey: string, taskIndex: number, notes?: any): void => {
        if (statusId === 3) {
            this.nextDayTask.data[dateKey][taskIndex].status_id = 3;
            let data = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                timestamp: new Date(Date.now()),
                taskId: taskId
            };
            this.utils.presentLoading();
            this.taskMgr.updateNextDayTaskStatus(data).then((response) => {
                this.utils.dismissLoading();
            }).catch(error => {
                if (this.debug) {
                    console.log(`ERROR: ${Utils.toJson(error)}`);
                }
                this.utils.toastError(error);
            });
        } else if (statusId === 8) {
            this.nextDayTask.data[dateKey][taskIndex].status_id = 8;
            let data = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                timestamp: new Date(Date.now()),
                taskId: taskId
            };
            this.utils.presentLoading();
            this.taskMgr.updateNextDayTaskStatus(data).then((response) => {
                this.utils.dismissLoading();
            }).catch(error => {
                if (this.debug) {
                    console.log(`ERROR: ${Utils.toJson(error)}`);
                }
                this.utils.toastError(error);
            });
        }
    };

    openRejectModal(statusId: number, taskId: number, dateKey: string, taskIndex: number, notes?: any) {
        let modal: Modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss((data) => {
            if (data.save === true) {
                this.setStatus(statusId, taskId, dateKey, taskIndex, data.notes);
            }
        })
    }

    showContractorInfo(index) {
        if (this.showContractor === index) {
            this.showContractor = -1
        } else {
            this.showContractor = index;
        }
    }

    showDrivingDirections(lat, lon) {

        let options = "location=no";
        this.iab.create("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon + "&travelmode=driving&dir_action=navigate", "_system", options);



    }

    expandDateTasks(index) {
        if (this.expandDate === index) {
            this.expandDate = -1
        } else {
            this.expandDate = index;
        }
    }

    expandTask(id, index, task) {
        console.log('task ', JSON.stringify(task));

        if (this.expandTaskId === id && this.taskId === index) {
            if (!this.isIos) {
                this.content.scrollTo(0, 0, 300).then(res => {
                });
            }
            this.expandTaskId = -1;
            this.taskId = -1;
        } else {
            if (!this.isIos) {
                this.content.scrollTo(0, ((index * 50) + 50), 300).then(res => {
                });
            }
            this.expandTaskId = id;
            this.taskId = index;
        }
    }

    callPhone(number) {
        this.callNumber.callNumber(number, false)
            .then(() => {
                if (this.debug) {
                    console.log('Launched dialer!')
                }
            })
            .catch(() => {
                if (this.debug) {
                    console.log('Error launching dialer')
                }
            });
    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }

    openSingleTask(task) {
        let params = {
            currentTask: task
        };
        this.navCtrl.push(SingleUpcomingTaskPage, params).then(() => {
            // console.log('in promise of push ');
        })

    }
}

