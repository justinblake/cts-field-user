"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
//import { Geoposition } from 'ionic-native';
var driving_directions_1 = require("../driving-directions/driving-directions");
var login_1 = require("../login/login");
var feedback_1 = require("../feedback/feedback");
var utils_1 = require("../../utils/utils");
var animations_1 = require("../../animations/animations");
var HomePage = (function () {
    function HomePage(navCtrl, taskMgr, mapsManager, loadingCtrl, userMgr, appCtrl, geolocSvc, utils, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.taskMgr = taskMgr;
        this.mapsManager = mapsManager;
        this.loadingCtrl = loadingCtrl;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.geolocSvc = geolocSvc;
        this.utils = utils;
        this.platform = platform;
        this.currentTask = '';
        this.currentUser = '';
        this.hideMoreProject = true;
        this.divState = 'hide';
        this.taskIsLoading = true;
        this.showTasks = true;
        /**
         * sets the status of the task using TaskManager
         * then loads the current task from the API
         */
        this.setStatus = function (statusId, notes) {
            //this.currentTask.status = statusId;
            console.log('Setting status');
            console.log("" + utils_1.Utils.toJson(_this.currentUser, true));
            var data = {
                notes: notes || '',
                statusId: statusId,
                files: []
            };
            _this.utils.presentLoading();
            console.log("" + utils_1.Utils.toJson(data, true));
            // call update in task manager
            _this.taskMgr.updateTaskStatus(data).then(function (response) {
                // now set the current task
                _this.setCurrentTask(false);
            })["catch"](function (error) {
                console.log("ERROR: " + utils_1.Utils.toJson(error));
                _this.utils.toastError(error);
            });
        };
        //this.currentUser = this.authenticate();
        //this.currentTask = this.setCurrentTask();
        //console.log('IS LOGGED IN? ' + this.userMgr.isLoggedIn());
        this.hideMoreProject = true;
        this.divState = 'collapse';
    }
    /** responsd to button click events in the empty state */
    HomePage.prototype.checkForNewTasks = function () {
        this.setCurrentTask();
    };
    /** helper method for the expand/collapse div animation */
    HomePage.prototype.toggleDivState = function () {
        var states = {
            expand: 'collapse',
            collapse: 'expand'
        };
        this.divState = states[this.divState];
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('View is loaded');
    };
    HomePage.prototype.ionViewDidEnter = function () {
        console.log('HomePage View is entered');
        //this.currentUser = this.authenticate();
        this.setCurrentTask(true);
    };
    /** logs the user out of the app */
    HomePage.prototype.logout = function () {
        var _this = this;
        //this.userMgr.logout();
        //this.appCtrl.getRootNav().push(LoginPage);
        this.userMgr.logout().then(function (response) {
            console.log(response);
            _this.appCtrl.getRootNav().push(login_1.LoginPage);
        });
    };
    /**
     * sets the current task
     * @Param: optional showLoading:boolean show we show a loading spinner?
     */
    HomePage.prototype.setCurrentTask = function (showLoading) {
        var _this = this;
        showLoading = showLoading || false;
        console.log('Now setting current Task...', "I cant change anything why? ");
        if (showLoading)
            this.utils.presentLoading();
        this.taskMgr.getCurrentTask().then(function (response) {
            console.log("RESPONSE => " + utils_1.Utils.toJson(response, true));
            console.log("current task responce", response);
            _this.data = response;
            _this.currentTask = _this.data.task;
            _this.currentUser = _this.data.user;
            if (_this.currentTask == null) {
                _this.showTasks = false;
            }
            else {
                // it doesn't appear that the task user log is returned in any order
                // so the following is a workaround yay
                // built after I stopped billing so didn't change anything 
                // after Mick changed the order of the logUserTask array response
                // from the API
                // return an array that only contains the 'system' status_id //
                var log_1 = _this.currentTask.job_tasks.task_user_log;
                var filtered = log_1.filter(function (el, i, arr) {
                    return (el.status_id == 1 || el.status_id == 2 || el.status_id == 6);
                });
                var max_1 = 0;
                var indexOfMax_1 = 0;
                // now get the max status_id //
                var sliced_1 = [];
                if (filtered.length) {
                    filtered.forEach(function (el, i, arr) {
                        //console.log(`${Utils.toJson(el)}`);
                        if (el.status_id > max_1) {
                            max_1 = el.status_id;
                            indexOfMax_1 = i;
                            sliced_1[0] = el;
                        }
                    });
                    //now set what we found as the max status id to the filtered array yay
                    filtered = sliced_1;
                }
                console.log("" + utils_1.Utils.toJson(sliced_1));
                if (filtered && filtered[0]) {
                    //console.log('A');
                    _this.currentTask.task_user_log_status = filtered[0].status_id;
                    if (_this.currentTask.task_user_log_status == 1) {
                        //console.log('B');
                        _this.showTasks = true;
                    }
                    else {
                        //console.log('C');
                        // 2: rejected, 6: completed
                        var status_1 = { 2: "rejected", 6: "completed" };
                        var msg = "Found a task but it has been " + (status_1[_this.currentTask.task_user_log_status] || '(UNKNOWN STATUS)') + " ";
                        _this.showTasks = false;
                        _this.utils.presentToast(msg, true, 'OK');
                    }
                }
                else {
                    //console.log('D');
                    _this.currentTask.task_user_log_status = null;
                    _this.showTasks = true;
                }
                //console.log('E');
                //if(showLoading){
                _this.utils.dismissLoading();
            }
        })["catch"](function (error) {
            //error = error || { error : 'is undefined'};
            //console.log('ERRORERRORERROR');
            _this.utils.dismissLoading();
            setTimeout(function () {
                //this.utils.presentToast(msg, true, 'OK');
                console.log("ERROR: " + utils_1.Utils.toJson(error));
                // this.utils.toastError(error);
                _this.utils.toastError(error);
                if (!_this.currentTask.id) {
                    _this.showTasks = false;
                }
            }, 500);
        });
    };
    /**
     * gets the directions, passes the directions as a param to
     * the driving directions page
     */
    HomePage.prototype.showDrivingDirections = function (lat, lon) {
        var _this = this;
        var destination = lat + "," + lon;
        //console.log('destination: ' + destination)
        var loading = this.loadingCtrl.create({});
        loading.present();
        //let data = {};
        this.geolocSvc.getCurrentPosition().then(function (position) {
            var origin = position.coords.latitude + "," + position.coords.longitude;
            //console.log(`ORIGIN: ${origin}`);
            return _this.mapsManager.getDirections(origin, destination);
        }).then(function (response) {
            //console.log(`RESPONSE: ${Utils.toJson(response)}`);
            var params = {
                directions: response
            };
            setTimeout(function () {
                _this.navCtrl.push(driving_directions_1.DrivingDirectionsPage, params);
                loading.dismiss();
            }, 2000);
        })["catch"](function (error) {
            console.log("ERROR: " + utils_1.Utils.toJson(error));
            _this.utils.toastError(error);
        });
    };
    /**
     * opens the reject task modal, handles the data passed back from the modal
     */
    HomePage.prototype.openRejectModal = function () {
        var _this = this;
        var modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss(function (data) {
            console.log("'REJECT NOTES DISMISSED => " + utils_1.Utils.toJson(data, true));
            if (data.save === true) {
                _this.setStatus(2, data.notes);
            }
        });
    };
    /** navigate to feedback page. same as below but never ended up replacing it */
    HomePage.prototype.goToFeedback = function () {
        this.navCtrl.push(feedback_1.FeedbackPage);
    };
    /**
     * does not open a modal as the name might suggest.
     * Instead it navigates to a page
     */
    HomePage.prototype.openFeedbackModal = function () {
        //TODO: replace all calls to this method with this.goToFeedback()
        this.navCtrl.push(feedback_1.FeedbackPage);
        return true;
    };
    return HomePage;
}());
__decorate([
    core_1.ViewChild('ctsNav')
], HomePage.prototype, "nav");
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        animations: [
            animations_1.Animations.expandCollapse
        ]
    })
], HomePage);
exports.HomePage = HomePage;
