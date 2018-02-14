import {Component, ViewChild, Pipe, PipeTransform} from '@angular/core';
import {HardwareBackButtonService} from '../../providers/backbutton';
import {NavController, NavParams, App, Modal, Platform, Content, AlertController} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {LoginPage} from '../login/login';
import {FeedbackPage} from '../feedback/feedback';
import {GeolocationService} from '../../providers/geolocation-service';
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
        this.userId = this.currentUser.userId;
        this.userRole = this.currentUser.role_id;
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        this.isCordova = this.taskMgr.returnPlatform().isCordova;


    }

    // ionViewDidLoad() {
    //     this.checkForCurrentTask();
    // }


    ionViewDidEnter() {
        this.checkForCurrentTask();
        console.log('ionViewDidEnter manage tasks');
        console.log("temp hold in tskmgr - " + this.taskMgr.returnTempHold().tempHold);
        this.loadMultipleTasks();

        if (this.taskMgr.returnTempHold().tempHold === true) {
            this.activeTask = {};
            this.taskMgr.passTempHold(false);
        }

        if (this.taskMgr.returnTempHold().resumeTempHold === true) {
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
                resolve(`${this.lat},${this.lon}`);
            }, (err: any) => {
                reject(err)
            })
        })
    }

    checkForCurrentTask() {
        this.taskMgr.getCurrentTaskRemote().then((response: any) => {
            console.log('response in check checkForCurrentTask ', JSON.stringify(response));
            if (response.task.job_tasks.status_id > 3) {
                this.activeTask = response.task.job_tasks;
                this.managesTskMgr.storeTask(this.activeTask);
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



    showActiveTask() {
        console.log('this.activeTask ', JSON.stringify(this.activeTask));

        let testObject: any = this.managesTskMgr.returnTask().activeTask;
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
        console.log('project ', JSON.stringify(project));
        console.log('task ', JSON.stringify(task));
        let userInfo = {
            timecardStatus: this.timecardStatus,
            userId: this.userId
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
        console.log('currentTask in middle ', JSON.stringify(currentTask));
        let params = {
            currentTask: currentTask,
            currentProject: currentProject,
            userInfo: userInfo
        };
        this.navCtrl.push(SingleManageTasksPage, params).then(() => {
            console.log('in promise of push ');
        })
    }



    //Timecard and logout functions

    getTimecardStatus() {
        this.taskMgr.getLastTimecardEntry(this.userId).then((res: any) => {
            console.log('res in timecard', JSON.stringify(res));
            if (res.data.length === 0) {
                this.timecardStatus = 0;
            } else {
                this.timecardStatus = res.data.status;
            }
        })
    }

    createTimecardEntry(status) {
        this.utils.presentLoading();
        if (this.userRole !== 6 && this.activeTask.id) {
            let newNotes = '';
            if (status === 0 && this.activeTask.status_id === 4) {
                newNotes = "Clocked out while task was started";
                this.dataFunction(newNotes, 13, this.activeTask.id).then((res: any) => {
                    this.taskMgr.updateManagedTaskStatus(res).then((response) => {
                        this.activeTask.status_id = 13;
                    })
                })
            } else if (status === 1 && this.activeTask.status_id === 13) {
                newNotes = "Clocked in, resumed task";
                this.dataFunction(newNotes, 4, this.activeTask.id).then((res: any) => {
                    this.taskMgr.updateManagedTaskStatus(res).then((response) => {
                        this.activeTask.status_id = 4;
                    })
                })
            }
        }
        if (this.isCordova) {
            this.setLocation().then((res: any) => {
                this.taskMgr.createTimecardEntry(this.currentUser.userId, this.lat, this.lon, status).then(res => {
                    this.timecardStatus = status;
                    this.showTimecard = false;
                    this.loadMultipleTasks();
                    this.utils.dismissLoading();
                })
            })
        } else if (!this.isCordova) {
            this.taskMgr.createTimecardEntry(this.currentUser.userId, 0, 0, status).then(res => {
                this.timecardStatus = status;
                this.showTimecard = false;
                this.loadMultipleTasks();
                this.utils.dismissLoading();
            })
        }
    }

    showClockInOut() {
        this.showTimecard = !this.showTimecard;
    }

    logout() {
        // this.userMgr.logout().then(response => {
        //     this.appCtrl.getRootNav().push(LoginPage);
        // })
        // add alert to logout button
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

      // storeCurrentTask(task: any, statusId: number) {
    //     console.log('task in storeCurrentTask() ', JSON.stringify(task));
    //     console.log('statusId in storeCurrentTask()  ', JSON.stringify(statusId));
    //     if (statusId === 4 || statusId === 5 || statusId === 7) {
    //         this.activeTask = task;
    //         console.log('this.activeTask ', JSON.stringify(this.activeTask));
    //     } else if (statusId === 9) {
    //         this.activeTask = {};
    //     }
    // }



    // setStatus(statusId: number, taskId: number, projectIndex: number, taskIndex: number, notes?: any) {
    //     if (statusId === 3 || statusId === 8) {
    //         this.projectObject[projectIndex].job_tasks[taskIndex].status_id = statusId;
    //         let data = {
    //             userId: this.userId,
    //             notes: notes || '',
    //             statusId: statusId,
    //             files: [],
    //             timestamp: new Date(Date.now()),
    //             taskId: taskId
    //         };
    //         this.taskMgr.updateManagedTaskStatus(data).then((response) => {
    //             this.utils.dismissLoading();
    //         }).catch(error => {
    //             if (this.debug) {
    //                 console.log(`ERROR: ${Utils.toJson(error)}`);
    //             }
    //             this.utils.toastError(error);
    //         });
    //     } else if (statusId === 4 || statusId === 5 || statusId === 7 || statusId === 9) {
    //         //update task status
    //         this.projectObject[projectIndex].job_tasks[taskIndex].status_id = statusId;
    //         //store current task
    //
    //         this.storeCurrentTask(this.projectObject[projectIndex].job_tasks[taskIndex], statusId);
    //         //update task
    //         this.dataFunction(notes, statusId, taskId).then((res: any) => {
    //             this.taskMgr.updateManagedTaskStatus(res).then((response) => {
    //                 console.log('response ', JSON.stringify(response));
    //                 if (statusId === 9) {
    //                     this.loadMultipleTasks();
    //                 }
    //             })
    //         })
    //
    //     }
    // };

}