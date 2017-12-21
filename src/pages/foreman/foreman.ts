import {Component, ViewChild} from '@angular/core';
import {NavController, Content, AlertController} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {DrivingDirectionsPage} from '../driving-directions/driving-directions';
import {GoogleMapsManager} from '../../providers/google-maps-manager';
import {Geolocation} from '@ionic-native/geolocation';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';
import {Animations} from '../../animations/animations';
import {Diagnostic} from "@ionic-native/diagnostic";
import {ConversionManager} from "../../providers/conversion-manager";
import {FCM} from "@ionic-native/fcm";
import {SingleForemanTaskPage} from "../single-foreman-task/single-foreman-task"


@Component({
    selector: 'page-foreman',
    templateUrl: 'foreman.html',
    animations: [
        Animations.expandCollapse
    ]
})

export class ForemanPage {
    @ViewChild(Content) content: Content;

    tasks: any;
    showTasks: boolean = true;
    divState: string = 'hide';
    expandTaskId: number = -1;
    taskId: number = -1;
    isIos: boolean = false;
    public displayOptions = {
        proj: -1,
        task: -1
    };

    contractorDetails: any = {
        proj: -1
    };

    projTaskLength: any = {
        proj: 0,
        task: 0
    };
    currentDate: any = '-1';
    search: boolean = false;

    emergencyTaskId: number = 0;
    emergencyProjectId: number = 0;
    hasEmergency: boolean = false;
    emergencyWhileOpen: number = 0;

    taskLocation: any = [];
    iHolder: number = -2;
    jHolder: number = -2;
    month: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    displayMonth: string = '';
    displayDay: any;
    displayYear: any;

    constructor(public navCtrl: NavController,
                public taskMgr: TaskManager,
                private mapsManager: GoogleMapsManager,
                private geolocation: Geolocation,
                private utils: Utils,
                private callNumber: CallNumber,
                private diagnostic: Diagnostic,
                private conMgr: ConversionManager,
                private alertCtrl: AlertController,
                private fcm: FCM) {

        this.isIos = this.taskMgr.returnPlatform().isIos;
    }

    ionViewWillEnter() {
        this.getForemanTasks(true);
    }

    ionViewDidEnter() {
        this.subscribeAgain();

        if (this.taskMgr.returnEmergencyInfo().crewEmergency) {
            this.presentEmergencyAlert();
            let crewEmer = this.taskMgr.returnEmergencyInfo();
            this.hasEmergency = crewEmer.crewEmergency;
            this.emergencyTaskId = crewEmer.taskId;
            this.emergencyProjectId = crewEmer.projectId;
        }
    }

    ionViewDidLeave() {
        this.emergencyWhileOpen = 0;
        this.taskMgr.saveEmergencyInfo(0, 0, false);
        this.hasEmergency = false;
        this.emergencyTaskId = -1;
        this.displayOptions = {
            proj: -1,
            task: -1
        };
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
                    this.refreshView();
                    this.emergencyTaskId = parseInt(data.task);
                    this.presentEmergencyAlert();
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

    presentEmergencyAlert() {
        let alert = this.alertCtrl.create({
            title: 'Emergency Reported',
            message: 'Please see the expanded task for details',
            cssClass: 'myAlerts',
            buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                    this.expandTask(this.iHolder, this.jHolder, this.emergencyTaskId)
                }
            }]
        });
        alert.present();
    }

    toggleDivState(proj) {
        if (this.contractorDetails.proj === proj) {
            this.contractorDetails.proj = -1;
        } else {
            this.contractorDetails.proj = proj;
        }
    }

    callPhone(number) {
        this.callNumber.callNumber(number, false)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    getForemanTasks(showLoading?: boolean, refreshDate?: boolean) {
        this.search = false;
        console.log('refreshDate ', JSON.stringify(refreshDate));
        if (refreshDate === true) {
            this.currentDate = '-1';
        }

        if (this.currentDate === '-1') {
            let interimTime = new Date(Date.now());
            let myZone = interimTime.getTimezoneOffset();
            let year = interimTime.getFullYear();
            let month = interimTime.getMonth();
            let day = interimTime.getUTCDate();
            let hour = interimTime.getUTCHours() - (myZone / 60);
            let minute = interimTime.getUTCMinutes();
            let seconds = interimTime.getUTCSeconds();
            let adjustTimezone = new Date(Date.UTC(year, month, day, hour, minute, seconds));
            let timeZero = adjustTimezone.setHours(0, 0, 0, 0);
            this.currentDate = new Date(timeZero).toISOString().slice(0, 10);

            this.displayDay = this.deleteLeadingZero(this.currentDate.slice(8, 9), this.currentDate.slice(9, 10));
            this.displayMonth = this.month[(parseInt(this.currentDate.slice(5, 7))) - 1];
            this.displayYear = this.currentDate.slice(0, 4);
        }
        if (showLoading) {
            this.utils.presentLoading();
        }

        if (this.currentDate !== '-1') {
            this.displayDay = this.deleteLeadingZero(this.currentDate.slice(8, 9), this.currentDate.slice(9, 10));
            this.displayMonth = this.month[(parseInt(this.currentDate.slice(5, 7))) - 1];
            this.displayYear = this.currentDate.slice(0, 4);
        }

        this.taskMgr.loadForemanTasks(this.currentDate).then((response: any) => {
            this.tasks = response.data;
            if (response.data.length === 0) {
                this.tasks = false
            }

            for (let i = 0; i < this.tasks.length; i++) {
                this.projTaskLength.proj = this.tasks.length;

                let projectTasks = this.tasks[i].job_tasks;
                this.projTaskLength.task += this.tasks[i].job_tasks.length;

                for (let j = 0; j < projectTasks.length; j++) {
                    let taskPlacement = {
                        taskId: projectTasks[j].id,
                        proj: i,
                        task: j
                    };

                    this.taskLocation.push(taskPlacement);
                    projectTasks[j].importantStatus = 0;
                    projectTasks[j].statusArray = [];

                    for (let k = 0; k < projectTasks[j].task_crew.length; k++) {
                        //Loop through and push all crew status to status array, skip supervisors
                        if (projectTasks[j].task_crew[k].is_supervisor !== 1) {
                            projectTasks[j].statusArray.push(projectTasks[j].task_crew[k].status_id);
                        }
                        let myfilter = projectTasks[j].task_crew_status.filter(function (myfilter) {
                            return myfilter.employee_id === projectTasks[j].task_crew[k].employee_id
                        });
                        projectTasks[j].task_crew[k].statusLog = myfilter;
                    }
                    //Status 7 is Emergency
                    if (projectTasks[j].statusArray.indexOf(7) !== -1 || projectTasks[j].statusArray.indexOf(8) !== -1) {
                        projectTasks[j].importantStatus = 7;
                    }
                    //Status 5 is Delay
                    else if (projectTasks[j].statusArray.indexOf(5) !== -1 || projectTasks[j].statusArray.indexOf(6) !== -1 || projectTasks[j].statusArray.indexOf(12) !== -1) {
                        projectTasks[j].importantStatus = 5;
                    }
                    //Status 4 is in progress
                    else if (projectTasks[j].statusArray.indexOf(3) !== -1 || projectTasks[j].statusArray.indexOf(4) !== -1) {
                        projectTasks[j].importantStatus = 4;
                    }
                    //Status 9 is complete
                    else if (projectTasks[j].statusArray.indexOf(9) !== -1) {
                        projectTasks[j].importantStatus = 9;
                    }
                    //Status 11 is cancelled
                    else if (projectTasks[j].statusArray.indexOf(11) !== -1) {
                        projectTasks[j].importantStatus = 11;
                    }
                    //Status 0 is no work
                    else {
                        projectTasks[j].importantStatus = 0;
                    }
                }
                projectTasks.sort(function (a, b) {
                    return (a.task_start_time > b.task_start_time) ? 1 : ((b.task_start_time > a.task_start_time) ? -1 : 0);
                });
            }
            if (showLoading) {
                this.utils.dismissLoading();
            }
        }).then(() => {
            // console.log('this.tasks ', JSON.stringify(this.tasks));
            // console.log('this.taskLocation ', JSON.stringify(this.taskLocation));
        });
    }


    //quick function to delete the zero if the date is 1 thru 9
    deleteLeadingZero(a, b) {
        if (a === '0') {
            parseInt(b);
            return b
        }
        else {
            parseInt(a);
            parseInt(b);
            return a + '' + b;
        }
    }

    loadCurrentDay() {
        this.currentDate = '-1';
        this.hasEmergency = false;
        this.getForemanTasks(true, true);
    }


    refreshCrews() {
        this.hasEmergency = false;
        this.getForemanTasks(true, true);
    }

    refreshView() {
        this.tasks = [];
        this.taskId = -1;
        this.getForemanTasks(false);
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

    expandTask(i?, j?, task?) {

        if (i !== -2 && j !== -2) {

            console.log('this.tasks[i] ', JSON.stringify(this.tasks[i]));

            let currentTask = this.tasks[i].job_tasks[j];

            let params = {
                id: currentTask.id,
                strTime: currentTask.strTime,
                task_description: currentTask.task_description,
                status_id: currentTask.status_id,
                task_crew: currentTask.task_crew,
                task_equipment: currentTask.task_equipment,
                additional_notes: currentTask.additional_notes,
                task_materials: currentTask.task_materials,
                contractor_contacts: currentTask.contractor_contacts,
                contractor_name: this.tasks[i].contractor[0].name,
                contractor_phone: this.tasks[i].contractor[0].office_phone
            };

            this.navCtrl.push(SingleForemanTaskPage, params).then(() => {
            })
        }

        if (i === -2 && j === -2) {
            let obj = this.taskLocation.find(o => o.taskId === task);

            let projectIndex = obj.proj;
            let taskIndex = obj.task;

            let currentTask = this.tasks[projectIndex].job_tasks[taskIndex];

            let params = {
                id: currentTask.id,
                strTime: currentTask.strTime,
                task_description: currentTask.task_description,
                status_id: currentTask.status_id,
                task_crew: currentTask.task_crew,
                task_equipment: currentTask.task_equipment,
                additional_notes: currentTask.additional_notes,
                task_materials: currentTask.task_materials,
                contractor_contacts: currentTask.contractor_contacts
            };

            this.navCtrl.push(SingleForemanTaskPage, params).then(() => {
            })
        }
    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }


}
