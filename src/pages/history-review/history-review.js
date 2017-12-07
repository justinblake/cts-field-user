import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
var HistoryReviewPage = /** @class */ (function () {
    function HistoryReviewPage(navCtrl, navParams, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.id = navParams.get("id");
        this.logId = navParams.get("log_id");
        this.fileName = navParams.get("file_name");
        if (this.platform.is('ios')) {
            this.isIos = true;
        }
    }
    HistoryReviewPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    return HistoryReviewPage;
}());
export { HistoryReviewPage };
//# sourceMappingURL=history-review.js.map