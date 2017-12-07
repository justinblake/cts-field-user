import { Component, ChangeDetectorRef, Input, Output, EventEmitter, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarDay, CalendarMonth, PickMode } from '../calendar.model';
export var MONTH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MonthComponent; }),
    multi: true,
};
var MonthComponent = /** @class */ (function () {
    function MonthComponent(ref) {
        this.ref = ref;
    }
    MonthComponent.prototype.ngOnInit = function () {
        this._date = [];
    };
    MonthComponent.prototype.writeValue = function (obj) {
        this._date = obj;
    };
    MonthComponent.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    MonthComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    MonthComponent.prototype.isEndSelection = function (day) {
        if (!day)
            return;
        if (this.pickMode !== 'range' || !Array.isArray(this._date) || this._date[1] === null) {
            return false;
        }
        return this._date[1].time === day.time;
    };
    MonthComponent.prototype.isBetween = function (day) {
        if (!day)
            return;
        if (this.pickMode !== 'range' || !Array.isArray(this._date)) {
            return false;
        }
        var start = 0;
        var end = 0;
        if (this._date[0] === null) {
            return false;
        }
        else {
            start = this._date[0].time;
        }
        if (this._date[1] === null) {
            return false;
        }
        else {
            end = this._date[1].time;
        }
        return day.time < end && day.time > start;
    };
    MonthComponent.prototype.isStartSelection = function (day) {
        if (!day)
            return;
        if (this.pickMode !== 'range' || !Array.isArray(this._date) || this._date[0] === null) {
            return false;
        }
        return this._date[0].time === day.time && this._date[1] !== null;
    };
    MonthComponent.prototype.isSelected = function (time) {
        if (Array.isArray(this._date)) {
            if (this.pickMode !== 'multi') {
                if (this._date[0] !== null) {
                    return time === this._date[0].time;
                }
                if (this._date[1] !== null) {
                    return time === this._date[1].time;
                }
            }
            else {
                return this._date.findIndex(function (e) { return e !== null && e.time === time; }) !== -1;
            }
        }
        else {
            return false;
        }
    };
    MonthComponent.prototype.onSelected = function (item) {
        item.selected = true;
        this.ref.detectChanges();
        if (this.pickMode === 'single') {
            this._date[0] = item;
            this.onChange.emit(this._date);
            return;
        }
        if (this.pickMode === 'range') {
            if (this._date[0] === null) {
                this._date[0] = item;
                this.ref.detectChanges();
            }
            else if (this._date[1] === null) {
                if (this._date[0].time < item.time) {
                    this._date[1] = item;
                }
                else {
                    this._date[1] = this._date[0];
                    this._date[0] = item;
                }
                this.ref.detectChanges();
            }
            else {
                this._date[0] = item;
                this._date[1] = null;
            }
            this.onChange.emit(this._date);
        }
        if (this.pickMode === 'multi') {
            var index = this._date.findIndex(function (e) { return e !== null && e.time === item.time; });
            if (index === -1) {
                this._date.push(item);
            }
            else {
                this._date.splice(index, 1);
            }
            this.onChange.emit(this._date.filter(function (e) { return e !== null; }));
        }
        this.ref.detectChanges();
    };
    return MonthComponent;
}());
export { MonthComponent };
//# sourceMappingURL=month.component.js.map