import {Component} from '@angular/core';
import {NavController, NavParams, App, AlertController} from 'ionic-angular';
import {TaskManager} from '../../providers/task-manager';
import {UserManager} from '../../providers/user-manager';
import {LoginPage} from '../login/login';
import {Utils} from '../../utils/utils';
import {Animations} from '../../animations/animations';
import {CallNumber} from '@ionic-native/call-number';
import {HistoryReviewPage} from '../history-review/history-review';
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";
import {SingleHistoryTaskPage} from "../single-history-task/single-history-task"
import {Diagnostic} from "@ionic-native/diagnostic";
import {Geolocation} from '@ionic-native/geolocation';
import {GoogleMapsManager} from "../../providers/google-maps-manager";
import {DrivingDirectionsPage} from "../driving-directions/driving-directions";

@Component({
    selector: 'page-history',
    templateUrl: 'history.html',
    animations: [
        Animations.expandCollapse
    ]
})
export class HistoryPage {

    hasHistory: boolean = true;
    hasPaused: boolean = true;
    history: any;
    user: any = '';
    userId: any = '';
    currentUser: any = '';
    historyLoaded = false;
    divState: string = 'hide';
    isIos: boolean = false;
    url: string = "https://www.cleartasksolutions.com/uploads/";
    tempArray: Array<any> = [];
    public displayOptions = {
        proj: -1,
        task: -1
    };

    public pausedDisplayOptions = {
        proj: -1,
        task: -1
    };

    pausedContractorDetails: any = {
        proj: -1
    };

    contractorDetails: any = {
        proj: -1
    };


    month: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    data: any;
    pausedTasks: any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userMgr: UserManager,
                private appCtrl: App,
                private taskMgr: TaskManager,
                private callNumber: CallNumber,
                private utils: Utils,
                private conMgr: ConversionManager,
                private alertCtrl: AlertController,
                private fcm: FCM,
                private mapsManager: GoogleMapsManager,
                private geolocation: Geolocation,
                private diagnostic: Diagnostic) {

        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.divState = 'collapse';
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }

    ionViewDidEnter() {
        this.subscribeAgain();
        this.loadHistory();
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

    loadHistory() {
        this.displayOptions = {
            proj: -1,
            task: -1
        };
        this.utils.presentLoading();
        this.historyLoaded = false;
        this.taskMgr.getTaskHistoryRemoteV2(this.userId, "9").then((response: any) => {
            this.history = response;
            console.log('this.history ', JSON.stringify(this.history));
            this.user = response.userdata;
            this.historyLoaded = true;
            let myHistory = response.data;
            let updatedHistory = [];
            for (let i = 0; i < myHistory.length; i++) {
                if (myHistory[i].job_tasks.length !== 0) {
                    updatedHistory.push(myHistory[i]);
                }
            }
            this.history.data = updatedHistory;
            let jobTaskLength = 0;
            for (let p = 0; p < this.history.data.length; p++) {
                jobTaskLength += this.history.data[p].job_tasks.length;
            }

            if (jobTaskLength === 0) {
                this.hasHistory = false;
            } else {
                this.hasHistory = true;
            }

            this.utils.dismissLoading();
        }).catch((error) => {
            this.utils.dismissLoading();
            setTimeout(() => {
                this.utils.toastError(error);
            }, 500)
        }).then(()=> {
            console.log('this.history in then  ', JSON.stringify(this.history));
        });

        this.taskMgr.getPausedTasks(this.userId, "12").then((res: any) => {
            this.pausedTasks = res.data;

            let pausedTaskLength = 0;

            for (let i = 0; i < this.pausedTasks.length; i++) {
                pausedTaskLength += this.pausedTasks[i].job_tasks.length;
            }

            if (pausedTaskLength === 0) {
                this.hasPaused = false;
            } else {
                this.hasPaused = true;
            }
        })
    }

    resumeTask(project, task) {
        this.taskMgr.getCurrentTaskRemote().then((res: any) => {
            let currentStatus = res.task.job_tasks.status_id;
            if (currentStatus === 2 || currentStatus === 3 || currentStatus === 7) {
                let data = {
                    taskId: this.pausedTasks[project].job_tasks[task].id,
                    userId: this.userId,
                    notes: '',
                    statusId: 4,
                    files: [],
                    timestamp: new Date(Date.now())
                };
                this.taskMgr.resumeOnHoldTask(data).then((response) => {
                    this.navCtrl.parent.select(0);
                })
            } else if (currentStatus === 4 || currentStatus === 5) {
                let alert = this.alertCtrl.create({
                    title: 'Task In Progress',
                    message: 'Please complete or place the current task on hold before resuming this task',
                    cssClass: 'myAlerts',
                    buttons: ['OK']
                });
                alert.present();
            }
        }).catch(error => {
            let data = {
                taskId: this.pausedTasks[project].job_tasks[task].id,
                userId: this.userId,
                notes: '',
                statusId: 4,
                files: [],
                timestamp: new Date(Date.now())
            };
            this.taskMgr.resumeOnHoldTask(data).then((response) => {
                this.navCtrl.parent.select(0);
            })
        })
    }

    openImage(image) {
        this.navCtrl.push(HistoryReviewPage, image);
        return true;
    }

    displayTask(i, j) {
        this.pausedDisplayOptions = {
            proj: -1,
            task: -1
        };
        if (this.displayOptions.proj === i && this.displayOptions.task === j) {
            this.displayOptions = {
                proj: -1,
                task: -1
            };
        } else {
            this.utils.presentLoading();
            this.taskMgr.loadTaskUserLogArray(this.history.data[i].job_tasks[j].id, this.userId).then((response: any) => {
                let json: any = response;
                this.history.data[i].job_tasks[j].task_user_log = json.data;
                this.tempArray = json.data;
                this.utils.dismissLoading();

                let myKey1 = Object.keys(this.tempArray);
                for (let k = 0; k < myKey1.length; k++) {
                    let tempKey = this.tempArray[Object.keys(this.tempArray)[k]];
                    if (tempKey.fileData.length > 0) {
                        for (let m = 0; m < tempKey.fileData.length; m++) {
                            tempKey.fileData[m].file_name = this.url + tempKey.fileData[m].file_name;
                        }
                    }
                }
            }).then(() => {
                let contractor = this.history.data[i].contractor;
                let currentTask = this.history.data[i].job_tasks[j];

                let params = {
                    id: currentTask.id,
                    updatedTime: currentTask.updatedTime,
                    task_description: currentTask.task_description,
                    status: currentTask.status,
                    task_crew: currentTask.task_crew,
                    task_equipment: currentTask.task_equipment,
                    additional_notes: currentTask.additional_notes,
                    task_materials: currentTask.task_materials,
                    contractor_contacts: currentTask.contractor_contacts,
                    task_user_log: currentTask.task_user_log,
                    contractor_name: contractor[0].name,
                    contractor_phone: contractor[0].office_phone
                };

                this.navCtrl.push(SingleHistoryTaskPage, params).then(() => {

                })
            });
        }
    }

    expandPausedTask(a, b) {
        this.displayOptions = {
            proj: -1,
            task: -1
        };
        if (this.pausedDisplayOptions.proj === a && this.pausedDisplayOptions.task === b) {
            this.pausedDisplayOptions = {
                proj: -1,
                task: -1
            }
        } else {
            this.utils.presentLoading();
            this.taskMgr.loadTaskUserLogArray(this.pausedTasks[a].job_tasks[b].id, this.userId).then((response: any) => {
                let json: any = response;
                this.pausedTasks[a].job_tasks[b].task_user_log = json.data;

                this.tempArray = json.data;
                this.utils.dismissLoading();

                let myKey1 = Object.keys(this.tempArray);
                for (let k = 0; k < myKey1.length; k++) {
                    let tempKey = this.tempArray[Object.keys(this.tempArray)[k]];
                    if (tempKey.fileData.length > 0) {
                        for (let m = 0; m < tempKey.fileData.length; m++) {
                            tempKey.fileData[m].file_name = this.url + tempKey.fileData[m].file_name;
                        }
                    }
                }
            }).then(()=> {
                let contractor = this.history.data[a].contractor;
                let currentTask = this.history.data[a].job_tasks[b];

                let params = {
                    id: currentTask.id,
                    updatedTime: currentTask.updatedTime,
                    task_description: currentTask.task_description,
                    status: currentTask.status,
                    task_crew: currentTask.task_crew,
                    task_equipment: currentTask.task_equipment,
                    additional_notes: currentTask.additional_notes,
                    task_materials: currentTask.task_materials,
                    contractor_contacts: currentTask.contractor_contacts,
                    task_user_log: currentTask.task_user_log,
                    contractor_name: contractor[0].name,
                    contractor_phone: contractor[0].office_phone
                };

                this.navCtrl.push(SingleHistoryTaskPage, params).then(() => {

                })
            });

        }

    }

    logout() {
        this.userMgr.logout().then(response => {
            this.appCtrl.getRootNav().push(LoginPage);
        })
    }

    callPhone(number) {
        this.callNumber.callNumber(number, false)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }

    toggleDivStatePaused(proj) {
        if (this.pausedContractorDetails.proj === proj) {
            this.pausedContractorDetails.proj = -1;
        } else {
            this.pausedContractorDetails.proj = proj;
        }
    }

    toggleDivState(proj) {
        if (this.contractorDetails.proj === proj) {
            this.contractorDetails.proj = -1;
        } else {
            this.contractorDetails.proj = proj;
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
                    this.utils.presentToast("Please enable your location in device settings", true);
                })
            }
            if (locEnabled === false) {
                this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    }
}
