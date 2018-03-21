import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

const MAX_SCALE = 3.0;
const MIN_SCALE = 0.5;
const BASE_SCALE = 1.0;

@Component({
    selector: 'page-task-photo-review',
    templateUrl: 'task-photo-review.html'
})

export class TaskPhotoReviewPage {

    public maxWidth = `${BASE_SCALE * 100}%`;
    private scale = BASE_SCALE;
    private alreadyScaled = BASE_SCALE;
    private isScaling = false;
    public imageUrl;
    public notes;
    paddingRight: string = '0px';
    file_type: any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams) {

        this.imageUrl = navParams.get("file_name");
        this.notes = navParams.get("notes");
        this.file_type = navParams.get("file_type");
    }



    public onPinchStart(e) {
        // flag that sets the class to disable scrolling
        this.isScaling = true;
    }

    // called at (pinchend) and (pinchcancel)
    public onPinchEnd(e) {
        // flip the flag, enable scrolling
        this.isScaling = false;
        // adjust the amount we already scaled
        this.alreadyScaled = this.scale * this.alreadyScaled;
    }

    public onPinchMove(e) {
        // set the scale so we can track it globally
        this.scale = e.scale;
        // total amount we scaled
        let totalScaled = this.alreadyScaled * e.scale;
        // did we hit the max scale (pinch out)
        if (totalScaled >= MAX_SCALE) {
            // fix the scale by calculating it, don't use the e.scale
            // scenario: an insane quick pinch out will offset the this.scale
            this.scale = MAX_SCALE / this.alreadyScaled;
            totalScaled = MAX_SCALE;
            // did we hit the min scale (pinch in)
        } else if (totalScaled <= MIN_SCALE) {
            // fix the scale
            this.scale = MIN_SCALE / this.alreadyScaled;
            totalScaled = MIN_SCALE;
        }

        let fontSize = Math.round(totalScaled * 10) / 10;

        // change the fontsize every 3 decimals in scale change
        if ((fontSize * 10) % 2 === 0) {

            // update the fontsize
            this.maxWidth = `${fontSize * 100}%`;
        }

        if (this.maxWidth !== '100%') {
            this.paddingRight = '16px';
        } else if ( this.maxWidth === '100%') {
            this.paddingRight = '0px';
        }

    }

}
