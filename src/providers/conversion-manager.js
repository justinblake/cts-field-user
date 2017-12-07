import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { UserManager } from './user-manager';
var ConversionManager = /** @class */ (function () {
    function ConversionManager(userMgr) {
        this.userMgr = userMgr;
    }
    ConversionManager.prototype.secondsToTime = function (seconds) {
        seconds = Number(seconds);
        var h = Math.floor(seconds / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 3600 % 60);
        return {
            hour: h,
            min: m,
            sec: s
        };
    };
    ConversionManager.prototype.convertDate = function (date) {
        var inMonth = date[5] + '' + date[6];
        var monthSpelled = this.months[parseInt(inMonth) - 1];
        var day = '';
        if (date[8] === '0') {
            day = date[9];
        }
        else {
            day = date[8] + '' + date[9];
        }
        return monthSpelled + ' ' + day + ', ' + date[0] + '' + date[1] + date[2] + '' + date[3];
    };
    ConversionManager.prototype.convertDateTime = function (date) {
        var interimTime = new Date(date);
        var myZone = interimTime.getTimezoneOffset();
        var year = interimTime.getFullYear();
        var month = interimTime.getMonth();
        var day = interimTime.getUTCDate();
        var hour = interimTime.getUTCHours() - (myZone / 60);
        var minute = interimTime.getUTCMinutes();
        var seconds = interimTime.getUTCSeconds();
        var adjustTimezone = new Date(Date.UTC(year, month, day, hour, minute, seconds));
        var timeZero = adjustTimezone.setHours(0, 0, 0, 0);
        return new Date(timeZero).toISOString().slice(0, 10);
    };
    ConversionManager.prototype.convertTimeToT = function (time) {
        var newYear = time.slice(0, 10);
        var newTime = time.slice(11);
        return newYear + 'T' + newTime;
    };
    ConversionManager.prototype.adjustTime = function (time) {
        var act_time = time.slice(11, 18);
        var combined = act_time[0] + '' + act_time[1];
        var combinedInt = parseInt(combined);
        var returned_time = '';
        if (combinedInt > 12) {
            combinedInt -= 12;
            returned_time = combinedInt + ':' + act_time[3] + act_time[4] + ' ' + 'PM';
        }
        else if (combinedInt === 12) {
            returned_time = combinedInt + ':' + act_time[3] + act_time[4] + ' ' + 'PM';
        }
        else if (combinedInt > 9 && combinedInt < 12) {
            returned_time = combinedInt + ':' + act_time[3] + act_time[4] + ' ' + 'AM';
        }
        else if (combinedInt < 10) {
            var morning = act_time[1];
            returned_time = morning + ':' + act_time[3] + act_time[4] + ' ' + 'AM';
        }
        return returned_time;
    };
    return ConversionManager;
}());
export { ConversionManager };
//# sourceMappingURL=conversion-manager.js.map