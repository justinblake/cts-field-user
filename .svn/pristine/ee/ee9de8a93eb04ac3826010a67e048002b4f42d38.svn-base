"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_native_1 = require("ionic-native");
//import { UserManager } from '../../providers/user-manager';
var utils_1 = require("../../utils/utils");
/*
  Generated class for the Feedback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var FeedbackPage = (function () {
    function FeedbackPage(navCtrl, navParams, viewCtrl, taskMgr, actionSheetCtrl, platform, utils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.taskMgr = taskMgr;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.utils = utils;
        //files:Array<File>=[];
        this.files = [];
        this.type = { options: '' };
        this.data = {
            notes: '',
            statusId: 0,
            files: this.files,
            save: false
        };
        this.type.options = [
            {
                "id": 1,
                "status": "Accepted",
                "system_only": 1
            }, {
                "id": 2,
                "status": "Rejected",
                "system_only": 1
            }, {
                "id": 3,
                "status": "Problem Low",
                "system_only": 0
            }, {
                "id": 4,
                "status": "Problem Medium",
                "system_only": 0
            }, {
                "id": 5,
                "status": "Problem High",
                "system_only": 0
            }, {
                "id": 6,
                "status": "Completed",
                "system_only": 1
            }, {
                "id": 7,
                "status": "General Notes",
                "system_only": 0
            }
        ];
        this.type.options = this.type.options.filter(function (value) {
            return value.system_only == 0;
        });
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
    };
    /** delete image button clicked, remove from files array */
    FeedbackPage.prototype.deleteImage = function (index) {
        //console.log('deleting file ' + index)
        this.data.files.splice(index, 1);
    };
    /** used for HTML file upload only */
    FeedbackPage.prototype.showFiles = function (event) {
        console.log("" + utils_1.Utils.toJson(this.data.files, true));
        //console.log(`${Utils.toJson(event.srcElement, true)}`)
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        var file = files[0];
        //console.log(file.webkitRelativePath());
        var fileData = {
            name: file.name,
            caption: '',
            //notes : '',
            path: '',
            file: file
        };
        this.data.files.push(fileData);
        console.log("" + utils_1.Utils.toJson(this.data.files, true));
    };
    /** save button clicked */
    FeedbackPage.prototype.save = function () {
        var _this = this;
        this.data.save = true;
        this.data.notes = this.data.notes.trim();
        //this.viewCtrl.dismiss(this.data)
        //this.viewCtrl.
        this.utils.presentLoading();
        this.taskMgr.postFeedback(this.data).then(function (response) {
            //console.log(`${Utils.toJson(response, true)}`);
            ionic_native_1.Camera.cleanup();
            _this.utils.dismissLoading();
            setTimeout(function () {
                //let o:any = response
                if (response === true) {
                    _this.navCtrl.pop();
                }
                else {
                    _this.utils.toastError({ msg: 'There was an error posting feedback' });
                }
            }, 500);
        })["catch"](function (error) {
            _this.utils.toastError({ msg: 'There was an error posting feedback' });
            ionic_native_1.Camera.cleanup().then(function (response) {
                //
            })["catch"](function (error) {
                console.error("There was an error calling Camera.cleanup: " + utils_1.Utils.toJson(error));
            });
            _this.utils.dismissLoading();
        });
    };
    /** cancel button clicked, used when page was a modal */
    FeedbackPage.prototype.cancel = function () {
        this.data.save = false;
        //this.viewCtrl.dismiss(this.data)
    };
    FeedbackPage.prototype.disableFormSubmit = function () {
        /**
         *  Used to disable a form button. So :
         *  if false OR false, then disable (true) OR
         *  if true AND true, the don't disable (false)
         */
        return !((this.data.notes.trim().length > 10) && (this.data.statusId > 0));
    };
    /** trim notes  */
    FeedbackPage.prototype.trimNotes = function () {
        this.data.notes = this.data.notes.trim();
    };
    /** when cordova, present an action sheet to take a pic or import from gallery */
    FeedbackPage.prototype.presentActionSheet = function () {
        var _this = this;
        var buttons = [];
        //this.resetImages();
        //console.debug(`Platforms: ${this.platform.platforms()}`);
        if (this.platform.is('cordova')) {
            buttons.push({
                text: 'Choose Photo',
                handler: function () {
                    _this.getPicture(ionic_native_1.Camera.PictureSourceType.PHOTOLIBRARY); // 0 == Library
                }
            }, {
                text: 'Take Photo',
                handler: function () {
                    _this.getPicture(ionic_native_1.Camera.PictureSourceType.CAMERA); // 1 == Camera
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
    FeedbackPage.prototype.getPicture = function (sourceType) {
        var _this = this;
        // You can check the values here:
        // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
        this.utils.presentLoading();
        ionic_native_1.Camera.getPicture({
            quality: 50,
            //destinationType: Camera.DestinationType.FILE_URI, 
            destinationType: 1,
            sourceType: sourceType,
            allowEdit: false,
            saveToPhotoAlbum: false,
            correctOrientation: true //this needs to be true to get a file:/// FILE_URI, otherwise android does not return a file uri. Yep.
        }).then(function (imageData) {
            //this.processImage(`data:image/jpeg;base64,${imageData}`);
            console.log("IMAGEDATA: " + utils_1.Utils.toJson(imageData, true));
            //fix for android, remove query string from end of file_uri or crashes android //
            imageData = imageData.split('?')[0];
            console.log("IMAGEDATA: " + utils_1.Utils.toJson(imageData, true));
            var filename = imageData.replace(/^.*[\\\/]/, '');
            var fileData = {
                name: filename,
                caption: '',
                //notes : '',
                path: imageData
            };
            _this.data.files.push(fileData);
            _this.utils.dismissLoading();
        }, function (err) {
            console.log("ERROR -> " + JSON.stringify(err));
            _this.utils.dismissLoading();
        });
    };
    return FeedbackPage;
}());
FeedbackPage = __decorate([
    core_1.Component({
        selector: 'page-feedback',
        templateUrl: 'feedback.html'
    })
], FeedbackPage);
exports.FeedbackPage = FeedbackPage;
