import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ApiService } from './api-service';
//import {StorageService} from './storage-service';
import { UserManager } from './user-manager';
import { Utils } from '../utils/utils';
var TaskManager = /** @class */ (function () {
    function TaskManager(userMgr, apiService, platform, utils) {
        this.userMgr = userMgr;
        this.apiService = apiService;
        this.platform = platform;
        this.utils = utils;
        if (this.platform.is('android')) {
            this.isAndroid = true;
        }
        if (this.platform.is('ios')) {
            this.isIos = true;
        }
        if (this.platform.is('cordova')) {
            this.isCordova = true;
        }
    }
    TaskManager.prototype.returnPlatform = function () {
        return { isIos: this.isIos, isAndroid: this.isAndroid, isCordova: this.isCordova };
    };
    TaskManager.prototype.saveEmergencyInfo = function (taskId, projectId, crewsBool) {
        this.crewsTab = crewsBool;
        this.emergencyTaskId = taskId;
        this.emergencyProjectId = projectId;
        console.log('this.crewsTab in tskMgr ', JSON.stringify(this.crewsTab));
        console.log('this.emergencyTaskId in tskMgr ', JSON.stringify(this.emergencyTaskId));
        console.log('this.emergencyProjectId in tskMgr ', JSON.stringify(this.emergencyProjectId));
    };
    TaskManager.prototype.returnEmergencyInfo = function () {
        return { taskId: this.emergencyTaskId, projectId: this.emergencyProjectId, crewEmergency: this.crewsTab };
    };
    //  * method for creating a taskUserlog and handling response and errors
    //  * method for creating a taskUserlog and handling response and errors
    TaskManager.prototype.createTaskUserLog = 
    //  * method for creating a taskUserlog and handling response and errors
    function (postData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiService.postTaskFeedback(postData).then(function (response) {
            }).catch(function (error) {
                reject({ error: true, msg: 'An error has occurred submitting your information', raw: error });
            });
        });
    };
    TaskManager.prototype.setUser = function () {
        this.currentUser = this.userMgr.getUser();
        this.userId = this.userMgr.getUserId();
        console.log('this.currentUser in Task Manager ', JSON.stringify(this.currentUser));
        console.log('this.userId Task Manager ', JSON.stringify(this.userId));
    };
    TaskManager.prototype.updateEmployeeToken = function (newToken, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                userId: userId || _this.userId,
                token: newToken
            };
            _this.apiService.updateEmployeeToken(data).then(function (response) {
                _this.hasToken = response;
                resolve(_this.hasToken);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    //  * gets current task for logged in user
    //  * then gets the taskUserLog for the task
    //  * @Returns: Promise:any
    //  * gets current task for logged in user
    //  * then gets the taskUserLog for the task
    //  * @Returns: Promise:any
    TaskManager.prototype.getCurrentTaskRemote = 
    //  * gets current task for logged in user
    //  * then gets the taskUserLog for the task
    //  * @Returns: Promise:any
    function () {
        var _this = this;
        this.currentUser = this.userMgr.getUser();
        this.userId = this.userMgr.getUserId();
        var currentTaskResponse;
        return new Promise(function (resolve, reject) {
            var data = { userId: _this.userId };
            _this.apiService.loadCurrentTask(data).then(function (response) {
                var task = response;
                currentTaskResponse = {
                    "task": task.data.hasOwnProperty('id') ? task.data : null,
                    "user": _this.currentUser
                };
                _this.currentTask = task.data;
                if (_this.currentTask.job_tasks) {
                    Number(_this.currentTask.job_tasks.task_start_time);
                }
                // have we received a task? //
                if (task.data.hasOwnProperty('id')) {
                    // load the task user log
                    return _this.loadTaskUserLog();
                }
                else {
                    //no task found
                    reject();
                }
            }).then(function (response) {
                var json = response;
                currentTaskResponse.task.job_tasks.task_user_log = json.data;
                resolve(currentTaskResponse);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    ;
    //  * call to loadTaskUserLog
    //  * call to loadTaskUserLog
    TaskManager.prototype.loadTaskUserLog = 
    //  * call to loadTaskUserLog
    function () {
        var data = {
            "userId": this.userId,
            "taskId": this.currentTask.job_tasks.id
        };
        return this.apiService.loadTaskUserLog(data);
    };
    TaskManager.prototype.loadSpecificTaskUserLog = function (empId, taskId) {
        var data = {
            "userId": empId,
            "taskId": taskId
        };
        return this.apiService.loadTaskUserLog(data);
    };
    //  * call to loadTaskUserLog
    //  * call to loadTaskUserLog
    TaskManager.prototype.loadTaskUserLogArray = 
    //  * call to loadTaskUserLog
    function (taskID, userId) {
        var data = {
            "userId": userId,
            "taskId": taskID
        };
        return this.apiService.loadTaskUserNotes(data);
    };
    TaskManager.prototype.checkEmployeeAlerts = function () {
        var _this = this;
        console.log("Checked Alerts again");
        return new Promise(function (resolve, reject) {
            var demo = {
                'userId': _this.userId,
            };
            var num = 0;
            //make the api request
            //make the api request
            _this.apiService.checkEmployeeAlerts(demo).then(function (response) {
                _this.holdObject = response;
                _this.badgeNumber = _this.holdObject.data.new_alert_count;
                resolve(response);
                return num;
            }).catch(function (error) {
                reject({ msg: 'Unable to load Alerts' });
            });
        });
    };
    TaskManager.prototype.numOfNewAlerts = function (alerts) {
        var data = alerts.data;
        var num = 0;
        for (var i in data) {
            if (data[i].viewed === 0) {
                num += 1;
            }
        }
        this.badgeNumber = num;
        return num;
    };
    TaskManager.prototype.getEmployeeAlerts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': _this.userId,
                'dateStart': new Date((Date.now() - 259200000)),
                'dateEnd': new Date((Date.now() + 86400000))
            };
            _this.apiService.loadEmployeeAlerts(data).then(function (response) {
                _this.numOfNewAlerts(response);
                resolve(response);
            }).catch(function (error) {
                reject({ msg: 'Unable to load Alerts' });
            });
        });
    };
    //  * gets the remote task history
    //  * @Returns: Promise
    //  * gets the remote task history
    //  * @Returns: Promise
    TaskManager.prototype.getTaskHistoryRemoteV2 = 
    //  * gets the remote task history
    //  * @Returns: Promise
    function (userId, statusId) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': userId,
                'statusId': statusId,
                'dateStart': new Date((Date.now() - 432000000)),
                'dateEnd': new Date(Date.now() + 86400000)
            };
            _this.apiService.loadTaskHistoryV2(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    TaskManager.prototype.getPausedTasks = function (userId, statusId) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': userId,
                'statusId': statusId,
                'dateStart': new Date(Date.now()),
                'dateEnd': new Date(Date.now() + 86400000)
            };
            console.log("Date Check start " + data.dateStart);
            console.log("Date Check end " + data.dateEnd);
            _this.apiService.loadTaskHistoryV2(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    TaskManager.prototype.loadNextDayTaskByDate = function (userId) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': userId
            };
            _this.apiService.loadNextDayTaskByDate(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    TaskManager.prototype.loadLaborerTasks = function (userId) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': userId
            };
            _this.apiService.loadLaborerTasks(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    TaskManager.prototype.loadForemanTasks = function (date) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': _this.userId,
                'dateStart': date
            };
            console.log('data ', JSON.stringify(data));
            _this.apiService.loadForemanTasks(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    // authenticate user and handles response //
    // authenticate user and handles response //
    TaskManager.prototype.authenticateUser = 
    // authenticate user and handles response //
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //resolve(this.tmpData.data.authenticateUser);
            //resolve(this.tmpData.data.authenticateUser);
            _this.apiService.authenticate({}).then(function (json) {
                resolve(json);
            }).catch(function (error) {
                console.log("ERROR: " + Utils.toJson(error));
                // this.utils.toastError(error);
                reject(error);
            });
        });
    };
    // gets the task statuses //
    // gets the task statuses //
    TaskManager.prototype.getTaskStatuses = 
    // gets the task statuses //
    function (filterStatus, systemOnly) {
        return this.taskStatuses;
    };
    //  * get the feedback statuses
    //  * get the feedback statuses
    TaskManager.prototype.getFeedbackStatuses = 
    //  * get the feedback statuses
    function () {
        this.taskStatuses.filter(function (status) {
            return status.id;
        });
    };
    /**
     * posts feedback with images
     * @Input: feedback object
     */
    /**
         * posts feedback with images
         * @Input: feedback object
         */
    TaskManager.prototype.postFeedback = /**
         * posts feedback with images
         * @Input: feedback object
         */
    function (feedback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiService.postTaskFeedback(feedback).then(function (response) {
                var r = response;
                return _this.postFeedbackImages(r.msg, feedback.files);
            }).then(function (response) {
                resolve(true);
            });
        });
    };
    TaskManager.prototype.postHistoryFeedback = function (feedback) {
        var _this = this;
        // add current user id and current task id to feedback object //
        feedback.userId = this.userId;
        //call the api //
        return new Promise(function (resolve, reject) {
            _this.apiService.postTaskFeedback(feedback).then(function (response) {
                var r = response;
                return _this.postFeedbackImages(r.msg, feedback.files);
            }).then(function (response) {
                resolve(true);
            });
        });
    };
    // * calls the api to post feedback images
    // * calls the api to post feedback images
    TaskManager.prototype.postFeedbackImages = 
    // * calls the api to post feedback images
    function (feedbackId, images) {
        var promises = [];
        if (images.length == 0) {
            return new Promise(function (resolve, reject) {
                resolve(true);
            });
        }
        else {
            for (var i = 0; i < images.length; i++) {
                if (this.platform.is('cordova')) {
                    promises.push(this.apiService.postTaskFeedbackImageNative(feedbackId, images[i]));
                }
                else {
                    promises.push(this.apiService.postTaskFeedbackImage(feedbackId, images[i]));
                }
            }
            return Promise.all(promises);
        }
    };
    TaskManager.prototype.resetPassword = function (userEmail) {
        var _this = this;
        this.apiService.sendPasswordReset({ email: userEmail }).then(function (response) {
            if (response.code === 0) {
                var msg = "An email has been sent to " + userEmail;
                _this.utils.presentToast(msg, true, 'OK');
                _this.utils.dismissLoading();
            }
            else {
                var msg = " " + userEmail + " is not a valid email address ";
                _this.utils.presentToast(msg, true, 'OK');
                _this.utils.dismissLoading();
            }
        });
    };
    TaskManager.prototype.createTimecardEntry = function (empId, inLat, inLon, myStatus, inNotes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId,
                lat: inLat,
                lon: inLon,
                status: myStatus,
                notes: inNotes
            };
            _this.apiService.createTimecardEntry(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.loadTodaysTime = function (empId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId,
                'dateStart': new Date(Date.now()),
                'dateEnd': new Date(Date.now() + 86400000)
            };
            _this.apiService.loadTimecardData(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.updateTimecard = function (empId, timecardId, updatedTime, notes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                'employee_id': empId,
                'id': timecardId,
                'alt_timestamp': updatedTime,
                'notes': notes || null
            };
            console.log('data ', JSON.stringify(data));
            _this.apiService.updateTimecard(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.timecardSearch = function (empId, start, end) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId,
                'dateStart': start,
                'dateEnd': end
            };
            _this.apiService.loadTimecardData(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.loadTimeCardTotal = function (empId, start, end) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId,
                'dateStart': start,
                'dateEnd': end
            };
            _this.apiService.loadTimeCardTotal(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.getLastTimecardEntry = function (empId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId
            };
            _this.apiService.getLastTimecardEntry(data).then(function (response) {
                console.log('Timecard response ', JSON.stringify(response));
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.validateEmail = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiService.validateEmail(data).then(function (response) {
                console.log("valid email");
                resolve(response);
            }).catch(function (error) {
                console.log('error updating timecard');
                reject(error);
            });
        });
    };
    TaskManager.prototype.loadHomePage = function (input) {
        this.homePage = input;
        console.log('this.homePage ', JSON.stringify(this.homePage));
    };
    TaskManager.prototype.reportHomePage = function () {
        return this.homePage;
    };
    return TaskManager;
}());
export { TaskManager };
// loadNextDayTask() {
//     let nextDayTaskResponse: any;
//     return new Promise((resolve, reject) => {
//         let user = this.userMgr.getUser();
//         //let token = this.userMgr.getToken();
//         let data = {userId: user.userId};
//         this.apiService.loadNextDayTask(data).then(response => {
//             let task: any = response;
//             nextDayTaskResponse = {
//                 "task": task.data,
//                 "user": user
//             };
//             this.tomorrowsTask = task;
//             if (this.tomorrowsTask.job_tasks) {
//                 Number(this.tomorrowsTask.job_tasks.task_start_time);
//             }
//             this.currentUser = user;
//         })
//             .then(response => {
//                 resolve(nextDayTaskResponse);
//             }).catch(error => {
//             reject(error);
//         })
//     })
// };
// createNewTimecardEntry(empId, myStatus, altTime, inNotes?: any) {
//     return new Promise((resolve, reject) => {
//         let data = {
//             employee_id: empId,
//             alt_timestamp: altTime,
//             status: myStatus,
//             notes: inNotes || "NULL"
//         };
//
//         this.apiService.createTimecardEntry(data).then(response => {
//             console.log("a new entry has been created");
//             resolve(response)
//         }).catch(error => {
//             console.log('error updating timecard');
//             reject(error);
//         })
//     })
// }
// deleteTimecardEntry(empId, entryId) {
//     return new Promise((resolve, reject) => {
//         let data = {
//             employee_id: empId,
//             id: entryId
//
//         };
//
//         console.log('data in task manager ', JSON.stringify(data));
//
//         this.apiService.makeTimecardEntryInactive(data).then(response => {
//             console.log("That is now inactive");
//             resolve(response)
//         }).catch(error => {
//             console.log('error updating timecard');
//             reject(error);
//         })
//     })
// }
//# sourceMappingURL=task-manager.js.map