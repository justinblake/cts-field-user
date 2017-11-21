"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
//import { Utils } from '../../utils/utils';
var RejectNotesPage = (function () {
    function RejectNotesPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.data = { notes: '', save: false };
        this.valid = false;
        this.lastCheck = null;
    }
    RejectNotesPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad RejectNotesPage');
        this.lastCheck = new Date().getTime();
    };
    /** used to enable/disable the submit button */
    RejectNotesPage.prototype.checkNotes = function () {
        // return true if trimmed notes are longer than 10
        return this.data.notes.trim().length < 10;
    };
    /** trim spaces from notes */
    RejectNotesPage.prototype.trimNotes = function () {
        this.data.notes = this.data.notes.trim();
    };
    /** save button clicked */
    RejectNotesPage.prototype.save = function () {
        this.data.save = true;
        this.data.notes = this.data.notes.trim();
        this.viewCtrl.dismiss(this.data);
    };
    /** cancel button clicked */
    RejectNotesPage.prototype.cancel = function () {
        this.data.save = false;
        this.viewCtrl.dismiss(this.data);
    };
    return RejectNotesPage;
}());
RejectNotesPage = __decorate([
    core_1.Component({
        selector: 'page-reject-notes',
        templateUrl: 'reject-notes.html'
    })
], RejectNotesPage);
exports.RejectNotesPage = RejectNotesPage;
