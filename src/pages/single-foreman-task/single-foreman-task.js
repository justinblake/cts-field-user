import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { TaskManager } from '../../providers/task-manager';
import { Utils } from '../../utils/utils';
import { ConversionManager } from "../../providers/conversion-manager";
var SingleForemanTaskPage = /** @class */ (function () {
    function SingleForemanTaskPage(navCtrl, navParams, taskMgr, callNumber, conMgr, utils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.taskMgr = taskMgr;
        this.callNumber = callNumber;
        this.conMgr = conMgr;
        this.utils = utils;
        this.taskId = navParams.get('id');
        this.updatedTime = navParams.get('updatedTime');
        this.task_description = navParams.get('task_description');
        this.status_id = navParams.get('status_id');
        this.task_crew = navParams.get('task_crew');
        this.task_equipment = navParams.get('task_equipment');
        this.additional_notes = navParams.get('additional_notes');
        this.task_materials = navParams.get('task_materials');
        this.contractor_contacts = navParams.get('contractor_contacts');
        this.contractor_name = navParams.get('contractor_name');
        this.contractor_phone = navParams.get('contractor_phone');
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    SingleForemanTaskPage.prototype.setBackground = function (crew) {
        var cssClasses;
        if (crew.status_id === 3 && crew.role_id === 6) {
            cssClasses = {
                'completed': true
            };
        }
        else if (crew.status_id === 3) {
            cssClasses = {
                'accepted': true
            };
        }
        else if (crew.status_id === 4) {
            cssClasses = {
                'started': true
            };
        }
        else if (crew.status_id === 9) {
            cssClasses = {
                'completed': true
            };
        }
        else if (crew.status_id === 7) {
            cssClasses = {
                'emergency': true
            };
        }
        else if (crew.status_id === 8) {
            cssClasses = {
                'rejected': true
            };
        }
        else if (crew.status_id === 2 || crew.status_id === 1) {
            cssClasses = {
                'sent': true
            };
        }
        else if (crew.status_id === 11) {
            cssClasses = {
                'cancelled': true
            };
        }
        else if (crew.status_id === 12 || crew.status_id === 5 || crew.status_id === 13 || crew.status_id === 6) {
            cssClasses = {
                'temporary': true
            };
        }
        return cssClasses;
    };
    SingleForemanTaskPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    SingleForemanTaskPage.prototype.detailedStatus = function (emp) {
        this.imageLength = 0;
        if (this.detailedStats.emp === -1) {
            this.detailedStats.emp = emp;
        }
        else if (this.detailedStats.emp === emp) {
            this.detailedStats.emp = -1;
        }
        else if (this.detailedStats.emp !== emp && this.detailedStats.emp !== -1) {
            this.detailedStats.emp = emp;
        }
    };
    SingleForemanTaskPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    SingleForemanTaskPage.prototype.loadNotes = function (emp, taskId) {
        var _this = this;
        var empId = emp.employee_id;
        if (this.employeeId === empId) {
            this.employeeId = -1;
        }
        else {
            this.utils.presentLoading();
            this.employeeId = empId;
            this.taskMgr.loadSpecificTaskUserLog(empId, taskId).then(function (response) {
                _this.delayNotes = [];
                _this.imageLength = -1;
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].status_id === 5 || response.data[i].status_id === 6 || response.data[i].status_id === 7 || response.data[i].status_id === 12) {
                        var newEntry = {
                            notes: response.data[i].notes,
                            timestamp: response.data[i].updatedTime,
                            images: []
                        };
                        if (response.data[i].fileData.length > 0) {
                            _this.imageLength += response.data[i].fileData.length;
                            for (var j = 0; j < response.data[i].fileData.length; j++) {
                                var image = _this.url + response.data[i].fileData[j].file_name;
                                newEntry.images.push(image);
                            }
                        }
                        _this.delayNotes.push(newEntry);
                    }
                }
                _this.utils.dismissLoading();
            }).then(function (res) {
                return _this.delayNotes;
            });
        }
    };
    SingleForemanTaskPage.prototype.getEmployeeName = function (emps, equip) {
        equip.name = '';
        for (var i = 0; i < emps.length; i++) {
            if (emps[i].employee_id === equip.employee_id) {
                equip.name = emps[i].first_name + " " + emps[i].last_name;
            }
        }
        return equip.name;
    };
    return SingleForemanTaskPage;
}());
export { SingleForemanTaskPage };
//# sourceMappingURL=single-foreman-task.js.map