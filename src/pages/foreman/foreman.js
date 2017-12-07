import { Component, ViewChild } from '@angular/core';
import { NavController, Content, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { DrivingDirectionsPage } from '../driving-directions/driving-directions';
import { GoogleMapsManager } from '../../providers/google-maps-manager';
import { Geolocation } from '@ionic-native/geolocation';
import { TaskManager } from '../../providers/task-manager';
import { Utils } from '../../utils/utils';
import { Animations } from '../../animations/animations';
import { Diagnostic } from "@ionic-native/diagnostic";
import { ConversionManager } from "../../providers/conversion-manager";
import { FCM } from "@ionic-native/fcm";
import { SingleForemanTaskPage } from "../single-foreman-task/single-foreman-task";
var ForemanPage = /** @class */ (function () {
    function ForemanPage(navCtrl, taskMgr, mapsManager, geolocation, utils, callNumber, diagnostic, conMgr, alertCtrl, fcm) {
        this.navCtrl = navCtrl;
        this.taskMgr = taskMgr;
        this.mapsManager = mapsManager;
        this.geolocation = geolocation;
        this.utils = utils;
        this.callNumber = callNumber;
        this.diagnostic = diagnostic;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    ForemanPage.prototype.ionViewWillEnter = function () {
        this.getForemanTasks(true);
    };
    ForemanPage.prototype.ionViewDidEnter = function () {
        this.subscribeAgain();
        if (this.taskMgr.returnEmergencyInfo().crewEmergency) {
            this.presentEmergencyAlert();
            var crewEmer = this.taskMgr.returnEmergencyInfo();
            this.hasEmergency = crewEmer.crewEmergency;
            this.emergencyTaskId = crewEmer.taskId;
            this.emergencyProjectId = crewEmer.projectId;
        }
    };
    ForemanPage.prototype.ionViewDidLeave = function () {
        this.emergencyWhileOpen = 0;
        this.taskMgr.saveEmergencyInfo(0, 0, false);
        this.hasEmergency = false;
        this.emergencyTaskId = -1;
        this.displayOptions = {
            proj: -1,
            task: -1
        };
    };
    ForemanPage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.navCtrl.parent.select(3);
                }
                else if (data.param1 === 'additional_notes') {
                    _this.presentAlert();
                }
                else if (data.param1 === "upcoming_task") {
                    _this.taskMgr.loadHomePage(1);
                    _this.navCtrl.parent.select(0);
                }
                else if (data.param1 === 'crews') {
                    _this.refreshView();
                    _this.emergencyTaskId = parseInt(data.task);
                    _this.presentEmergencyAlert();
                }
            });
        }
    };
    ForemanPage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.parent.select(0);
                    }
                }]
        });
        alert.present();
    };
    ForemanPage.prototype.presentEmergencyAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Emergency Reported',
            message: 'Please see the expanded task for details',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.expandTask(_this.iHolder, _this.jHolder, _this.emergencyTaskId);
                    }
                }]
        });
        alert.present();
    };
    ForemanPage.prototype.toggleDivState = function (proj) {
        if (this.contractorDetails.proj === proj) {
            this.contractorDetails.proj = -1;
        }
        else {
            this.contractorDetails.proj = proj;
        }
    };
    ForemanPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    ForemanPage.prototype.getForemanTasks = function (showLoading, refreshDate) {
        var _this = this;
        this.search = false;
        if (refreshDate) {
            this.currentDate = '-1';
        }
        if (this.currentDate === '-1') {
            var interimTime = new Date(Date.now());
            var myZone = interimTime.getTimezoneOffset();
            var year = interimTime.getFullYear();
            var month = interimTime.getMonth();
            var day = interimTime.getUTCDate();
            var hour = interimTime.getUTCHours() - (myZone / 60);
            var minute = interimTime.getUTCMinutes();
            var seconds = interimTime.getUTCSeconds();
            var adjustTimezone = new Date(Date.UTC(year, month, day, hour, minute, seconds));
            var timeZero = adjustTimezone.setHours(0, 0, 0, 0);
            this.currentDate = new Date(timeZero).toISOString().slice(0, 10);
        }
        if (showLoading) {
            this.utils.presentLoading();
        }
        this.taskMgr.loadForemanTasks(this.currentDate).then(function (response) {
            _this.tasks = response.data;
            if (response.data.length === 0) {
                _this.tasks = false;
            }
            var _loop_1 = function (i) {
                _this.projTaskLength.proj = _this.tasks.length;
                var projectTasks = _this.tasks[i].job_tasks;
                _this.projTaskLength.task += _this.tasks[i].job_tasks.length;
                var _loop_2 = function (j) {
                    var taskPlacement = {
                        taskId: projectTasks[j].id,
                        proj: i,
                        task: j
                    };
                    _this.taskLocation.push(taskPlacement);
                    projectTasks[j].importantStatus = 0;
                    projectTasks[j].statusArray = [];
                    var _loop_3 = function (k) {
                        //Loop through and push all crew status to status array, skip supervisors
                        if (projectTasks[j].task_crew[k].is_supervisor !== 1) {
                            projectTasks[j].statusArray.push(projectTasks[j].task_crew[k].status_id);
                        }
                        var myfilter = projectTasks[j].task_crew_status.filter(function (myfilter) {
                            return myfilter.employee_id === projectTasks[j].task_crew[k].employee_id;
                        });
                        projectTasks[j].task_crew[k].statusLog = myfilter;
                    };
                    for (var k = 0; k < projectTasks[j].task_crew.length; k++) {
                        _loop_3(k);
                    }
                    //Status 7 is Emergency
                    if (projectTasks[j].statusArray.indexOf(7) !== -1 || projectTasks[j].statusArray.indexOf(8) !== -1) {
                        projectTasks[j].importantStatus = 7;
                    }
                    else if (projectTasks[j].statusArray.indexOf(5) !== -1 || projectTasks[j].statusArray.indexOf(6) !== -1 || projectTasks[j].statusArray.indexOf(12) !== -1) {
                        projectTasks[j].importantStatus = 5;
                    }
                    else if (projectTasks[j].statusArray.indexOf(3) !== -1 || projectTasks[j].statusArray.indexOf(4) !== -1) {
                        projectTasks[j].importantStatus = 4;
                    }
                    else if (projectTasks[j].statusArray.indexOf(9) !== -1) {
                        projectTasks[j].importantStatus = 9;
                    }
                    else if (projectTasks[j].statusArray.indexOf(11) !== -1) {
                        projectTasks[j].importantStatus = 11;
                    }
                    else {
                        projectTasks[j].importantStatus = 0;
                    }
                };
                for (var j = 0; j < projectTasks.length; j++) {
                    _loop_2(j);
                }
                projectTasks.sort(function (a, b) {
                    return (a.task_start_time > b.task_start_time) ? 1 : ((b.task_start_time > a.task_start_time) ? -1 : 0);
                });
            };
            for (var i = 0; i < _this.tasks.length; i++) {
                _loop_1(i);
            }
            if (showLoading) {
                _this.utils.dismissLoading();
            }
        }).then(function () {
            console.log('this.tasks ', JSON.stringify(_this.tasks));
            console.log('this.taskLocation ', JSON.stringify(_this.taskLocation));
        });
    };
    ForemanPage.prototype.loadCurrentDay = function () {
        this.currentDate = '-1';
        this.hasEmergency = false;
        this.getForemanTasks(true);
    };
    ForemanPage.prototype.refreshCrews = function () {
        this.hasEmergency = false;
        this.getForemanTasks(true);
    };
    ForemanPage.prototype.refreshView = function () {
        this.tasks = [];
        this.taskId = -1;
        this.getForemanTasks(false);
    };
    ForemanPage.prototype.showDrivingDirections = function (lat, lon) {
        var _this = this;
        this.utils.presentLoading();
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.utils.presentToast("Please enable your location in device settings", true);
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please enable your location in device settings", true);
            _this.utils.dismissLoading();
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(function (resp) {
            if (locEnabled) {
                var destination_1 = lat + "," + lon;
                _this.geolocation.getCurrentPosition({ timeout: 15000 }).then(function (position) {
                    var origin = position.coords.latitude + "," + position.coords.longitude;
                    return _this.mapsManager.getDirections(origin, destination_1);
                }).then(function (response) {
                    var params = {
                        directions: response
                    };
                    setTimeout(function () {
                        _this.navCtrl.push(DrivingDirectionsPage, params);
                        _this.utils.dismissLoading();
                    }, 2000);
                }).catch(function (error) {
                    _this.utils.dismissLoading();
                    _this.utils.presentToast("Please enable your location in device settings", true);
                });
            }
            if (locEnabled === false) {
                _this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    };
    ForemanPage.prototype.expandTask = function (i, j, task) {
        if (i !== -2 && j !== -2) {
            console.log('this.tasks[i] ', JSON.stringify(this.tasks[i]));
            var currentTask = this.tasks[i].job_tasks[j];
            var params = {
                id: currentTask.id,
                updatedTime: currentTask.updatedTime,
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
            this.navCtrl.push(SingleForemanTaskPage, params).then(function () { });
        }
        if (i === -2 && j === -2) {
            var obj = this.taskLocation.find(function (o) { return o.taskId === task; });
            var projectIndex = obj.proj;
            var taskIndex = obj.task;
            var currentTask = this.tasks[projectIndex].job_tasks[taskIndex];
            var params = {
                id: currentTask.id,
                updatedTime: currentTask.updatedTime,
                task_description: currentTask.task_description,
                status_id: currentTask.status_id,
                task_crew: currentTask.task_crew,
                task_equipment: currentTask.task_equipment,
                additional_notes: currentTask.additional_notes,
                task_materials: currentTask.task_materials,
                contractor_contacts: currentTask.contractor_contacts
            };
            this.navCtrl.push(SingleForemanTaskPage, params).then(function () { });
        }
    };
    ForemanPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    return ForemanPage;
}());
export { ForemanPage };
//# sourceMappingURL=foreman.js.map