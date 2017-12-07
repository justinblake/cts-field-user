import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { TaskManager } from '../../providers/task-manager';
import { UserManager } from '../../providers/user-manager';
import { LoginPage } from '../login/login';
import { Utils } from '../../utils/utils';
import { Animations } from '../../animations/animations';
import { CallNumber } from '@ionic-native/call-number';
import { HistoryReviewPage } from '../history-review/history-review';
import { ConversionManager } from "../../providers/conversion-manager";
import { FCM } from "@ionic-native/fcm";
import { SingleHistoryTaskPage } from "../single-history-task/single-history-task";
import { Diagnostic } from "@ionic-native/diagnostic";
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsManager } from "../../providers/google-maps-manager";
import { DrivingDirectionsPage } from "../driving-directions/driving-directions";
var HistoryPage = /** @class */ (function () {
    function HistoryPage(navCtrl, navParams, userMgr, appCtrl, taskMgr, callNumber, utils, conMgr, alertCtrl, fcm, mapsManager, geolocation, diagnostic) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.taskMgr = taskMgr;
        this.callNumber = callNumber;
        this.utils = utils;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.mapsManager = mapsManager;
        this.geolocation = geolocation;
        this.diagnostic = diagnostic;
        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.divState = 'collapse';
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    HistoryPage.prototype.ionViewDidEnter = function () {
        this.subscribeAgain();
        this.loadHistory();
    };
    HistoryPage.prototype.subscribeAgain = function () {
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
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    HistoryPage.prototype.presentAlert = function () {
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
    HistoryPage.prototype.loadHistory = function () {
        var _this = this;
        this.displayOptions = {
            proj: -1,
            task: -1
        };
        this.utils.presentLoading();
        this.historyLoaded = false;
        this.taskMgr.getTaskHistoryRemoteV2(this.userId, "9").then(function (response) {
            _this.history = response;
            console.log('this.history ', JSON.stringify(_this.history));
            _this.user = response.userdata;
            _this.historyLoaded = true;
            var myHistory = response.data;
            var updatedHistory = [];
            for (var i = 0; i < myHistory.length; i++) {
                if (myHistory[i].job_tasks.length !== 0) {
                    updatedHistory.push(myHistory[i]);
                }
            }
            _this.history.data = updatedHistory;
            var jobTaskLength = 0;
            for (var p = 0; p < _this.history.data.length; p++) {
                jobTaskLength += _this.history.data[p].job_tasks.length;
            }
            if (jobTaskLength === 0) {
                _this.hasHistory = false;
            }
            else {
                _this.hasHistory = true;
            }
            _this.utils.dismissLoading();
        }).catch(function (error) {
            _this.utils.dismissLoading();
            setTimeout(function () {
                _this.utils.toastError(error);
            }, 500);
        }).then(function () {
            console.log('this.history in then  ', JSON.stringify(_this.history));
        });
        this.taskMgr.getPausedTasks(this.userId, "12").then(function (res) {
            _this.pausedTasks = res.data;
            var pausedTaskLength = 0;
            for (var i = 0; i < _this.pausedTasks.length; i++) {
                pausedTaskLength += _this.pausedTasks[i].job_tasks.length;
            }
            if (pausedTaskLength === 0) {
                _this.hasPaused = false;
            }
            else {
                _this.hasPaused = true;
            }
        });
    };
    HistoryPage.prototype.resumeTask = function (project, task) {
        var _this = this;
        this.taskMgr.getCurrentTaskRemote().then(function (res) {
            var currentStatus = res.task.job_tasks.status_id;
            if (currentStatus === 2 || currentStatus === 3 || currentStatus === 7) {
                var data = {
                    taskId: _this.pausedTasks[project].job_tasks[task].id,
                    userId: _this.userId,
                    notes: '',
                    statusId: 4,
                    files: [],
                    timestamp: new Date(Date.now())
                };
                _this.taskMgr.resumeOnHoldTask(data).then(function (response) {
                    _this.navCtrl.parent.select(0);
                });
            }
            else if (currentStatus === 4 || currentStatus === 5) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Task In Progress',
                    message: 'Please complete or place the current task on hold before resuming this task',
                    cssClass: 'myAlerts',
                    buttons: ['OK']
                });
                alert_1.present();
            }
        }).catch(function (error) {
            var data = {
                taskId: _this.pausedTasks[project].job_tasks[task].id,
                userId: _this.userId,
                notes: '',
                statusId: 4,
                files: [],
                timestamp: new Date(Date.now())
            };
            _this.taskMgr.resumeOnHoldTask(data).then(function (response) {
                _this.navCtrl.parent.select(0);
            });
        });
    };
    HistoryPage.prototype.openImage = function (image) {
        this.navCtrl.push(HistoryReviewPage, image);
        return true;
    };
    HistoryPage.prototype.displayTask = function (i, j) {
        var _this = this;
        this.pausedDisplayOptions = {
            proj: -1,
            task: -1
        };
        if (this.displayOptions.proj === i && this.displayOptions.task === j) {
            this.displayOptions = {
                proj: -1,
                task: -1
            };
        }
        else {
            this.utils.presentLoading();
            this.taskMgr.loadTaskUserLogArray(this.history.data[i].job_tasks[j].id, this.userId).then(function (response) {
                var json = response;
                _this.history.data[i].job_tasks[j].task_user_log = json.data;
                _this.tempArray = json.data;
                _this.utils.dismissLoading();
                var myKey1 = Object.keys(_this.tempArray);
                for (var k = 0; k < myKey1.length; k++) {
                    var tempKey = _this.tempArray[Object.keys(_this.tempArray)[k]];
                    if (tempKey.fileData.length > 0) {
                        for (var m = 0; m < tempKey.fileData.length; m++) {
                            tempKey.fileData[m].file_name = _this.url + tempKey.fileData[m].file_name;
                        }
                    }
                }
            }).then(function () {
                var contractor = _this.history.data[i].contractor;
                var currentTask = _this.history.data[i].job_tasks[j];
                var params = {
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
                _this.navCtrl.push(SingleHistoryTaskPage, params).then(function () {
                });
            });
        }
    };
    HistoryPage.prototype.expandPausedTask = function (a, b) {
        var _this = this;
        this.displayOptions = {
            proj: -1,
            task: -1
        };
        if (this.pausedDisplayOptions.proj === a && this.pausedDisplayOptions.task === b) {
            this.pausedDisplayOptions = {
                proj: -1,
                task: -1
            };
        }
        else {
            this.utils.presentLoading();
            this.taskMgr.loadTaskUserLogArray(this.pausedTasks[a].job_tasks[b].id, this.userId).then(function (response) {
                var json = response;
                _this.pausedTasks[a].job_tasks[b].task_user_log = json.data;
                _this.tempArray = json.data;
                _this.utils.dismissLoading();
                var myKey1 = Object.keys(_this.tempArray);
                for (var k = 0; k < myKey1.length; k++) {
                    var tempKey = _this.tempArray[Object.keys(_this.tempArray)[k]];
                    if (tempKey.fileData.length > 0) {
                        for (var m = 0; m < tempKey.fileData.length; m++) {
                            tempKey.fileData[m].file_name = _this.url + tempKey.fileData[m].file_name;
                        }
                    }
                }
            }).then(function () {
                var contractor = _this.history.data[a].contractor;
                var currentTask = _this.history.data[a].job_tasks[b];
                var params = {
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
                _this.navCtrl.push(SingleHistoryTaskPage, params).then(function () {
                });
            });
        }
    };
    HistoryPage.prototype.logout = function () {
        var _this = this;
        this.userMgr.logout().then(function (response) {
            _this.appCtrl.getRootNav().push(LoginPage);
        });
    };
    HistoryPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    HistoryPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    HistoryPage.prototype.toggleDivStatePaused = function (proj) {
        if (this.pausedContractorDetails.proj === proj) {
            this.pausedContractorDetails.proj = -1;
        }
        else {
            this.pausedContractorDetails.proj = proj;
        }
    };
    HistoryPage.prototype.toggleDivState = function (proj) {
        if (this.contractorDetails.proj === proj) {
            this.contractorDetails.proj = -1;
        }
        else {
            this.contractorDetails.proj = proj;
        }
    };
    HistoryPage.prototype.showDrivingDirections = function (lat, lon) {
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
    return HistoryPage;
}());
export { HistoryPage };
//# sourceMappingURL=history.js.map