import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {TaskManager} from '../../providers/task-manager';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Utils} from "../../utils/utils";
import {Modal} from "../../../node_modules/ionic-angular/index";
import {TaskPhotoReviewPage} from "../task-photo-review/task-photo-review";


@Component({
    selector: 'page-single-upcoming-task',
    templateUrl: 'single-upcoming-task.html',

})

export class SingleUpcomingTaskPage {
    @ViewChild(Content) content: Content;

    currentTask: any;
    isCordova: boolean;
    isAndroid: boolean;
    isIos: boolean;
    debug: boolean = false;
    contractorDetails: boolean = false;
    task_links: any;
    task_files: any;
    taskFileUrl: string = 'https://www.cleartasksolutions.com/assets/task_files/';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public taskMgr: TaskManager,
                private callNumber: CallNumber,
                private utils: Utils,
                private iab: InAppBrowser) {

        this.currentTask = navParams.get('currentTask');
        this.task_links = this.currentTask.task_links;
        this.task_files = this.currentTask.task_files;
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        this.isCordova = this.taskMgr.returnPlatform().isCordova;
        this.isIos = this.taskMgr.returnPlatform().isIos;
        console.log('this.currentTask in single task', JSON.stringify(this.currentTask));
    }


    setStatus(statusId: number, notes?: any) {
        if (statusId === 3) {
            let data = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                timestamp: new Date(Date.now()),
                taskId: this.currentTask.id
            };
            this.utils.presentLoading();
            this.taskMgr.updateNextDayTaskStatus(data).then((response) => {
                this.currentTask.status_id = 3;
                this.utils.dismissLoading();
            }).catch(error => {
                if (this.debug) {
                    console.log(`ERROR: ${Utils.toJson(error)}`);
                }
                this.utils.toastError(error);
            });
        } else if (statusId === 8) {
            let data = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                timestamp: new Date(Date.now()),
                taskId: this.currentTask.id
            };
            this.utils.presentLoading();
            this.taskMgr.updateNextDayTaskStatus(data).then((response) => {
                this.currentTask.status_id = 8;
                this.utils.dismissLoading();
            }).catch(error => {
                if (this.debug) {
                    console.log(`ERROR: ${Utils.toJson(error)}`);
                }
                this.utils.toastError(error);
            });
        }
    };

    openRejectModal(statusId: number) {
        let modal: Modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss((data) => {
            if (data.save === true) {
                this.setStatus(statusId, data.notes);
            }
        })
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
            });
    }

    openAttachedUrl(url) {
        let options = "location=no";
        this.iab.create("" + url, "_system", options);
    }

    openAttachedImage(imageObject) {
        console.log('imageObject ', JSON.stringify(imageObject));

        let fileType: string = '';

        if (imageObject.file_type === 'image/png') {
            fileType = 'image';

            let params = {
                file_type: fileType,
                file_name: '' + this.taskFileUrl + '' + imageObject.file_name,
                notes: imageObject.notes
            };

            this.navCtrl.push(TaskPhotoReviewPage, params).then(() => {
                console.log('pushed task photo review')
            })

        } else if (imageObject.file_type === 'application/pdf') {
            fileType = 'pdf';
            let options = "location=no";
            this.iab.create('' + this.taskFileUrl + '' + imageObject.file_name, "_system", options);
        }

    }

    showDrivingDirections(lat, lon) {
        let options = "location=no";
        this.iab.create("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon + "&travelmode=driving&dir_action=navigate", "_system", options);
    }

    showTaskManager() {
        let temp1 = this.taskMgr.returnDispatchAlert();
        let temp2 = this.taskMgr.returnAlertMessage();

        console.log('temp1 ', JSON.stringify(temp1));
        console.log('temp2 ', JSON.stringify(temp2));
    }


}
