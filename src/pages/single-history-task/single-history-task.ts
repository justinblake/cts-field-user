import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {TaskManager} from '../../providers/task-manager';
import {ConversionManager} from "../../providers/conversion-manager";
import {Utils} from "../../utils/utils";
import {DrivingDirectionsPage} from '../driving-directions/driving-directions';
import {DrivingDirectionsService} from "../../providers/driving-directions";


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


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public taskMgr: TaskManager,
                private callNumber: CallNumber,
                private conMgr: ConversionManager,
                private utils: Utils,
                private ddService: DrivingDirectionsService) {

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

        console.log('this.strTime ', JSON.stringify(this.strTime));
        console.log('this.task_description ', JSON.stringify(this.task_description));
        console.log('this.status ', JSON.stringify(this.status));
        console.log('this.task_crew ', JSON.stringify(this.task_crew));
        console.log('this.task_equipment ', JSON.stringify(this.task_equipment));
        console.log('this.additional_notes ', JSON.stringify(this.additional_notes));
        console.log('this.task_materials ', JSON.stringify(this.task_materials));
        console.log('this.contractor_contacts ', JSON.stringify(this.contractor_contacts));
        console.log('this.task_user_log ', JSON.stringify(this.task_user_log));
        console.log('this.contractor_phone ', JSON.stringify(this.contractor_phone));
        console.log('this.contractor_name ', JSON.stringify(this.contractor_name));

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
        this.utils.presentLoading();
        this.ddService.generalDirections(lat, lon, this.isIos).then((response) => {
            let params = {
                directions: response
            };
            setTimeout(() => {
                this.navCtrl.push(DrivingDirectionsPage, params);
                this.utils.dismissLoading();
            }, 2000)
        }).catch((error) => {
            this.utils.dismissLoading();
            this.utils.presentToast("Location currently unavailable", true);
        })
    }


}
