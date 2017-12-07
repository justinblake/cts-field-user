import { Injectable } from '@angular/core';
import { MenuController, Platform, ToastController } from 'ionic-angular';
var HardwareBackButtonService = /** @class */ (function () {
    function HardwareBackButtonService(_plt, _menuCtrl, _toastCtrl) {
        this._plt = _plt;
        this._menuCtrl = _menuCtrl;
        this._toastCtrl = _toastCtrl;
    }
    HardwareBackButtonService.prototype.registerAction = function (fn, p) {
        this._deregisterFn = this
            ._plt
            .registerBackButtonAction(function () {
            fn();
        }, p);
    };
    HardwareBackButtonService.prototype.deregisterAction = function () {
        this._deregisterFn && this._deregisterFn();
    };
    HardwareBackButtonService.prototype.doubleBackToExit = function () {
        var _this = this;
        // If sidemenu is open we close it instead of show the toast
        if (this._menuCtrl && this._menuCtrl.isOpen()) {
            return this
                ._menuCtrl
                .close();
        }
        // No sidemenu open lets handle double back to exit
        if (!this._didBackAlready) {
            this._didBackAlready = true;
            this._presentToast("Press back button again to exit");
            setTimeout(function () { return _this._didBackAlready = false; }, 2000);
            return;
        }
        this
            ._plt
            .exitApp();
    };
    HardwareBackButtonService.prototype._presentToast = function (content) {
        var toast = this
            ._toastCtrl
            .create({ message: content, position: 'bottom', duration: 2000 });
        toast.present();
    };
    return HardwareBackButtonService;
}());
export { HardwareBackButtonService };
//# sourceMappingURL=backbutton.js.map