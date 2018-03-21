import {Component, ViewChild} from '@angular/core';
import {HardwareBackButtonService} from '../../providers/backbutton';
import {NavController, NavParams, App, Platform, Content, AlertController, reorderArray} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {LoginPage} from '../login/login';
import {GeolocationService} from '../../providers/geolocation-service';
import {TaskManager} from '../../providers/task-manager';
import {UserManager} from '../../providers/user-manager';
import {checkForUpdate} from '../../providers/deploy-manager';
import {downloadUpdate} from '../../providers/deploy-manager';
import {extractUpdate} from '../../providers/deploy-manager';
import {loadNewVersion} from '../../providers/deploy-manager';
import {Utils} from '../../utils/utils';
import {Diagnostic} from '@ionic-native/diagnostic';
import {NextDayPage} from '../next-day-tasks/next-day';
import {Badge} from '@ionic-native/badge';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";
import {Sim} from '@ionic-native/sim';
import {SingleManageTasksPage} from "../single-manage-tasks/single-manage-tasks";
import {ManagesTasksManager} from "../../providers/manages-tasks-manager";


@Component({
    selector: 'page-manage-tasks-home',
    templateUrl: 'manage-tasks-home.html',

})

export class ManageTasksHomePage {
    @ViewChild('ctsNav') nav: NavController;
    @ViewChild(Content) content: Content;

    debug: boolean;

    btnName: any = 'Edit Project Arrangement';
    reorderFlag: any = false;

    currentUser: any = '';
    userId: number;
    data: any;
    lat: number;
    lon: number;
    locationTimestamp: number;
    locationAccuracy: number;
    compName: any;
    userRole: number = 0;
    taskId: number = -1;
    myAlerts: number = 0;
    timecardStatus: number;
    showTimecard: boolean = false;
    isLessor: boolean = false;
    complete: boolean = false;
    isCordova: boolean;
    isAndroid: any;
    isIos: boolean = false;
    fcmToken: any = '';

    empData: any = {};

    projectObject: any = [];

    contractorDetails: any = {
        proj: -1
    };

    taskDetails: any = {
        proj: -1,
        task: -1
    };

    activeTask: any = {};

    createEntry: boolean = false;

    constructor(public navCtrl: NavController,
                public taskMgr: TaskManager,
                public geoSrvc: GeolocationService,
                public plt: Platform,
                public navParams: NavParams,
                public managesTskMgr: ManagesTasksManager,
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
                private sim: Sim) {

        this.debug = this.utils.returnDebug();
        this.currentUser = this.userMgr.getUser();
        console.log('this.currentUser ', JSON.stringify(this.currentUser));

        if (this.currentUser.is_lessor === 1) {
            this.isLessor = true;
        }

        this.userId = this.currentUser.userId;
        this.userRole = this.currentUser.role_id;
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        this.isCordova = this.taskMgr.returnPlatform().isCordova;
        this.isIos = this.taskMgr.returnPlatform().isIos;

        plt.ready().then(() => {
            this.plt.pause.subscribe(() => {
                if (this.debug) {
                    console.log('[INFO] App paused');
                }
            });

            this.plt.resume.subscribe(() => {
                if (this.isCordova) {
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

        if (this.isAndroid) {
            this.androidFullScreen.isImmersiveModeSupported()
                .then(() => this.androidFullScreen.immersiveMode())
                .catch((error: any) => {
                    if (this.debug) {
                        console.log(error)
                    }
                });
        }
    }

    reorderItems(indexes) {
        this.projectObject = reorderArray(this.projectObject, indexes);
    }

    ionViewDidLoad() {
        this.checkForCurrentTask();
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
        this.checkForCurrentTask();
        this.subscribeAgain();

        let tempNum = this.taskMgr.reportHomePage();
        if (tempNum === 0 && alertDispatch.hasDispatchAlert === false) {
            this.loadMultipleTasks();
            setTimeout(() => {
                this.setBadges()
            }, 3000);
        } else if (tempNum === 1) {
            this.presentFutureAlert();
        } else if (tempNum === 2) {
            this.presentAlert();
        } else if (alertDispatch.hasDispatchAlert === true) {
            this.openNextDayTasksAlert(alertDispatch.alertTaskId, alertDispatch.alertId);
        }
        if (this.taskMgr.returnTempHold().tempHold === true) {
            this.activeTask = {};
            this.taskMgr.passTempHold(false);
        }
        if (this.taskMgr.returnTempHold().resumeTempHold === true) {
            this.checkForCurrentTask();
            this.taskMgr.passTempHold(false, false);
        }
        let tempObject = this.taskMgr.returnCompleteTask();
        if (tempObject.completeTask === true) {
            this.taskMgr.passCompleteTask(false);
            this.activeTask = {}
        }
        setTimeout(() => {
            this.checkUpdates();
        }, 7500);

    }

    subscribeAgain() {
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(data => {
                // console.log('data from alert', JSON.stringify(data));
                if (data.param1 === 'alert') {
                    if (data.project !== 'null') {
                        this.openNextDayTasksAlert(data.task, data.project);
                    } else {
                        this.navCtrl.parent.select(3);
                    }
                } else if (data.param1 === 'additional_notes') {
                    if (this.projectObject.length > 0) {
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

    getSimInfo() {
        if (this.isAndroid) {
            this.sim.requestReadPermission().then(
                () => {
                    this.sim.getSimInfo().then((info: any) => {
                            this.empData.cell_carrier = info.carrierName;
                            this.empData.cell_number = info.phoneNumber;
                            this.empData.emp_device_id = info.deviceId;
                            if (this.debug) {
                                // console.log('this.empData ', JSON.stringify(this.empData));
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

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: ['OK']
        });
        this.loadMultipleTasks();
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

    setUser() {
        this.taskMgr.setUser();
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
                                            // console.log('res for location ', JSON.stringify(res));
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


                reject(err)
            })
        })
    }

    checkForCurrentTask() {
        this.taskMgr.getCurrentActiveTask().then((response: any) => {
            console.log('response ', JSON.stringify(response));
            if (response.task.job_tasks.status_id > 3) {
                this.activeTask = response.task.job_tasks;
                this.managesTskMgr.storeTask(this.activeTask);
            }
        })
    }

    loadMultipleTasks() {
        this.getTimecardStatus();
        this.taskMgr.loadMultipleTasks().then((res: any) => {
            this.projectObject = res.data;
        })
    }

    showActiveTask() {
        let testObject: any = this.managesTskMgr.returnTask().activeTask;

        console.log('this.activeTask ', JSON.stringify(this.activeTask));
        console.log('testObject ', JSON.stringify(testObject));


    }

    // function to replace writing this logic multiple times in this.setStatus
    dataFunction(notes: any, statusId: number, taskId: number) {
        return new Promise((resolve, reject) => {
            let data: any = {
                userId: this.userId,
                notes: notes || '',
                taskId: taskId,
                statusId: statusId,
                files: []
            };
            if (this.isCordova) {
                this.setLocation().then(() => {
                    data.lat = this.lat;
                    data.lon = this.lon;
                    data.accuracy = this.locationAccuracy;
                    resolve(data);
                })
            } else {
                resolve(data);
            }
        })
    }

    toggleDivState(proj) {
        if (this.contractorDetails.proj === proj) {
            this.contractorDetails.proj = -1;
        } else {
            this.contractorDetails.proj = proj;
        }
    }

    showDrivingDirections(lat, lon) {
        let options = "location=no";
        this.iab.create("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon + "&travelmode=driving&dir_action=navigate", "_system", options);
    }

    openNextDayTasks(taskId?: string) {
        this.navCtrl.push(NextDayPage).then(response => {
        });
        return true;
    }

    openInAppBrowser() {
        let options = "location=no";
        this.iab.create("https://www.cleartasksolutions.com/app/login/index.html", "_system", options);
    }

    openSingleTask(project, task) {
        // console.log('project ', JSON.stringify(project));
        // console.log('task ', JSON.stringify(task));
        let userInfo = {
            timecardStatus: this.timecardStatus,
            userId: this.userId,
            isLessor: this.isLessor
        };
        let currentProject = {
            job_name: this.projectObject[project].job_name,
            address: this.projectObject[project].address,
            city: this.projectObject[project].city,
            state: this.projectObject[project].state,
            zip: this.projectObject[project].zip,
            lat: this.projectObject[project].lat,
            lon: this.projectObject[project].lon,
            notes: this.projectObject[project].notes,
            contractor: this.projectObject[project].contractor,
            contractor_contacts: this.projectObject[project].contractor_contacts
        };
        let currentTask = this.projectObject[project].job_tasks[task];
        // console.log('currentTask in middle ', JSON.stringify(currentTask));
        let params = {
            currentTask: currentTask,
            currentProject: currentProject,
            userInfo: userInfo
        };
        this.navCtrl.push(SingleManageTasksPage, params).then(() => {
            // console.log('in promise of push ');
        })
    }


    //Timecard and logout functions

    getTimecardStatus() {
        this.taskMgr.getLastTimecardEntry(this.userId).then((res: any) => {
            if (res.data.length === 0) {
                this.timecardStatus = 0;
            } else {
                this.timecardStatus = res.data.status;
            }
        })
    }

    createTimecardEntry(status) {

        this.createEntry = true;
        if (this.userRole !== 6 && this.activeTask.id) {
            let newNotes = '';
            if (status === 0 && this.activeTask.status_id === 4) {
                newNotes = "Clocked out while task was started";
                this.dataFunction(newNotes, 13, this.activeTask.id).then((res: any) => {
                    this.taskMgr.updateManagedTaskStatus(res).then((response) => {

                        this.managesTskMgr.updateTaskStatus(13);
                        this.activeTask.status_id = 13;
                    })
                })
            } else if (status === 1 && this.activeTask.status_id === 13) {
                newNotes = "Clocked in, resumed task";
                this.dataFunction(newNotes, 4, this.activeTask.id).then((res: any) => {
                    this.taskMgr.updateManagedTaskStatus(res).then((response) => {

                        console.log('response in clock back in ', JSON.stringify(response));
                        this.activeTask.status_id = 4;
                    })
                })
            }
        }
        if (this.isCordova) {
            this.setLocation().then((res: any) => {
                this.taskMgr.createTimecardEntry(this.currentUser.userId, this.lat, this.lon, status, this.locationAccuracy).then(res => {
                    this.timecardStatus = status;
                    this.showTimecard = false;
                    this.createEntry = false;
                    this.loadMultipleTasks();
                })
            })
        } else if (!this.isCordova) {
            this.taskMgr.createTimecardEntry(this.currentUser.userId, 0, 0, status).then(res => {
                this.timecardStatus = status;
                this.showTimecard = false;
                this.createEntry = false;
                this.loadMultipleTasks();
            })
        }
    }

    showClockInOut() {
        this.showTimecard = !this.showTimecard;
    }

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
                    // console.log('res ', JSON.stringify(res));
                }
            });
            this.userMgr.logout().then(response => {
                this.appCtrl.getRootNav().push(LoginPage);
            })
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

    checkUpdates() {
        if (this.isCordova) {
            checkForUpdate().then((res: any) => {
                if (res === 'true') {
                    let appVersion = this.utils.returnAppVersion();

                    let empObject: any = {
                        userId: this.currentUser.userId,
                        software_version: this.empData.software_version,
                        emp_platform: this.empData.emp_platform,
                        operating_system: this.empData.operating_system,
                        cell_carrier: this.empData.cell_carrier,
                        version: appVersion,
                        source: 1
                    };

                    if (this.isAndroid) {
                        empObject.cell_number = this.empData.cell_number;
                        empObject.emp_device_id = this.empData.emp_device_id;
                    }

                    this.taskMgr.updateUserDeviceInfo(empObject).then((appVerResult) => {
                        console.log('appVerResult ', JSON.stringify(appVerResult));
                        downloadUpdate().then((result: any) => {
                            if (result === 'true') {
                                extractUpdate().then((extract: any) => {
                                    if (extract === 'done') {
                                        loadNewVersion();
                                    }
                                })
                            }
                        })
                    });

                }
            });
        } else {
            console.log('Not Cordova so no updates')
        }
    }


}