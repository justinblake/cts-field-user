"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
/*
  Generated class for the History page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var HistoryPage = (function () {
    function HistoryPage(navCtrl, navParams, taskMgr, utils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.taskMgr = taskMgr;
        this.utils = utils;
        this.history = '';
        this.user = '';
        this.historyLoaded = false;
    }
    HistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HistoryPage');
    };
    HistoryPage.prototype.ionViewCouldLoad = function () {
        console.log('ionViewWillLoad HistoryPage');
    };
    HistoryPage.prototype.ionViewWillLoad = function () {
        console.log('ionViewWillLoad HistoryPage');
        this.loadHistory();
    };
    /** load history into this view  */
    HistoryPage.prototype.loadHistory = function () {
        var _this = this;
        this.utils.presentLoading();
        this.historyLoaded = false;
        this.taskMgr.getTaskHistory().then(function (response) {
            _this.history = response.taskHistory;
            _this.user = response.userdata;
            _this.historyLoaded = true;
            _this.utils.dismissLoading();
        })["catch"](function (error) {
            _this.utils.dismissLoading();
            setTimeout(function () {
                _this.utils.toastError(error);
            }, 500);
        });
    };
    HistoryPage.prototype.leaveFeedback = function () {
        //console.error('Speaking as a friend, the history.leaveFeedback() hasn\'t been implemented. Just letting you know');
    };
    return HistoryPage;
}());
HistoryPage = __decorate([
    core_1.Component({
        selector: 'page-history',
        templateUrl: 'history.html'
    })
], HistoryPage);
exports.HistoryPage = HistoryPage;
