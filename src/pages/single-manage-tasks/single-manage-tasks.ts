import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';
import {ConversionManager} from "../../providers/conversion-manager";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ManagesTasksManager} from "../../providers/manages-tasks-manager";
import {FeedbackPage} from '../feedback/feedback';
import {GeolocationService} from '../../providers/geolocation-service'
import {NextDayPage} from '../next-day-tasks/next-day';
import {CompleteNotesPage} from '../complete-notes/complete-notes';
import {Modal} from "../../../node_modules/ionic-angular/index";

@Component({
    selector: 'page-single-manage-tasks',
    templateUrl: 'single-manage-tasks.html',

})

export class SingleManageTasksPage {
    @ViewChild(Content) content: Content;

    currentTask: any;
    currentProject: any;
    userInfo: any;
    contractorDetails: boolean = false;
    lat: number;
    lon: number;
    locationTimestamp: number;
    locationAccuracy: number;
    isCordova: boolean;
    isAndroid: boolean;
    isIos: boolean = false;
    activeTask: any;
    hasTask: boolean = false;
    isActiveTask: boolean = false;
    isLessor: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public taskMgr: TaskManager,
                public geoSrvc: GeolocationService,
                public managesTskMgr: ManagesTasksManager,
                private callNumber: CallNumber,
                private conMgr: ConversionManager,
                private utils: Utils,
                private iab: InAppBrowser) {

        this.currentTask = navParams.get('currentTask');
        this.currentProject = navParams.get('currentProject');
        this.userInfo = navParams.get('userInfo');
        this.isLessor = this.userInfo.isLessor;
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        this.isCordova = this.taskMgr.returnPlatform().isCordova;


    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter in manage tasks home');
        this.hasTask = this.managesTskMgr.returnTask().hasTask;
        this.activeTask = this.managesTskMgr.returnTask().activeTask;
        console.log('this.activeTask ', JSON.stringify(this.activeTask));
        if (this.hasTask) {
            if (this.activeTask.id === this.currentTask.id) {
                this.isActiveTask = true;
            }
        } else {
            this.isActiveTask = false;
        }

        console.log('this.currentTask in ionViewDidEnter ', JSON.stringify(this.currentTask));

    }


    ionViewDidEnter() {


    }

    setStatus(statusId: number, taskId: number, notes?: any) {
        this.utils.presentLoading();
        if (statusId === 3 || statusId === 8) {
            let data = {
                userId: this.userInfo.userId,
                notes: notes || '',
                statusId: statusId,
                files: [],
                timestamp: new Date(Date.now()),
                taskId: taskId
            };
            this.taskMgr.updateManagedTaskStatus(data).then((response) => {
                this.currentTask.status_id = statusId;
                this.utils.dismissLoading();
            }).catch(error => {
                this.utils.toastError(error);
            });
        } else if (statusId === 4 || statusId === 5 || statusId === 7 || statusId === 9) {
            //update task status
            this.currentTask.status_id = statusId;
            this.activeTask = this.currentTask;
            this.isActiveTask = true;
            //store current task

            // this.storeCurrentTask(this.projectObject[projectIndex].job_tasks[taskIndex], statusId);
            //update task
            this.dataFunction(notes, statusId, taskId).then((res: any) => {
                this.taskMgr.updateManagedTaskStatus(res).then((response) => {
                    if (statusId === 4 || statusId === 5 || statusId === 7) {
                        this.managesTskMgr.storeTask(this.currentTask);
                    } else if (statusId === 9) {
                        this.managesTskMgr.removeTask();
                    }
                    this.utils.dismissLoading();
                    console.log('response ', JSON.stringify(response));
                    // if (statusId === 9) {
                    //     this.loadMultipleTasks();
                    // }
                })
            })

        }
    };


    // function to replace writing this logic multiple times in this.setStatus
    dataFunction(notes: any, statusId: number, taskId: number) {
        return new Promise((resolve, reject) => {
            let data = {};
            if (this.isCordova) {
                this.setLocation().then(() => {
                    data = {
                        userId: this.userInfo.userId,
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
                    userId: this.userInfo.userId,
                    notes: notes || '',
                    statusId: statusId,
                    files: [],
                    taskId: taskId
                };
                resolve(data);
            }

        })
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

    // 0 = complete page, 1 = feedback page
    openActionPage(page: number) {
        this.utils.presentLoading();
        let params: any = {
            'task_id': this.currentTask.id,
            'user_id': this.userInfo.userId
        };
        if (this.currentProject.isCordova) {
            this.setLocation().then((res: any) => {
                params.lat = this.lat;
                params.lon = this.lon;
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
            params.lat = 0;
            params.lon = 0;
            console.log('params ', JSON.stringify(params));
            if (page === 0) {
                this.navCtrl.push(CompleteNotesPage, params).then(res => {

                });
                this.utils.dismissLoading();
                return true;
            } else if (page === 1) {
                console.log("heading to feedback");
                this.navCtrl.push(FeedbackPage, params).then(res => {
                    console.log('res in feedback ', JSON.stringify(res));

                });
                this.utils.dismissLoading();
                return true;
            }
        }
    }

    showDrivingDirections(lat, lon) {
        let options = "location=no";
        this.iab.create("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon + "&travelmode=driving&dir_action=navigate", "_system", options);
    }

    openRejectModal(statusId: number, taskId: number, notes?: any) {
        let modal: Modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss((data) => {
            if (data.save === true) {
                this.setStatus(statusId, taskId, data.notes);
            }
        })
    }

    openNextDayTasks(taskId?: string) {
        this.navCtrl.push(NextDayPage).then(response => {
        });
        return true;
    }

    showActiveTask() {
        console.log('this.activeTask in show active ', JSON.stringify(this.activeTask));
        console.log('this.currentTask in show active  ', JSON.stringify(this.currentTask));
    }

    test() {


    }


}
