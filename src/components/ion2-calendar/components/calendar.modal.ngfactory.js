/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
import * as i0 from "@angular/core";
import * as i1 from "ionic-angular/components/icon/icon";
import * as i2 from "ionic-angular/config/config";
import * as i3 from "../../../../node_modules/ionic-angular/components/button/button.ngfactory";
import * as i4 from "ionic-angular/components/button/button";
import * as i5 from "@angular/common";
import * as i6 from "./month.component.ngfactory";
import * as i7 from "./month.component";
import * as i8 from "@angular/forms";
import * as i9 from "ionic-angular/components/toolbar/toolbar-header";
import * as i10 from "ionic-angular/navigation/view-controller";
import * as i11 from "../../../../node_modules/ionic-angular/components/toolbar/navbar.ngfactory";
import * as i12 from "ionic-angular/components/toolbar/navbar";
import * as i13 from "ionic-angular/components/app/app";
import * as i14 from "ionic-angular/navigation/nav-controller";
import * as i15 from "ionic-angular/components/toolbar/toolbar-item";
import * as i16 from "ionic-angular/components/toolbar/toolbar";
import * as i17 from "../../../../node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory";
import * as i18 from "ionic-angular/components/toolbar/toolbar-title";
import * as i19 from "./calendar-week.component.ngfactory";
import * as i20 from "./calendar-week.component";
import * as i21 from "../../../../node_modules/ionic-angular/components/content/content.ngfactory";
import * as i22 from "ionic-angular/components/content/content";
import * as i23 from "ionic-angular/platform/platform";
import * as i24 from "ionic-angular/platform/dom-controller";
import * as i25 from "ionic-angular/platform/keyboard";
import * as i26 from "ionic-angular/components/infinite-scroll/infinite-scroll";
import * as i27 from "../../../../node_modules/ionic-angular/components/infinite-scroll/infinite-scroll-content.ngfactory";
import * as i28 from "ionic-angular/components/infinite-scroll/infinite-scroll-content";
import * as i29 from "./calendar.modal";
import * as i30 from "ionic-angular/navigation/nav-params";
import * as i31 from "../services/calendar.service";
var styles_CalendarModal = [];
var RenderType_CalendarModal = i0.ɵcrt({ encapsulation: 2, styles: styles_CalendarModal, data: {} });
export { RenderType_CalendarModal as RenderType_CalendarModal };
function View_CalendarModal_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.closeLabel; _ck(_v, 1, 0, currVal_0); }); }
function View_CalendarModal_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "ion-icon", [["name", "close"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i0.ɵdid(1, 147456, null, 0, i1.Icon, [i2.Config, i0.ElementRef, i0.Renderer], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "close"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_CalendarModal_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.doneLabel; _ck(_v, 1, 0, currVal_0); }); }
function View_CalendarModal_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "ion-icon", [["name", "checkmark"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i0.ɵdid(1, 147456, null, 0, i1.Icon, [i2.Config, i0.ElementRef, i0.Renderer], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "checkmark"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_CalendarModal_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 8, "button", [["clear", ""], ["icon-only", ""], ["ion-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.done() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i3.View_Button_0, i3.RenderType_Button)), i0.ɵdid(1, 1097728, [[4, 4]], 0, i4.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { clear: [0, "clear"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                        "])), (_l()(), i0.ɵand(16777216, null, 0, 1, null, View_CalendarModal_4)), i0.ɵdid(4, 16384, null, 0, i5.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                        "])), (_l()(), i0.ɵand(16777216, null, 0, 1, null, View_CalendarModal_5)), i0.ɵdid(7, 16384, null, 0, i5.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                    "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = ""; _ck(_v, 1, 0, currVal_1); var currVal_2 = ((_co.doneLabel !== "") && !_co.doneIcon); _ck(_v, 4, 0, currVal_2); var currVal_3 = _co.doneIcon; _ck(_v, 7, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.canDone(); _ck(_v, 0, 0, currVal_0); }); }
function View_CalendarModal_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 13, "div", [["class", "month-box"]], [[1, "id", 0]], null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(2, 0, null, null, 2, "h4", [["class", "text-center month-title"]], null, null, null, null, null)), (_l()(), i0.ɵted(3, null, ["", ""])), i0.ɵppd(4, 2), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(6, 0, null, null, 6, "ion-calendar-month", [], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "onChange"], [null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onChange" === en)) {
        var pd_0 = (_co.onChange($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.datesTemp = $event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, i6.View_MonthComponent_0, i6.RenderType_MonthComponent)), i0.ɵdid(7, 114688, null, 0, i7.MonthComponent, [i0.ChangeDetectorRef], { month: [0, "month"], pickMode: [1, "pickMode"], isSaveHistory: [2, "isSaveHistory"], id: [3, "id"], color: [4, "color"] }, { onChange: "onChange" }), i0.ɵprd(1024, null, i8.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i7.MonthComponent]), i0.ɵdid(9, 671744, null, 0, i8.NgModel, [[8, null], [8, null], [8, null], [2, i8.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i8.NgControl, null, [i8.NgModel]), i0.ɵdid(11, 16384, null, 0, i8.NgControlStatus, [i8.NgControl], null, null), (_l()(), i0.ɵted(-1, null, ["\n\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_9 = _v.context.$implicit; var currVal_10 = _co.options.pickMode; var currVal_11 = _co.isSaveHistory; var currVal_12 = _co._id; var currVal_13 = _co._color; _ck(_v, 7, 0, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13); var currVal_14 = _co.datesTemp; _ck(_v, 9, 0, currVal_14); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ("month-" + _v.context.index); _ck(_v, 0, 0, currVal_0); var currVal_1 = i0.ɵunv(_v, 3, 0, _ck(_v, 4, 0, i0.ɵnov(_v.parent, 0), _v.context.$implicit.original.date, _co.monthFormatFilterStr)); _ck(_v, 3, 0, currVal_1); var currVal_2 = i0.ɵnov(_v, 11).ngClassUntouched; var currVal_3 = i0.ɵnov(_v, 11).ngClassTouched; var currVal_4 = i0.ɵnov(_v, 11).ngClassPristine; var currVal_5 = i0.ɵnov(_v, 11).ngClassDirty; var currVal_6 = i0.ɵnov(_v, 11).ngClassValid; var currVal_7 = i0.ɵnov(_v, 11).ngClassInvalid; var currVal_8 = i0.ɵnov(_v, 11).ngClassPending; _ck(_v, 6, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
export function View_CalendarModal_0(_l) { return i0.ɵvid(0, [i0.ɵpid(0, i5.DatePipe, [i0.LOCALE_ID]), i0.ɵqud(402653184, 1, { content: 0 }), i0.ɵqud(402653184, 2, { monthsEle: 0 }), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(4, 0, null, null, 42, "ion-header", [], null, null, null, null, null)), i0.ɵdid(5, 16384, null, 0, i9.Header, [i2.Config, i0.ElementRef, i0.Renderer, [2, i10.ViewController]], null, null), (_l()(), i0.ɵted(-1, null, ["\n\n            "])), (_l()(), i0.ɵeld(7, 0, null, null, 34, "ion-navbar", [["class", "toolbar"]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, i11.View_Navbar_0, i11.RenderType_Navbar)), i0.ɵdid(8, 49152, null, 0, i12.Navbar, [i13.App, [2, i10.ViewController], [2, i14.NavController], i2.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"] }, null), (_l()(), i0.ɵted(-1, 3, ["\n\n                "])), (_l()(), i0.ɵted(-1, 3, ["\n                "])), (_l()(), i0.ɵted(-1, 3, ["\n                "])), (_l()(), i0.ɵted(-1, 3, ["\n                "])), (_l()(), i0.ɵted(-1, 3, ["\n                "])), (_l()(), i0.ɵted(-1, 3, ["\n\n                "])), (_l()(), i0.ɵeld(15, 0, null, 2, 13, "ion-buttons", [["end", ""]], null, null, null, null, null)), i0.ɵdid(16, 16384, null, 1, i15.ToolbarItem, [i2.Config, i0.ElementRef, i0.Renderer, [2, i16.Toolbar], [2, i12.Navbar]], null, null), i0.ɵqud(603979776, 3, { _buttons: 1 }), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(19, 0, null, null, 8, "button", [["clear", ""], ["icon-only", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onCancel() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i3.View_Button_0, i3.RenderType_Button)), i0.ɵdid(20, 1097728, [[3, 4]], 0, i4.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { clear: [0, "clear"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                        "])), (_l()(), i0.ɵand(16777216, null, 0, 1, null, View_CalendarModal_1)), i0.ɵdid(23, 16384, null, 0, i5.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                        "])), (_l()(), i0.ɵand(16777216, null, 0, 1, null, View_CalendarModal_2)), i0.ɵdid(26, 16384, null, 0, i5.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵted(-1, 3, ["\n\n                "])), (_l()(), i0.ɵeld(30, 0, null, 3, 2, "ion-title", [], null, null, null, i17.View_ToolbarTitle_0, i17.RenderType_ToolbarTitle)), i0.ɵdid(31, 49152, null, 0, i18.ToolbarTitle, [i2.Config, i0.ElementRef, i0.Renderer, [2, i16.Toolbar], [2, i12.Navbar]], null, null), (_l()(), i0.ɵted(32, 0, ["", ""])), (_l()(), i0.ɵted(-1, 3, ["\n\n                "])), (_l()(), i0.ɵeld(34, 0, null, 2, 6, "ion-buttons", [["end", ""]], null, null, null, null, null)), i0.ɵdid(35, 16384, null, 1, i15.ToolbarItem, [i2.Config, i0.ElementRef, i0.Renderer, [2, i16.Toolbar], [2, i12.Navbar]], null, null), i0.ɵqud(603979776, 4, { _buttons: 1 }), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_CalendarModal_3)), i0.ɵdid(39, 16384, null, 0, i5.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n\n                "])), (_l()(), i0.ɵted(-1, 3, ["\n\n            "])), (_l()(), i0.ɵted(-1, null, ["\n\n            "])), (_l()(), i0.ɵeld(43, 0, null, null, 2, "ion-calendar-week", [], null, null, null, i19.View_CalendarWeekComponent_0, i19.RenderType_CalendarWeekComponent)), i0.ɵdid(44, 49152, null, 0, i20.CalendarWeekComponent, [], { color: [0, "color"], weekArray: [1, "weekArray"], weekStart: [2, "weekStart"] }, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n\n        "])), (_l()(), i0.ɵted(-1, null, ["\n\n        "])), (_l()(), i0.ɵeld(48, 0, null, null, 17, "ion-content", [["class", "calendar-page"]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], [[null, "ionScroll"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionScroll" === en)) {
        var pd_0 = (_co.onScroll($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i21.View_Content_0, i21.RenderType_Content)), i0.ɵdid(49, 278528, null, 0, i5.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(50, { "multi-selection": 0 }), i0.ɵdid(51, 4374528, [[1, 4]], 0, i22.Content, [i2.Config, i23.Platform, i24.DomController, i0.ElementRef, i0.Renderer, i13.App, i25.Keyboard, i0.NgZone, [2, i10.ViewController], [2, i14.NavController]], null, { ionScroll: "ionScroll" }), (_l()(), i0.ɵted(-1, 1, ["\n\n            "])), (_l()(), i0.ɵeld(53, 0, [[2, 0], ["months", 1]], 1, 4, "div", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_CalendarModal_6)), i0.ɵdid(56, 802816, null, 0, i5.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, 1, ["\n\n            "])), (_l()(), i0.ɵeld(59, 0, null, 1, 5, "ion-infinite-scroll", [], null, [[null, "ionInfinite"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionInfinite" === en)) {
        var pd_0 = (_co.nextMonth($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(60, 1196032, null, 0, i26.InfiniteScroll, [i22.Content, i0.NgZone, i0.ElementRef, i24.DomController], null, { ionInfinite: "ionInfinite" }), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵeld(62, 0, null, null, 1, "ion-infinite-scroll-content", [], [[1, "state", 0]], null, null, i27.View_InfiniteScrollContent_0, i27.RenderType_InfiniteScrollContent)), i0.ɵdid(63, 114688, null, 0, i28.InfiniteScrollContent, [i26.InfiniteScroll, i2.Config], null, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, 1, ["\n\n        "])), (_l()(), i0.ɵted(-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co._color; _ck(_v, 8, 0, currVal_2); var currVal_3 = ""; _ck(_v, 20, 0, currVal_3); var currVal_4 = ((_co.closeLabel !== "") && !_co.closeIcon); _ck(_v, 23, 0, currVal_4); var currVal_5 = _co.closeIcon; _ck(_v, 26, 0, currVal_5); var currVal_7 = !_co._d.autoDone; _ck(_v, 39, 0, currVal_7); var currVal_8 = _co._color; var currVal_9 = _co.weekdays; var currVal_10 = _co.weekStart; _ck(_v, 44, 0, currVal_8, currVal_9, currVal_10); var currVal_13 = "calendar-page"; var currVal_14 = _ck(_v, 50, 0, (_co.options.pickMode === "multi")); _ck(_v, 49, 0, currVal_13, currVal_14); var currVal_15 = _co.calendarMonths; _ck(_v, 56, 0, currVal_15); _ck(_v, 63, 0); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵnov(_v, 8)._hidden; var currVal_1 = i0.ɵnov(_v, 8)._sbPadding; _ck(_v, 7, 0, currVal_0, currVal_1); var currVal_6 = _co.title; _ck(_v, 32, 0, currVal_6); var currVal_11 = i0.ɵnov(_v, 51).statusbarPadding; var currVal_12 = i0.ɵnov(_v, 51)._hasRefresher; _ck(_v, 48, 0, currVal_11, currVal_12); var currVal_16 = i0.ɵnov(_v, 63).inf.state; _ck(_v, 62, 0, currVal_16); }); }
export function View_CalendarModal_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "ion-calendar-modal", [], null, null, null, View_CalendarModal_0, RenderType_CalendarModal)), i0.ɵdid(1, 49152, null, 0, i29.CalendarModal, [i0.Renderer, i0.ElementRef, i30.NavParams, i10.ViewController, i0.ChangeDetectorRef, i31.CalendarService, i23.Platform], null, null)], null, null); }
var CalendarModalNgFactory = i0.ɵccf("ion-calendar-modal", i29.CalendarModal, View_CalendarModal_Host_0, {}, {}, []);
export { CalendarModalNgFactory as CalendarModalNgFactory };
//# sourceMappingURL=calendar.modal.ngfactory.js.map