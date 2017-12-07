import { Component, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { HardwareBackButtonService } from '../../providers/backbutton';
import { NavController, NavParams, App, Modal, Platform, Content, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { DrivingDirectionsPage } from '../driving-directions/driving-directions';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { LoginPage } from '../login/login';
import { FeedbackPage } from '../feedback/feedback';
import { GoogleMapsManager } from '../../providers/google-maps-manager';
import { Geolocation } from '@ionic-native/geolocation';
import { TaskManager } from '../../providers/task-manager';
import { UserManager } from '../../providers/user-manager';
import { checkForUpdate } from '../../providers/deploy-manager';
import { downloadUpdate } from '../../providers/deploy-manager';
import { extractUpdate } from '../../providers/deploy-manager';
import { loadNewVersion } from '../../providers/deploy-manager';
import { checkVersions } from '../../providers/deploy-manager';
import { checkVersionInfo } from '../../providers/deploy-manager';
import { deleteOldVersions } from '../../providers/deploy-manager';
import { Utils } from '../../utils/utils';
import { Animations } from '../../animations/animations';
import { Diagnostic } from '@ionic-native/diagnostic';
import { NextDayPage } from '../next-day-tasks/next-day';
import { CompleteNotesPage } from '../complete-notes/complete-notes';
import { Badge } from '@ionic-native/badge';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ConversionManager } from "../../providers/conversion-manager";
import { FCM } from "@ionic-native/fcm";
import { Sim } from '@ionic-native/sim';
var HomeKeysPipe = /** @class */ (function () {
    function HomeKeysPipe() {
    }
    HomeKeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value);
    };
    return HomeKeysPipe;
}());
export { HomeKeysPipe };
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, taskMgr, plt, navParams, mapsManager, userMgr, appCtrl, geolocation, utils, callNumber, androidFullScreen, diagnostic, badge, iab, _backBtn, alertCtrl, conMgr, fcm, sim) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.taskMgr = taskMgr;
        this.plt = plt;
        this.navParams = navParams;
        this.mapsManager = mapsManager;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.geolocation = geolocation;
        this.utils = utils;
        this.callNumber = callNumber;
        this.androidFullScreen = androidFullScreen;
        this.diagnostic = diagnostic;
        this.badge = badge;
        this.iab = iab;
        this._backBtn = _backBtn;
        this.alertCtrl = alertCtrl;
        this.conMgr = conMgr;
        this.fcm = fcm;
        this.sim = sim;
        plt.ready().then(function () {
            _this.plt.pause.subscribe(function () {
                if (_this.debug) {
                    console.log('[INFO] App paused');
                }
            });
            _this.plt.resume.subscribe(function () {
                _this.setLocation();
                if (_this.debug) {
                    console.log('[INFO] App resumed');
                }
            });
        });
        if (this.plt.is('cordova')) {
            fcm.getToken().then(function (token) {
                _this.fcmToken = token;
                if (_this.debug) {
                    console.log('FCM token 2 ', JSON.stringify(token));
                }
                _this.taskMgr.updateEmployeeToken(token).then(function (response) {
                });
            });
            fcm.onTokenRefresh().subscribe(function (token) {
                _this.taskMgr.updateEmployeeToken(token).then(function (response) {
                });
            });
        }
        this.currentUser = this.userMgr.getUser();
        this.userRole = this.currentUser.role_id;
        if (this.currentUser.is_lessor === 1) {
            this.isLessor = true;
        }
        if (this.plt.is('core')) {
            this.desktop = true;
        }
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        if (this.isAndroid) {
            this.androidFullScreen.isImmersiveModeSupported()
                .then(function () { return _this.androidFullScreen.immersiveMode(); })
                .catch(function (error) {
                if (_this.debug) {
                    console.log(error);
                }
            });
        }
        this.hideMoreProject = true;
        this.divState = 'collapse';
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.setUser();
        setTimeout(function () { return _this.setCompany(); }, 500);
        this._backBtn.registerAction(function () {
            _this._backBtn.doubleBackToExit();
        }, 101);
        if (this.plt.is('cordova')) {
            setTimeout(function () { return _this.getSimInfo(); }, 10000);
        }
        this.empData.employee_id = this.currentUser.userId;
        this.empData.app_version = this.utils.returnAppVersion();
        var userPlatform = this.plt.versions();
        console.log('userPlatform ', JSON.stringify(userPlatform));
        var stringPlatform = this.plt.platforms();
        console.log('stringPlatform ', JSON.stringify(stringPlatform));
        if (this.isIos) {
            var software = 'ios';
            this.empData.operating_system = 'ios';
            this.empData.software_version = userPlatform[software].str;
            this.empData.emp_platform = stringPlatform.toString();
        }
        if (this.isAndroid) {
            var software = 'android';
            this.empData.operating_system = 'android';
            this.empData.software_version = userPlatform[software].str;
            this.empData.emp_platform = stringPlatform.toString();
        }
        if (this.debug) {
            console.log('empData ', JSON.stringify(this.empData));
        }
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.currentUser = this.userMgr.getUser();
        this.subscribeAgain();
        var tempNum = this.taskMgr.reportHomePage();
        if (tempNum === 0) {
            if (this.userRole === 6) {
                this.loadLaborersTasks();
            }
            else {
                this.setLocation();
                this.setCurrentTask(true);
                setTimeout(function () {
                    _this.setBadges();
                }, 3000);
            }
        }
        else if (tempNum === 1) {
            this.presentFutureAlert();
        }
        else if (tempNum === 2) {
            this.presentAlert();
        }
        this.checkUpdates();
    };
    // helper method for the expand/collapse div animation
    // helper method for the expand/collapse div animation
    HomePage.prototype.toggleDivState = 
    // helper method for the expand/collapse div animation
    function () {
        var states = {
            expand: 'collapse',
            collapse: 'expand'
        };
        this.divState = states[this.divState];
    };
    HomePage.prototype.getSimInfo = function () {
        var _this = this;
        this.sim.requestReadPermission().then(function () {
            _this.sim.getSimInfo().then(function (info) {
                _this.empData.cell_carrier = info.carrierName;
                _this.empData.cell_number = info.phoneNumber;
                _this.empData.emp_device_id = info.deviceId;
                console.log('this.empData ', JSON.stringify(_this.empData));
            }, function (err) {
                if (_this.debug) {
                    console.log('Unable to get sim info: ', err);
                }
            });
        }, function () {
            if (_this.debug) {
                console.log('Permission denied');
            }
        });
    };
    //This sets the current user in the Task Manager so that when a user does not have a task the user ID is still available
    //This sets the current user in the Task Manager so that when a user does not have a task the user ID is still available
    HomePage.prototype.setUser = 
    //This sets the current user in the Task Manager so that when a user does not have a task the user ID is still available
    function () {
        this.taskMgr.setUser();
    };
    HomePage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.navCtrl.parent.select(3);
                }
                else if (data.param1 === 'additional_notes') {
                    if (_this.showTasks === true) {
                        _this.presentAlert();
                    }
                }
                else if (data.param1 === "upcoming_task") {
                    _this.presentFutureAlert();
                }
                else if (data.param1 === 'crews') {
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    HomePage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: ['OK']
        });
        this.setCurrentTask(true);
        this.taskMgr.loadHomePage(0);
        alert.present();
    };
    HomePage.prototype.presentFutureAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Dispatched',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.taskMgr.loadHomePage(0);
                        _this.openNextDayTasks();
                    }
                }]
        });
        alert.present();
    };
    // /** logs the user out of the app */
    // /** logs the user out of the app */
    HomePage.prototype.logout = 
    // /** logs the user out of the app */
    function () {
        var _this = this;
        if (this.timecardStatus === 1) {
            var alert_1 = this.alertCtrl.create({
                title: 'Timecard Alert!',
                cssClass: 'myAlerts',
                message: 'You are currently clocked in. Please clock out before logging out.',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var token = 'logged out';
            this.taskMgr.updateEmployeeToken(token, this.currentUser.userId).then(function (res) {
                if (_this.debug) {
                    console.log('res ', JSON.stringify(res));
                }
            });
            this.userMgr.logout().then(function (response) {
                _this.appCtrl.getRootNav().push(LoginPage);
            });
        }
    };
    HomePage.prototype.setBadges = function () {
        var _this = this;
        this.taskMgr.checkEmployeeAlerts().then(function (res) {
            _this.myAlerts = res.data.new_alert_count;
            _this.badge.set(_this.myAlerts);
        });
        this.requestPermission();
    };
    HomePage.prototype.requestPermission = function () {
        var hasPermission = this.badge.hasPermission();
        if (!hasPermission) {
            var permission = this.badge.registerPermission();
        }
    };
    HomePage.prototype.setCompany = function () {
        var holdingObject;
        holdingObject = this.currentUser;
        this.compName = holdingObject.company_name;
    };
    HomePage.prototype.getTimecardStatus = function () {
        var _this = this;
        this.taskMgr.getLastTimecardEntry(this.currentUser.userId).then(function (res) {
            if (res.data.length === 0) {
                _this.timecardStatus = 0;
            }
            else {
                _this.timecardStatus = res.data.status;
            }
        });
    };
    HomePage.prototype.presentLocationAlert = function () {
        var _this = this;
        var alertText = '';
        if (this.isAndroid) {
            alertText = 'Select OK to enable location on your device';
        }
        else if (this.isIos) {
            alertText = 'Location Services is enabled on your device but not for this app. Please open your device settings, scroll down and select clear-task-solutions-mobile, select Location, and then select the While Using the App option';
        }
        else {
            alertText = 'Select OK to enable location on your device';
        }
        var alert = this.alertCtrl.create({
            title: 'Location Required',
            message: alertText,
            cssClass: 'myAlerts',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        if (_this.isAndroid) {
                            _this.diagnostic.isLocationEnabled().then(function (res) {
                                if (res) {
                                    _this.diagnostic.isLocationAvailable().then(function (res) {
                                        if (_this.debug) {
                                            console.log('res for location ', JSON.stringify(res));
                                        }
                                    });
                                }
                                else if (res === false) {
                                    _this.diagnostic.switchToLocationSettings();
                                }
                            });
                        }
                        if (_this.isIos) {
                            _this.diagnostic.getLocationAuthorizationStatus().then(function (response) {
                                if (response === 'denied') {
                                    _this.setLocation();
                                }
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.setLocation = function () {
        var _this = this;
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.presentLocationAlert();
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please verify that your location settings are turned on", true);
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(function (resp) {
            if (locEnabled) {
                _this.geolocation.getCurrentPosition({ timeout: 40000 }).then(function (position) {
                    _this.lat = position.coords.latitude;
                    _this.lon = position.coords.longitude;
                }).catch(function (error) {
                    if (_this.debug) {
                        console.log('geo error ');
                    }
                });
            }
        }).catch(errorCallback);
    };
    HomePage.prototype.disableStart = function () {
        if (this.timecardStatus === 0) {
            return true;
        }
    };
    // function to replace writing this logic multiple times in this.setStatus
    // function to replace writing this logic multiple times in this.setStatus
    HomePage.prototype.dataFunction = 
    // function to replace writing this logic multiple times in this.setStatus
    function (notes, statusId, lat, lon) {
        if (lat) {
            this.myData = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                lat: lat,
                lon: lon,
                timestamp: new Date(Date.now())
            };
        }
        else {
            this.myData = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                timestamp: new Date(Date.now())
            };
        }
        return this.myData;
    };
    // sets the current task
    // @Param: optional showLoading:boolean show we show a loading spinner?
    // sets the current task
    // @Param: optional showLoading:boolean show we show a loading spinner?
    HomePage.prototype.setCurrentTask = 
    // sets the current task
    // @Param: optional showLoading:boolean show we show a loading spinner?
    function (showLoading) {
        var _this = this;
        this.getTimecardStatus();
        this.setBadges();
        this.currentUser = this.userMgr.getUser();
        showLoading = showLoading || false;
        if (showLoading) {
            this.utils.presentLoading();
        }
        this.taskMgr.getCurrentTaskRemote().then(function (response) {
            _this.utils.dismissLoading();
            _this.data = response;
            _this.currentTask = _this.data.task;
            _this.currentUser = _this.data.user;
            if (_this.currentTask === []) {
                _this.showTasks = false;
            }
            else if (_this.currentTask.job_tasks.status_id === 2 ||
                _this.currentTask.job_tasks.status_id === 3 ||
                _this.currentTask.job_tasks.status_id === 4 ||
                _this.currentTask.job_tasks.status_id === 5 ||
                _this.currentTask.job_tasks.status_id === 7 ||
                _this.currentTask.job_tasks.status_id === 13) {
                _this.showTasks = true;
                if (_this.debug) {
                    console.log('this.currentTask ', JSON.stringify(_this.currentTask));
                }
            }
            else if (_this.currentTask.job_tasks.status_id === 8) {
                _this.showTasks = false;
            }
            else if (_this.currentTask.job_tasks.status_id === 9 || _this.currentTask.job_tasks.status_id === 6) {
                _this.taskMgr.getCurrentTaskRemote().then(function (response) {
                    _this.data = response;
                    _this.currentTask = _this.data.task;
                    _this.currentUser = _this.data.user;
                });
            }
        })
            .catch(function (error) {
            error = error || { error: 'is undefined' };
            _this.showTasks = false;
            _this.utils.dismissLoading();
            setTimeout(function () {
                if (!_this.currentTask.id) {
                    _this.showTasks = false;
                }
            }, 2500);
        });
    };
    // gets the directions, passes the directions as a param to
    // the driving directions page
    // gets the directions, passes the directions as a param to
    // the driving directions page
    HomePage.prototype.showDrivingDirections = 
    // gets the directions, passes the directions as a param to
    // the driving directions page
    function (lat, lon) {
        var _this = this;
        this.utils.presentLoading();
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.utils.presentToast("Please verify that your location is turned on in your device settings", true);
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please verify that your location is turned on in your device settings", true);
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
                    if (_this.debug) {
                        console.log("ERROR: " + Utils.toJson(error));
                    }
                    _this.utils.presentToast("Please verify that your location is turned on in your device settings", true);
                });
            }
            if (locEnabled === false) {
                _this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    };
    // opens the reject task modal, handles the data passed back from the modal
    // opens the reject task modal, handles the data passed back from the modal
    HomePage.prototype.openRejectModal = 
    // opens the reject task modal, handles the data passed back from the modal
    function () {
        var _this = this;
        var modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss(function (data) {
            if (data.save === true) {
                _this.setStatus(8, data.notes);
            }
        });
    };
    HomePage.prototype.openCompletePage = function () {
        this.complete = true;
        var params = {
            'task_id': this.currentTask.job_tasks.id,
            'user_id': this.currentUser.userId
        };
        this.navCtrl.push(CompleteNotesPage, params).then(function (res) {
        });
        return true;
    };
    // does not open a modal as the name might suggest.
    // Instead it navigates to a page
    // does not open a modal as the name might suggest.
    // Instead it navigates to a page
    HomePage.prototype.openFeedbackModal = 
    // does not open a modal as the name might suggest.
    // Instead it navigates to a page
    function () {
        this.complete = true;
        var params = {
            'task_id': this.currentTask.job_tasks.id,
            'user_id': this.currentUser.userId
        };
        this.navCtrl.push(FeedbackPage, params).then(function (res) {
        });
        return true;
    };
    HomePage.prototype.openNextDayTasks = function () {
        this.navCtrl.push(NextDayPage).then(function (response) {
        });
        return true;
    };
    // laborer functions
    // laborer functions
    HomePage.prototype.loadLaborersTasks = 
    // laborer functions
    function () {
        var _this = this;
        this.utils.presentLoading();
        this.taskMgr.loadLaborerTasks(this.currentUser.userId).then(function (response) {
            if (response.data === []) {
                _this.showTasks = false;
                _this.utils.dismissLoading();
            }
            else {
                _this.laborerTasks = response;
                _this.myFirstKey = _this.laborerTasks.data[Object.keys(_this.laborerTasks.data)[0]];
                if (_this.myFirstKey === undefined) {
                    _this.showTasks = false;
                    _this.utils.dismissLoading();
                }
                else {
                    _this.showTasks = true;
                    var firstKey = _this.laborerTasks.data[Object.keys(_this.laborerTasks.data)[0]];
                    firstKey.sort(function (a, b) {
                        return (a.task_start_time > b.task_start_time) ? 1 : ((b.task_start_time > a.task_start_time) ? -1 : 0);
                    });
                    _this.utils.dismissLoading();
                }
            }
        });
    };
    HomePage.prototype.openLaborerRejectModal = function (statusId, taskId, dateKey, taskIndex, notes) {
        var _this = this;
        var modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss(function (data) {
            if (data.save === true) {
                _this.setLaborerStatus(statusId, taskId, dateKey, taskIndex, data.notes);
            }
        });
    };
    HomePage.prototype.expandTask = function (id, index) {
        if (this.expandTaskId === id && this.taskId === index) {
            if (!this.isIos) {
                this.content.scrollTo(0, 0, 300).then(function (res) {
                });
            }
            this.expandTaskId = -1;
            this.taskId = -1;
        }
        else {
            if (!this.isIos) {
                this.content.scrollTo(0, ((index * 50) + 85), 300).then(function (res) {
                });
            }
            this.expandTaskId = id;
            this.taskId = index;
        }
    };
    HomePage.prototype.callPhone = function (number) {
        var _this = this;
        this.callNumber.callNumber(number, false)
            .then(function () {
            if (_this.debug) {
                console.log('Launched dialer!');
            }
        })
            .catch(function () {
            if (_this.debug) {
                console.log('Error launching dialer');
            }
        });
    };
    HomePage.prototype.openInAppBrowser = function () {
        var options = "location=no";
        this.iab.create("https://www.cleartasksolutions.com/app/login/index.html", "_system", options);
    };
    HomePage.prototype.createTimecardEntry = function (status) {
        var _this = this;
        if (this.showTasks) {
            if (status === 0 && this.currentTask.job_tasks.status_id === 4) {
                var newNotes = "Clocked out while task was started";
                this.setStatus(13, newNotes, false);
            }
            if (status === 1 && this.currentTask.job_tasks.status_id === 13) {
                var newNotes = "Clocked in, resumed task";
                this.setStatus(4, newNotes, false);
            }
        }
        this.taskMgr.createTimecardEntry(this.currentUser.userId, this.lat, this.lon, status).then(function (res) {
            _this.timecardStatus = status;
            _this.showTimecard = false;
        });
    };
    HomePage.prototype.showClockInOut = function () {
        this.showTimecard = !this.showTimecard;
    };
    HomePage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    HomePage.prototype.checkUpdates = function () {
        // checkForUpdate().then((res: any) => {
        //     console.log('res in home ', JSON.stringify(res));
        //     if (res === 'true') {
        //         downloadUpdate().then((result: any) => {
        //             console.log('result ', JSON.stringify(result));
        //             if (result === 'true') {
        //                 extractUpdate().then((extract: any) => {
        //                     console.log('extract ', JSON.stringify(extract));
        //                     if (extract === 'done') {
        //                         console.log('done in home');
        //                         loadNewVersion();
        //                     }
        //                 })
        //             }
        //         })
        //     }
        // });
    };
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map