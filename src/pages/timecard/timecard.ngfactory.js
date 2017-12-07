/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
import * as i0 from "@angular/core";
import * as i1 from "ionic-angular/components/grid/row";
import * as i2 from "ionic-angular/components/grid/col";
import * as i3 from "ionic-angular/components/toolbar/toolbar-item";
import * as i4 from "ionic-angular/config/config";
import * as i5 from "ionic-angular/components/toolbar/toolbar";
import * as i6 from "ionic-angular/components/toolbar/navbar";
import * as i7 from "../../../node_modules/ionic-angular/components/button/button.ngfactory";
import * as i8 from "ionic-angular/components/button/button";
import * as i9 from "ionic-angular/components/icon/icon";
import * as i10 from "../../../node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory";
import * as i11 from "ionic-angular/components/toolbar/toolbar-title";
import * as i12 from "ionic-angular/components/card/card-content";
import * as i13 from "../../../node_modules/ionic-angular/components/item/item.ngfactory";
import * as i14 from "ionic-angular/components/item/item";
import * as i15 from "ionic-angular/util/form";
import * as i16 from "ionic-angular/components/item/item-reorder";
import * as i17 from "ionic-angular/components/item/item-content";
import * as i18 from "ionic-angular/components/label/label";
import * as i19 from "@angular/common";
import * as i20 from "../../../node_modules/ionic-angular/components/datetime/datetime.ngfactory";
import * as i21 from "ionic-angular/components/datetime/datetime";
import * as i22 from "ionic-angular/components/picker/picker-controller";
import * as i23 from "@angular/forms";
import * as i24 from "../../../node_modules/ionic-angular/components/input/input.ngfactory";
import * as i25 from "ionic-angular/components/input/input";
import * as i26 from "ionic-angular/platform/platform";
import * as i27 from "ionic-angular/components/app/app";
import * as i28 from "ionic-angular/components/content/content";
import * as i29 from "ionic-angular/platform/dom-controller";
import * as i30 from "ionic-angular/components/list/list";
import * as i31 from "ionic-angular/gestures/gesture-controller";
import * as i32 from "ionic-angular/components/toolbar/toolbar-header";
import * as i33 from "ionic-angular/navigation/view-controller";
import * as i34 from "../../../node_modules/ionic-angular/components/toolbar/navbar.ngfactory";
import * as i35 from "ionic-angular/navigation/nav-controller";
import * as i36 from "../../../node_modules/ionic-angular/components/content/content.ngfactory";
import * as i37 from "ionic-angular/platform/keyboard";
import * as i38 from "ionic-angular/components/card/card";
import * as i39 from "ionic-angular/components/card/card-header";
import * as i40 from "./timecard";
import * as i41 from "ionic-angular/navigation/nav-params";
import * as i42 from "../../providers/user-manager";
import * as i43 from "../../providers/task-manager";
import * as i44 from "../../utils/utils";
import * as i45 from "ionic-angular/components/alert/alert-controller";
import * as i46 from "../../providers/conversion-manager";
import * as i47 from "@ionic-native/fcm/index";
var styles_TimecardPage = [];
var RenderType_TimecardPage = i0.ɵcrt({ encapsulation: 2, styles: styles_TimecardPage, data: {} });
export { RenderType_TimecardPage as RenderType_TimecardPage };
function View_TimecardPage_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 28, "ion-row", [["class", "row"]], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i1.Row, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(3, 0, null, null, 8, "ion-col", [["class", "col"], ["width-50", ""]], null, null, null, null, null)), i0.ɵdid(4, 16384, null, 0, i2.Col, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵeld(6, 0, null, null, 4, "div", [["text-center", ""]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(8, 0, null, null, 1, "div", [["class", "ios-title"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                        Timecard\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(13, 0, null, null, 14, "ion-col", [["class", "col"], ["width-25", ""]], null, null, null, null, null)), i0.ɵdid(14, 16384, null, 0, i2.Col, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵeld(16, 0, null, null, 10, "ion-buttons", [["class", "mar-right6"], ["end", ""]], null, null, null, null, null)), i0.ɵdid(17, 16384, null, 1, i3.ToolbarItem, [i4.Config, i0.ElementRef, i0.Renderer, [2, i5.Toolbar], [2, i6.Navbar]], null, null), i0.ɵqud(603979776, 2, { _buttons: 1 }), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(20, 0, null, null, 5, "button", [["class", "refresh"], ["color", "secondary"], ["icon-right", ""], ["ion-button", ""], ["round", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.loadTodaysTime() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i7.View_Button_0, i7.RenderType_Button)), i0.ɵdid(21, 1097728, [[2, 4]], 0, i8.Button, [[8, ""], i4.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"], round: [1, "round"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                        Refresh\n                        "])), (_l()(), i0.ɵeld(23, 0, null, 0, 1, "ion-icon", [["class", "logout-hide"], ["name", "refresh"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i0.ɵdid(24, 147456, null, 0, i9.Icon, [i4.Config, i0.ElementRef, i0.Renderer], { name: [0, "name"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = "secondary"; var currVal_1 = ""; _ck(_v, 21, 0, currVal_0, currVal_1); var currVal_3 = "refresh"; _ck(_v, 24, 0, currVal_3); }, function (_ck, _v) { var currVal_2 = i0.ɵnov(_v, 24)._hidden; _ck(_v, 23, 0, currVal_2); }); }
function View_TimecardPage_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 18, "ion-row", [["class", "row"]], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i1.Row, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(3, 0, null, null, 2, "ion-title", [], null, null, null, i10.View_ToolbarTitle_0, i10.RenderType_ToolbarTitle)), i0.ɵdid(4, 49152, null, 0, i11.ToolbarTitle, [i4.Config, i0.ElementRef, i0.Renderer, [2, i5.Toolbar], [2, i6.Navbar]], null, null), (_l()(), i0.ɵted(-1, 0, ["Timecard"])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(7, 0, null, null, 10, "ion-buttons", [["class", "mar-right6"], ["end", ""]], null, null, null, null, null)), i0.ɵdid(8, 16384, null, 1, i3.ToolbarItem, [i4.Config, i0.ElementRef, i0.Renderer, [2, i5.Toolbar], [2, i6.Navbar]], null, null), i0.ɵqud(603979776, 3, { _buttons: 1 }), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵeld(11, 0, null, null, 5, "button", [["class", "refresh"], ["color", "secondary"], ["icon-right", ""], ["ion-button", ""], ["round", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.loadTodaysTime() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i7.View_Button_0, i7.RenderType_Button)), i0.ɵdid(12, 1097728, [[3, 4]], 0, i8.Button, [[8, ""], i4.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"], round: [1, "round"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                    Refresh\n                    "])), (_l()(), i0.ɵeld(14, 0, null, 0, 1, "ion-icon", [["name", "refresh"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i0.ɵdid(15, 147456, null, 0, i9.Icon, [i4.Config, i0.ElementRef, i0.Renderer], { name: [0, "name"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                "])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = "secondary"; var currVal_1 = ""; _ck(_v, 12, 0, currVal_0, currVal_1); var currVal_3 = "refresh"; _ck(_v, 15, 0, currVal_3); }, function (_ck, _v) { var currVal_2 = i0.ɵnov(_v, 15)._hidden; _ck(_v, 14, 0, currVal_2); }); }
function View_TimecardPage_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "ion-card-content", [], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i12.CardContent, [i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(3, 0, null, null, 1, "h3", [["class", "noEntries"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["No Current Timecard Entries"])), (_l()(), i0.ɵted(-1, null, ["\n        "]))], null, null); }
function View_TimecardPage_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Clocked Out"]))], null, null); }
function View_TimecardPage_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 21, "ion-item", [["class", "o item item-block"]], null, null, null, i13.View_Item_0, i13.RenderType_Item)), i0.ɵdid(1, 1097728, null, 3, i14.Item, [i15.Form, i4.Config, i0.ElementRef, i0.Renderer, [2, i16.ItemReorder]], null, null), i0.ɵqud(335544320, 4, { contentLabel: 0 }), i0.ɵqud(603979776, 5, { _buttons: 1 }), i0.ɵqud(603979776, 6, { _icons: 1 }), i0.ɵdid(5, 16384, null, 0, i17.ItemContent, [], null, null), (_l()(), i0.ɵted(-1, 2, ["\n                                "])), (_l()(), i0.ɵeld(7, 0, null, 1, 5, "ion-label", [], null, null, null, null, null)), i0.ɵdid(8, 16384, [[4, 4]], 0, i18.Label, [i4.Config, i0.ElementRef, i0.Renderer, [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), i0.ɵted(-1, null, ["\n                                    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TimecardPage_7)), i0.ɵdid(11, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                                "])), (_l()(), i0.ɵted(-1, 2, ["\n                                "])), (_l()(), i0.ɵeld(14, 0, null, 3, 6, "ion-datetime", [["displayFormat", "h:mm a"], ["pickerFormat", "h mm A"]], [[2, "datetime-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (i0.ɵnov(_v, 15)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (i0.ɵnov(_v, 15)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.todaysTime[_v.parent.context.index].alt_timestamp = $event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, i20.View_DateTime_0, i20.RenderType_DateTime)), i0.ɵdid(15, 1228800, null, 0, i21.DateTime, [i15.Form, i4.Config, i0.ElementRef, i0.Renderer, [2, i14.Item], [2, i22.PickerController]], { displayFormat: [0, "displayFormat"], pickerFormat: [1, "pickerFormat"] }, null), i0.ɵprd(1024, null, i23.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i21.DateTime]), i0.ɵdid(17, 671744, null, 0, i23.NgModel, [[8, null], [8, null], [8, null], [2, i23.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i23.NgControl, null, [i23.NgModel]), i0.ɵdid(19, 16384, null, 0, i23.NgControlStatus, [i23.NgControl], null, null), (_l()(), i0.ɵted(-1, null, ["\n                                "])), (_l()(), i0.ɵted(-1, 2, ["\n                            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.parent.context.$implicit.status === 0); _ck(_v, 11, 0, currVal_0); var currVal_9 = "h:mm a"; var currVal_10 = "h mm A"; _ck(_v, 15, 0, currVal_9, currVal_10); var currVal_11 = _co.todaysTime[_v.parent.context.index].alt_timestamp; _ck(_v, 17, 0, currVal_11); }, function (_ck, _v) { var currVal_1 = i0.ɵnov(_v, 15)._disabled; var currVal_2 = i0.ɵnov(_v, 19).ngClassUntouched; var currVal_3 = i0.ɵnov(_v, 19).ngClassTouched; var currVal_4 = i0.ɵnov(_v, 19).ngClassPristine; var currVal_5 = i0.ɵnov(_v, 19).ngClassDirty; var currVal_6 = i0.ɵnov(_v, 19).ngClassValid; var currVal_7 = i0.ɵnov(_v, 19).ngClassInvalid; var currVal_8 = i0.ɵnov(_v, 19).ngClassPending; _ck(_v, 14, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_TimecardPage_9(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Clocked In"]))], null, null); }
function View_TimecardPage_8(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 21, "ion-item", [["class", "e item item-block"]], null, null, null, i13.View_Item_0, i13.RenderType_Item)), i0.ɵdid(1, 1097728, null, 3, i14.Item, [i15.Form, i4.Config, i0.ElementRef, i0.Renderer, [2, i16.ItemReorder]], null, null), i0.ɵqud(335544320, 7, { contentLabel: 0 }), i0.ɵqud(603979776, 8, { _buttons: 1 }), i0.ɵqud(603979776, 9, { _icons: 1 }), i0.ɵdid(5, 16384, null, 0, i17.ItemContent, [], null, null), (_l()(), i0.ɵted(-1, 2, ["\n                                "])), (_l()(), i0.ɵeld(7, 0, null, 1, 5, "ion-label", [], null, null, null, null, null)), i0.ɵdid(8, 16384, [[7, 4]], 0, i18.Label, [i4.Config, i0.ElementRef, i0.Renderer, [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), i0.ɵted(-1, null, ["\n                                    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TimecardPage_9)), i0.ɵdid(11, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                                "])), (_l()(), i0.ɵted(-1, 2, ["\n                                "])), (_l()(), i0.ɵeld(14, 0, null, 3, 6, "ion-datetime", [["displayFormat", "h:mm a"], ["pickerFormat", "h mm A"]], [[2, "datetime-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (i0.ɵnov(_v, 15)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (i0.ɵnov(_v, 15)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.todaysTime[_v.parent.context.index].alt_timestamp = $event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, i20.View_DateTime_0, i20.RenderType_DateTime)), i0.ɵdid(15, 1228800, null, 0, i21.DateTime, [i15.Form, i4.Config, i0.ElementRef, i0.Renderer, [2, i14.Item], [2, i22.PickerController]], { displayFormat: [0, "displayFormat"], pickerFormat: [1, "pickerFormat"] }, null), i0.ɵprd(1024, null, i23.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i21.DateTime]), i0.ɵdid(17, 671744, null, 0, i23.NgModel, [[8, null], [8, null], [8, null], [2, i23.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i23.NgControl, null, [i23.NgModel]), i0.ɵdid(19, 16384, null, 0, i23.NgControlStatus, [i23.NgControl], null, null), (_l()(), i0.ɵted(-1, null, ["\n                                "])), (_l()(), i0.ɵted(-1, 2, ["\n                            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.parent.context.$implicit.status === 1); _ck(_v, 11, 0, currVal_0); var currVal_9 = "h:mm a"; var currVal_10 = "h mm A"; _ck(_v, 15, 0, currVal_9, currVal_10); var currVal_11 = _co.todaysTime[_v.parent.context.index].alt_timestamp; _ck(_v, 17, 0, currVal_11); }, function (_ck, _v) { var currVal_1 = i0.ɵnov(_v, 15)._disabled; var currVal_2 = i0.ɵnov(_v, 19).ngClassUntouched; var currVal_3 = i0.ɵnov(_v, 19).ngClassTouched; var currVal_4 = i0.ɵnov(_v, 19).ngClassPristine; var currVal_5 = i0.ɵnov(_v, 19).ngClassDirty; var currVal_6 = i0.ɵnov(_v, 19).ngClassValid; var currVal_7 = i0.ɵnov(_v, 19).ngClassInvalid; var currVal_8 = i0.ɵnov(_v, 19).ngClassPending; _ck(_v, 14, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_TimecardPage_10(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "ion-buttons", [], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 1, i3.ToolbarItem, [i4.Config, i0.ElementRef, i0.Renderer, [2, i5.Toolbar], [2, i6.Navbar]], null, null), i0.ɵqud(603979776, 13, { _buttons: 1 }), (_l()(), i0.ɵted(-1, null, ["\n                                "])), (_l()(), i0.ɵeld(4, 0, null, null, 2, "button", [["block", ""], ["color", "danger"], ["ion-button", ""], ["small", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.loadTodaysTime() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i7.View_Button_0, i7.RenderType_Button)), i0.ɵdid(5, 1097728, [[13, 4]], 0, i8.Button, [[8, ""], i4.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"], small: [1, "small"], block: [2, "block"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                                    Discard Changes\n                                "])), (_l()(), i0.ɵted(-1, null, ["\n                            "]))], function (_ck, _v) { var currVal_0 = "danger"; var currVal_1 = ""; var currVal_2 = ""; _ck(_v, 5, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_TimecardPage_11(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "ion-buttons", [], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 1, i3.ToolbarItem, [i4.Config, i0.ElementRef, i0.Renderer, [2, i5.Toolbar], [2, i6.Navbar]], null, null), i0.ɵqud(603979776, 14, { _buttons: 1 }), (_l()(), i0.ɵted(-1, null, ["\n                                "])), (_l()(), i0.ɵeld(4, 0, null, null, 2, "button", [["block", ""], ["color", "secondary"], ["ion-button", ""], ["small", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.updateTodaysTimecard(_co.todaysTime[_v.parent.context.index].id, _co.todaysTime[_v.parent.context.index].alt_timestamp, _v.parent.context.index, _co.todaysTime[_v.parent.context.index].notes) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i7.View_Button_0, i7.RenderType_Button)), i0.ɵdid(5, 1097728, [[14, 4]], 0, i8.Button, [[8, ""], i4.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"], small: [1, "small"], block: [2, "block"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                                    Save Changes\n                                "])), (_l()(), i0.ɵted(-1, null, ["\n                            "]))], function (_ck, _v) { var currVal_0 = "secondary"; var currVal_1 = ""; var currVal_2 = ""; _ck(_v, 5, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_TimecardPage_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 49, "div", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(2, 0, null, null, 14, "ion-row", [["class", "row"]], null, null, null, null, null)), i0.ɵdid(3, 278528, null, 0, i19.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵpod(4, { first: 0 }), i0.ɵdid(5, 16384, null, 0, i1.Row, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(7, 0, null, null, 8, "ion-col", [["class", "col"], ["width-100", ""]], null, null, null, null, null)), i0.ɵdid(8, 16384, null, 0, i2.Col, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TimecardPage_6)), i0.ɵdid(11, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TimecardPage_8)), i0.ɵdid(14, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(18, 0, null, null, 12, "ion-item", [["class", "notes item item-block"]], null, null, null, i13.View_Item_0, i13.RenderType_Item)), i0.ɵdid(19, 1097728, null, 3, i14.Item, [i15.Form, i4.Config, i0.ElementRef, i0.Renderer, [2, i16.ItemReorder]], null, null), i0.ɵqud(335544320, 10, { contentLabel: 0 }), i0.ɵqud(603979776, 11, { _buttons: 1 }), i0.ɵqud(603979776, 12, { _icons: 1 }), i0.ɵdid(23, 16384, null, 0, i17.ItemContent, [], null, null), (_l()(), i0.ɵted(-1, 2, ["\n                        "])), (_l()(), i0.ɵeld(25, 0, null, 3, 4, "ion-input", [["class", "mar0"], ["clearInput", ""], ["placeholder", "Notes"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.todaysTime[_v.context.index].notes = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i24.View_TextInput_0, i24.RenderType_TextInput)), i0.ɵdid(26, 671744, null, 0, i23.NgModel, [[8, null], [8, null], [8, null], [8, null]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i23.NgControl, null, [i23.NgModel]), i0.ɵdid(28, 16384, null, 0, i23.NgControlStatus, [i23.NgControl], null, null), i0.ɵdid(29, 5423104, null, 0, i25.TextInput, [i4.Config, i26.Platform, i15.Form, i27.App, i0.ElementRef, i0.Renderer, [2, i28.Content], [2, i14.Item], [2, i23.NgControl], i29.DomController], { clearInput: [0, "clearInput"], placeholder: [1, "placeholder"] }, null), (_l()(), i0.ɵted(-1, 2, ["\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n\n                    "])), (_l()(), i0.ɵeld(32, 0, null, null, 16, "ion-row", [["class", "btn-margin row"]], null, null, null, null, null)), i0.ɵdid(33, 16384, null, 0, i1.Row, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(35, 0, null, null, 5, "ion-col", [["class", "col"], ["width-50", ""]], null, null, null, null, null)), i0.ɵdid(36, 16384, null, 0, i2.Col, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TimecardPage_10)), i0.ɵdid(39, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(42, 0, null, null, 5, "ion-col", [["class", "col"], ["width-50", ""]], null, null, null, null, null)), i0.ɵdid(43, 16384, null, 0, i2.Col, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TimecardPage_11)), i0.ɵdid(46, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 4, 0, _v.context.first); _ck(_v, 3, 0, currVal_0); var currVal_1 = (_v.context.$implicit.status === 0); _ck(_v, 11, 0, currVal_1); var currVal_2 = (_v.context.$implicit.status === 1); _ck(_v, 14, 0, currVal_2); var currVal_10 = _co.todaysTime[_v.context.index].notes; _ck(_v, 26, 0, currVal_10); var currVal_11 = ""; var currVal_12 = "Notes"; _ck(_v, 29, 0, currVal_11, currVal_12); var currVal_13 = ((_co.todaysTime[_v.context.index].alt_timestamp !== _co.todaysTime[_v.context.index].timestamp) || (_co.todaysTime[_v.context.index].originalNotes !== _co.todaysTime[_v.context.index].notes)); _ck(_v, 39, 0, currVal_13); var currVal_14 = ((_co.todaysTime[_v.context.index].alt_timestamp !== _co.todaysTime[_v.context.index].timestamp) || (_co.todaysTime[_v.context.index].originalNotes !== _co.todaysTime[_v.context.index].notes)); _ck(_v, 46, 0, currVal_14); }, function (_ck, _v) { var currVal_3 = i0.ɵnov(_v, 28).ngClassUntouched; var currVal_4 = i0.ɵnov(_v, 28).ngClassTouched; var currVal_5 = i0.ɵnov(_v, 28).ngClassPristine; var currVal_6 = i0.ɵnov(_v, 28).ngClassDirty; var currVal_7 = i0.ɵnov(_v, 28).ngClassValid; var currVal_8 = i0.ɵnov(_v, 28).ngClassInvalid; var currVal_9 = i0.ɵnov(_v, 28).ngClassPending; _ck(_v, 25, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
function View_TimecardPage_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 9, "ion-card-content", [], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i12.CardContent, [i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(3, 0, null, null, 5, "ion-list", [["class", "first-list"]], null, null, null, null, null)), i0.ɵdid(4, 16384, null, 0, i30.List, [i4.Config, i0.ElementRef, i0.Renderer, i26.Platform, i31.GestureController, i29.DomController], null, null), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TimecardPage_5)), i0.ɵdid(7, 802816, null, 0, i19.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.todaysTime; _ck(_v, 7, 0, currVal_0); }, null); }
export function View_TimecardPage_0(_l) { return i0.ɵvid(0, [i0.ɵqud(402653184, 1, { content: 0 }), (_l()(), i0.ɵeld(1, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), i0.ɵdid(2, 16384, null, 0, i32.Header, [i4.Config, i0.ElementRef, i0.Renderer, [2, i33.ViewController]], null, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(4, 0, null, null, 8, "ion-navbar", [["class", "toolbar"]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, i34.View_Navbar_0, i34.RenderType_Navbar)), i0.ɵdid(5, 49152, null, 0, i6.Navbar, [i27.App, [2, i33.ViewController], [2, i35.NavController], i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, 3, ["\n        "])), (_l()(), i0.ɵand(16777216, null, 3, 1, null, View_TimecardPage_1)), i0.ɵdid(8, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, 3, ["\n        "])), (_l()(), i0.ɵand(16777216, null, 3, 1, null, View_TimecardPage_2)), i0.ɵdid(11, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, 3, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n"])), (_l()(), i0.ɵted(-1, null, ["\n\n"])), (_l()(), i0.ɵeld(15, 0, null, null, 34, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, i36.View_Content_0, i36.RenderType_Content)), i0.ɵdid(16, 4374528, [[1, 4]], 0, i28.Content, [i4.Config, i26.Platform, i29.DomController, i0.ElementRef, i0.Renderer, i27.App, i37.Keyboard, i0.NgZone, [2, i33.ViewController], [2, i35.NavController]], null, null), (_l()(), i0.ɵted(-1, 1, ["\n    "])), (_l()(), i0.ɵted(-1, 1, ["\n    "])), (_l()(), i0.ɵeld(19, 0, null, 1, 12, "ion-card", [], null, null, null, null, null)), i0.ɵdid(20, 16384, null, 0, i38.Card, [i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(22, 0, null, null, 2, "ion-card-header", [["class", "task-card-header"]], null, null, null, null, null)), i0.ɵdid(23, 16384, null, 0, i39.CardHeader, [i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["\n            Today's Timecard\n        "])), (_l()(), i0.ɵted(-1, null, ["\n\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TimecardPage_3)), i0.ɵdid(27, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TimecardPage_4)), i0.ɵdid(30, 16384, null, 0, i19.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, 1, ["\n\n    "])), (_l()(), i0.ɵeld(33, 0, null, 1, 15, "ion-card", [], null, null, null, null, null)), i0.ɵdid(34, 16384, null, 0, i38.Card, [i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(36, 0, null, null, 11, "ion-card-header", [], null, null, null, null, null)), i0.ɵdid(37, 16384, null, 0, i39.CardHeader, [i4.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(39, 0, null, null, 7, "ion-buttons", [["text-center", ""]], null, null, null, null, null)), i0.ɵdid(40, 16384, null, 1, i3.ToolbarItem, [i4.Config, i0.ElementRef, i0.Renderer, [2, i5.Toolbar], [2, i6.Navbar]], null, null), i0.ɵqud(603979776, 15, { _buttons: 1 }), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵeld(43, 0, null, null, 2, "button", [["block", ""], ["color", "secondary"], ["icon-left", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.goToSearch() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i7.View_Button_0, i7.RenderType_Button)), i0.ɵdid(44, 1097728, [[15, 4]], 0, i8.Button, [[8, ""], i4.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n                    Search Timecard Entries\n                "])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, 1, ["\n"])), (_l()(), i0.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.isIos; _ck(_v, 8, 0, currVal_2); var currVal_3 = !_co.isIos; _ck(_v, 11, 0, currVal_3); var currVal_6 = _co.noEntry; _ck(_v, 27, 0, currVal_6); var currVal_7 = !_co.noEntry; _ck(_v, 30, 0, currVal_7); var currVal_8 = "secondary"; var currVal_9 = ""; _ck(_v, 44, 0, currVal_8, currVal_9); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 5)._hidden; var currVal_1 = i0.ɵnov(_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_4 = i0.ɵnov(_v, 16).statusbarPadding; var currVal_5 = i0.ɵnov(_v, 16)._hasRefresher; _ck(_v, 15, 0, currVal_4, currVal_5); }); }
export function View_TimecardPage_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "page-timecard", [], null, null, null, View_TimecardPage_0, RenderType_TimecardPage)), i0.ɵdid(1, 49152, null, 0, i40.TimecardPage, [i35.NavController, i41.NavParams, i42.UserManager, i27.App, i43.TaskManager, i44.Utils, i45.AlertController, i46.ConversionManager, i47.FCM], null, null)], null, null); }
var TimecardPageNgFactory = i0.ɵccf("page-timecard", i40.TimecardPage, View_TimecardPage_Host_0, {}, {}, []);
export { TimecardPageNgFactory as TimecardPageNgFactory };
//# sourceMappingURL=timecard.ngfactory.js.map