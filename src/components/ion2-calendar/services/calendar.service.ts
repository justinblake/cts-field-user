import { Injectable } from '@angular/core';
import {
  CalendarOriginal,
  CalendarDay,
  CalendarMonth,
  CalendarControllerOptions,
  CalendarResult,
  DayConfig
} from '../calendar.model'
import * as moment from 'moment';

@Injectable()
export class CalendarService {

  constructor() {

  }

  safeOpt(calendarOptions: any): CalendarControllerOptions {
    const _disableWeeks: number[] = [];
    const _daysConfig: DayConfig[] = [];
    let {
      autoDone = false,
      from = new Date((Date.now() - 2592000000)),
      to = 0,
      cssClass = '',
      weekStart = 0,
      canBackwardsSelected = false,
      disableWeeks = _disableWeeks,
      closeLabel = 'CANCEL',
      closeIcon = false,
      doneLabel = 'DONE',
      doneIcon = false,
      id = '',
      pickMode = 'single',
      color = 'primary',
      isSaveHistory = false,
      monthFormat = 'MMM yyyy',
      title = 'CALENDAR',
      weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      daysConfig = _daysConfig,
      countNextMonths = 8,
      showYearPicker = true,
    } = calendarOptions || {};


    return {
      autoDone: autoDone,
      from: from,
      to: to,
      cssClass: cssClass,
      weekStart: weekStart,
      canBackwardsSelected: canBackwardsSelected,
      closeLabel: closeLabel,
      closeIcon: closeIcon,
      doneLabel: doneLabel,
      doneIcon: doneIcon,
      id: id,
      pickMode: pickMode,
      color: color,
      isSaveHistory: isSaveHistory,
      defaultScrollTo: calendarOptions.defaultScrollTo || from,
      defaultDate: calendarOptions.defaultDate || null,
      defaultDates: calendarOptions.defaultDates || null,
      defaultDateRange: calendarOptions.defaultDateRange || null,
      disableWeeks: disableWeeks,
      monthFormat: monthFormat,
      title: title,
      weekdays: weekdays,
      daysConfig: daysConfig,
      countNextMonths: countNextMonths,
      showYearPicker: showYearPicker,
    }
  }

  createOriginalCalendar(time: number): CalendarOriginal {

    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstWeek = new Date(year, month, 1).getDay();
    const howManyDays = moment(time).daysInMonth();

    return {
      time: time,
      date: new Date(time),
      year: year,
      month: month,
      firstWeek: firstWeek,
      howManyDays: howManyDays,
    }
  }

  findDayConfig(day: any, opt: CalendarControllerOptions): any {

    if (opt.daysConfig.length <= 0) return null;
    return opt.daysConfig.find((n) => day.isSame(n.date, 'day'))
  }

  createCalendarDay(time: number, opt: CalendarControllerOptions): CalendarDay {
    let _time = moment(time);
    let isToday = moment().isSame(_time, 'days');
    let dayConfig = this.findDayConfig(_time, opt);
    let _rangeBeg = moment(opt.from).valueOf();
    let _rangeEnd = moment(opt.to).valueOf();
    let isBetween = true;
    let disableWee = opt.disableWeeks.indexOf(_time.toDate().getDay()) !== -1;
    if (_rangeBeg > 0 && _rangeEnd > 0) {
      if (!opt.canBackwardsSelected) {
        isBetween = !_time.isBetween(_rangeBeg, _rangeEnd, 'days', '[]');
      } else {
        isBetween = moment(_time).isBefore(_rangeBeg) ? false : isBetween;
      }
    } else if (_rangeBeg > 0 && _rangeEnd === 0) {


      if (!opt.canBackwardsSelected) {
        let _addTime = _time.add(1, 'day');
        isBetween = !_addTime.isAfter(_rangeBeg);
      } else {
        isBetween = false;
      }
    }

    let _disable = disableWee || isBetween;

    return {
      time: time,
      isToday: isToday,
      selected: false,
      marked: dayConfig ? dayConfig.marked || false : false,
      cssClass: dayConfig ? dayConfig.cssClass || '' : '',
      disable: dayConfig ? dayConfig.disable && _disable : _disable,
      title: dayConfig ? dayConfig.title || new Date(time).getDate().toString() : new Date(time).getDate().toString(),
      subTitle: dayConfig ? dayConfig.subTitle || '' : '',
    }
  }

  createCalendarMonth(original: CalendarOriginal, opt: CalendarControllerOptions): CalendarMonth {
    let days: Array<CalendarDay> = new Array(6).fill(null);
    let len = original.howManyDays;

    for (let i = original.firstWeek; i < len + original.firstWeek; i++) {
      let itemTime = new Date(original.year, original.month, i - original.firstWeek + 1).getTime();
      days[i] = this.createCalendarDay(itemTime, opt);
    }

    let weekStart = opt.weekStart;

    if (weekStart === 1) {
      if (days[0] === null) {
        days.shift();
        days.push(null);
      } else {
        days.unshift(...new Array(6).fill(null));
      }
    }

    return {
      original: original,
      days: days,
    }

  }

  createMonthsByPeriod(startTime: number, monthsNum: number, opt: CalendarControllerOptions): Array<CalendarMonth> {
    let _array: Array<CalendarMonth> = [];

    let _start = new Date(startTime);
    let _startMonth = new Date(_start.getFullYear(), _start.getMonth(), 1).getTime();

    for (let i = 0; i < monthsNum; i++) {
      let time = moment(_startMonth).add(i, 'M').valueOf();
      let originalCalendar = this.createOriginalCalendar(time);
      _array.push(this.createCalendarMonth(originalCalendar, opt))
    }

    return _array;
  }

  getHistory(id: string | number): Array<CalendarDay | null> {
    const _savedDatesCache = localStorage.getItem(`ion-calendar-${id}`);
    let _savedDates: Array<CalendarDay | null>;
    if (_savedDatesCache === 'undefined' || _savedDatesCache === 'null' || !_savedDatesCache) {
      _savedDates = [null, null];
    } else {
      _savedDates = <any>JSON.parse(_savedDatesCache);
    }
    return _savedDates
  }

  savedHistory(savedDates: Array<CalendarDay | null>, id: string | number) {
    localStorage.setItem(`ion-calendar-${id}`, JSON.stringify(savedDates));
  }

  wrapResult(original: CalendarDay[], pickMode: string) {
    let result: any;
    switch (pickMode) {
      case 'single':
        result = this._multiFormat(original[0]);
        break;
      case 'range':
        result = {
          from: this._multiFormat(original[0]),
          to: this._multiFormat(original[1]),
        };
        break;
      case 'multi':
        result = original.map(e => this._multiFormat(e));
        break;
      default:
        result = original;
    }
    return result;
  }

  _multiFormat(data: CalendarDay): CalendarResult {
    const _moment = moment(data.time);
    return {
      time: _moment.valueOf(),
      unix: _moment.unix(),
      dateObj: _moment.toDate(),
      string: _moment.format('YYYY-MM-DD'),
      years: _moment.year(),
      months: _moment.month() + 1,
      date: _moment.date()
    }
  }

}
