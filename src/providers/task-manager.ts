import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {ApiService} from './api-service';
import {UserManager} from './user-manager';
import {Utils} from '../utils/utils';


@Injectable()
export class TaskManager {


    debug: boolean;

    currentUser: any;
    userId: any;
    currentTask: any;
    taskStatuses: any = {};
    badgeNumber: any = 0;
    holdObject: any = {};
    hasToken: any;
    homePage: number = 0;
    isAndroid: boolean = false;
    isIos: boolean = false;
    emergencyTaskId: number;
    emergencyProjectId: number;
    crewsTab: boolean = false;
    isCordova: boolean = false;


    constructor(public userMgr: UserManager,
                public apiService: ApiService,
                private platform: Platform,
                private utils: Utils) {

        this.debug = this.utils.returnDebug();

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

    returnPlatform() {
        return {isIos: this.isIos, isAndroid: this.isAndroid, isCordova: this.isCordova};
    }

    saveEmergencyInfo(taskId, projectId, crewsBool?: boolean) {
        this.crewsTab = crewsBool;
        this.emergencyTaskId = taskId;
        this.emergencyProjectId = projectId;
        if (this.debug) {
            console.log('this.crewsTab in tskMgr ', JSON.stringify(this.crewsTab));
            console.log('this.emergencyTaskId in tskMgr ', JSON.stringify(this.emergencyTaskId));
            console.log('this.emergencyProjectId in tskMgr ', JSON.stringify(this.emergencyProjectId));
        }

    }

    returnEmergencyInfo() {
        return {taskId: this.emergencyTaskId, projectId: this.emergencyProjectId, crewEmergency: this.crewsTab};
    }

    //  * method for creating a taskUserlog and handling response and errors
    createTaskUserLog(postData) {
        return new Promise((resolve, reject) => {
            this.apiService.postTaskFeedback(postData).then((response) => {
            }).catch(error => {
                reject({error: true, msg: 'An error has occurred submitting your information', raw: error});
            })
        })
    }

    setUser() {
        this.currentUser = this.userMgr.getUser();
        this.userId = this.userMgr.getUserId();
        if (this.debug) {
            console.log('this.currentUser in Task Manager ', JSON.stringify(this.currentUser));
            console.log('this.userId Task Manager ', JSON.stringify(this.userId));
        }

    }

    updateEmployeeToken(newToken, userId?) {
        return new Promise((resolve, reject) => {

            let data = {
                userId: userId || this.userId,
                token: newToken
            };
            this.apiService.updateEmployeeToken(data).then(response => {
                this.hasToken = response;
                resolve(this.hasToken);
            }).catch(error => {
                reject(error);
            })
        })
    }

    //  * gets current task for logged in user
    //  * then gets the taskUserLog for the task
    //  * @Returns: Promise:any
    getCurrentTaskRemote() {
        this.currentUser = this.userMgr.getUser();
        this.userId = this.userMgr.getUserId();
        let currentTaskResponse: any;
        return new Promise((resolve, reject) => {
            let data = {userId: this.userId};
            this.apiService.loadCurrentTask(data).then(response => {
                let task: any = response;
                currentTaskResponse = {
                    "task": task.data.hasOwnProperty('id') ? task.data : null,
                    "user": this.currentUser
                };
                this.currentTask = task.data;
                if (this.currentTask.job_tasks) {
                    Number(this.currentTask.job_tasks.task_start_time);
                }
                // have we received a task? //
                if (task.data.hasOwnProperty('id')) {
                    // load the task user log
                    return this.loadTaskUserLog();
                } else {
                    //no task found
                    reject()
                }
            }).then(response => {
                let json: any = response;
                currentTaskResponse.task.job_tasks.task_user_log = json.data;
                resolve(currentTaskResponse);
            }).catch(error => {
                reject(error);
            })
        })
    };


    //  * call to loadTaskUserLog
    loadTaskUserLog() {
        let data: any = {
            "userId": this.userId,
            "taskId": this.currentTask.job_tasks.id
        };
        return this.apiService.loadTaskUserLog(data);
    }

    loadSpecificTaskUserLog(empId, taskId) {
        let data: any = {
            "userId": empId,
            "taskId": taskId
        };
        return this.apiService.loadTaskUserLog(data);
    }

    //  * call to loadTaskUserLog
    loadTaskUserLogArray(taskID, userId) {
        let data: any = {
            "userId": userId,
            "taskId": taskID
        };
        return this.apiService.loadTaskUserNotes(data);
    }

    checkEmployeeAlerts() {

        if (this.debug) {
            console.log("Checked Alerts again");
        }
        return new Promise((resolve, reject) => {
            let demo = {
                'userId': this.userId,
            };
            let num = 0;
            //make the api request
            this.apiService.checkEmployeeAlerts(demo).then(response => {
                this.holdObject = response;
                this.badgeNumber = this.holdObject.data.new_alert_count;
                resolve(response);
                return num;
            }).catch(error => {
                reject({msg: 'Unable to load Alerts'})
            })
        });
    }

    numOfNewAlerts(alerts) {
        let data = alerts.data;
        let num = 0;
        for (let i in data) {
            if (data[i].viewed === 0) {
                num += 1;
            }
        }
        this.badgeNumber = num;
        return num;
    }

    getEmployeeAlerts() {
        return new Promise((resolve, reject) => {
            let data = {
                'userId': this.userId,
                'dateStart': new Date((Date.now() - 259200000)),
                'dateEnd': new Date((Date.now() + 86400000))
            };

            this.apiService.loadEmployeeAlerts(data).then(response => {
                this.numOfNewAlerts(response);
                resolve(response);
            }).catch(error => {
                reject({msg: 'Unable to load Alerts'})
            })
        });
    }

    markEmployeeAlertRead = (data: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.apiService.markEmployeeAlertRead(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject({msg: 'Unable to load history'})
            })
        })
    };

    //  * gets the remote task history
    //  * @Returns: Promise
    getTaskHistoryRemoteV2(userId, statusId) {
        let task: any;
        return new Promise((resolve, reject) => {

            let data = {
                'userId': userId,
                'statusId': statusId,
                'dateStart': new Date((Date.now() - 432000000)),
                'dateEnd': new Date(Date.now() + 86400000)
            };

            this.apiService.loadTaskHistoryV2(data).then(response => {
                task = response;
            }).then(response => {
                resolve(task);
            }).catch(error => {
                reject({msg: 'Unable to load history'})
            })
        });
    }

    getPausedTasks(userId, statusId) {
        let task: any;
        return new Promise((resolve, reject) => {

            let data = {
                'userId': userId,
                'statusId': statusId,
                'dateStart': new Date(Date.now()),
                'dateEnd': new Date(Date.now() + 86400000)
            };


            if (this.debug) {
                console.log("Date Check start " + data.dateStart);
                console.log("Date Check end " + data.dateEnd);
            }
            this.apiService.loadTaskHistoryV2(data).then(response => {
                task = response;
            }).then(response => {
                resolve(task);
            }).catch(error => {
                reject({msg: 'Unable to load history'})
            })
        });
    }

    loadNextDayTaskByDate(userId) {
        let task: any;
        return new Promise((resolve, reject) => {

            let data = {
                'userId': userId
            };

            this.apiService.loadNextDayTaskByDate(data).then(response => {
                task = response;
            }).then(response => {
                resolve(task);
            }).catch(error => {
                reject({msg: 'Unable to load history'})
            })
        });
    }

    loadLaborerTasks(userId) {
        let task: any;
        return new Promise((resolve, reject) => {
            let data = {
                'userId': userId
            };
            this.apiService.loadLaborerTasks(data).then(response => {
                task = response;
            }).then(response => {
                resolve(task);
            }).catch(error => {
                reject({msg: 'Unable to load history'})
            })
        });
    }

    loadForemanTasks(date?: any) {
        let task: any;
        return new Promise((resolve, reject) => {

            let data = {
                'userId': this.userId,
                'dateStart': date
            };

            if (this.debug) {
                console.log('data ', JSON.stringify(data));
            }
            this.apiService.loadForemanTasks(data).then(response => {
                task = response;
            }).then(response => {
                resolve(task);
            }).catch(error => {
                reject({msg: 'Unable to load history'})
            })
        });
    }

    // authenticate user and handles response //
    authenticateUser() {
        return new Promise((resolve, reject) => {
            //resolve(this.tmpData.data.authenticateUser);
            this.apiService.authenticate({}).then(json => {
                resolve(json);
            }).catch(error => {
                if (this.debug) {
                    console.log(`ERROR: ${Utils.toJson(error)}`);
                }

                // this.utils.toastError(error);
                reject(error);
            })
        });
    }

    // gets the task statuses //
    getTaskStatuses(filterStatus ?: boolean, systemOnly ?: boolean) {
        return this.taskStatuses;
    }

    //  * get the feedback statuses
    getFeedbackStatuses() {
        this.taskStatuses.filter((status) => {
            return status.id
        })
    }

    // helper method to make some of the promise code a little cleaner //
    resolveAsPromise = (obj: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve(obj);
        })
    };

    //  * just calls api.postTaskFeedback, no image uploading
    updateNextDayTaskStatus = (data: any): Promise<any> => {
        data.userId = this.userId;
        return new Promise((resolve, reject) => {
            let myMessage = "success";
            this.apiService.postTaskFeedback(data).then((json) => {
                let response: any = JSON.parse(JSON.stringify(json));
                if (response.code != 0) {
                    let msg = `Could not update task status: ${response.msg}`;
                    this.utils.presentToast(msg, true, 'X');
                    return this.resolveAsPromise(false);
                } else if (data.statusId === 3) {
                    return myMessage;
                } else if (data.statusId === 8) {
                    return myMessage;
                } else if (data.statusId === 9) {
                    return myMessage;
                } else {
                    let msg = `Could not update task status: ${response.msg}`;
                    this.utils.presentToast(msg, true, 'X');
                    resolve(false);
                }
            }).then(response => {
                resolve(response);
            });
        })
    };

    //  * just calls api.postTaskFeedback, no image uploading
    updateTaskStatus = (data: any): Promise<any> => {
        data.userId = this.userId;
        data.taskId = this.currentTask.job_tasks.id;
        return new Promise((resolve, reject) => {
            this.apiService.postTaskFeedback(data).then((json) => {
                let response: any = JSON.parse(JSON.stringify(json));
                if (response.code != 0) {
                    let msg = `Could not update task status: ${response.msg}`;
                    this.utils.presentToast(msg, true, 'X');
                    return this.resolveAsPromise(false);
                } else if (data.statusId === 3) {
                    // ACCEPTED //
                    this.currentTask.statusId = 3;
                    return this.currentTask
                } else if (data.statusId === 4) {
                    // STARTED //
                    this.currentTask.statusId = 4;
                    return this.currentTask;
                } else if (data.statusId === 5) {
                    // DELAYED //
                    this.currentTask.statusId = 5;
                    return this.resolveAsPromise(this.currentTask);
                } else if (data.statusId === 6) {
                    // ON HOLD //
                    this.currentTask.statusId = 6;
                    return this.resolveAsPromise(this.currentTask);
                } else if (data.statusId === 7) {
                    // EMERGENCY //
                    this.currentTask.statusId = 7;
                    return this.resolveAsPromise(this.currentTask);
                } else if (data.statusId === 8) {
                    // REJECTED //
                    this.currentTask.statusId = 8;
                    return this.resolveAsPromise(this.currentTask);
                } else if (data.statusId === 9) {
                    // COMPLETED //
                    this.currentTask.statusId = 9;
                    return this.resolveAsPromise(this.currentTask);
                } else if (data.statusId === 12) {
                    // Laborer On Hold //
                    this.currentTask.statusId = 12;
                    return this.resolveAsPromise(this.currentTask);
                } else if (data.statusId === 13) {
                    // Timecard Pause //
                    this.currentTask.statusId = 13;
                    return this.resolveAsPromise(this.currentTask);
                } else {
                    // UNKNOWN statusId //
                    let msg = `Could not update task status: ${response.msg}`;
                    this.utils.presentToast(msg, true, 'X');
                    resolve(false);
                }
            }).then(response => {

                resolve(response);
            });
        })
    };

    //  * just calls api.postTaskFeedback, no image uploading
    resumeOnHoldTask = (data: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.apiService.postTaskFeedback(data).then((json) => {
                let response: any = JSON.parse(JSON.stringify(json));
                if (response.code != 0) {
                    //something happened, show a toast :)
                    let msg = `Could not update task status: ${response.msg}`;
                    this.utils.presentToast(msg, true, 'X');
                    //resolve(false);
                    return this.resolveAsPromise(false);
                } else if (data.statusId === 4) {
                    // ACCEPTED //
                    this.currentTask.statusId = 4;
                    return this.currentTask
                } else {
                    // UNKNOWN statusId //
                    let msg = `Could not update task status: ${response.msg}`;
                    this.utils.presentToast(msg, true, 'X');
                    resolve(false);
                }
            }).then(response => {

                resolve(response);
            });
        })
    };

    /**
     * posts feedback with images
     * @Input: feedback object
     */
    postFeedback(feedback: any) {

        return new Promise((resolve, reject) => {
            this.apiService.postTaskFeedback(feedback).then((response) => {
                let r: any = response;
                return this.postFeedbackImages(r.msg, feedback.files);
            }).then(response => {
                resolve(true);
            });
        })
    }

    postHistoryFeedback(feedback: any) {
        // add current user id and current task id to feedback object //
        feedback.userId = this.userId;
        //call the api //
        return new Promise((resolve, reject) => {
            this.apiService.postTaskFeedback(feedback).then((response) => {
                let r: any = response;
                return this.postFeedbackImages(r.msg, feedback.files);
            }).then(response => {
                resolve(true);
            });
        })
    }


    // * calls the api to post feedback images
    postFeedbackImages(feedbackId, images) {
        let promises = [];
        if (images.length == 0) {
            return new Promise((resolve, reject) => {
                resolve(true);
            })
        } else {
            for (let i = 0; i < images.length; i++) {
                if (this.platform.is('cordova')) {
                    promises.push(this.apiService.postTaskFeedbackImageNative(feedbackId, images[i]))
                } else {
                    promises.push(this.apiService.postTaskFeedbackImage(feedbackId, images[i]))
                }
            }
            return Promise.all(promises)
        }
    }

    resetPassword(userEmail) {
        this.apiService.sendPasswordReset({email: userEmail}).then((response: any) => {
            if (response.code === 0) {
                let msg = "An email has been sent to " + userEmail;
                this.utils.presentToast(msg, true, 'OK');
                this.utils.dismissLoading();
            } else {
                let msg = " " + userEmail + " is not a valid email address ";
                this.utils.presentToast(msg, true, 'OK');
                this.utils.dismissLoading();
            }
        })
    }

    createTimecardEntry(empId, inLat, inLon, myStatus, inNotes?: any) {
        return new Promise((resolve, reject) => {
            let data = {
                employee_id: empId,
                lat: inLat,
                lon: inLon,
                status: myStatus,
                notes: inNotes
            };

            this.apiService.createTimecardEntry(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    }

    loadTodaysTime(empId) {
        return new Promise((resolve, reject) => {
            let data = {
                employee_id: empId,
                'dateStart': new Date(Date.now()),
                'dateEnd': new Date(Date.now() + 86400000)
            };
            this.apiService.loadTimecardData(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    }

    updateTimecard(empId, timecardId, updatedTime, notes?: string) {
        return new Promise((resolve, reject) => {
            let data = {
                'employee_id': empId,
                'id': timecardId,
                'alt_timestamp': updatedTime,
                'notes': notes || null
            };


            if (this.debug) {
                console.log('data ', JSON.stringify(data));
            }
            this.apiService.updateTimecard(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    }

    timecardSearch(empId, start, end) {
        return new Promise((resolve, reject) => {
            let data = {
                employee_id: empId,
                'dateStart': start,
                'dateEnd': end
            };
            this.apiService.loadTimecardData(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    }

    loadTimeCardTotal(empId, start, end) {
        return new Promise((resolve, reject) => {
            let data = {
                employee_id: empId,
                'dateStart': start,
                'dateEnd': end
            };

            this.apiService.loadTimeCardTotal(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    }

    getLastTimecardEntry(empId) {
        return new Promise((resolve, reject) => {
            let data = {
                employee_id: empId
            };
            this.apiService.getLastTimecardEntry(data).then(response => {

                if (this.debug) {
                    console.log('Timecard response ', JSON.stringify(response));
                }
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    }

    validateEmail(data) {
        return new Promise((resolve, reject) => {


            this.apiService.validateEmail(data).then(response => {

                if (this.debug) {
                    console.log("valid email");
                }
                resolve(response)
            }).catch(error => {

                if (this.debug) {
                    console.log('error updating timecard');
                }
                reject(error);
            })
        })
    }

    loadHomePage(input) {
        this.homePage = input;

        if (this.debug) {
            console.log('this.homePage ', JSON.stringify(this.homePage));
        }
    }

    reportHomePage() {
        return this.homePage;
    }
}

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

