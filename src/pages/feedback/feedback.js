import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TaskManager } from '../../providers/task-manager';
import { Utils } from '../../utils/utils';
import { Geolocation } from '@ionic-native/geolocation';
var FeedbackPage = /** @class */ (function () {
    function FeedbackPage(navCtrl, navParams, taskMgr, geolocation, actionSheetCtrl, platform, utils, camera, diagnostic, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.taskMgr = taskMgr;
        this.geolocation = geolocation;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.utils = utils;
        this.camera = camera;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.taskId = navParams.get('task_id');
        this.userId = navParams.get('user_id');
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.data = {
            userId: this.userId,
            taskId: this.taskId,
            notes: '',
            statusId: 0,
            files: this.files,
            save: false
        };
        this.type.options = [
            {
                "id": 3,
                "status": "Accepted",
                "system_only": 1
            }, {
                "id": 4,
                "status": "Rejected",
                "system_only": 1
            }, {
                "id": 12,
                "status": "Temporary Hold",
                "system_only": 0
            }, {
                "id": 5,
                "status": "Delayed",
                "system_only": 0
            }, {
                "id": 7,
                "status": "Emergency",
                "system_only": 0
            }, {
                "id": 9,
                "status": "Completed",
                "system_only": 1
            }, {
                "id": 10,
                "status": "General Notes",
                "system_only": 0
            }
        ];
        this.type.options = this.type.options.filter(function (value) {
            return value.system_only == 0;
        });
        var successCallback = function (isAvailable) {
            console.log('Is available? ' + isAvailable);
        };
        var errorCallback = function (e) {
            _this.diagnostic.requestCameraAuthorization().then(successCallback);
        };
        this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
    };
    FeedbackPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () { return _this.getLocation(); }, 500);
    };
    FeedbackPage.prototype.loadTaskInfo = function () {
        var _this = this;
        this.taskMgr.getCurrentTaskRemote().then(function (response) {
            _this.currentTask = response;
        });
    };
    FeedbackPage.prototype.getLocation = function () {
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
                _this.geolocation.getCurrentPosition({ timeout: 20000 }).then(function (position) {
                    _this.lat = position.coords.latitude;
                    _this.lon = position.coords.longitude;
                }).catch(function (error) {
                    _this.presentLocationAlert();
                    // this.utils.presentToast('Unable to get a precise location. Some functionality will be limited until device location is available', true, '', 10000);
                });
            }
        }).catch(errorCallback);
    };
    FeedbackPage.prototype.presentLocationAlert = function () {
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
                            _this.diagnostic.switchToLocationSettings();
                        }
                        if (_this.isIos) {
                            console.log("inside the ios handler ");
                            _this.diagnostic.isLocationAuthorized().then(function (res) {
                                console.log('res isLocationAuthorized ', JSON.stringify(res));
                            });
                            _this.diagnostic.getLocationAuthorizationStatus().then(function (response) {
                                if (response === 'denied') {
                                    _this.getLocation();
                                }
                                console.log('response getLocationAuthorizationStatus ', JSON.stringify(response));
                            });
                            _this.diagnostic.requestLocationAuthorization('when_in_use').then(function (res) {
                                console.log('res requestLocationAuthorization ', JSON.stringify(res));
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    /** delete image button clicked, remove from files array */
    /** delete image button clicked, remove from files array */
    FeedbackPage.prototype.deleteImage = /** delete image button clicked, remove from files array */
    function (index) {
        this.data.files.splice(index, 1);
    };
    /** used for HTML file upload only */
    /** used for HTML file upload only */
    FeedbackPage.prototype.showFiles = /** used for HTML file upload only */
    function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        var file = files[0];
        var fileData = {
            name: file.name,
            caption: '',
            path: '',
            file: file
        };
        this.data.files.push(fileData);
    };
    /** save button clicked */
    /** save button clicked */
    FeedbackPage.prototype.save = /** save button clicked */
    function () {
        var _this = this;
        this.data.save = true;
        this.data.notes = this.data.notes.trim();
        this.data.lat = this.lat;
        this.data.lon = this.lon;
        this.utils.presentLoading();
        this.taskMgr.postFeedback(this.data).then(function (response) {
            if (_this.isIos) {
                _this.camera.cleanup().then(function (response) {
                    //
                }).catch(function (error) {
                    console.error("There was an error calling Camera.cleanup: " + Utils.toJson(error));
                });
            }
            _this.utils.dismissLoading();
            setTimeout(function () {
                if (response === true) {
                    _this.navCtrl.pop();
                }
                else {
                    _this.utils.toastError({ msg: 'There was an error posting feedback' });
                }
            }, 500);
        }).catch(function (error) {
            _this.utils.toastError({ msg: 'There was an error posting feedback' });
            if (_this.isIos) {
                _this.camera.cleanup().then(function (response) {
                    //
                }).catch(function (error) {
                    console.error("There was an error calling Camera.cleanup: " + Utils.toJson(error));
                });
            }
            _this.utils.dismissLoading();
        });
    };
    /** cancel button clicked, used when page was a modal */
    /** cancel button clicked, used when page was a modal */
    FeedbackPage.prototype.cancel = /** cancel button clicked, used when page was a modal */
    function () {
        this.data.save = false;
    };
    FeedbackPage.prototype.disableFormSubmit = function () {
        /**
                 *  Used to disable a form button. So :
                 *  if false OR false, then disable (true) OR
                 *  if true AND true, the don't disable (false)
                 */
        return !((this.data.notes.trim().length > 4) && (this.data.statusId > 0));
    };
    /** trim notes  */
    /** trim notes  */
    FeedbackPage.prototype.trimNotes = /** trim notes  */
    function () {
        this.data.notes = this.data.notes.trim();
    };
    /** when cordova, present an action sheet to take a pic or import from gallery */
    /** when cordova, present an action sheet to take a pic or import from gallery */
    FeedbackPage.prototype.presentActionSheet = /** when cordova, present an action sheet to take a pic or import from gallery */
    function () {
        var _this = this;
        var buttons = [];
        if (this.platform.is('cordova')) {
            buttons.push({
                text: 'Choose Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.PHOTOLIBRARY); // 0 == Library
                }
            }, {
                text: 'Take Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.CAMERA); // 1 == Camera
                }
            });
        }
        buttons.push({
            text: 'Cancel',
            role: 'cancel'
        });
        var actionSheet = this.actionSheetCtrl.create({
            buttons: buttons
        });
        actionSheet.present();
    };
    /**
     * get picture from gallery or camera
     * @Param sourceType:number camera or gallery
     */
    /**
         * get picture from gallery or camera
         * @Param sourceType:number camera or gallery
         */
    FeedbackPage.prototype.getPicture = /**
         * get picture from gallery or camera
         * @Param sourceType:number camera or gallery
         */
    function (sourceType) {
        var _this = this;
        this.utils.presentLoading();
        this.camera.getPicture({
            quality: 50,
            destinationType: 1,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true //this needs to be true to get a file:/// FILE_URI, otherwise android does not return a file uri. Yep.
        }).then(function (imageData) {
            console.log("IMAGEDATA: " + Utils.toJson(imageData, true));
            //fix for android, remove query string from end of file_uri or crashes android //
            imageData = imageData.split('?')[0];
            var filename = imageData.replace(/^.*[\\\/]/, '');
            var fileData = {
                name: filename,
                caption: '',
                //notes : '',
                path: imageData,
            };
            _this.data.files.push(fileData);
            _this.utils.dismissLoading();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Image Error',
                message: 'Unable to upload image. Please choose a different image or take an new picture',
                cssClass: 'myAlerts',
                buttons: ['OK']
            });
            alert.present();
            console.log("ERROR -> " + JSON.stringify(err));
            _this.utils.dismissLoading();
        });
    };
    FeedbackPage.prototype.selectedStatus = function (selection) {
        this.data.statusId = selection;
        this.hasSelected = false;
        this.hasStatus = true;
    };
    FeedbackPage.prototype.showNotes = function () {
        this.hasStatus = true;
        this.hasSelected = false;
    };
    FeedbackPage.prototype.backToSelection = function () {
        this.hasStatus = false;
        this.hasSelected = false;
    };
    FeedbackPage.prototype.createLoading = function () {
        this.utils.presentLoading();
    };
    return FeedbackPage;
}());
export { FeedbackPage };
//# sourceMappingURL=feedback.js.map