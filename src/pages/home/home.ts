import {Component, ViewChild, Pipe, PipeTransform} from '@angular/core';
import {HardwareBackButtonService} from '../../providers/backbutton';
import {NavController, NavParams, App, Modal, Platform, Content, AlertController} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {DrivingDirectionsPage} from '../driving-directions/driving-directions';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {LoginPage} from '../login/login';
import {FeedbackPage} from '../feedback/feedback';
import {GoogleMapsManager} from '../../providers/google-maps-manager';
import {Geolocation} from '@ionic-native/geolocation';
import {TaskManager} from '../../providers/task-manager';
import {UserManager} from '../../providers/user-manager';
import {update} from '../../providers/deploy-manager';
import {loadNewVersion} from '../../providers/deploy-manager';
import {Utils} from '../../utils/utils';
import {Animations} from '../../animations/animations';
import {Diagnostic} from '@ionic-native/diagnostic';
import {NextDayPage} from '../next-day-tasks/next-day';
import {CompleteNotesPage} from '../complete-notes/complete-notes';
import {Badge} from '@ionic-native/badge';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";
import {UniqueDeviceID} from '@ionic-native/unique-device-id';
import {Sim} from '@ionic-native/sim';

declare var IonicCordova;


@Pipe({name: 'keys', pure: false})
export class HomeKeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)
    }
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [
        Animations.expandCollapse
    ]
})

export class HomePage {
    @ViewChild('ctsNav') nav: NavController;
    @ViewChild(Content) content: Content;

    debug: boolean = true;

    currentTask: any = '';
    currentUser: any = '';
    data: any;
    hideMoreProject: boolean = true;
    divState: string = 'hide';
    isIos: boolean = false;
    isAndroid: boolean = false;
    lat: any;
    lon: any;
    desktop: boolean = false;
    compName: any;
    myData: any = {};
    showTasks = false;
    userRole: number = 0;
    laborerTasks: any = '';
    expandTaskId: number = -1;
    taskId: number = -1;
    myAlerts: number = 0;
    myFirstKey: any;
    timecardStatus: number;
    showTimecard: boolean = false;
    isLessor: boolean = false;
    complete: boolean = false;
    fcmToken: any = '';


    constructor(public navCtrl: NavController,
                public taskMgr: TaskManager,
                public plt: Platform,
                public navParams: NavParams,
                private mapsManager: GoogleMapsManager,
                private userMgr: UserManager,
                private appCtrl: App,
                private geolocation: Geolocation,
                private utils: Utils,
                private callNumber: CallNumber,
                private androidFullScreen: AndroidFullScreen,
                private diagnostic: Diagnostic,
                public badge: Badge,
                private iab: InAppBrowser,
                private _backBtn: HardwareBackButtonService,
                private alertCtrl: AlertController,
                private conMgr: ConversionManager,
                private fcm: FCM,
                private uniqueDeviceID: UniqueDeviceID,
                private sim: Sim) {

        plt.ready().then(() => {
            this.plt.pause.subscribe(() => {
                if (this.debug) {
                    console.log('[INFO] App paused');
                }
            });

            this.plt.resume.subscribe(() => {
                this.setLocation();
                if (this.debug) {
                    console.log('[INFO] App resumed');
                }
            });
        });

        if (this.plt.is('cordova')) {
            this.uniqueDeviceID.get()
                .then((uuid: any) => console.log('uuid - ' + uuid))
                .catch((error: any) => console.log('unique id error - ' + error));
        }


        if (this.plt.is('cordova')) {
            fcm.getToken().then(token => {
                this.fcmToken = token;
                if (this.debug) {
                    console.log('FCM token 2 ', JSON.stringify(token));
                }
                this.taskMgr.updateEmployeeToken(token).then(response => {
                })
            });

            fcm.onTokenRefresh().subscribe(token => {
                if (this.debug) {
                    console.log('FCM token ', JSON.stringify(token));
                }
                this.taskMgr.updateEmployeeToken(token).then(response => {
                })
            });
        }

        this.currentUser = this.userMgr.getUser();
        this.userRole = this.currentUser.role_id;
        if (this.currentUser.is_lessor === 1) {
            this.isLessor = true;
        }

        if (this.plt.is('core')) {
            this.desktop = true;
        }

        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;

        if (this.isAndroid) {
            this.androidFullScreen.isImmersiveModeSupported()
                .then(() => this.androidFullScreen.immersiveMode())
                .catch((error: any) => console.log(error));
        }
        this.hideMoreProject = true;
        this.divState = 'collapse';
    }


    ionViewDidLoad() {

        this.setUser();
        setTimeout(() => this.setCompany(), 500);
        this._backBtn.registerAction(() => {
            this._backBtn.doubleBackToExit();
        }, 101);
        if (this.debug) {
            console.log("Platform Versions ", JSON.stringify(this.plt.versions()));
            console.log('Platform - ', JSON.stringify(this.plt.platforms()));
        }
        if (this.plt.is('cordova')) {
            setTimeout(() => this.getSimInfo(), 10000)
        }
    }

    ionViewDidEnter() {
        this.currentUser = this.userMgr.getUser();
        this.subscribeAgain();
        let tempNum = this.taskMgr.reportHomePage();
        if (tempNum === 0) {
            if (this.userRole === 6) {
                this.loadLaborersTasks();
            } else {
                this.setLocation();
                this.setCurrentTask(true);
                setTimeout(() => {
                    this.setBadges()
                }, 3000);
            }
        } else if (tempNum === 1) {
            this.presentFutureAlert();
        } else if (tempNum === 2) {
            this.presentAlert();
        }

        let test1 = update();
        if(test1) {
            console.log('test1 ', JSON.stringify(test1));
        }

    }

    // helper method for the expand/collapse div animation
    toggleDivState() {
        let states = {
            expand: 'collapse',
            collapse: 'expand'
        };
        this.divState = states[this.divState];
    }

    getSimInfo() {

        this.sim.requestReadPermission().then(
            () => {
                console.log('Permission granted');
                this.sim.getSimInfo().then(
                    (info) => console.log('Sim info: ', info),
                    (err) => console.log('Unable to get sim info: ', err)
                );

            },
            () => console.log('Permission denied')
        );
    }

    //This sets the current user in the Task Manager so that when a user does not have a task the user ID is still available
    setUser() {
        this.taskMgr.setUser();
    }

    subscribeAgain() {
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(data => {
                if (data.param1 === 'alert') {
                    this.navCtrl.parent.select(3);
                } else if (data.param1 === 'additional_notes') {
                    if (this.showTasks === true) {
                        this.presentAlert();
                    }
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
            buttons: ['OK']
        });
        this.setCurrentTask(true);
        this.taskMgr.loadHomePage(0);
        alert.present();
    }

    presentFutureAlert() {
        let alert = this.alertCtrl.create({
            title: 'New Task Dispatched',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                    this.taskMgr.loadHomePage(0);
                    this.openNextDayTasks();
                }
            }]
        });
        alert.present();
    }

// /** logs the user out of the app */
    logout() {
        if (this.timecardStatus === 1) {
            let alert = this.alertCtrl.create({
                title: 'Timecard Alert!',
                cssClass: 'myAlerts',
                message: 'You are currently clocked in. Please clock out before logging out.',
                buttons: ['OK']
            });
            alert.present();
        }
        else {
            let token = 'logged out';
            this.taskMgr.updateEmployeeToken(token, this.currentUser.userId).then(res => {
                console.log('res ', JSON.stringify(res));
            });
            this.userMgr.logout().then(response => {
                this.appCtrl.getRootNav().push(LoginPage);
            })
        }
    }

    setBadges() {
        this.taskMgr.checkEmployeeAlerts().then((res: any) => {
            this.myAlerts = res.data.new_alert_count;
            this.badge.set(this.myAlerts);
        });
        this.requestPermission();
    }

    requestPermission() {
        let hasPermission = this.badge.hasPermission();
        if (!hasPermission) {
            let permission = this.badge.registerPermission();
        }
    }

    setCompany() {
        let holdingObject: any;
        holdingObject = this.currentUser;
        this.compName = holdingObject.company_name;
    }

    getTimecardStatus() {
        this.taskMgr.getLastTimecardEntry(this.currentUser.userId).then((res: any) => {
            if (res.data.length === 0) {
                this.timecardStatus = 0;
            } else {
                this.timecardStatus = res.data.status;
            }
        })
    }

    presentLocationAlert() {
        let alertText = '';

        if (this.isAndroid) {
            alertText = 'Select OK to enable location on your device';
        } else if (this.isIos) {
            alertText = 'Location Services is enabled on your device but not for this app. Please open your device settings, scroll down and select clear-task-solutions-mobile, select Location, and then select the While Using the App option'
        } else {
            alertText = 'Select OK to enable location on your device';
        }

        let alert = this.alertCtrl.create({
            title: 'Location Required',
            message: alertText,
            cssClass: 'myAlerts',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel',
                    handler: () => {
                        if (this.isAndroid) {

                            this.diagnostic.isLocationEnabled().then(res => {
                                if (res) {
                                    this.diagnostic.isLocationAvailable().then(res => {
                                        if (this.debug) {
                                            console.log('res for location ', JSON.stringify(res));
                                        }
                                    })
                                } else if (res === false) {
                                    this.diagnostic.switchToLocationSettings();
                                }
                            })


                        }
                        if (this.isIos) {
                            this.diagnostic.getLocationAuthorizationStatus().then(response => {
                                if (response === 'denied') {
                                    this.setLocation();
                                }
                            });
                        }
                    }
                }
            ]
        });
        alert.present()
    }

    setLocation() {
        let locEnabled: boolean = false;
        let successCallback = (isAvailable) => {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            } else {
                this.presentLocationAlert();
                return;
            }
        };
        let errorCallback = (e) => {
            this.utils.presentToast("Please verify that your location settings are turned on", true);
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(resp => {
            if (locEnabled) {
                this.geolocation.getCurrentPosition({timeout: 40000}).then(position => {
                    this.lat = position.coords.latitude;
                    this.lon = position.coords.longitude;
                }).catch((error) => {
                    if (this.debug) {
                        console.log('geo error ')
                    }
                });
            }
        }).catch(errorCallback);
    }

// sets the status of the task using TaskManager
// then loads the current task from the API
    setStatus = (statusId: number, notes?: any, showLoading?: boolean): void => {
        showLoading = showLoading || false;
        if (statusId === 3) {
            let data = this.dataFunction(notes, statusId);

            if (showLoading) {
                this.utils.presentLoading();
            }

            this.taskMgr.updateTaskStatus(data).then((response) => {
                this.setCurrentTask(true);
            }).catch(error => {
                if (this.debug) {
                    console.log(`ERROR: ${Utils.toJson(error)}`);
                }
            });
        } else if (
            statusId === 4 ||
            statusId === 5 ||
            statusId === 6 ||
            statusId === 7 ||
            statusId === 9 ||
            statusId === 10 ||
            statusId === 13) {

            if (showLoading) {
                this.utils.presentLoading();
            }
            if (this.desktop) {
                let data = this.dataFunction(notes, statusId, null, null);
                if (data.statusId === 6 || data.statusId === 9) {
                    this.showTasks = false;
                    this.taskMgr.updateTaskStatus(data).then((response) => {
                        this.setCurrentTask(false);
                    }).catch(error => {
                        if (this.debug) {
                            console.log(`ERROR: ${Utils.toJson(error)}`);
                        }
                    });
                }
                else if (data.statusId < 8 || data.statusId === 10 || data.statusId === 13) {
                    this.taskMgr.updateTaskStatus(data).then((response) => {
                        this.setCurrentTask(false);
                    }).catch(error => {
                        if (this.debug) {
                            console.log("error " + error);
                        }
                    });
                }
            }
            else {
                let data = this.dataFunction(notes, statusId, this.lat, this.lon);
                if (data.statusId === 6 || data.statusId === 9) {
                    this.showTasks = false;
                    this.taskMgr.updateTaskStatus(data).then((response) => {
                        this.setCurrentTask(false);
                    }).catch(error => {
                        if (this.debug) {
                            console.log("error " + error);
                        }
                    });
                }
                else if (data.statusId < 8 || data.statusId === 10 || data.statusId === 13) {
                    this.taskMgr.updateTaskStatus(data).then((response) => {
                        this.setCurrentTask(false);
                    }).catch(error => {
                        if (this.debug) {
                            console.log("error " + error);
                        }
                    });
                }
            }
        }
        else if (statusId === 8) {
            let data = this.dataFunction(notes, statusId);
            this.taskMgr.updateTaskStatus(data).then((response) => {
                this.showTasks = false;
                this.setCurrentTask(false);
            }).catch(error => {
                if (this.debug) {
                    console.log("error " + error);
                }
            });
        }
        this.utils.dismissLoading();
    };

    disableStart() {
        if (this.timecardStatus === 0) {
            return true;
        }
    }

// function to replace writing this logic multiple times in this.setStatus
    dataFunction(notes: any, statusId: number, lat ?: any, lon ?: any) {
        if (lat) {
            this.myData = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                lat: lat,
                lon: lon,
                timestamp: new Date(Date.now())
            }
        } else {
            this.myData = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                timestamp: new Date(Date.now())
            }
        }
        return this.myData;
    }

// sets the current task
// @Param: optional showLoading:boolean show we show a loading spinner?
    setCurrentTask(showLoading ?: boolean) {

        this.getTimecardStatus();
        this.setBadges();

        this.currentUser = this.userMgr.getUser();

        showLoading = showLoading || false;
        if (showLoading) {
            this.utils.presentLoading();
        }
        this.taskMgr.getCurrentTaskRemote().then(response => {
            this.utils.dismissLoading();
            this.data = response;
            this.currentTask = this.data.task;
            this.currentUser = this.data.user;
            if (this.currentTask === []) {
                this.showTasks = false;
            } else if (
                this.currentTask.job_tasks.status_id === 2 ||
                this.currentTask.job_tasks.status_id === 3 ||
                this.currentTask.job_tasks.status_id === 4 ||
                this.currentTask.job_tasks.status_id === 5 ||
                this.currentTask.job_tasks.status_id === 7 ||
                this.currentTask.job_tasks.status_id === 13) {

                this.showTasks = true;

                console.log('this.currentTask ', JSON.stringify(this.currentTask));

                // if (this.userRole === 1 || this.userRole === 2 || this.userRole === 4) {
                //     this.content.scrollTo(0, 79, 300)
                // }
            }
            else if (this.currentTask.job_tasks.status_id === 8) {
                this.showTasks = false;
            }
            else if (this.currentTask.job_tasks.status_id === 9 || this.currentTask.job_tasks.status_id === 6) {
                this.taskMgr.getCurrentTaskRemote().then(response => {
                    this.data = response;
                    this.currentTask = this.data.task;
                    this.currentUser = this.data.user;
                })
            }
        })
            .catch(error => {
                error = error || {error: 'is undefined'};
                this.showTasks = false;
                this.utils.dismissLoading();
                setTimeout(() => {
                    if (!this.currentTask.id) {
                        this.showTasks = false;
                    }
                }, 2500)
            })
    }

// gets the directions, passes the directions as a param to
// the driving directions page
    showDrivingDirections(lat, lon) {
        this.utils.presentLoading();
        let locEnabled: boolean = false;

        let successCallback = (isAvailable) => {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            } else {
                this.utils.presentToast("Please verify that your location is turned on in your device settings", true);
                return;
            }
        };
        let errorCallback = (e) => {
            this.utils.presentToast("Please verify that your location is turned on in your device settings", true);
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
                    this.utils.presentToast("Please verify that your location is turned on in your device settings", true);
                })
            }
            if (locEnabled === false) {
                this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    }

// opens the reject task modal, handles the data passed back from the modal
    openRejectModal() {
        let modal: Modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss((data) => {
            if (data.save === true) {
                this.setStatus(8, data.notes);
            }
        })
    }

    openCompletePage() {
        this.complete = true;
        let params = {
            'task_id': this.currentTask.job_tasks.id,
            'user_id': this.currentUser.userId
        };
        this.navCtrl.push(CompleteNotesPage, params).then(res => {
        });
        return true;
    }

// does not open a modal as the name might suggest.
// Instead it navigates to a page
    openFeedbackModal() {
        this.complete = true;
        let params = {
            'task_id': this.currentTask.job_tasks.id,
            'user_id': this.currentUser.userId
        };
        this.navCtrl.push(FeedbackPage, params).then(res => {
        });
        return true;
    }

    openNextDayTasks() {
        this.navCtrl.push(NextDayPage).then(response => {
        });
        return true;
    }

// laborer functions
    loadLaborersTasks() {
        this.utils.presentLoading();
        this.taskMgr.loadLaborerTasks(this.currentUser.userId).then((response: any) => {
            if (response.data === []) {
                this.showTasks = false;
                this.utils.dismissLoading();
            }
            else {
                this.laborerTasks = response;
                this.myFirstKey = this.laborerTasks.data[Object.keys(this.laborerTasks.data)[0]];
                if (this.myFirstKey === undefined) {
                    this.showTasks = false;
                    this.utils.dismissLoading();
                }
                else {
                    this.showTasks = true;
                    let firstKey = this.laborerTasks.data[Object.keys(this.laborerTasks.data)[0]];

                    firstKey.sort(function (a, b) {
                        return (a.task_start_time > b.task_start_time) ? 1 : ((b.task_start_time > a.task_start_time) ? -1 : 0);
                    });
                    this.utils.dismissLoading();
                }
            }
        })
    }

    setLaborerStatus = (statusId: number, taskId: number, dateKey: string, taskIndex: number, notes?: any): void => {
        if (statusId === 3) {
            this.laborerTasks.data[dateKey][taskIndex].status_id = 3;
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
                this.utils.dismissLoading();
            });
        } else if (statusId === 8) {
            this.laborerTasks.data[dateKey][taskIndex].status_id = 8;
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
                this.utils.dismissLoading();
            });
        }
    };

    openLaborerRejectModal(statusId: number, taskId: number, dateKey: string, taskIndex: number, notes ?: any) {
        let modal: Modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss((data) => {
            if (data.save === true) {
                this.setLaborerStatus(statusId, taskId, dateKey, taskIndex, data.notes);
            }
        })
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
                this.content.scrollTo(0, ((index * 50) + 85), 300).then(res => {
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

    openInAppBrowser() {
        let options = "location=no";
        this.iab.create("https://www.cleartasksolutions.com/app/login/index.html", "_system", options);
    }

    createTimecardEntry(status) {
        if (this.showTasks) {

            if (status === 0 && this.currentTask.job_tasks.status_id === 4) {
                let newNotes = "Clocked out while task was started";
                this.setStatus(13, newNotes, false)
            }
            if (status === 1 && this.currentTask.job_tasks.status_id === 13) {
                let newNotes = "Clocked in, resumed task";
                this.setStatus(4, newNotes, false)
            }
        }
        this.taskMgr.createTimecardEntry(this.currentUser.userId, this.lat, this.lon, status).then(res => {
            this.timecardStatus = status;
            this.showTimecard = false;
        })
    }

    showClockInOut() {
        this.showTimecard = !this.showTimecard;
    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }

    checkUpdates() {
        loadNewVersion();
    }
}

