import { Component, ViewChild, ElementRef, ChangeDetectorRef, Renderer } from '@angular/core';
import { NavParams, ViewController, Content, InfiniteScroll, Platform } from 'ionic-angular';
import { CalendarDay, CalendarMonth, CalendarOptions, CalendarControllerOptions } from '../calendar.model';
import { CalendarService } from '../services/calendar.service';
import * as moment from 'moment';
var CalendarModal = /** @class */ (function () {
    function CalendarModal(_renderer, _elementRef, params, viewCtrl, ref, calSvc, plt) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.ref = ref;
        this.calSvc = calSvc;
        this.plt = plt;
        if (this.plt.is('ios')) {
            this.isIos = true;
        }
        this.findCssClass();
        this.init();
        this.getHistory();
        this.initDefaultDate();
    }
    CalendarModal.prototype.ionViewDidLoad = function () {
        this.scrollToDefaultDate();
    };
    CalendarModal.prototype.init = function () {
        var params = this.params;
        this._d = params.get('options');
        var startTime = moment(this._d.from).valueOf();
        var endTime = moment(this._d.to).valueOf();
        this.options = {
            start: startTime,
            end: endTime,
            isRadio: params.get('isRadio'),
            pickMode: this._d.pickMode,
            range_beg: startTime,
            range_end: endTime,
            daysConfig: params.get('daysConfig'),
            disableWeeks: params.get('disableWeeks'),
            monthFormat: params.get('monthFormat'),
        };
        this.defaultScrollTo = this._d.defaultScrollTo;
        this.scrollBackwards = this._d.canBackwardsSelected;
        this.weekStart = this._d.weekStart;
        this._id = this._d.id;
        this._color = this._d.color;
        this.monthFormatFilterStr = this._d.monthFormat;
        this.weekdays = this._d.weekdays;
        this.title = this._d.title;
        this.closeLabel = this._d.closeLabel;
        this.closeIcon = this._d.closeIcon;
        this.doneLabel = this._d.doneLabel;
        this.doneIcon = this._d.doneIcon;
        this.isSaveHistory = this._d.isSaveHistory;
        this.countNextMonths = this._d.countNextMonths;
        if (this.countNextMonths < 1) {
            this.countNextMonths = 1;
        }
        this.showYearPicker = this._d.showYearPicker;
        if (this.showYearPicker) {
            this.createYearPicker(startTime, endTime);
        }
        else {
            this.calendarMonths = this.calSvc.createMonthsByPeriod(startTime, this.findInitMonthNumber(this.defaultScrollTo) + this.countNextMonths, this._d);
        }
    };
    CalendarModal.prototype.initDefaultDate = function () {
        var _this = this;
        switch (this._d.pickMode) {
            case 'single':
                if (this._d.defaultDate) {
                    this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(this._d.defaultDate), this._d);
                }
                break;
            case 'range':
                if (this._d.defaultDateRange) {
                    if (this._d.defaultDateRange.from) {
                        this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(this._d.defaultDateRange.from), this._d);
                    }
                    if (this._d.defaultDateRange.to) {
                        this.datesTemp[1] = this.calSvc.createCalendarDay(this._getDayTime(this._d.defaultDateRange.to), this._d);
                    }
                }
                break;
            case 'multi':
                if (this._d.defaultDates && this._d.defaultDates.length) {
                    this.datesTemp = this._d.defaultDates.map(function (e) { return _this.calSvc.createCalendarDay(_this._getDayTime(e), _this._d); });
                }
                break;
            default:
                this.datesTemp = [null, null];
        }
    };
    CalendarModal.prototype.findCssClass = function () {
        var _this = this;
        var cssClass = this.params.get('cssClass');
        if (cssClass) {
            cssClass.split(' ').forEach(function (cssClass) {
                if (cssClass.trim() !== '')
                    _this._renderer.setElementClass(_this._elementRef.nativeElement, cssClass, true);
            });
        }
    };
    CalendarModal.prototype.onChange = function (data) {
        this.datesTemp = data;
        this.calSvc.savedHistory(data, this._id);
        this.ref.detectChanges();
        if (this._d.pickMode !== 'multi' && this._d.autoDone && this.canDone()) {
            this.done();
        }
    };
    CalendarModal.prototype.onCancel = function () {
        this.viewCtrl.dismiss();
    };
    CalendarModal.prototype.done = function () {
        this.viewCtrl.dismiss(this.datesTemp);
    };
    CalendarModal.prototype.canDone = function () {
        if (!Array.isArray(this.datesTemp)) {
            return false;
        }
        switch (this._d.pickMode) {
            case 'single':
                return !!(this.datesTemp[0] && this.datesTemp[0].time);
            case 'range':
                return !!(this.datesTemp[0] && this.datesTemp[1]) && !!(this.datesTemp[0].time && this.datesTemp[1].time);
            case 'multi':
                return this.datesTemp.length > 0 && this.datesTemp.every(function (e) { return !!e && !!e.time; });
            default:
                return false;
        }
    };
    CalendarModal.prototype.getHistory = function () {
        if (this.isSaveHistory) {
            this.datesTemp = this.calSvc.getHistory(this._id);
        }
    };
    CalendarModal.prototype.createYearPicker = function (startTime, endTime) {
        // init year array
        this.years = [];
        // getting max and be sure, it is in future (maybe parameter?)
        var maxYear = (new Date(endTime)).getFullYear();
        if (maxYear <= 1970) {
            maxYear = (new Date(this.defaultScrollTo)).getFullYear() + 10;
            this.options.end = new Date(maxYear, 12, 0).getTime();
        }
        // min year should be okay, either it will be set or something like 1970 at min
        var minYear = (new Date(startTime)).getFullYear();
        // calculating the needed years to be added to array
        var neededYears = (maxYear - minYear);
        // pushing years to selection array
        for (var y = 0; y <= neededYears; y++) {
            this.years.push(maxYear - y);
        }
        this.years.reverse();
        // selection-start-year of defaultScrollTo
        this.year = this.defaultScrollTo.getFullYear();
        var firstDayOfYear = new Date(this.year, 0, 1);
        var lastDayOfYear = new Date(this.year, 12, 0);
        // don't calc over the start / end
        if (firstDayOfYear.getTime() < this.options.start) {
            firstDayOfYear = new Date(this.options.start);
        }
        if (lastDayOfYear.getTime() > this.options.end) {
            lastDayOfYear = new Date(this.options.end);
        }
        // calcing the month
        this.calendarMonths = this.calSvc.createMonthsByPeriod(firstDayOfYear.getTime(), this.findInitMonthNumber(this.defaultScrollTo) + this.countNextMonths, this._d);
        // sets the range new
        // checking whether the start is after firstDayOfYear
        this.options.range_beg = firstDayOfYear.getTime() < startTime ? startTime : firstDayOfYear.getTime();
        // checking whether the end is before lastDayOfYear
        this.options.range_end = lastDayOfYear.getTime() > endTime ? endTime : lastDayOfYear.getTime();
    };
    CalendarModal.prototype.nextMonth = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        var len = this.calendarMonths.length;
        var final = this.calendarMonths[len - 1];
        var nextTime = moment(final.original.time).add(1, 'M').valueOf();
        var rangeEnd = this.options.range_end ? moment(this.options.range_end).subtract(1, 'M') : 0;
        if (len <= 0 || (rangeEnd !== 0 && moment(final.original.time).isAfter(rangeEnd))) {
            infiniteScroll.enable(false);
            return;
        }
        (_a = this.calendarMonths).push.apply(_a, this.calSvc.createMonthsByPeriod(nextTime, 1, this._d));
        infiniteScroll.complete();
        var _a;
    };
    CalendarModal.prototype.backwardsMonth = function () {
        var first = this.calendarMonths[0];
        var firstTime = moment(first.original.time).subtract(1, 'M').valueOf();
        (_a = this.calendarMonths).unshift.apply(_a, this.calSvc.createMonthsByPeriod(firstTime, 1, this._d));
        this.ref.detectChanges();
        var _a;
    };
    CalendarModal.prototype.scrollToDefaultDate = function () {
        var _this = this;
        var defaultDateIndex = this.findInitMonthNumber(this.defaultScrollTo);
        var defaultDateMonth = this.monthsEle.nativeElement.children["month-" + defaultDateIndex].offsetTop;
        if (defaultDateIndex === 0 || defaultDateMonth === 0)
            return;
        setTimeout(function () {
            _this.content.scrollTo(0, defaultDateMonth, 128);
        }, 300);
    };
    CalendarModal.prototype.onScroll = function ($event) {
        var _this = this;
        if (!this.scrollBackwards)
            return;
        if ($event.scrollTop <= 200 && this._s) {
            this._s = !1;
            var lastHeight_1 = this.content.getContentDimensions().scrollHeight;
            console.log('lastHeight ', JSON.stringify(lastHeight_1));
            setTimeout(function () {
                _this.backwardsMonth();
                var nowHeight = _this.content.getContentDimensions().scrollHeight;
                console.log('nowHeight ', JSON.stringify(nowHeight));
                _this.content.scrollTo(0, nowHeight - lastHeight_1, 300)
                    .then(function () {
                    _this._s = !0;
                });
            }, 180);
        }
    };
    CalendarModal.prototype.findInitMonthNumber = function (date) {
        var startDate = moment(this.options.start);
        var defaultScrollTo = moment(date);
        var isAfter = defaultScrollTo.isAfter(startDate);
        if (!isAfter)
            return 3;
        if (this.showYearPicker) {
            startDate = moment(new Date(this.year, 0, 1));
        }
        return defaultScrollTo.diff(startDate, 'month');
    };
    CalendarModal.prototype.changedYearSelection = function () {
        var _this = this;
        // re-enabling infinite scroll
        if (this.infiniteScroll !== undefined) {
            this.infiniteScroll.enable(true);
        }
        // getting first day and last day of the year
        var firstDayOfYear = new Date(this.year, 0, 1);
        var lastDayOfYear = new Date(this.year, 12, 0);
        // don't calc over the start / end
        if (firstDayOfYear.getTime() < this.options.start) {
            firstDayOfYear = new Date(this.options.start);
        }
        if (lastDayOfYear.getTime() > this.options.end) {
            lastDayOfYear = new Date(this.options.end);
        }
        // sets the range new
        // checking whether the start is after firstDayOfYear
        this.options.range_beg = firstDayOfYear.getTime() < this.options.start ? this.options.start : firstDayOfYear.getTime();
        // checking whether the end is before lastDayOfYear
        this.options.range_end = lastDayOfYear.getTime() > this.options.end ? this.options.end : lastDayOfYear.getTime();
        // calcing the months
        var monthCount = (this.findInitMonthNumber(firstDayOfYear) + this.countNextMonths);
        this.calendarMonths = this.calSvc.createMonthsByPeriod(firstDayOfYear.getTime(), monthCount <= 1 ? 3 : monthCount, this._d);
        // scrolling to the top
        setTimeout(function () {
            _this.content.scrollTo(0, 0, 128);
        }, 300);
    };
    CalendarModal.prototype._getDayTime = function (date) {
        return moment(moment(date).format('YYYY-MM-DD')).valueOf();
    };
    return CalendarModal;
}());
export { CalendarModal };
//# sourceMappingURL=calendar.modal.js.map