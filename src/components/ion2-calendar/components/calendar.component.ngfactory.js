/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../../node_modules/ionic-angular/components/button/button.ngfactory";
import * as i3 from "ionic-angular/components/button/button";
import * as i4 from "ionic-angular/config/config";
import * as i5 from "ionic-angular/components/icon/icon";
import * as i6 from "./calendar-week.component.ngfactory";
import * as i7 from "./calendar-week.component";
import * as i8 from "./month.component.ngfactory";
import * as i9 from "./month.component";
import * as i10 from "@angular/forms";
import * as i11 from "./calendar.component";
import * as i12 from "../services/calendar.service";
var styles_CalendarComponent = [];
var RenderType_CalendarComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_CalendarComponent, data: {} });
export { RenderType_CalendarComponent as RenderType_CalendarComponent };
export function View_CalendarComponent_0(_l) { return i0.ɵvid(0, [i0.ɵpid(0, i1.DatePipe, [i0.LOCALE_ID]), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(2, 0, null, null, 19, "div", [["class", "title"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(4, 0, null, null, 2, "div", [["class", "text"]], null, null, null, null, null)), (_l()(), i0.ɵted(5, null, ["\n        ", "\n      "])), i0.ɵppd(6, 2), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(8, 0, null, null, 5, "button", [["class", "back"], ["clear", ""], ["ion-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.backMonth() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i2.View_Button_0, i2.RenderType_Button)), i0.ɵdid(9, 1097728, null, 0, i3.Button, [[8, ""], i4.Config, i0.ElementRef, i0.Renderer], { clear: [0, "clear"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n        "])), (_l()(), i0.ɵeld(11, 0, null, 0, 1, "ion-icon", [["name", "ios-arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i0.ɵdid(12, 147456, null, 0, i5.Icon, [i4.Config, i0.ElementRef, i0.Renderer], { name: [0, "name"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(15, 0, null, null, 5, "button", [["class", "forward"], ["clear", ""], ["ion-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.nextMonth() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i2.View_Button_0, i2.RenderType_Button)), i0.ɵdid(16, 1097728, null, 0, i3.Button, [[8, ""], i4.Config, i0.ElementRef, i0.Renderer], { clear: [0, "clear"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n        "])), (_l()(), i0.ɵeld(18, 0, null, 0, 1, "ion-icon", [["name", "ios-arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i0.ɵdid(19, 147456, null, 0, i5.Icon, [i4.Config, i0.ElementRef, i0.Renderer], { name: [0, "name"] }, null), (_l()(), i0.ɵted(-1, 0, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n\n    "])), (_l()(), i0.ɵeld(23, 0, null, null, 2, "ion-calendar-week", [["color", "transparent"]], null, null, null, i6.View_CalendarWeekComponent_0, i6.RenderType_CalendarWeekComponent)), i0.ɵdid(24, 49152, null, 0, i7.CalendarWeekComponent, [], { color: [0, "color"], weekStart: [1, "weekStart"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n\n    "])), (_l()(), i0.ɵeld(27, 0, null, null, 6, "ion-calendar-month", [], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "onChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co._calendarMonthValue = $event) !== false);
        ad = (pd_0 && ad);
    } if (("onChange" === en)) {
        var pd_1 = (_co.onChanged($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, i8.View_MonthComponent_0, i8.RenderType_MonthComponent)), i0.ɵdid(28, 114688, null, 0, i9.MonthComponent, [i0.ChangeDetectorRef], { month: [0, "month"], pickMode: [1, "pickMode"], color: [2, "color"] }, { onChange: "onChange" }), i0.ɵprd(1024, null, i10.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i9.MonthComponent]), i0.ɵdid(30, 671744, null, 0, i10.NgModel, [[8, null], [8, null], [8, null], [2, i10.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i10.NgControl, null, [i10.NgModel]), i0.ɵdid(32, 16384, null, 0, i10.NgControlStatus, [i10.NgControl], null, null), (_l()(), i0.ɵted(-1, null, ["\n\n    "])), (_l()(), i0.ɵted(-1, null, ["\n\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = ""; _ck(_v, 9, 0, currVal_2); var currVal_4 = "ios-arrow-back"; _ck(_v, 12, 0, currVal_4); var currVal_6 = ""; _ck(_v, 16, 0, currVal_6); var currVal_8 = "ios-arrow-forward"; _ck(_v, 19, 0, currVal_8); var currVal_9 = "transparent"; var currVal_10 = _co._d.weekStart; _ck(_v, 24, 0, currVal_9, currVal_10); var currVal_18 = _co.monthOpt; var currVal_19 = _co._d.pickMode; var currVal_20 = _co._d.color; _ck(_v, 28, 0, currVal_18, currVal_19, currVal_20); var currVal_21 = _co._calendarMonthValue; _ck(_v, 30, 0, currVal_21); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵunv(_v, 5, 0, _ck(_v, 6, 0, i0.ɵnov(_v, 0), _co.monthOpt.original.time, _co._d.monthFormat)); _ck(_v, 5, 0, currVal_0); var currVal_1 = !_co.canBack(); _ck(_v, 8, 0, currVal_1); var currVal_3 = i0.ɵnov(_v, 12)._hidden; _ck(_v, 11, 0, currVal_3); var currVal_5 = !_co.canNext(); _ck(_v, 15, 0, currVal_5); var currVal_7 = i0.ɵnov(_v, 19)._hidden; _ck(_v, 18, 0, currVal_7); var currVal_11 = i0.ɵnov(_v, 32).ngClassUntouched; var currVal_12 = i0.ɵnov(_v, 32).ngClassTouched; var currVal_13 = i0.ɵnov(_v, 32).ngClassPristine; var currVal_14 = i0.ɵnov(_v, 32).ngClassDirty; var currVal_15 = i0.ɵnov(_v, 32).ngClassValid; var currVal_16 = i0.ɵnov(_v, 32).ngClassInvalid; var currVal_17 = i0.ɵnov(_v, 32).ngClassPending; _ck(_v, 27, 0, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17); }); }
export function View_CalendarComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "ion-calendar", [], null, null, null, View_CalendarComponent_0, RenderType_CalendarComponent)), i0.ɵprd(5120, null, i10.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i11.CalendarComponent]), i0.ɵdid(2, 114688, null, 0, i11.CalendarComponent, [i12.CalendarService], null, null)], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
var CalendarComponentNgFactory = i0.ɵccf("ion-calendar", i11.CalendarComponent, View_CalendarComponent_Host_0, { options: "options", format: "format" }, { onChange: "onChange" }, []);
export { CalendarComponentNgFactory as CalendarComponentNgFactory };
//# sourceMappingURL=calendar.component.ngfactory.js.map