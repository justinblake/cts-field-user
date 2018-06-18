import {Component, ViewChild, Pipe, PipeTransform} from '@angular/core';
import {HardwareBackButtonService} from '../../providers/backbutton';
import {NavController, NavParams, App, Modal, Platform, Content, AlertController} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {LoginPage} from '../login/login';
import {FeedbackPage} from '../feedback/feedback';
import {GeolocationService} from '../../providers/geolocation-service'
import {TaskManager} from '../../providers/task-manager';
import {UserManager} from '../../providers/user-manager';
import {checkForUpdate} from '../../providers/deploy-manager';
import {downloadUpdate} from '../../providers/deploy-manager';
import {extractUpdate} from '../../providers/deploy-manager';
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
import {Sim} from '@ionic-native/sim';
import {TaskPhotoReviewPage} from '../task-photo-review/task-photo-review';
import {StorageService} from "../../providers/storage-service";
import {TabsPage} from "../tabs/tabs";
import {ManageTasksHomePage} from "../manage-tasks-home/manage-tasks-home";
import {SplashPage} from "../splash/splash";
import {SplashScreen} from '@ionic-native/splash-screen';
import {SingleUpcomingTaskPage} from "../single-upcoming-task/single-upcoming-task";
import {SingleLaborerTaskPage} from "../single-laborer-task/single-laborer-task";


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

    debug: boolean;

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
    locationTimestamp: any;
    locationAccuracy: any;
    isCordova: boolean;
    role_id: number;

    empData: any = {};

    cell_carrier: any;
    app_version: any;
    software_version: any;
    emp_platform: any;
    operating_system: any;
    cell_number: any;
    emp_device_id: any;

    retrievingLocation: boolean = false;
    createEntry: boolean = false;
    localHour: number;

    taskFileUrl: string = 'https://www.cleartasksolutions.com/assets/task_files/';


    constructor(public navCtrl: NavController,
                public taskMgr: TaskManager,
                public geoSrvc: GeolocationService,
                public plt: Platform,
                public navParams: NavParams,
                private userMgr: UserManager,
                private appCtrl: App,
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
                private sim: Sim,
                private storage: StorageService,
                private splashscreen: SplashScreen) {

        this.debug = this.utils.returnDebug();

        this.isCordova = this.plt.is('cordova');
        console.log('this.isCordova ', JSON.stringify(this.isCordova));

        plt.ready().then(() => {
            this.plt.pause.subscribe(() => {
                if (this.debug) {
                    console.log('[INFO] App paused');
                }
            });

            this.plt.resume.subscribe(() => {
                if (this.isCordova) {
                    this.localTimeFunction();
                    this.setLocation();
                }

                if (this.debug) {
                    console.log('[INFO] App resumed');
                }
            });
        });


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
                this.taskMgr.updateEmployeeToken(token).then(response => {
                })
            });
        }

        this.currentUser = this.userMgr.getUser();
        this.userRole = this.currentUser.role_id;
        this.role_id = this.currentUser.role_id;
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
                .catch((error: any) => {
                    if (this.debug) {
                        console.log(error)
                    }
                });
        }
        this.hideMoreProject = true;
        this.divState = 'collapse';
    }

    localTimeFunction() {
        let interimTime = new Date();
        this.localHour = interimTime.getHours();
    }


    ionViewDidLoad() {
        this.localTimeFunction();
        this.setUser();
        setTimeout(() => this.setCompany(), 500);
        this._backBtn.registerAction(() => {
            this._backBtn.doubleBackToExit();
        }, 101);

        if (this.plt.is('cordova')) {
            setTimeout(() => this.getSimInfo(), 6000)
        }

        this.empData.employee_id = this.currentUser.userId;
        this.empData.app_version = this.utils.returnAppVersion();

        let userPlatform = this.plt.versions();
        let stringPlatform = this.plt.platforms();
        if (this.debug) {
            console.log('userPlatform ', JSON.stringify(userPlatform));
            console.log('stringPlatform ', JSON.stringify(stringPlatform));
        }


        if (this.isIos) {
            let software = 'ios';
            this.empData.operating_system = 'ios';
            this.empData.software_version = userPlatform[software].str;
            this.empData.emp_platform = stringPlatform.toString();
        }

        if (this.isAndroid) {
            let software = 'android';
            this.empData.operating_system = 'android';
            this.empData.software_version = userPlatform[software].str;
            this.empData.emp_platform = stringPlatform.toString();
        }

        if (this.debug) {
            console.log('empData ', JSON.stringify(this.empData));
        }


    }

    ionViewDidEnter() {


        let alertDispatch = this.taskMgr.returnDispatchAlert();
        this.currentUser = this.userMgr.getUser();
        this.subscribeAgain();
        let tempNum = this.taskMgr.reportHomePage();
        if (tempNum === 0 && alertDispatch.hasDispatchAlert === false) {
            if (this.userRole === 6) {
                this.loadLaborersTasks();
            } else {
                if (this.isCordova) {
                    this.setLocation();
                }
                this.setCurrentTask(true);
                setTimeout(() => {
                    this.setBadges()
                }, 3000);
            }
        } else if (tempNum === 1) {
            this.presentFutureAlert();
        } else if (tempNum === 2) {
            this.presentAlert();
        } else if (alertDispatch.hasDispatchAlert === true) {
            this.openNextDayTasksAlert(alertDispatch.alertTaskId, alertDispatch.alertId);
        }
        setTimeout(() => {
            this.checkUpdates();
        }, 7500);


    }

    // test
    // test

    // helper method for the expand/collapse div animation
    toggleDivState() {
        let states = {
            expand: 'collapse',
            collapse: 'expand'
        };
        this.divState = states[this.divState];
    }

    getSimInfo() {
        if (this.isAndroid) {
            this.sim.requestReadPermission().then(
                () => {
                    this.sim.getSimInfo().then((info: any) => {
                            console.log('info ', JSON.stringify(info));
                            this.empData.cell_carrier = info.carrierName;
                            this.empData.cell_number = info.phoneNumber;
                            this.empData.emp_device_id = info.deviceId;
                            if (this.debug) {
                                console.log('this.empData ', JSON.stringify(this.empData));
                            }
                        },
                        (err) => {
                            if (this.debug) {
                                console.log('Unable to get sim info: ', err)
                            }
                        })
                },
                () => {
                    if (this.debug) {
                        console.log('Permission denied')
                    }
                }
            );
        }

        if (this.isIos) {
            this.sim.getSimInfo().then((info: any) => {
                    this.empData.cell_carrier = info.carrierName;
                    this.empData.emp_device_id = info.mcc;
                    if (this.debug) {
                        console.log('this.empData in ios', JSON.stringify(this.empData));
                    }
                },
                (err) => {
                    if (this.debug) {
                        console.log('Unable to get sim info: ', err)
                    }
                })
        }

    }

    //This sets the current user in the Task Manager so that when a user does not have a task the user ID is still available
    setUser() {
        this.taskMgr.setUser();
    }

    subscribeAgain() {
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(data => {
                // console.log('data from alert', JSON.stringify(data));
                if (data.param1 === 'alert') {
                    if (data.project !== 'null') {
                        this.openNextDayTasksAlert(data.task, data.project);
                    } else {
                        if (this.role_id === 3) {
                            this.navCtrl.parent.select(2);
                        } else {
                            this.navCtrl.parent.select(3);
                        }

                    }
                } else if (data.param1 === 'additional_notes') {
                    if (this.showTasks === true) {
                        this.presentAlert();
                    }
                } else if (data.param1 === "upcoming_task") {
                    this.presentFutureAlert();
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
                if (this.debug) {
                    console.log('res ', JSON.stringify(res));
                }
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

    // test

    setLocation() {

        return new Promise((resolve, reject) => {
            this.lat = 0;
            this.lon = 0;

            let platform = 'ios';
            if (this.isAndroid) {
                platform = 'android'
            }
            this.geoSrvc.getCurrentPosition(platform).then((res: any) => {
                this.lat = res.lat;
                this.lon = res.lon;
                this.locationTimestamp = res.timestamp;
                this.locationAccuracy = res.accuracy;

                resolve(`${this.lat},${this.lon}`);
            }, (err: any) => {
                console.log('err ', JSON.stringify(err));
                reject(err)
            })
        })
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
                this.setCurrentTask(false);
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
            if (!this.isCordova) {
                this.retrievingLocation = true;
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
                    setTimeout(() => {
                        this.taskMgr.updateTaskStatus(data).then((response) => {

                            this.retrievingLocation = false;

                            this.setCurrentTask(false);
                        }).catch(error => {
                            if (this.debug) {
                                console.log("error " + error);
                            }
                        });
                    }, 5000)
                }
            }
            else {
                this.retrievingLocation = true;
                this.setLocation().then((res: any) => {
                    let data = this.dataFunction(notes, statusId, this.lat, this.lon);
                    if (data.statusId === 6 || data.statusId === 9) {
                        this.showTasks = false;
                        this.taskMgr.updateTaskStatus(data).then((response) => {
                            this.retrievingLocation = false;
                            this.setCurrentTask(false);
                        }).catch(error => {
                            if (this.debug) {
                                console.log("error " + error);
                            }
                        });
                    }
                    else if (data.statusId < 8 || data.statusId === 10 || data.statusId === 13) {
                        this.taskMgr.updateTaskStatus(data).then((response) => {
                            this.retrievingLocation = false;
                            this.setCurrentTask(false);
                        }).catch(error => {
                            if (this.debug) {
                                console.log("error " + error);
                            }
                        });
                    }
                });
            }
        }
        //test
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


// function to replace writing this logic multiple times in this.setStatus
    dataFunction(notes: any, statusId: number, lat ?: any, lon ?: any) {
        if (lat) {
            this.myData = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                lat: lat,
                lon: lon,
                timestamp: new Date(Date.now()),
                accuracy: this.locationAccuracy
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
            if (!this.currentTask.hasOwnProperty('id')) {
                this.showTasks = false;
            } else if (
                this.currentTask.job_tasks.status_id === 2 ||
                this.currentTask.job_tasks.status_id === 3 ||
                this.currentTask.job_tasks.status_id === 4 ||
                this.currentTask.job_tasks.status_id === 5 ||
                this.currentTask.job_tasks.status_id === 7 ||
                this.currentTask.job_tasks.status_id === 13) {

                this.showTasks = true;
                if (this.debug) {
                    console.log('this.currentTask ', JSON.stringify(this.currentTask));
                }
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
        let options = "location=no";
        this.iab.create("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon + "&travelmode=driving&dir_action=navigate", "_system", options);
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
        this.setLocation();
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
        this.utils.presentLoading();
        this.complete = true;
        if (this.isCordova) {
            this.setLocation().then((res: any) => {
                let params = {
                    'lat': this.lat,
                    'lon': this.lon,
                    'accuracy': this.locationAccuracy,
                    'task_id': this.currentTask.job_tasks.id,
                    'user_id': this.currentUser.userId
                };
                this.navCtrl.push(FeedbackPage, params).then(res => {
                    this.utils.dismissLoading();
                });
                return true;
            })
        } else {
            let params = {
                'lat': 0,
                'lon': 0,
                'task_id': this.currentTask.job_tasks.id,
                'user_id': this.currentUser.userId
            };
            this.navCtrl.push(FeedbackPage, params).then(res => {
                this.utils.dismissLoading();
            });
            return true;
        }

    }

    openNextDayTasks(taskId?: string) {
        this.navCtrl.push(NextDayPage).then(response => {
        });
        return true;
    }

    openNextDayTasksAlert(task, alert_id) {
        let params = {
            task: task,
            alert_id: alert_id
        };
        this.taskMgr.clearDispatchAlert();
        this.navCtrl.push(NextDayPage, params).then(response => {

        });
        return true;
    }

// laborer functions
    loadLaborersTasks() {
        this.utils.presentLoading();
        this.getTimecardStatus();
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
            .then(() => {
                if (this.debug) {
                    console.log('Launched dialer!')
                }
            })
            .catch(() => {
                if (this.debug) {
                    console.log('Error launching dialer')
                }
            })
    }

    openInAppBrowser() {
        let options = "location=no";
        this.iab.create("https://www.cleartasksolutions.com/app/login", "_system", options);
    }

    disableStart() {
        if (this.timecardStatus === 0) {
            return true;
        }
    }

    createTimecardEntry(status) {
        this.createEntry = true;

        if (this.showTasks && this.userRole !== 6) {
            if (status === 0 && this.currentTask.job_tasks.status_id === 4) {
                let newNotes = "Clocked out while task was started";
                this.setStatus(13, newNotes, false)
            }
            if (status === 1 && this.currentTask.job_tasks.status_id === 13) {
                let newNotes = "Clocked in, resumed task";
                this.setStatus(4, newNotes, false)
            }
        }
        if (this.isCordova) {
            this.setLocation().then((res: any) => {
                this.taskMgr.createTimecardEntry(this.currentUser.userId, this.lat, this.lon, status, this.locationAccuracy).then(res => {
                    if (this.debug) {
                        console.log("inside create timecard entry");
                    }
                    this.timecardStatus = status;
                    this.showTimecard = false;
                    this.createEntry = false;
                })
            })
        } else if (!this.isCordova) {
            setTimeout(() => {
                this.taskMgr.createTimecardEntry(this.currentUser.userId, 0, 0, status).then(res => {
                    if (this.debug) {
                        console.log("inside create timecard entry");
                    }
                    this.timecardStatus = status;
                    this.showTimecard = false;
                    this.createEntry = false;
                })
            }, 3000)
        }


    }


    openAttachedUrl(url) {
        let options = "location=no";
        this.iab.create("" + url, "_system", options);
    }

    openAttachedImage(imageObject) {
        let fileType: string = '';
        if (imageObject.file_type !== 'application/pdf') {
            fileType = 'image';
            let params = {
                file_type: fileType,
                file_name: '' + this.taskFileUrl + '' + imageObject.file_name,
                notes: imageObject.notes
            };
            this.navCtrl.push(TaskPhotoReviewPage, params).then(() => {
            })
        } else if (imageObject.file_type === 'application/pdf') {
            fileType = 'pdf';
            let options = "location=no";
            this.iab.create('' + this.taskFileUrl + '' + imageObject.file_name, "_system", options);
        }
    }

    showClockInOut() {
        this.showTimecard = !this.showTimecard;
    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }


    openSingleTask(task) {
        console.log('task ', task);
        let params = {
            currentTask: task
        };
        this.navCtrl.push(SingleLaborerTaskPage, params).then(() => {
            // console.log('in promise of push ');
        })

    }

    checkUpdates() {
        // if (this.isCordova) {
        //     checkForUpdate().then((res: any) => {
        //         if (res === 'true') {
        //
        //             let appVersion = this.utils.returnAppVersion();
        //
        //             let empObject: any = {
        //                 userId: this.currentUser.userId,
        //                 software_version: this.empData.software_version,
        //                 emp_platform: this.empData.emp_platform,
        //                 operating_system: this.empData.operating_system,
        //                 cell_carrier: this.empData.cell_carrier,
        //                 version: appVersion,
        //                 source: 1
        //             };
        //
        //             if (this.isAndroid) {
        //                 empObject.cell_number = this.empData.cell_number;
        //                 empObject.emp_device_id = this.empData.emp_device_id;
        //             }
        //
        //             // this.taskMgr.updateUserDeviceInfo(empObject).then((appVerResult) => {
        //             //     console.log('appVerResult ', JSON.stringify(appVerResult));
        //             //     downloadUpdate().then((result: any) => {
        //             //         if (result === 'true') {
        //             //             extractUpdate().then((extract: any) => {
        //             //                 if (extract === 'done') {
        //             //                     loadNewVersion();
        //             //                 }
        //             //             })
        //             //         }
        //             //     })
        //             //
        //             // });
        //
        //
        //         }
        //     });
        // } else {
        //     console.log('Not Cordova so no updates')
        // }
    }


    // checkVersions() {
    //     checkVersions().then((response:any)=>{
    //         console.log('response in check version home ', JSON.stringify(response));
    //     });
    //     checkVersionInfo().then((res:any) => {
    //         console.log('res in check version home ', JSON.stringify(res));
    //     })
    // }
    //
    // deleteOldBuilds() {
    //     deleteOldVersions().then((res:any) =>{
    //         console.log('res in delete ', JSON.stringify(res));
    //     });
    // }

    convertDate(input) {
        return this.conMgr.convertDate(input);

    }
}

