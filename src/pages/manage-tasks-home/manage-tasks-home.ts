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


@Component({
    selector: 'page-manage-tasks-home',
    templateUrl: 'manage-tasks-home.html',

})

export class ManageTasksHomePage {
    @ViewChild('ctsNav') nav: NavController;
    @ViewChild(Content) content: Content;

    debug: boolean;

    currentUser: any = '';
    userId: number;
    data: any;
    isIos: boolean = false;
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
                private sim: Sim) {

        this.debug = this.utils.returnDebug();
        this.currentUser = this.userMgr.getUser();
        console.log('this.currentUser ', JSON.stringify(this.currentUser));
        this.userId = this.currentUser.userId;
        this.userRole = this.currentUser.role_id;
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        this.isCordova = this.taskMgr.returnPlatform().isCordova;


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad manage tasks');
        this.checkForCurrentTask();
    }


    ionViewDidEnter() {
        console.log('ionViewDidEnter manage tasks');
        console.log("temp hold in tskmgr - " + this.taskMgr.returnTempHold().tempHold);
        this.loadMultipleTasks();

        if (this.taskMgr.returnTempHold().tempHold === true) {
            this.activeTask = {};
            this.taskMgr.passTempHold(false);
        }

        if (this.taskMgr.returnTempHold().resumeTempHold === true) {
            console.log('inside second if');
            this.checkForCurrentTask();
            this.taskMgr.passTempHold(false, false);
        }

        let tempObject = this.taskMgr.returnCompleteTask();

        if(tempObject.completeTask === true) {
            this.taskMgr.passCompleteTask(false);
            this.activeTask = {}
        }


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
                console.log('res in new location service', JSON.stringify(res));
                resolve(`${this.lat},${this.lon}`);
            }, (err: any) => {
                console.log('err ', JSON.stringify(err));
                reject(err)
            })
        })
    }

    checkForCurrentTask() {
        this.taskMgr.getCurrentTaskRemote().then((response: any) => {
            console.log('response in check ', JSON.stringify(response));
            if (response.task.job_tasks.status_id > 3) {
                this.activeTask = response.task.job_tasks;
            }

        })
    }


    loadMultipleTasks() {
        this.getTimecardStatus();
        this.taskMgr.loadMultipleTasks().then((res: any) => {
            console.log('res in home ', JSON.stringify(res));

            this.projectObject = res.data;

        })
    }


    setStatus(statusId: number, taskId: number, projectIndex: number, taskIndex: number, notes?: any) {
        if (statusId === 3 || statusId === 8) {
            this.projectObject[projectIndex].job_tasks[taskIndex].status_id = statusId;
            let data = {
                userId: this.userId,
                notes: notes || '',
                statusId: statusId,
                files: [],
                timestamp: new Date(Date.now()),
                taskId: taskId
            };
            this.taskMgr.updateManagedTaskStatus(data).then((response) => {
                this.utils.dismissLoading();
            }).catch(error => {
                if (this.debug) {
                    console.log(`ERROR: ${Utils.toJson(error)}`);
                }
                this.utils.toastError(error);
            });
        } else if (statusId === 4 || statusId === 5 || statusId === 7 || statusId === 9) {
            //update task status
            this.projectObject[projectIndex].job_tasks[taskIndex].status_id = statusId;
            //store current task

            this.storeCurrentTask(this.projectObject[projectIndex].job_tasks[taskIndex], statusId);
            //update task
            this.dataFunction(notes, statusId, taskId).then((res: any) => {
                this.taskMgr.updateManagedTaskStatus(res).then((response) => {
                    console.log('response ', JSON.stringify(response));
                    if (statusId === 9) {
                        this.loadMultipleTasks();
                    }
                })
            })

        }
    };

    showActiveTask() {
        console.log('this.activeTask ', JSON.stringify(this.activeTask));
    }

    storeCurrentTask(task: any, statusId: number) {
        console.log('task in storeCurrentTask() ', JSON.stringify(task));
        console.log('statusId in storeCurrentTask()  ', JSON.stringify(statusId));
        if (statusId === 4 || statusId === 5 || statusId === 7) {
            this.activeTask = task;
            console.log('this.activeTask ', JSON.stringify(this.activeTask));
        } else if (statusId === 9) {
            this.activeTask = {};
        }
    }


    // function to replace writing this logic multiple times in this.setStatus
    dataFunction(notes: any, statusId: number, taskId: number) {
        return new Promise((resolve, reject) => {
            let data = {};
            if (this.isCordova) {
                this.setLocation().then(() => {
                    data = {
                        userId: this.userId,
                        notes: notes || '',
                        statusId: statusId,
                        files: [],
                        lat: this.lat,
                        lon: this.lon,
                        taskId: taskId
                    };

                    resolve(data);
                })
            } else {
                data = {
                    userId: this.userId,
                    notes: notes || '',
                    statusId: statusId,
                    files: [],
                    taskId: taskId
                };
                resolve(data);
            }

        })
    }

    openRejectModal(statusId: number, taskId: number, projectIndex: number, taskIndex: number, notes?: any) {
        let modal: Modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss((data) => {
            if (data.save === true) {
                this.setStatus(statusId, taskId, projectIndex, taskIndex, data.notes);
            }
        })
    }


    // 0 = complete page, 1 = feedback page
    openActionPage(page: number) {
        this.utils.presentLoading();
        let params = {};
        if (this.isCordova) {
            this.setLocation().then((res: any) => {
                params = {
                    'lat': this.lat,
                    'lon': this.lon,
                    'task_id': this.activeTask.id,
                    'user_id': this.userId
                };
                if (page === 0) {
                    this.navCtrl.push(CompleteNotesPage, params).then(res => {
                        this.utils.dismissLoading();
                    });
                    return true;
                } else if (page === 1) {
                    this.navCtrl.push(FeedbackPage, params).then(res => {
                        this.utils.dismissLoading();
                    });
                    return true;
                }
            })
        } else {
            params = {
                'lat': 0,
                'lon': 0,
                'task_id': this.activeTask.id,
                'user_id': this.userId
            };
            console.log('params ', JSON.stringify(params));
            if (page === 0) {
                this.navCtrl.push(CompleteNotesPage, params).then(res => {
                    this.utils.dismissLoading();
                });
                return true;
            } else if (page === 1) {
                console.log("heading to feedback")
                this.navCtrl.push(FeedbackPage, params).then(res => {
                    this.utils.dismissLoading();
                });
                return true;
            }
        }
    }


    toggleDivState(proj) {
        if (this.contractorDetails.proj === proj) {
            this.contractorDetails.proj = -1;
        } else {
            this.contractorDetails.proj = proj;
        }
    }

    expandTask(project, task) {
        if (this.taskDetails.proj === project) {
            if (this.taskDetails.task === task) {
                this.taskDetails.proj = -1;
                this.taskDetails.task = -1;
            } else if (this.taskDetails.task !== task) {
                this.taskDetails.task = task;
            }
        } else if (this.taskDetails.proj !== project) {
            this.taskDetails.proj = project;
            this.taskDetails.task = task;
        }
    }

    showDrivingDirections(lat, lon) {
        let options = "location=no";
        this.iab.create("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon + "&travelmode=driving&dir_action=navigate", "_system", options);
    }

    logout() {

        this.userMgr.logout().then(response => {
            this.appCtrl.getRootNav().push(LoginPage);
        })

        // if (this.timecardStatus === 1) {
        //     let alert = this.alertCtrl.create({
        //         title: 'Timecard Alert!',
        //         cssClass: 'myAlerts',
        //         message: 'You are currently clocked in. Please clock out before logging out.',
        //         buttons: ['OK']
        //     });
        //     alert.present();
        // }
        // else {
        //     let token = 'logged out';
        //     this.taskMgr.updateEmployeeToken(token, this.currentUser.userId).then(res => {
        //         if (this.debug) {
        //             console.log('res ', JSON.stringify(res));
        //         }
        //     });
        //     this.userMgr.logout().then(response => {
        //         this.appCtrl.getRootNav().push(LoginPage);
        //     })
        // }
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

    getTimecardStatus() {
        this.taskMgr.getLastTimecardEntry(this.userId).then((res: any) => {
            console.log('res timecard', JSON.stringify(res));
            if (res.data.length === 0) {
                this.timecardStatus = 0;
            } else {
                this.timecardStatus = res.data.status;
            }
        })
    }

    createTimecardEntry(status) {
        this.utils.presentLoading();

        console.log('this.isCordova ', JSON.stringify(this.isCordova));
        console.log('this.isCordova type' + typeof this.isCordova);

        if (this.userRole !== 6 && this.activeTask.id) {
            let newNotes = '';

            if (status === 0 && this.activeTask.status_id === 4) {
                newNotes = "Clocked out while task was started";
                this.dataFunction(newNotes, 13, this.activeTask.id).then((res: any) => {
                    this.taskMgr.updateManagedTaskStatus(res).then((response) => {
                        this.activeTask.status_id = 13;
                        console.log('response ', JSON.stringify(response));
                    })
                })
            } else if (status === 1 && this.activeTask.status_id === 13) {
                newNotes = "Clocked in, resumed task";
                this.dataFunction(newNotes, 4, this.activeTask.id).then((res: any) => {
                    this.taskMgr.updateManagedTaskStatus(res).then((response) => {
                        this.activeTask.status_id = 4;
                        console.log('response ', JSON.stringify(response));
                    })
                })
            }


        }

        if (this.isCordova) {
            this.setLocation().then((res: any) => {
                this.taskMgr.createTimecardEntry(this.currentUser.userId, this.lat, this.lon, status).then(res => {
                    if (this.debug) {
                        console.log("inside create timecard entry");
                    }

                    this.timecardStatus = status;
                    this.showTimecard = false;
                    this.utils.dismissLoading();
                })
            })
        } else if (!this.isCordova) {
            console.log("Create timecard entry");
            this.taskMgr.createTimecardEntry(this.currentUser.userId, 0, 0, status).then(res => {
                if (this.debug) {
                    console.log("inside create timecard entry");
                }

                this.timecardStatus = status;
                this.showTimecard = false;
                this.utils.dismissLoading();
            })
        }


    }


    showClockInOut() {
        this.showTimecard = !this.showTimecard;
    }


}