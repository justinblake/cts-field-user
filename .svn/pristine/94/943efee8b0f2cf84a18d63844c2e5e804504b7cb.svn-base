import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {UserManager} from './user-manager';


@Injectable()
export class ConversionManager {


    currentUser: any;
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    constructor(public userMgr: UserManager) {
    }

    secondsToTime(seconds) {
        seconds = Number(seconds);
        let h = Math.floor(seconds / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);
        return {
            hour: h,
            min: m,
            sec: s
        };
    }

    convertDate(date) {
        let inMonth = date[5] + '' + date[6];
        let monthSpelled = this.months[parseInt(inMonth) - 1];
        let day = '';
        if (date[8] === '0') {
            day = date[9];
        } else {
            day = date[8] + '' + date[9];
        }
        return monthSpelled + ' ' + day + ', ' + date[0] + '' + date[1] + date[2] + '' + date[3];
    }

    convertDateTime(date) {
        let interimTime = new Date(date);
        let myZone = interimTime.getTimezoneOffset();
        let year = interimTime.getFullYear();
        let month = interimTime.getMonth();
        let day = interimTime.getUTCDate();
        let hour = interimTime.getUTCHours() - (myZone / 60);
        let minute = interimTime.getUTCMinutes();
        let seconds = interimTime.getUTCSeconds();
        let adjustTimezone = new Date(Date.UTC(year, month, day, hour, minute, seconds));
        let timeZero = adjustTimezone.setHours(0, 0, 0, 0);
        return new Date(timeZero).toISOString().slice(0, 10);
    }

    convertTimeToT(time) {
        let newYear = time.slice(0, 10);
        let newTime = time.slice(11);
        return newYear + 'T' + newTime;
    }

    adjustTime(time) {
        let act_time = time.slice(11, 18);
        let combined = act_time[0] + '' + act_time[1];
        let combinedInt = parseInt(combined);
        let returned_time = '';
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
            let morning = act_time[1];
            returned_time = morning + ':' + act_time[3] + act_time[4] + ' ' + 'AM';
        }
        return returned_time
    }
}
