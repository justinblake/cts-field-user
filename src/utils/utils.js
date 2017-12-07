import { Injectable } from '@angular/core';
import { LoadingController, Loading, AlertController, ToastController, Modal, ModalController, Platform } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { RejectNotesPage } from '../pages/reject-notes/reject-notes';
var Utils = /** @class */ (function () {
    function Utils(loadingCtrl, alertCtrl, plt, toastCtrl, modalCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.plt = plt;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
    }
    /**
     * utility function for JSON.stringify
     * @Param o:jsonObject the obj you want to stringify
     * @Param pretty:boolean pretty print y/n
     */
    /**
         * utility function for JSON.stringify
         * @Param o:jsonObject the obj you want to stringify
         * @Param pretty:boolean pretty print y/n
         */
    Utils.toJson = /**
         * utility function for JSON.stringify
         * @Param o:jsonObject the obj you want to stringify
         * @Param pretty:boolean pretty print y/n
         */
    function (o, pretty) {
        pretty = pretty || false;
        return pretty ? JSON.stringify(o, null, '\t') : JSON.stringify(o);
        //return JSON.stringify(o, )
    };
    /**
     * utility function to md5 hash a string
     * @Param str:string the string you want to hash
     */
    /**
         * utility function to md5 hash a string
         * @Param str:string the string you want to hash
         */
    Utils.md5hashStr = /**
         * utility function to md5 hash a string
         * @Param str:string the string you want to hash
         */
    function (str) {
        var md5str = Md5.hashStr(str, false);
        return md5str;
    };
    /**
     * presents a loading spinner
     * @Param content:string the spinner caption
     * @Return: void
     */
    /**
         * presents a loading spinner
         * @Param content:string the spinner caption
         * @Return: void
         */
    Utils.prototype.presentLoading = /**
         * presents a loading spinner
         * @Param content:string the spinner caption
         * @Return: void
         */
    function (content) {
        var _this = this;
        var opts = {
            content: content || 'Tap the background to dismiss loading',
            enableBackdropDismiss: true,
            spinner: 'dots',
        };
        this.loading = this.loadingCtrl.create(opts);
        this.loading.present().then(function (response) {
            _this.loadingIsPresent = true;
        });
    };
    /**
     * dismiss a loading spinner
     * @Return: void
     */
    /**
         * dismiss a loading spinner
         * @Return: void
         */
    Utils.prototype.dismissLoading = /**
         * dismiss a loading spinner
         * @Return: void
         */
    function () {
        this.loading.dismissAll() || console.log('Unable to dismiss loading...');
    };
    /**
     * presents a toast
     * @Param message:string the toast msg
     * @Param showCloseButton:boolean optional show the closed button display
     * @Param closeButtonTest:string optional the close button text, usually 'X' or 'OK'
     * @Return: void
     */
    /**
         * presents a toast
         * @Param message:string the toast msg
         * @Param showCloseButton:boolean optional show the closed button display
         * @Param closeButtonTest:string optional the close button text, usually 'X' or 'OK'
         * @Return: void
         */
    Utils.prototype.presentToast = /**
         * presents a toast
         * @Param message:string the toast msg
         * @Param showCloseButton:boolean optional show the closed button display
         * @Param closeButtonTest:string optional the close button text, usually 'X' or 'OK'
         * @Return: void
         */
    function (message, showCloseButton, closeButtonText, dur) {
        var options = {
            message: message,
            position: 'bottom',
            showCloseButton: (showCloseButton || false),
            closeButtonText: (closeButtonText || 'OK'),
            duration: (dur || 5000)
        };
        var toast = this.toastCtrl.create(options);
        toast.present();
    };
    /**
     * presents rejects notes modal
     * put it here b/c for modularity and code reuse
     * @Return: void
     */
    /**
         * presents rejects notes modal
         * put it here b/c for modularity and code reuse
         * @Return: void
         */
    Utils.prototype.presentRejectNotesModal = /**
         * presents rejects notes modal
         * put it here b/c for modularity and code reuse
         * @Return: void
         */
    function () {
        this.modal = this.modalCtrl.create(RejectNotesPage);
        this.modal.present();
        return this.modal;
    };
    /** dismiss whatever modal we've presented */
    /** dismiss whatever modal we've presented */
    Utils.prototype.dismissModal = /** dismiss whatever modal we've presented */
    function () {
        this.modal.dismiss();
    };
    //Return false when testing on a browser
    //Return true when building for iOS or Android
    //Return false when testing on a browser
    //Return true when building for iOS or Android
    Utils.prototype.FCMFlagDebug = 
    //Return false when testing on a browser
    //Return true when building for iOS or Android
    function () {
        return this.plt.is('cordova');
    };
    Utils.prototype.returnAppVersion = function () {
        return this.appVersion;
    };
    return Utils;
}());
export { Utils };
//# sourceMappingURL=utils.js.map