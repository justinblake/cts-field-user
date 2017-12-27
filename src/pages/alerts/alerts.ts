import {Component} from '@angular/core';
import {NavController, NavParams, App, AlertController} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';
import {UserManager} from '../../providers/user-manager';
import {LoginPage} from '../login/login';
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";

@Component({
    selector: 'page-alerts',
    templateUrl: 'alerts.html'
})
export class AlertsPage {

    debug: boolean;
    hasAlerts: boolean = true;
    alerts: any = '';
    user: any = '';
    alertsLoaded = false;
    displayAlert: number = -1;
    isIos: boolean = false;
    pushAlert: any;
    didLoad: boolean = false;
    isCordova: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userMgr: UserManager,
                private appCtrl: App,
                private taskMgr: TaskManager,
                private utils: Utils,
                private callNumber: CallNumber,
                private conMgr: ConversionManager,
                private alertCtrl: AlertController,
                private fcm: FCM) {

        this.debug = this.utils.returnDebug();

        this.pushAlert = navParams.get('message');
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.isCordova = this.taskMgr.returnPlatform().isCordova;
    }

    ionViewDidEnter() {
        this.loadAlerts();
        this.subscribeAgain();
    }

    subscribeAgain() {
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(data => {
                if (data.param1 === 'alert') {
                    this.loadAlerts();
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

    loadAlerts() {
        this.utils.presentLoading();
        this.alertsLoaded = false;
        this.taskMgr.getEmployeeAlerts().then((response: any) => {
            if (this.debug) {
                console.log('response ', JSON.stringify(response));
            }

            if (response.data.length === 0) {
                this.hasAlerts = false;
            } else {
                this.hasAlerts = true;
            }

            this.alerts = response;
            this.user = response.userdata;
            this.alertsLoaded = true;
            if (this.debug) {
                console.log('this.pushAlert', JSON.stringify(this.pushAlert));
                console.log('this.alerts', JSON.stringify(this.alerts));
            }
            this.utils.dismissLoading();
        }).catch((error) => {
            this.utils.dismissLoading();
            setTimeout(() => {
                this.utils.toastError(error);
            }, 500)
        })
    }

    loadAgain() {
        this.didLoad = true;
    }

    callPhone(number) {
        if (this.isCordova) {
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

    }

    readMessage(i) {
        let holdObj = {
            alertId: this.alerts.data[i].id
        };
        if (this.alerts.data[i].viewed !== 1) {
            this.taskMgr.markEmployeeAlertRead(holdObj).then((response: any) => {
                this.alerts.data[i].time_stamp_viewed = response.data.time_stamp_viewed;
                this.taskMgr.badgeNumber -= 1;
            }).catch((error) => {
                this.utils.dismissLoading();
                setTimeout(() => {
                    this.utils.toastError(error);
                }, 500)
            })
        }
        if (this.displayAlert != i) {
            this.displayAlert = i;
        } else {
            this.displayAlert = -1;
        }
        this.alerts.data[i].viewed = 1;
    }

    logout() {
        this.userMgr.logout().then(response => {
            this.appCtrl.getRootNav().push(LoginPage);
        })
    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }

    // createLoading() {
    //     this.utils.presentLoading();
    // }
    //
    // closeIt() {
    //     this.utils.dismissLoading();
    // }

}
