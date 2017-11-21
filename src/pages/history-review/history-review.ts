import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';

@Component({
    selector: 'page-history-review',
    templateUrl: 'history-review.html'
})

export class HistoryReviewPage {
    data: any;
    files: Array<any> = [];
    type: any = {options: ''};
    isIos: boolean = false;
    public id;
    public logId;
    public fileName;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform) {

        this.id = navParams.get("id");
        this.logId = navParams.get("log_id");
        this.fileName = navParams.get("file_name");
        if (this.platform.is('ios')) {
            this.isIos = true;
        }
    }

    cancel() {
        this.navCtrl.pop();
    }
}
