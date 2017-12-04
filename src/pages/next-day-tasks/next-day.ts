import {Component, ViewChild, Pipe, PipeTransform} from '@angular/core';
import {NavController, App, Modal, Content, AlertController} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {DrivingDirectionsPage} from '../driving-directions/driving-directions';
import {LoginPage} from '../login/login';
import {GoogleMapsManager} from '../../providers/google-maps-manager';
import {Geolocation} from '@ionic-native/geolocation';
import {TaskManager} from '../../providers/task-manager';
import {UserManager} from '../../providers/user-manager';
import {Utils} from '../../utils/utils';
import {Animations} from '../../animations/animations';
import {Diagnostic} from "@ionic-native/diagnostic";
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";

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

    debug: boolean = false;
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
    role_id: number;

    constructor(public navCtrl: NavController,
                private userMgr: UserManager,
                private appCtrl: App,
                private taskMgr: TaskManager,
                private mapsManager: GoogleMapsManager,
                private geolocation: Geolocation,
                private utils: Utils,
                private callNumber: CallNumber,
                private diagnostic: Diagnostic,
                private conMgr: ConversionManager,
                private alertCtrl: AlertController,
                private fcm: FCM) {
        this.user = this.userMgr.getUser();
        this.userId = this.user.userId;
        this.role_id = this.user.role_id;
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.divState = 'collapse';
    }

    ionViewDidEnter() {
        this.loadTomorrowsTasks(this.userId);
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
        this.utils.presentLoading();
        let locEnabled: boolean = false;
        let successCallback = (isAvailable) => {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            } else {
                this.utils.presentToast("Please enable your location in device settings", true);
                return;
            }
        };
        let errorCallback = (e) => {
            this.utils.presentToast("Please enable your location in device settings", true);
            this.utils.dismissLoading();
        };

        this.diagnostic.isLocationEnabled().then(successCallback).then(resp => {
            if (locEnabled) {
                let destination = `${lat},${lon}`;
                this.geolocation.getCurrentPosition({timeout: 15000}).then((position) => {
                    let origin = `${position.coords.latitude},${position.coords.longitude}`;
                    return this.mapsManager.getDirections(origin, destination);
                }).then((response) => {
                    let params = {
                        directions: response
                    };
                    setTimeout(() => {
                        this.navCtrl.push(DrivingDirectionsPage, params);
                        this.utils.dismissLoading();
                    }, 2000)
                }).catch((error) => {
                    this.utils.dismissLoading();
                    if (this.debug) {
                        console.log(`ERROR: ${Utils.toJson(error)}`);
                    }
                    this.utils.presentToast("Please enable your location in device settings", true);
                })
            }
            if (locEnabled === false) {
                this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    }

    expandDateTasks(index) {
        if (this.expandDate === index) {
            this.expandDate = -1
        } else {
            this.expandDate = index;
        }
    }

    expandTask(id, index) {
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
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }
}

