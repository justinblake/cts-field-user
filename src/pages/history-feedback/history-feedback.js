import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TaskManager } from '../../providers/task-manager';
import { Utils } from '../../utils/utils';
var HistoryFeedbackPage = /** @class */ (function () {
    function HistoryFeedbackPage(navCtrl, navParams, actionSheetCtrl, platform, taskMgr, utils, camera, diagnostic, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.taskMgr = taskMgr;
        this.utils = utils;
        this.camera = camera;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.id = navParams.get("id");
        console.log("this.id " + this.id);
        this.data = {
            notes: '',
            statusId: 9,
            files: this.files,
            save: false,
            taskId: this.id
        };
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
        this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
    }
    HistoryFeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
        // setTimeout(() => this.getLocation(), 500);
    };
    HistoryFeedbackPage.prototype.ionViewDidEnter = function () {
        console.log('ionView stuff');
    };
    HistoryFeedbackPage.prototype.deleteImage = function (index) {
        this.data.files.splice(index, 1);
    };
    /** used for HTML file upload only */
    /** used for HTML file upload only */
    HistoryFeedbackPage.prototype.showFiles = /** used for HTML file upload only */
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
    HistoryFeedbackPage.prototype.save = /** save button clicked */
    function () {
        var _this = this;
        this.data.save = true;
        console.log('this.data.notes', JSON.stringify(this.data.notes));
        if (this.data.notes === '') {
            this.data.notes = "New Image";
        }
        this.data.notes = this.data.notes.trim();
        this.data.lat = this.lat;
        this.data.lon = this.lon;
        this.utils.presentLoading();
        this.taskMgr.postHistoryFeedback(this.data).then(function (response) {
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
    HistoryFeedbackPage.prototype.cancel = /** cancel button clicked, used when page was a modal */
    function () {
        this.data.save = false;
        this.navCtrl.pop();
    };
    HistoryFeedbackPage.prototype.disableFormSubmit = function () {
        /**
                 *  Used to disable a form button. So :
                 *  if false OR false, then disable (true) OR
                 *  if true AND true, the don't disable (false)
                 */
        return !((this.data.notes.trim().length > 4) && (this.data.statusId > 0));
    };
    /** trim notes  */
    /** trim notes  */
    HistoryFeedbackPage.prototype.trimNotes = /** trim notes  */
    function () {
        this.data.notes = this.data.notes.trim();
    };
    /** when cordova, present an action sheet to take a pic or import from gallery */
    /** when cordova, present an action sheet to take a pic or import from gallery */
    HistoryFeedbackPage.prototype.presentActionSheet = /** when cordova, present an action sheet to take a pic or import from gallery */
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
    HistoryFeedbackPage.prototype.getPicture = /**
         * get picture from gallery or camera
         * @Param sourceType:number camera or gallery
         */
    function (sourceType, editable) {
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
    return HistoryFeedbackPage;
}());
export { HistoryFeedbackPage };
//# sourceMappingURL=history-feedback.js.map