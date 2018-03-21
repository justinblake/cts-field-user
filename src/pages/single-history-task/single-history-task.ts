import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {TaskManager} from '../../providers/task-manager';
import {ConversionManager} from "../../providers/conversion-manager";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {HistoryFeedbackPage} from '../history-feedback/history-feedback';
import {HistoryReviewPage} from "../history-review/history-review";
import {TaskPhotoReviewPage} from "../task-photo-review/task-photo-review";



@Component({
    selector: 'page-single-history-task',
    templateUrl: 'single-history-task.html',

})

export class SingleHistoryTaskPage {
    @ViewChild(Content) content: Content;

    strTime: any;
    task_description: any;
    status: any;
    task_crew: any;
    task_equipment: any;
    additional_notes: any;
    task_materials: any;
    contractor_contacts: any;
    taskId: any;
    task_user_log: any;
    isIos: boolean = false;
    contractor_name: any;
    contractor_phone: any;
    task_links: any;
    task_files: any;
    taskFileUrl: string = 'https://www.cleartasksolutions.com/assets/task_files/';


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public taskMgr: TaskManager,
                private callNumber: CallNumber,
                private conMgr: ConversionManager,
                private iab: InAppBrowser) {

        this.taskId = navParams.get('id');
        this.strTime = navParams.get('strTime');
        this.task_description = navParams.get('task_description');
        this.status = navParams.get('status');
        this.task_crew = navParams.get('task_crew');
        this.task_equipment = navParams.get('task_equipment');
        this.additional_notes = navParams.get('additional_notes');
        this.task_materials = navParams.get('task_materials');
        this.contractor_contacts = navParams.get('contractor_contacts');
        this.task_user_log = navParams.get('task_user_log');
        this.contractor_name = navParams.get('contractor_name');
        this.contractor_phone = navParams.get('contractor_phone');
        this.task_links = navParams.get('task_links');
        this.task_files = navParams.get('task_files');
        this.isIos = this.taskMgr.returnPlatform().isIos;

    }

    ionViewWillEnter() {

    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }

    callPhone(number) {
        this.callNumber.callNumber(number, false)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    showDrivingDirections(lat, lon) {
        let options = "location=no";
        this.iab.create("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon + "&travelmode=driving&dir_action=navigate", "_system", options);
    }

    openHistoryFeedback() {

        let params ={
            id: this.taskId
        };

        this.navCtrl.push(HistoryFeedbackPage, params).then(() => {

                })

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

    reviewImage(imageUrl) {

        let params ={
            file_name: imageUrl
        };

        this.navCtrl.push(HistoryReviewPage, params).then(() => {

                })
    }


}
