import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { TaskManager } from '../../providers/task-manager';
import { ConversionManager } from "../../providers/conversion-manager";
var SingleHistoryTaskPage = /** @class */ (function () {
    function SingleHistoryTaskPage(navCtrl, navParams, taskMgr, callNumber, conMgr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.taskMgr = taskMgr;
        this.callNumber = callNumber;
        this.conMgr = conMgr;
        this.taskId = navParams.get('id');
        this.updatedTime = navParams.get('updatedTime');
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
        console.log('this.updatedTime ', JSON.stringify(this.updatedTime));
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
    SingleHistoryTaskPage.prototype.ionViewWillEnter = function () {
    };
    SingleHistoryTaskPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    SingleHistoryTaskPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    return SingleHistoryTaskPage;
}());
export { SingleHistoryTaskPage };
//# sourceMappingURL=single-history-task.js.map