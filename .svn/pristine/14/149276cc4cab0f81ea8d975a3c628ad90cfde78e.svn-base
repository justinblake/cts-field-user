"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var api_service_1 = require("./api-service");
var utils_1 = require("../utils/utils");
var TaskManager = (function () {
    function TaskManager(userMgr, apiService, platform, utils) {
        var _this = this;
        this.userMgr = userMgr;
        this.apiService = apiService;
        this.platform = platform;
        this.utils = utils;
        this.useLocalData = false;
        this.taskStatuses = {};
        // helper method to make some of the promise code a little cleaner //
        this.resolveAsPromise = function (obj) {
            return new Promise(function (resolve, reject) {
                resolve(obj);
            });
        };
        /**
         * just calls api.postTaskFeedback, no image uploading
         */
        this.updateTaskStatus = function (data) {
            data.userId = _this.userMgr.getUser().userId;
            data.taskId = _this.currentTask.job_tasks.id;
            console.log("postFeedback feedback => " + utils_1.Utils.toJson(data));
            return new Promise(function (resolve, reject) {
                _this.apiService.postTaskFeedback(data).then(function (json) {
                    console.log("postFeedback Response => " + utils_1.Utils.toJson(json));
                    var response = JSON.parse(JSON.stringify(json));
                    //console.log(r);
                    if (response.code != 0) {
                        //something happened, show a toast :)
                        var msg = "Could not update task status: " + response.msg;
                        _this.utils.presentToast(msg, true, 'X');
                        //resolve(false);
                        return _this.resolveAsPromise(false);
                    }
                    else if (data.statusId == 1) {
                        // ACCEPTED //
                        _this.currentTask.statusId = 1;
                        // get current task and log //
                        return _this.resolveAsPromise(_this.currentTask);
                    }
                    else if (data.statusId == 2 || data.statusId == 6) {
                        // REJECTED //
                        _this.currentTask.statusId = data.statusId;
                        // return this.currentTask //
                        return _this.resolveAsPromise(_this.currentTask);
                    }
                    else {
                        // UNKNOWN statusId //
                        var msg = "Could not update task status: " + response.msg;
                        _this.utils.presentToast(msg, true, 'X');
                        resolve(false);
                    }
                }).then(function (response) {
                    console.log("postFeedbackImages Response => " + utils_1.Utils.toJson(response));
                    resolve(response);
                });
            });
        };
        //console.log('Hello TaskManager Provider');
        this.tmpData = new api_service_1.ApiData();
    }
    // workaround put in place when CORS wasn't setup on remote server
    TaskManager.prototype.getCurrentTaskLocal = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.currentUser = api_service_1.ApiData.data.authenticateUser.userdata;
            _this.currentTask = api_service_1.ApiData.data.loadCurrentTask.data;
            var response = {
                user: _this.currentUser,
                task: _this.currentTask
            };
            resolve(response);
        });
    };
    // get current task from remote api
    // @deprecated
    // XXgetCurrentTaskRemote(){
    //
    //  return new Promise( (resolve, reject)=> {
    //    this.apiService.authenticate({}).then(user => {
    //      console.log('TASK MGR user: ' + user);
    //      return this.apiService.loadCurrentTask(this.userMgr.getUser(), this.userMgr.getToken());
    //    }).then(task => {
    //      console.log('TASK MGR task: ' + task);
    //      resolve(task);
    //    }).catch(error => {
    //      console.log(`ERROR: ${Utils.toJson(error)}`)
    //     // this.utils.toastError(error);
    //    })
    //  });
    //};
    /**
     * method for creating a taskUserlog and handling response and errors
     */
    TaskManager.prototype.createTaskUserLog = function (postData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiService.postTaskFeedback(postData).then(function (response) {
                console.log("" + utils_1.Utils.toJson(postData, true));
            })["catch"](function (error) {
                reject({ error: true, msg: 'An error has occurred submitting your information', raw: error });
            });
        });
    };
    /**
     * gets current task for logged in user
     * then gets the taskUserLog for the task
     * @Returns: Promise:any
     */
    TaskManager.prototype.getCurrentTaskRemote = function () {
        var _this = this;
        console.log('Getting current task');
        var currentTaskResponse;
        return new Promise(function (resolve, reject) {
            var user = _this.userMgr.getUser();
            //let token = this.userMgr.getToken();
            var data = { userId: user.userId };
            //console.log(`USER => ${Utils.toJson(user)}`)
            _this.apiService.loadCurrentTask(data).then(function (response) {
                //console.log(`RESPONSE => ${Utils.toJson(response)}`)
                var task = response;
                currentTaskResponse = {
                    "task": task.data.hasOwnProperty('id') ? task.data : null,
                    "user": user
                };
                _this.currentTask = task.data;
                _this.currentUser = user;
                // have we received a task? //
                if (task.data.hasOwnProperty('id')) {
                    // load the task user log
                    return _this.loadTaskUserLog();
                }
                else {
                    //not task found
                    reject({ msg: 'You do not have a current task' });
                }
            }).then(function (response) {
                // taskuserLog resposne
                var json = response;
                currentTaskResponse.task.job_tasks.task_user_log = json.data;
                resolve(currentTaskResponse);
            })["catch"](function (error) {
                reject(error);
                //console.log(`ERROR: ${Utils.toJson(error)}`);
            });
        });
    };
    ;
    /**
     * get current task based on the setting
     * for this.userLocalData in the constructor
     */
    TaskManager.prototype.getCurrentTask = function () {
        if (this.useLocalData === true) {
            return this.getCurrentTaskLocal();
        }
        else {
            return this.getCurrentTaskRemote();
        }
    };
    /**
     * call to loadTaskUserLog
     */
    TaskManager.prototype.loadTaskUserLog = function () {
        //{"userId":135, "taskId":435}
        var data = {
            "userId": this.currentUser.userId,
            "taskId": this.currentTask.job_tasks.id
        };
        console.log("" + utils_1.Utils.toJson(data));
        return this.apiService.loadTaskUserLog(data);
    };
    /**
     * call to get task history
     * loads local or remote depending
     */
    TaskManager.prototype.getTaskHistory = function () {
        if (this.useLocalData) {
            return this.getTaskHistoryLocal();
        }
        else {
            return this.getTaskHistoryRemote();
        }
    };
    ;
    /**
     * gets the remote task history
     * @Returns: Promise
     */
    TaskManager.prototype.getTaskHistoryRemote = function () {
        var _this = this;
        //console.log(`${Utils.toJson(data, true)}`)
        return new Promise(function (resolve, reject) {
            if (_this.currentUser && _this.currentUser.userId) {
                //donothing
                console.log('current user is undefined');
            }
            else {
                reject({ msg: 'Unable to load history' });
            }
            // build the json body
            // gets all history from the beginning of time
            var data = {
                "userId": _this.currentUser.userId,
                "dateStart": new Date('January 1, 1970').getMilliseconds(),
                "dateEnd": Date.now()
            };
            //resolve(this.tmpData.data.loadTaskHistory);
            //make the api request
            _this.apiService.loadTaskHistory(data).then(function (json) {
                resolve(json);
            })["catch"](function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    // gets the task history from the cached object
    TaskManager.prototype.getTaskHistoryLocal = function () {
        return new Promise(function (resolve, reject) {
            var response = {
                userdata: api_service_1.ApiData.data.authenticateUser.userdata,
                taskHistory: api_service_1.ApiData.data.loadTaskHistory
            };
            resolve(response);
        });
    };
    // authenticate user and handles response //
    TaskManager.prototype.authenticateUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //resolve(this.tmpData.data.authenticateUser);
            _this.apiService.authenticate({}).then(function (json) {
                resolve(json);
            })["catch"](function (error) {
                console.log("ERROR: " + utils_1.Utils.toJson(error));
                // this.utils.toastError(error);
                reject(error);
            });
        });
    };
    // gets the task statuses //
    TaskManager.prototype.getTaskStatuses = function (filterStatus, systemOnly) {
        return this.taskStatuses;
    };
    /**
     * get the feedback statuses
     *
     */
    TaskManager.prototype.getFeedbackStatuses = function () {
        //let ids:number[] = [3, 4, 5, 7];
        this.taskStatuses.filter(function (status) {
            return status.id;
        });
    };
    /**
     * posts feedback with images
     * @Input: feedback object
     */
    TaskManager.prototype.postFeedback = function (feedback) {
        var _this = this;
        // add current user id and current task id to feedback object //
        feedback.userId = this.userMgr.getUser().userId;
        feedback.taskId = this.currentTask.job_tasks.id;
        console.log("postFeedback feedback => " + utils_1.Utils.toJson(feedback));
        //call the api //
        return new Promise(function (resolve, reject) {
            _this.apiService.postTaskFeedback(feedback).then(function (response) {
                console.log("postFeedback Response => " + utils_1.Utils.toJson(response));
                var r = response;
                //console.log(r.msg);
                // the response msg attribute contains the new record ID //
                // use it for the feedbackImage request //
                return _this.postFeedbackImages(r.msg, feedback.files);
                //resolve(true);
            }).then(function (response) {
                // postFeedbackImage response //
                console.log("postFeedbackImages Response => " + utils_1.Utils.toJson(response));
                resolve(true);
            });
        });
    };
    /**
     * calls the api to post feedback images
     */
    TaskManager.prototype.postFeedbackImages = function (feedbackId, images) {
        var promises = [];
        if (images.length == 0) {
            return new Promise(function (resolve, reject) {
                resolve(true);
            });
        }
        else {
            //let promises = [];
            // build the array of promises, native or html5 depending on device //
            for (var i = 0; i < images.length; i++) {
                if (this.platform.is('cordova')) {
                    promises.push(this.apiService.postTaskFeedbackImageNative(feedbackId, images[i]));
                }
                else {
                    promises.push(this.apiService.postTaskFeedbackImage(feedbackId, images[i]));
                }
            }
            // now resolve all promises that we've created //
            return Promise.all(promises);
        }
    };
    return TaskManager;
}());
TaskManager = __decorate([
    core_1.Injectable()
], TaskManager);
exports.TaskManager = TaskManager;
/*

// //

{
    "apiTokenErrors": [{
        "err": 98,
        "data": "Not Authorized"
    }, {
        "err": 99,
        "data": "Expired token "
    }]
}

{
    "taskCrewStatuses": [
        [{
            "id": 1,
            "status": "Accepted"
        }, {
            "id": 2,
            "status": "Rejected"
        }, {
            "id": 3,
            "status": "Problem Low"
        }, {
            "id": 4,
            "status": "Problem Medium"
        }, {
            "id": 5,
            "status": "Problem High"
        }, {
            "id": 6,
            "status": "Completed"
        }]
    ]
}

*/ 
