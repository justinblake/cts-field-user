import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
//import { Utils } from '../../utils/utils';
var 
//import { Utils } from '../../utils/utils';
RejectNotesPage = /** @class */ (function () {
    function RejectNotesPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    RejectNotesPage.prototype.ionViewDidLoad = function () {
        this.lastCheck = new Date().getTime();
    };
    /** used to enable/disable the submit button */
    /** used to enable/disable the submit button */
    RejectNotesPage.prototype.checkNotes = /** used to enable/disable the submit button */
    function () {
        // return true if trimmed notes are longer than 6
        return this.data.notes.trim().length < 6;
    };
    /** trim spaces from notes */
    /** trim spaces from notes */
    RejectNotesPage.prototype.trimNotes = /** trim spaces from notes */
    function () {
        this.data.notes = this.data.notes.trim();
    };
    /** save button clicked */
    /** save button clicked */
    RejectNotesPage.prototype.save = /** save button clicked */
    function () {
        this.data.save = true;
        this.data.notes = this.data.notes.trim();
        this.viewCtrl.dismiss(this.data);
    };
    /** cancel button clicked */
    /** cancel button clicked */
    RejectNotesPage.prototype.cancel = /** cancel button clicked */
    function () {
        this.data.save = false;
        this.viewCtrl.dismiss(this.data);
    };
    return RejectNotesPage;
}());
//import { Utils } from '../../utils/utils';
export { RejectNotesPage };
//# sourceMappingURL=reject-notes.js.map