import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TaskManager } from '../../providers/task-manager';
import { Utils } from '../../utils/utils';
import { Geolocation } from '@ionic-native/geolocation';
var CompleteNotesPage = /** @class */ (function () {
    function CompleteNotesPage(navCtrl, navParams, taskMgr, geolocation, actionSheetCtrl, platform, utils, camera, diagnostic, alertCtrl) {
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
        console.log('this.taskId ', JSON.stringify(this.taskId));
        console.log('this.userId ', JSON.stringify(this.userId));
        this.isCordova = this.taskMgr.returnPlatform().isCordova;
        this.data = {
            userId: this.userId,
            taskId: this.taskId,
            notes: '',
            statusId: 9,
            files: this.files,
            save: false
        };
        console.log('this.data ', JSON.stringify(this.data));
        if (this.platform.is('ios')) {
            // This will only print when on iOS
            this.isIos = true;
        }
        var successCallback = function (isAvailable) {
            console.log('Is available? ' + isAvailable);
        };
        var errorCallback = function (e) {
            _this.diagnostic.requestCameraAuthorization().then(successCallback);
        };
        if (this.isCordova) {
            this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
        }
    }
    CompleteNotesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad FeedbackPage');
        setTimeout(function () { return _this.getLocation(); }, 500);
    };
    CompleteNotesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionView stuff');
        // this.loadTaskInfo();
        setTimeout(function () { return _this.getLocation(); }, 500);
    };
    CompleteNotesPage.prototype.loadTaskInfo = function () {
        var _this = this;
        this.taskMgr.getCurrentTaskRemote().then(function (response) {
            _this.currentTask = response;
            console.log('this.currentTask', JSON.stringify(_this.currentTask));
        });
    };
    CompleteNotesPage.prototype.getLocation = function () {
        var _this = this;
        if (this.isCordova) {
            this.geolocation.getCurrentPosition().then(function (resp) {
                _this.lat = resp.coords.latitude;
                _this.lon = resp.coords.longitude;
            }).catch(function (error) {
                console.log('Error getting location', error);
            });
        }
    };
    CompleteNotesPage.prototype.deleteImage = function (index) {
        this.data.files.splice(index, 1);
    };
    /** used for HTML file upload only */
    /** used for HTML file upload only */
    CompleteNotesPage.prototype.showFiles = /** used for HTML file upload only */
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
    CompleteNotesPage.prototype.save = /** save button clicked */
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
                    _this.navCtrl.pop().then(function (res) {
                        console.log('res in complete pages  ', JSON.stringify(res));
                    });
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
    CompleteNotesPage.prototype.cancel = /** cancel button clicked, used when page was a modal */
    function () {
        this.data.save = false;
        this.navCtrl.pop();
    };
    CompleteNotesPage.prototype.disableFormSubmit = function () {
        /**
                 *  Used to disable a form button. So :
                 *  if false OR false, then disable (true) OR
                 *  if true AND true, the don't disable (false)
                 */
        return !((this.data.notes.trim().length > 4) && (this.data.statusId > 0));
    };
    /** trim notes  */
    /** trim notes  */
    CompleteNotesPage.prototype.trimNotes = /** trim notes  */
    function () {
        this.data.notes = this.data.notes.trim();
    };
    /** when cordova, present an action sheet to take a pic or import from gallery */
    /** when cordova, present an action sheet to take a pic or import from gallery */
    CompleteNotesPage.prototype.presentActionSheet = /** when cordova, present an action sheet to take a pic or import from gallery */
    function (editable) {
        var _this = this;
        var buttons = [];
        if (this.platform.is('cordova')) {
            buttons.push({
                text: 'Choose Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.PHOTOLIBRARY, editable); // 0 == Library
                }
            }, {
                text: 'Take Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.CAMERA, editable); // 1 == Camera
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
    CompleteNotesPage.prototype.getPicture = /**
         * get picture from gallery or camera
         * @Param sourceType:number camera or gallery
         */
    function (sourceType, editable) {
        var _this = this;
        this.utils.presentLoading();
        this.camera.getPicture({
            quality: 40,
            destinationType: 1,
            sourceType: sourceType,
            targetWidth: 1000,
            targetHeight: 1333,
            allowEdit: true,
            mediaType: 0,
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
    return CompleteNotesPage;
}());
export { CompleteNotesPage };
//# sourceMappingURL=complete-notes.js.map