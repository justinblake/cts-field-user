"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var md5_1 = require("ts-md5/dist/md5");
var reject_notes_1 = require("../pages/reject-notes/reject-notes");
var Utils = (function () {
    function Utils(loadingCtrl, alertCtrl, toastCtrl, modalCtrl) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingIsPresent = false;
        /**
         * display a toast error
         * @Param error:string the error message
         * @Return: void
         */
        this.toastError = function (error) {
            var msg = 'An unknown error has occurred';
            if (error.msg) {
                msg = error.msg;
            }
            _this.presentToast(msg, true, 'OK');
        };
    }
    /**
     * utility function for JSON.stringify
     * @Param o:jsonObject the obj you want to stringify
     * @Param pretty:boolean pretty print y/n
     */
    Utils.toJson = function (o, pretty) {
        pretty = pretty || false;
        return pretty ? JSON.stringify(o, null, '\t') : JSON.stringify(o);
        //return JSON.stringify(o, )
    };
    /**
     * utility function to md5 hash a string
     * @Param str:string the string you want to hash
     */
    Utils.md5hashStr = function (str) {
        var md5str = md5_1.Md5.hashStr(str, false);
        //console.log(str);
        //console.log(md5str);
        console.log(md5str === '098f6bcd4621d373cade4e832627b4f6');
        console.log(str + " => " + md5str);
        return md5str;
    };
    /**
     * presents a loading spinner
     * @Param content:string the spinner caption
     * @Return: void
     */
    Utils.prototype.presentLoading = function (content) {
        var _this = this;
        var opts = {
            content: content || ''
        };
        this.loading = this.loadingCtrl.create(opts);
        this.loading.present().then(function (response) {
            _this.loadingIsPresent = true;
            console.log("Loading is present I think: " + response);
        });
    };
    /**
     * dismiss a loading spinner
     * @Return: void
     */
    Utils.prototype.dismissLoading = function () {
        //console.log('Dismiss Loading called')
        //console.log(`${this.loading}`);
        //console.log(`${this.loadingCtrl}`);
        this.loading.dismissAll() || console.log('Unable to dismiss loading...');
    };
    /**
     * presents a toast
     * @Param message:string the toast msg
     * @Param showCloseButton:boolean optional show the closed button display
     * @Param closeButtonTest:string optional the close button text, usually 'X' or 'OK'
     * @Return: void
     */
    Utils.prototype.presentToast = function (message, showCloseButton, closeButtonText) {
        var options = {
            message: message,
            position: 'bottom',
            showCloseButton: (showCloseButton || false),
            closeButtonText: (closeButtonText || 'OK')
        };
        var toast = this.toastCtrl.create(options);
        toast.present();
    };
    /**
     * presents rejects notes modal
     * put it here b/c for modularity and code reuse
     * @Return: void
     */
    Utils.prototype.presentRejectNotesModal = function () {
        this.modal = this.modalCtrl.create(reject_notes_1.RejectNotesPage);
        this.modal.present();
        return this.modal;
    };
    /** dismiss whatever modal we've presented */
    Utils.prototype.dismissModal = function () {
        this.modal.dismiss();
    };
    return Utils;
}());
Utils = __decorate([
    core_1.Injectable()
], Utils);
exports.Utils = Utils;
