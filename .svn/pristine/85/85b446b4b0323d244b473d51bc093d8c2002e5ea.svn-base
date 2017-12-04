import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
//import { Utils } from '../../utils/utils';

@Component({
    selector: 'page-reject-notes',
    templateUrl: 'reject-notes.html'
})
export class RejectNotesPage {
    data: any = {notes: '', save: false};
    valid: boolean = false;
    lastCheck: number = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        this.lastCheck = new Date().getTime();
    }

    /** used to enable/disable the submit button */
    checkNotes() {
        // return true if trimmed notes are longer than 6
        return this.data.notes.trim().length < 6;
    }

    /** trim spaces from notes */
    trimNotes() {
        this.data.notes = this.data.notes.trim();
    }

    /** save button clicked */
    save() {
        this.data.save = true;
        this.data.notes = this.data.notes.trim();
        this.viewCtrl.dismiss(this.data)
    }

    /** cancel button clicked */
    cancel() {
        this.data.save = false;
        this.viewCtrl.dismiss(this.data)
    }

}
