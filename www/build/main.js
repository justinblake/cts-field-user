webpackJsonp([0],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Animations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_animations__ = __webpack_require__(108);

/** animations */
var Animations = (function () {
    function Animations() {
    }
    return Animations;
}());

Animations.expandCollapse = Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["j" /* trigger */])('expandCollapse', [
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* state */])('collapse', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["h" /* style */])({ height: "0px", color: 'transparent' })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* state */])('expand', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["h" /* style */])({ height: "*" })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["i" /* transition */])('expand => collapse', [Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["h" /* style */])({}), Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* animate */])('250ms ease-out')]),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["i" /* transition */])('collapse => expand', [Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["h" /* style */])({}), Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* animate */])('250ms ease-out')])
]);
//# sourceMappingURL=animations.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CalendarService = (function () {
    function CalendarService() {
    }
    CalendarService.prototype.safeOpt = function (calendarOptions) {
        var _disableWeeks = [];
        var _daysConfig = [];
        var _a = calendarOptions || {}, _b = _a.autoDone, autoDone = _b === void 0 ? false : _b, _c = _a.from, from = _c === void 0 ? new Date((Date.now() - 2592000000)) : _c, _d = _a.to, to = _d === void 0 ? 0 : _d, _e = _a.cssClass, cssClass = _e === void 0 ? '' : _e, _f = _a.weekStart, weekStart = _f === void 0 ? 0 : _f, _g = _a.canBackwardsSelected, canBackwardsSelected = _g === void 0 ? false : _g, _h = _a.disableWeeks, disableWeeks = _h === void 0 ? _disableWeeks : _h, _j = _a.closeLabel, closeLabel = _j === void 0 ? 'CANCEL' : _j, _k = _a.closeIcon, closeIcon = _k === void 0 ? false : _k, _l = _a.doneLabel, doneLabel = _l === void 0 ? 'DONE' : _l, _m = _a.doneIcon, doneIcon = _m === void 0 ? false : _m, _o = _a.id, id = _o === void 0 ? '' : _o, _p = _a.pickMode, pickMode = _p === void 0 ? 'single' : _p, _q = _a.color, color = _q === void 0 ? 'primary' : _q, _r = _a.isSaveHistory, isSaveHistory = _r === void 0 ? false : _r, _s = _a.monthFormat, monthFormat = _s === void 0 ? 'MMM yyyy' : _s, _t = _a.title, title = _t === void 0 ? 'CALENDAR' : _t, _u = _a.weekdays, weekdays = _u === void 0 ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : _u, _v = _a.daysConfig, daysConfig = _v === void 0 ? _daysConfig : _v, _w = _a.countNextMonths, countNextMonths = _w === void 0 ? 8 : _w, _x = _a.showYearPicker, showYearPicker = _x === void 0 ? true : _x;
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
        };
    };
    CalendarService.prototype.createOriginalCalendar = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth();
        var firstWeek = new Date(year, month, 1).getDay();
        var howManyDays = __WEBPACK_IMPORTED_MODULE_1_moment__(time).daysInMonth();
        return {
            time: time,
            date: new Date(time),
            year: year,
            month: month,
            firstWeek: firstWeek,
            howManyDays: howManyDays,
        };
    };
    CalendarService.prototype.findDayConfig = function (day, opt) {
        if (opt.daysConfig.length <= 0)
            return null;
        return opt.daysConfig.find(function (n) { return day.isSame(n.date, 'day'); });
    };
    CalendarService.prototype.createCalendarDay = function (time, opt) {
        var _time = __WEBPACK_IMPORTED_MODULE_1_moment__(time);
        var isToday = __WEBPACK_IMPORTED_MODULE_1_moment__().isSame(_time, 'days');
        var dayConfig = this.findDayConfig(_time, opt);
        var _rangeBeg = __WEBPACK_IMPORTED_MODULE_1_moment__(opt.from).valueOf();
        var _rangeEnd = __WEBPACK_IMPORTED_MODULE_1_moment__(opt.to).valueOf();
        var isBetween = true;
        var disableWee = opt.disableWeeks.indexOf(_time.toDate().getDay()) !== -1;
        if (_rangeBeg > 0 && _rangeEnd > 0) {
            if (!opt.canBackwardsSelected) {
                isBetween = !_time.isBetween(_rangeBeg, _rangeEnd, 'days', '[]');
            }
            else {
                isBetween = __WEBPACK_IMPORTED_MODULE_1_moment__(_time).isBefore(_rangeBeg) ? false : isBetween;
            }
        }
        else if (_rangeBeg > 0 && _rangeEnd === 0) {
            if (!opt.canBackwardsSelected) {
                var _addTime = _time.add(1, 'day');
                isBetween = !_addTime.isAfter(_rangeBeg);
            }
            else {
                isBetween = false;
            }
        }
        var _disable = disableWee || isBetween;
        return {
            time: time,
            isToday: isToday,
            selected: false,
            marked: dayConfig ? dayConfig.marked || false : false,
            cssClass: dayConfig ? dayConfig.cssClass || '' : '',
            disable: dayConfig ? dayConfig.disable && _disable : _disable,
            title: dayConfig ? dayConfig.title || new Date(time).getDate().toString() : new Date(time).getDate().toString(),
            subTitle: dayConfig ? dayConfig.subTitle || '' : '',
        };
    };
    CalendarService.prototype.createCalendarMonth = function (original, opt) {
        var days = new Array(6).fill(null);
        var len = original.howManyDays;
        for (var i = original.firstWeek; i < len + original.firstWeek; i++) {
            var itemTime = new Date(original.year, original.month, i - original.firstWeek + 1).getTime();
            days[i] = this.createCalendarDay(itemTime, opt);
        }
        var weekStart = opt.weekStart;
        if (weekStart === 1) {
            if (days[0] === null) {
                days.shift();
                days.push(null);
            }
            else {
                days.unshift.apply(days, new Array(6).fill(null));
            }
        }
        return {
            original: original,
            days: days,
        };
    };
    CalendarService.prototype.createMonthsByPeriod = function (startTime, monthsNum, opt) {
        var _array = [];
        var _start = new Date(startTime);
        var _startMonth = new Date(_start.getFullYear(), _start.getMonth(), 1).getTime();
        for (var i = 0; i < monthsNum; i++) {
            var time = __WEBPACK_IMPORTED_MODULE_1_moment__(_startMonth).add(i, 'M').valueOf();
            var originalCalendar = this.createOriginalCalendar(time);
            _array.push(this.createCalendarMonth(originalCalendar, opt));
        }
        return _array;
    };
    CalendarService.prototype.getHistory = function (id) {
        var _savedDatesCache = localStorage.getItem("ion-calendar-" + id);
        var _savedDates;
        if (_savedDatesCache === 'undefined' || _savedDatesCache === 'null' || !_savedDatesCache) {
            _savedDates = [null, null];
        }
        else {
            _savedDates = JSON.parse(_savedDatesCache);
        }
        return _savedDates;
    };
    CalendarService.prototype.savedHistory = function (savedDates, id) {
        localStorage.setItem("ion-calendar-" + id, JSON.stringify(savedDates));
    };
    CalendarService.prototype.wrapResult = function (original, pickMode) {
        var _this = this;
        var result;
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
                result = original.map(function (e) { return _this._multiFormat(e); });
                break;
            default:
                result = original;
        }
        return result;
    };
    CalendarService.prototype._multiFormat = function (data) {
        var _moment = __WEBPACK_IMPORTED_MODULE_1_moment__(data.time);
        return {
            time: _moment.valueOf(),
            unix: _moment.unix(),
            dateObj: _moment.toDate(),
            string: _moment.format('YYYY-MM-DD'),
            years: _moment.year(),
            months: _moment.month() + 1,
            date: _moment.date()
        };
    };
    return CalendarService;
}());
CalendarService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], CalendarService);

//# sourceMappingURL=calendar.service.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_utils__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ApiService = (function () {
    function ApiService(http, ngZone) {
        var _this = this;
        this.http = http;
        this.ngZone = ngZone;
        this.uploading = true;
        this.current = 1;
        // * utility method for generating requestOptions for the ctsApi
        // * @Param endpoint:string the endpoint
        // * @Param bodyData:object the body of the request
        // * @Return RequestOptions
        this.ctsApiPostRequestOptions = function (endpoint, bodyData) {
            var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
                'method': __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
                'headers': _this.ctsApiPostRequestHeaders(),
                'url': endpoint,
                'body': (JSON.stringify(bodyData))
            });
            return requestOptions;
        };
        // * utility method for generating requestOptions for the utilApi
        // * @Param endpoint:string the endpoint
        // * @Param bodyData:object the body of the request
        // * @Return RequestOptions
        this.utilApiPostRequestOptions = function (endpoint, bodyData) {
            var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
                'method': __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
                'headers': _this.utilApiPostRequestHeaders(),
                'url': endpoint,
                'body': (JSON.stringify(bodyData))
            });
            return requestOptions;
        };
        // * utility method for generating requestOptions for the crudApi
        // * @Param endpoint:string the endpoint
        // * @Param bodyData:object the body of the request
        // * @Return RequestOptions
        this.crudApiPostRequestOptions = function (endpoint, bodyData) {
            var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
                'method': __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
                'headers': _this.crudApiPostRequestHeaders(),
                'url': endpoint,
                'body': (JSON.stringify(bodyData))
            });
            return requestOptions;
        };
        // * md5 user
        // *  creates a request for the md5 endpoint
        // *  @Param string:string
        // *  @Note: app does not use this endpoint
        // *  @Return Promise
        this.md5 = function (string) {
            var requestOptions = _this.utilApiPostRequestOptions(_this.apiUrls.md5, string);
            return _this.request(requestOptions);
        };
        this.updateEmployeeToken = function (data) {
            var endpoint = _this.apiUrls.updateEmployeeToken;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        // * loads the current task from the api
        // * @Param user:currentUser
        // * @Param token: string
        // * @Return Promise
        this.loadCurrentTask = function (data) {
            var endpoint = _this.apiUrls.loadCurrentTask;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        // loadNextDayTask = (data) => {
        //     let endpoint = this.apiUrls.loadNextDayTask;
        //     let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        //     return this.request(requestOptions);
        // };
        // *  loads the task history from the api
        // *  @Param data:any = {userId:number}
        // *  @Return Promise
        this.loadTaskHistoryV2 = function (data) {
            var endpoint = _this.apiUrls.loadTaskHistoryV2;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        this.loadNextDayTaskByDate = function (data) {
            var endpoint = _this.apiUrls.loadNextDayTaskByDate;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        this.loadForemanTasks = function (data) {
            var endpoint = _this.apiUrls.loadForemanTasks;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        this.loadLaborerTasks = function (data) {
            var endpoint = _this.apiUrls.loadLaborerTasks;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        this.loadEmployeeAlerts = function (data) {
            var endpoint = _this.apiUrls.loadEmployeeAlerts;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        this.checkEmployeeAlerts = function (data) {
            var endpoint = _this.apiUrls.checkEmployeeAlerts;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        this.markEmployeeAlertRead = function (data) {
            var endpoint = _this.apiUrls.markEmployeeAlertRead;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        // *  loads task user log for a task
        // *  @Param data:any = { "userId":number, "taskId":number }
        // *  @Param token: string
        // *  @Return Promise
        this.loadTaskUserLog = function (data) {
            var endpoint = _this.apiUrls.loadTaskUserLog;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        this.loadTaskUserNotes = function (data) {
            var endpoint = _this.apiUrls.loadTaskUserNotes;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        // * creates a postTaskFeedback request
        // * @Return Promise
        this.postTaskFeedback = function (feedback) {
            console.log("step 6 api service  ");
            var endpoint = _this.apiUrls.createTaskUserLog;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, feedback);
            return _this.request(requestOptions);
        };
        // * creates a postTaskFeedbackImage request on devices only
        // * @Return Promise
        this.postTaskFeedbackImageNative = function (feedbackId, image) {
            var url = _this.apiUrls.createTaskUserLogFiles;
            var options = {
                fileName: image.name,
                fileKey: 'file',
                httpMethod: "POST",
                mimeType: 'image/jpeg',
                chunkedMode: false,
                headers: {
                    'jwt': _this.jwtHeader
                },
                params: {
                    logId: feedbackId,
                    caption: image.caption,
                    fileName: image.name,
                    path: image.path,
                    debug: true
                }
            };
            var transfer = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* Transfer */]();
            return new Promise(function (resolve, reject) {
                transfer.upload(image.path, url, options, true).then(function (data) {
                    resolve(data);
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        // /* show progress of upload -- not implemented */
        this.onProgress = function (progressEvent) {
            _this.ngZone.run(function () {
                if (progressEvent.lengthComputable) {
                    _this.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                }
                else {
                    // -- //
                }
            });
        };
        // * creates a postTaskFeedbackImage HTML5
        // * @Note: only used in development, not sure if still implemented
        // * @Return Promise
        this.postTaskFeedbackImage = function (feedbackId, image) {
            var url = _this.apiUrls.createTaskUserLogFiles;
            return new Promise(function (resolve, reject) {
                var formData = new FormData();
                var xhr = new XMLHttpRequest();
                formData.append('logId', feedbackId);
                formData.append('caption', image.caption);
                formData.append("feedbackImage", image.file, image.name);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            console.log("" + __WEBPACK_IMPORTED_MODULE_6__utils_utils__["a" /* Utils */].toJson(xhr.response, true));
                            resolve(JSON.parse(xhr.response));
                        }
                        else {
                            reject(xhr.response);
                        }
                    }
                };
                xhr.open("POST", url, true);
                xhr.send(formData);
            });
        };
        // settings for api endpoints //
        this.apiBase = 'https://www.cleartasksolutions.com/api';
        this.utilApi = this.apiBase + "/utilApi.php";
        this.ctsApi = this.apiBase + "/ctsapi.php";
        this.crudApi = this.apiBase + "/crudApi.php";
        this.apiUrls = {
            "md5": this.utilApi + "/md5",
            "authenticateUser": this.utilApi + "/authenticate_user",
            "sendPasswordReset": this.ctsApi + "/sendPasswordReset",
            "loadCurrentTask": this.ctsApi + "/loadCurrentTask",
            "loadTaskHistoryV2": this.ctsApi + "/loadTaskHistoryV2",
            "createTaskUserLog": this.ctsApi + "/createTaskUserLog",
            "createTaskUserLogFiles": this.ctsApi + "/createTaskUserLogFiles",
            "loadTaskUserLog": this.ctsApi + "/loadTaskUserLog",
            "loadEmployeeAlerts": this.ctsApi + "/loadEmployeeAlerts",
            "markEmployeeAlertRead": this.ctsApi + "/markEmployeeAlertRead",
            "checkEmployeeAlerts": this.ctsApi + "/checkEmployeeAlerts",
            "updateEmployeeToken": this.ctsApi + "/updateEmployeeToken",
            "loadTaskUserNotes": this.ctsApi + "/loadTaskUserNotes",
            "loadNextDayTaskByDate": this.ctsApi + "/loadNextDayTaskByDate",
            "loadForemanTasks": this.ctsApi + "/loadForemanTasks",
            "loadLaborerTasks": this.ctsApi + "/loadLaborerTasks",
            "createTimecardEntry": this.ctsApi + "/createTimecardEntry",
            "loadTimecardData": this.ctsApi + "/loadTimecardData",
            "loadTimeCardTotal": this.ctsApi + "/loadTimeCardTotal",
            "updateTimecard": this.ctsApi + "/updateTimecard",
            "makeTimecardEntryInactive": this.ctsApi + "/makeTimecardEntryInactive",
            "validateEmail": this.ctsApi + "/validateEmail",
            "getLastTimecardEntry": this.ctsApi + "/getLastTimecardEntry"
        };
    }
    // * make the request to the api
    // * @Param requestOptions:RequestOptions the request options
    // * @Return Promise:any
    ApiService.prototype.request = function (requestOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](requestOptions))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    // utility method for generating headers for the ctsApi //
    ApiService.prototype.ctsApiPostRequestHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'text/plain',
            'Accept': 'application/json; charset=utf-8',
            'jwt': this.jwtHeader
        });
        return headers;
    };
    // utility method for generating headers for the utilApi //
    ApiService.prototype.utilApiPostRequestHeaders = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'text/plain'
        });
    };
    // utility method for generating headers for the crudApi //
    ApiService.prototype.crudApiPostRequestHeaders = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'text/plain'
        });
    };
    // * Authenticate user
    // * creates a request for authenticate endpoint
    // * @Param data:any = { email: string, password: md5-String }
    // * @Return Promise
    ApiService.prototype.authenticate = function (data) {
        var endpoint = this.apiUrls.authenticateUser;
        var requestOptions = this.utilApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    ApiService.prototype.validateEmail = function (data) {
        var endpoint = this.apiUrls.validateEmail;
        var requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    ApiService.prototype.sendPasswordReset = function (data) {
        var endpoint = this.apiUrls.sendPasswordReset;
        var requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    ApiService.prototype.createTimecardEntry = function (data) {
        var endpoint = this.apiUrls.createTimecardEntry;
        var requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    ApiService.prototype.loadTimecardData = function (data) {
        var endpoint = this.apiUrls.loadTimecardData;
        var requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    ApiService.prototype.loadTimeCardTotal = function (data) {
        var endpoint = this.apiUrls.loadTimeCardTotal;
        var requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    ApiService.prototype.updateTimecard = function (data) {
        var endpoint = this.apiUrls.updateTimecard;
        var requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    ApiService.prototype.makeTimecardEntryInactive = function (data) {
        var endpoint = this.apiUrls.makeTimecardEntryInactive;
        var requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    ApiService.prototype.getLastTimecardEntry = function (data) {
        var endpoint = this.apiUrls.getLastTimecardEntry;
        var requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    return ApiService;
}());
ApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    /**
     * Data Access Service for the ctsApi and utilApi
     */
    ,
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], ApiService);

//# sourceMappingURL=api-service.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history_history__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alerts_alerts__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foreman_foreman__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__timecard_timecard__ = __webpack_require__(518);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TabsPage = (function () {
    function TabsPage(taskManager, userMgr) {
        this.taskManager = taskManager;
        this.userMgr = userMgr;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["b" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__history_history__["a" /* HistoryPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__alerts_alerts__["a" /* AlertsPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_7__timecard_timecard__["b" /* TimecardPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_6__foreman_foreman__["a" /* ForemanPage */];
        this.currentUser = '';
        this.disableTabs = false;
        this.foremanTab = false;
        this.isLessor = false;
        this.currentUser = this.userMgr.getUser();
        if (this.currentUser.role_id === 6) {
            this.disableTabs = true;
        }
        if (this.currentUser.role_id === 5 || this.currentUser.role_id === 2 || this.currentUser.role_id === 4) {
            this.foremanTab = true;
        }
        if (this.currentUser.is_lessor === 1) {
            this.isLessor = true;
        }
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/tabs/tabs.html"*/'<ion-tabs selectedIndex="0">\n    <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="fa-home"></ion-tab>\n    <div *ngIf="foremanTab">\n        <ion-tab [root]="tab5Root" tabTitle="Crews" tabIcon="fa-users"></ion-tab>\n    </div>\n    <div *ngIf="!disableTabs">\n        <ion-tab [root]="tab2Root" tabTitle="History" tabIcon="fa-history"></ion-tab>\n        <ion-tab [root]="tab3Root" tabTitle="Alerts" tabIcon="fa-alert"\n                 [(tabBadge)]="taskManager.badgeNumber" tabBadgeStyle="danger"></ion-tab>\n        <div *ngIf="!isLessor">\n            <ion-tab [root]="tab4Root" tabTitle="Timecard" tabIcon="fa-clock-o"></ion-tab>\n        </div>\n    </div>\n\n</ion-tabs>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/tabs/tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_5__providers_user_manager__["a" /* UserManager */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 183;

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_md5_dist_md5__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_md5_dist_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ts_md5_dist_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_reject_notes_reject_notes__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Utils = (function () {
    function Utils(loadingCtrl, alertCtrl, plt, toastCtrl, modalCtrl) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.plt = plt;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingIsPresent = false;
        this.homePage = 0;
        /**
         * display a toast error
         * @Param error:string the error message
         * @Return: void
         */
        this.toastError = function (error) {
            var msg = 'An unknown error has occurred';
            if (error.msg) {
                msg = error.msg;
            }
            _this.presentToast(msg, true, 'OK');
        };
    }
    /**
     * utility function for JSON.stringify
     * @Param o:jsonObject the obj you want to stringify
     * @Param pretty:boolean pretty print y/n
     */
    Utils.toJson = function (o, pretty) {
        pretty = pretty || false;
        return pretty ? JSON.stringify(o, null, '\t') : JSON.stringify(o);
        //return JSON.stringify(o, )
    };
    /**
     * utility function to md5 hash a string
     * @Param str:string the string you want to hash
     */
    Utils.md5hashStr = function (str) {
        var md5str = __WEBPACK_IMPORTED_MODULE_2_ts_md5_dist_md5__["Md5"].hashStr(str, false);
        return md5str;
    };
    /**
     * presents a loading spinner
     * @Param content:string the spinner caption
     * @Return: void
     */
    Utils.prototype.presentLoading = function (content) {
        var _this = this;
        var opts = {
            content: content || 'Tap the background to dismiss loading',
            enableBackdropDismiss: true,
            spinner: 'dots',
        };
        this.loading = this.loadingCtrl.create(opts);
        this.loading.present().then(function (response) {
            _this.loadingIsPresent = true;
        });
    };
    /**
     * dismiss a loading spinner
     * @Return: void
     */
    Utils.prototype.dismissLoading = function () {
        this.loading.dismissAll() || console.log('Unable to dismiss loading...');
    };
    /**
     * presents a toast
     * @Param message:string the toast msg
     * @Param showCloseButton:boolean optional show the closed button display
     * @Param closeButtonTest:string optional the close button text, usually 'X' or 'OK'
     * @Return: void
     */
    Utils.prototype.presentToast = function (message, showCloseButton, closeButtonText, dur) {
        var options = {
            message: message,
            position: 'bottom',
            showCloseButton: (showCloseButton || false),
            closeButtonText: (closeButtonText || 'OK'),
            duration: (dur || 5000)
        };
        var toast = this.toastCtrl.create(options);
        toast.present();
    };
    /**
     * presents rejects notes modal
     * put it here b/c for modularity and code reuse
     * @Return: void
     */
    Utils.prototype.presentRejectNotesModal = function () {
        this.modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_reject_notes_reject_notes__["a" /* RejectNotesPage */]);
        this.modal.present();
        return this.modal;
    };
    /** dismiss whatever modal we've presented */
    Utils.prototype.dismissModal = function () {
        this.modal.dismiss();
    };
    //Return false when testing on a browser
    //Return true when building for iOS or Android
    Utils.prototype.FCMFlagDebug = function () {
        return this.plt.is('cordova');
    };
    return Utils;
}());
Utils = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], Utils);

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 228:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 228;

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_service__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import {StorageService} from './storage-service';


var TaskManager = (function () {
    function TaskManager(userMgr, apiService, platform, utils) {
        var _this = this;
        this.userMgr = userMgr;
        this.apiService = apiService;
        this.platform = platform;
        this.utils = utils;
        this.taskStatuses = {};
        this.badgeNumber = 0;
        this.holdObject = {};
        this.homePage = 0;
        this.isAndroid = false;
        this.isIos = false;
        this.crewsTab = false;
        this.isCordova = false;
        this.markEmployeeAlertRead = function (data) {
            return new Promise(function (resolve, reject) {
                _this.apiService.markEmployeeAlertRead(data).then(function (response) {
                    resolve(response);
                }).catch(function (error) {
                    reject({ msg: 'Unable to load history' });
                });
            });
        };
        // helper method to make some of the promise code a little cleaner //
        this.resolveAsPromise = function (obj) {
            return new Promise(function (resolve, reject) {
                resolve(obj);
            });
        };
        //  * just calls api.postTaskFeedback, no image uploading
        this.updateNextDayTaskStatus = function (data) {
            data.userId = _this.userId;
            return new Promise(function (resolve, reject) {
                var myMessage = "success";
                _this.apiService.postTaskFeedback(data).then(function (json) {
                    var response = JSON.parse(JSON.stringify(json));
                    if (response.code != 0) {
                        var msg = "Could not update task status: " + response.msg;
                        _this.utils.presentToast(msg, true, 'X');
                        return _this.resolveAsPromise(false);
                    }
                    else if (data.statusId === 3) {
                        return myMessage;
                    }
                    else if (data.statusId === 8) {
                        return myMessage;
                    }
                    else if (data.statusId === 9) {
                        return myMessage;
                    }
                    else {
                        var msg = "Could not update task status: " + response.msg;
                        _this.utils.presentToast(msg, true, 'X');
                        resolve(false);
                    }
                }).then(function (response) {
                    resolve(response);
                });
            });
        };
        //  * just calls api.postTaskFeedback, no image uploading
        this.updateTaskStatus = function (data) {
            data.userId = _this.userId;
            data.taskId = _this.currentTask.job_tasks.id;
            return new Promise(function (resolve, reject) {
                _this.apiService.postTaskFeedback(data).then(function (json) {
                    var response = JSON.parse(JSON.stringify(json));
                    if (response.code != 0) {
                        var msg = "Could not update task status: " + response.msg;
                        _this.utils.presentToast(msg, true, 'X');
                        return _this.resolveAsPromise(false);
                    }
                    else if (data.statusId === 3) {
                        // ACCEPTED //
                        _this.currentTask.statusId = 3;
                        return _this.currentTask;
                    }
                    else if (data.statusId === 4) {
                        // STARTED //
                        _this.currentTask.statusId = 4;
                        return _this.currentTask;
                    }
                    else if (data.statusId === 5) {
                        // DELAYED //
                        _this.currentTask.statusId = 5;
                        return _this.resolveAsPromise(_this.currentTask);
                    }
                    else if (data.statusId === 6) {
                        // ON HOLD //
                        _this.currentTask.statusId = 6;
                        return _this.resolveAsPromise(_this.currentTask);
                    }
                    else if (data.statusId === 7) {
                        // EMERGENCY //
                        _this.currentTask.statusId = 7;
                        return _this.resolveAsPromise(_this.currentTask);
                    }
                    else if (data.statusId === 8) {
                        // REJECTED //
                        _this.currentTask.statusId = 8;
                        return _this.resolveAsPromise(_this.currentTask);
                    }
                    else if (data.statusId === 9) {
                        // COMPLETED //
                        _this.currentTask.statusId = 9;
                        return _this.resolveAsPromise(_this.currentTask);
                    }
                    else if (data.statusId === 12) {
                        // Laborer On Hold //
                        _this.currentTask.statusId = 12;
                        return _this.resolveAsPromise(_this.currentTask);
                    }
                    else if (data.statusId === 13) {
                        // Timecard Pause //
                        _this.currentTask.statusId = 13;
                        return _this.resolveAsPromise(_this.currentTask);
                    }
                    else {
                        // UNKNOWN statusId //
                        var msg = "Could not update task status: " + response.msg;
                        _this.utils.presentToast(msg, true, 'X');
                        resolve(false);
                    }
                }).then(function (response) {
                    resolve(response);
                });
            });
        };
        //  * just calls api.postTaskFeedback, no image uploading
        this.resumeOnHoldTask = function (data) {
            return new Promise(function (resolve, reject) {
                _this.apiService.postTaskFeedback(data).then(function (json) {
                    var response = JSON.parse(JSON.stringify(json));
                    if (response.code != 0) {
                        //something happened, show a toast :)
                        var msg = "Could not update task status: " + response.msg;
                        _this.utils.presentToast(msg, true, 'X');
                        //resolve(false);
                        return _this.resolveAsPromise(false);
                    }
                    else if (data.statusId === 4) {
                        // ACCEPTED //
                        _this.currentTask.statusId = 4;
                        return _this.currentTask;
                    }
                    else {
                        // UNKNOWN statusId //
                        var msg = "Could not update task status: " + response.msg;
                        _this.utils.presentToast(msg, true, 'X');
                        resolve(false);
                    }
                }).then(function (response) {
                    resolve(response);
                });
            });
        };
        if (this.platform.is('android')) {
            this.isAndroid = true;
        }
        if (this.platform.is('ios')) {
            this.isIos = true;
        }
        if (this.platform.is('cordova')) {
            this.isCordova = true;
        }
    }
    TaskManager.prototype.returnPlatform = function () {
        return { isIos: this.isIos, isAndroid: this.isAndroid, isCordova: this.isCordova };
    };
    TaskManager.prototype.saveEmergencyInfo = function (taskId, projectId, crewsBool) {
        this.crewsTab = crewsBool;
        this.emergencyTaskId = taskId;
        this.emergencyProjectId = projectId;
        console.log('this.crewsTab in tskMgr ', JSON.stringify(this.crewsTab));
        console.log('this.emergencyTaskId in tskMgr ', JSON.stringify(this.emergencyTaskId));
        console.log('this.emergencyProjectId in tskMgr ', JSON.stringify(this.emergencyProjectId));
    };
    TaskManager.prototype.returnEmergencyInfo = function () {
        return { taskId: this.emergencyTaskId, projectId: this.emergencyProjectId, crewEmergency: this.crewsTab };
    };
    //  * method for creating a taskUserlog and handling response and errors
    TaskManager.prototype.createTaskUserLog = function (postData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiService.postTaskFeedback(postData).then(function (response) {
            }).catch(function (error) {
                reject({ error: true, msg: 'An error has occurred submitting your information', raw: error });
            });
        });
    };
    TaskManager.prototype.setUser = function () {
        this.currentUser = this.userMgr.getUser();
        this.userId = this.userMgr.getUserId();
        console.log('this.currentUser in Task Manager ', JSON.stringify(this.currentUser));
        console.log('this.userId Task Manager ', JSON.stringify(this.userId));
    };
    TaskManager.prototype.updateEmployeeToken = function (newToken, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                userId: userId || _this.userId,
                token: newToken
            };
            _this.apiService.updateEmployeeToken(data).then(function (response) {
                _this.hasToken = response;
                resolve(_this.hasToken);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    //  * gets current task for logged in user
    //  * then gets the taskUserLog for the task
    //  * @Returns: Promise:any
    TaskManager.prototype.getCurrentTaskRemote = function () {
        var _this = this;
        this.currentUser = this.userMgr.getUser();
        this.userId = this.userMgr.getUserId();
        var currentTaskResponse;
        return new Promise(function (resolve, reject) {
            var data = { userId: _this.userId };
            _this.apiService.loadCurrentTask(data).then(function (response) {
                var task = response;
                currentTaskResponse = {
                    "task": task.data.hasOwnProperty('id') ? task.data : null,
                    "user": _this.currentUser
                };
                _this.currentTask = task.data;
                if (_this.currentTask.job_tasks) {
                    Number(_this.currentTask.job_tasks.task_start_time);
                }
                // have we received a task? //
                if (task.data.hasOwnProperty('id')) {
                    // load the task user log
                    return _this.loadTaskUserLog();
                }
                else {
                    //no task found
                    reject();
                }
            }).then(function (response) {
                var json = response;
                currentTaskResponse.task.job_tasks.task_user_log = json.data;
                resolve(currentTaskResponse);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    ;
    //  * call to loadTaskUserLog
    TaskManager.prototype.loadTaskUserLog = function () {
        var data = {
            "userId": this.userId,
            "taskId": this.currentTask.job_tasks.id
        };
        return this.apiService.loadTaskUserLog(data);
    };
    TaskManager.prototype.loadSpecificTaskUserLog = function (empId, taskId) {
        var data = {
            "userId": empId,
            "taskId": taskId
        };
        return this.apiService.loadTaskUserLog(data);
    };
    //  * call to loadTaskUserLog
    TaskManager.prototype.loadTaskUserLogArray = function (taskID, userId) {
        var data = {
            "userId": userId,
            "taskId": taskID
        };
        return this.apiService.loadTaskUserNotes(data);
    };
    TaskManager.prototype.checkEmployeeAlerts = function () {
        var _this = this;
        console.log("Checked Alerts again");
        return new Promise(function (resolve, reject) {
            var demo = {
                'userId': _this.userId,
            };
            var num = 0;
            //make the api request
            _this.apiService.checkEmployeeAlerts(demo).then(function (response) {
                _this.holdObject = response;
                _this.badgeNumber = _this.holdObject.data.new_alert_count;
                resolve(response);
                return num;
            }).catch(function (error) {
                reject({ msg: 'Unable to load Alerts' });
            });
        });
    };
    TaskManager.prototype.numOfNewAlerts = function (alerts) {
        var data = alerts.data;
        var num = 0;
        for (var i in data) {
            if (data[i].viewed === 0) {
                num += 1;
            }
        }
        this.badgeNumber = num;
        return num;
    };
    TaskManager.prototype.getEmployeeAlerts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': _this.userId,
                'dateStart': new Date((Date.now() - 259200000)),
                'dateEnd': new Date((Date.now() + 86400000))
            };
            _this.apiService.loadEmployeeAlerts(data).then(function (response) {
                _this.numOfNewAlerts(response);
                resolve(response);
            }).catch(function (error) {
                reject({ msg: 'Unable to load Alerts' });
            });
        });
    };
    //  * gets the remote task history
    //  * @Returns: Promise
    TaskManager.prototype.getTaskHistoryRemoteV2 = function (userId, statusId) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': userId,
                'statusId': statusId,
                'dateStart': new Date((Date.now() - 432000000)),
                'dateEnd': new Date(Date.now() + 86400000)
            };
            _this.apiService.loadTaskHistoryV2(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    TaskManager.prototype.getPausedTasks = function (userId, statusId) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': userId,
                'statusId': statusId,
                'dateStart': new Date(Date.now()),
                'dateEnd': new Date(Date.now() + 86400000)
            };
            console.log("Date Check start " + data.dateStart);
            console.log("Date Check end " + data.dateEnd);
            _this.apiService.loadTaskHistoryV2(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    TaskManager.prototype.loadNextDayTaskByDate = function (userId) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': userId
            };
            _this.apiService.loadNextDayTaskByDate(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    TaskManager.prototype.loadLaborerTasks = function (userId) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': userId
            };
            _this.apiService.loadLaborerTasks(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    TaskManager.prototype.loadForemanTasks = function (date) {
        var _this = this;
        var task;
        return new Promise(function (resolve, reject) {
            var data = {
                'userId': _this.userId,
                'dateStart': date
            };
            console.log('data ', JSON.stringify(data));
            _this.apiService.loadForemanTasks(data).then(function (response) {
                task = response;
            }).then(function (response) {
                resolve(task);
            }).catch(function (error) {
                reject({ msg: 'Unable to load history' });
            });
        });
    };
    // authenticate user and handles response //
    TaskManager.prototype.authenticateUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //resolve(this.tmpData.data.authenticateUser);
            _this.apiService.authenticate({}).then(function (json) {
                resolve(json);
            }).catch(function (error) {
                console.log("ERROR: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(error));
                // this.utils.toastError(error);
                reject(error);
            });
        });
    };
    // gets the task statuses //
    TaskManager.prototype.getTaskStatuses = function (filterStatus, systemOnly) {
        return this.taskStatuses;
    };
    //  * get the feedback statuses
    TaskManager.prototype.getFeedbackStatuses = function () {
        this.taskStatuses.filter(function (status) {
            return status.id;
        });
    };
    /**
     * posts feedback with images
     * @Input: feedback object
     */
    TaskManager.prototype.postFeedback = function (feedback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiService.postTaskFeedback(feedback).then(function (response) {
                var r = response;
                return _this.postFeedbackImages(r.msg, feedback.files);
            }).then(function (response) {
                resolve(true);
            });
        });
    };
    TaskManager.prototype.postHistoryFeedback = function (feedback) {
        var _this = this;
        // add current user id and current task id to feedback object //
        feedback.userId = this.userId;
        //call the api //
        return new Promise(function (resolve, reject) {
            _this.apiService.postTaskFeedback(feedback).then(function (response) {
                var r = response;
                return _this.postFeedbackImages(r.msg, feedback.files);
            }).then(function (response) {
                resolve(true);
            });
        });
    };
    // * calls the api to post feedback images
    TaskManager.prototype.postFeedbackImages = function (feedbackId, images) {
        var promises = [];
        if (images.length == 0) {
            return new Promise(function (resolve, reject) {
                resolve(true);
            });
        }
        else {
            for (var i = 0; i < images.length; i++) {
                if (this.platform.is('cordova')) {
                    promises.push(this.apiService.postTaskFeedbackImageNative(feedbackId, images[i]));
                }
                else {
                    promises.push(this.apiService.postTaskFeedbackImage(feedbackId, images[i]));
                }
            }
            return Promise.all(promises);
        }
    };
    TaskManager.prototype.resetPassword = function (userEmail) {
        var _this = this;
        this.apiService.sendPasswordReset({ email: userEmail }).then(function (response) {
            if (response.code === 0) {
                var msg = "An email has been sent to " + userEmail;
                _this.utils.presentToast(msg, true, 'OK');
                _this.utils.dismissLoading();
            }
            else {
                var msg = " " + userEmail + " is not a valid email address ";
                _this.utils.presentToast(msg, true, 'OK');
                _this.utils.dismissLoading();
            }
        });
    };
    TaskManager.prototype.createTimecardEntry = function (empId, inLat, inLon, myStatus, inNotes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId,
                lat: inLat,
                lon: inLon,
                status: myStatus,
                notes: inNotes
            };
            _this.apiService.createTimecardEntry(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.loadTodaysTime = function (empId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId,
                'dateStart': new Date(Date.now()),
                'dateEnd': new Date(Date.now() + 86400000)
            };
            _this.apiService.loadTimecardData(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.updateTimecard = function (empId, timecardId, updatedTime, notes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                'employee_id': empId,
                'id': timecardId,
                'alt_timestamp': updatedTime,
                'notes': notes || null
            };
            console.log('data ', JSON.stringify(data));
            _this.apiService.updateTimecard(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.timecardSearch = function (empId, start, end) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId,
                'dateStart': start,
                'dateEnd': end
            };
            _this.apiService.loadTimecardData(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.loadTimeCardTotal = function (empId, start, end) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId,
                'dateStart': start,
                'dateEnd': end
            };
            _this.apiService.loadTimeCardTotal(data).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.getLastTimecardEntry = function (empId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                employee_id: empId
            };
            _this.apiService.getLastTimecardEntry(data).then(function (response) {
                console.log('Timecard response ', JSON.stringify(response));
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TaskManager.prototype.validateEmail = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiService.validateEmail(data).then(function (response) {
                console.log("valid email");
                resolve(response);
            }).catch(function (error) {
                console.log('error updating timecard');
                reject(error);
            });
        });
    };
    TaskManager.prototype.loadHomePage = function (input) {
        this.homePage = input;
        console.log('this.homePage ', JSON.stringify(this.homePage));
    };
    TaskManager.prototype.reportHomePage = function () {
        return this.homePage;
    };
    return TaskManager;
}());
TaskManager = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__user_manager__["a" /* UserManager */],
        __WEBPACK_IMPORTED_MODULE_3__api_service__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */]])
], TaskManager);

// loadNextDayTask() {
//     let nextDayTaskResponse: any;
//     return new Promise((resolve, reject) => {
//         let user = this.userMgr.getUser();
//         //let token = this.userMgr.getToken();
//         let data = {userId: user.userId};
//         this.apiService.loadNextDayTask(data).then(response => {
//             let task: any = response;
//             nextDayTaskResponse = {
//                 "task": task.data,
//                 "user": user
//             };
//             this.tomorrowsTask = task;
//             if (this.tomorrowsTask.job_tasks) {
//                 Number(this.tomorrowsTask.job_tasks.task_start_time);
//             }
//             this.currentUser = user;
//         })
//             .then(response => {
//                 resolve(nextDayTaskResponse);
//             }).catch(error => {
//             reject(error);
//         })
//     })
// };
// createNewTimecardEntry(empId, myStatus, altTime, inNotes?: any) {
//     return new Promise((resolve, reject) => {
//         let data = {
//             employee_id: empId,
//             alt_timestamp: altTime,
//             status: myStatus,
//             notes: inNotes || "NULL"
//         };
//
//         this.apiService.createTimecardEntry(data).then(response => {
//             console.log("a new entry has been created");
//             resolve(response)
//         }).catch(error => {
//             console.log('error updating timecard');
//             reject(error);
//         })
//     })
// }
// deleteTimecardEntry(empId, entryId) {
//     return new Promise((resolve, reject) => {
//         let data = {
//             employee_id: empId,
//             id: entryId
//
//         };
//
//         console.log('data in task manager ', JSON.stringify(data));
//
//         this.apiService.makeTimecardEntryInactive(data).then(response => {
//             console.log("That is now inactive");
//             resolve(response)
//         }).catch(error => {
//             console.log('error updating timecard');
//             reject(error);
//         })
//     })
// }
//# sourceMappingURL=task-manager.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RejectNotesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
        this.lastCheck = new Date().getTime();
    };
    /** used to enable/disable the submit button */
    RejectNotesPage.prototype.checkNotes = function () {
        // return true if trimmed notes are longer than 6
        return this.data.notes.trim().length < 6;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-reject-notes',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/reject-notes/reject-notes.html"*/'\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Reject Task</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n    <ion-card>\n        <ion-card-content>\n            <ion-grid>\n                <ion-row>\n                    <ion-col>\n                        <div><strong>Enter Your Notes</strong> (please be descriptive)</div>\n                        <ion-textarea [(ngModel)]="data.notes" placeholder="" (blur)="trimNotes()"></ion-textarea>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-card-content>\n\n\n        <ion-row style="background-color:white">\n            <ion-col width-50>\n                <button ion-button icon-left block color="secondary" (click)="save()" [disabled]="checkNotes()">\n                    <ion-icon name="checkbox-outline"></ion-icon>\n                    Save\n                </button>\n            </ion-col>\n            <ion-col width-50>\n                <button ion-button icon-left block color="dark" (click)="cancel()">\n                    <ion-icon name="close"></ion-icon>\n                    Cancel\n                </button>\n            </ion-col>\n        </ion-row>\n\n\n    </ion-card>\n\n    <ion-card class="fixed-height">\n\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/reject-notes/reject-notes.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
], RejectNotesPage);

//# sourceMappingURL=reject-notes.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StorageService = (function () {
    function StorageService(storage) {
        this.storage = storage;
        console.log('Hello StorageService Provider');
    }
    StorageService.prototype.add = function (key, value) {
        return this.createOrUpdate(key, value);
    };
    StorageService.prototype.update = function (key, value) {
        return this.createOrUpdate(key, value);
    };
    StorageService.prototype.createOrUpdate = function (key, value) {
        return this.storage.set(key, value);
    };
    StorageService.prototype.get = function (key) {
        return this.storage.get(key);
    };
    StorageService.prototype.delete = function (key) {
        return this.storage.remove(key);
    };
    StorageService.prototype.getAllKeys = function () {
        return this.storage.keys();
    };
    return StorageService;
}());
StorageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    /** methods for reading and writing from storage */
    ,
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["a" /* Storage */]])
], StorageService);

//# sourceMappingURL=storage-service.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storage_service__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_service__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserManager = (function () {
    function UserManager(storage, api) {
        this.storage = storage;
        this.api = api;
        this.authenticated = false;
        this.token = null;
        this.credentials = null;
        this.user = null;
        console.log('Hello UserManager Provider');
    }
    UserManager.prototype.isLoggedIn = function () {
        return this.authenticated;
    };
    UserManager.prototype.initializeVars = function () {
        var _this = this;
        return Promise.all([
            this.initialize('credentials', function (response) {
                _this.credentials = response;
            }),
            this.initialize('user', function (response) {
                _this.user = response;
            }),
            this.initialize('token', function (response) {
                _this.token = response;
            })
        ]);
    };
    UserManager.prototype.initialize = function (key, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getStorageKey(key).then(function (response) {
                callback(response);
                resolve(true);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    UserManager.prototype.authenticate = function (credentials) {
        var _this = this;
        //md5 hash the password
        credentials.password = __WEBPACK_IMPORTED_MODULE_2__utils_utils__["a" /* Utils */].md5hashStr(credentials.password);
        return new Promise(function (resolve, reject) {
            _this.api.authenticate(credentials).then(function (response) {
                if (response.hasOwnProperty('userdata')) {
                    //RESPONSE IS VALID
                    var data = response;
                    _this.user = data.userdata;
                    _this.token = data.jwt;
                    _this.credentials = credentials;
                    Promise.all([_this.setStorageKey('credentials', _this.credentials), _this.setStorageKey('user', _this.user), _this.setStorageKey('token', _this.token)]).then(function (values) {
                        resolve(true);
                    });
                }
                else {
                    //NOPE
                    resolve(false);
                }
            });
        });
    };
    UserManager.prototype.logout = function () {
        return Promise.all([
            this.deleteStorageKey('user'),
            this.deleteStorageKey('token'),
            this.deleteStorageKey('credentials'),
            this.deleteStorageKey('timecardStatus')
        ]);
    };
    UserManager.prototype.getToken = function () {
        return this.token;
    };
    UserManager.prototype.setToken = function (token) {
        this.token = token;
    };
    UserManager.prototype.getCredentials = function () {
        return this.credentials;
    };
    UserManager.prototype.setCredentials = function (credentials) {
        this.credentials = credentials;
    };
    UserManager.prototype.getUser = function () {
        return this.user;
    };
    UserManager.prototype.getUserId = function () {
        return this.user.userId;
    };
    UserManager.prototype.setUser = function (user) {
        this.user = user;
    };
    UserManager.prototype.setStorageKey = function (key, value) {
        return this.storage.createOrUpdate(key, value);
    };
    UserManager.prototype.getStorageKey = function (key) {
        return this.storage.get(key);
    };
    UserManager.prototype.deleteStorageKey = function (key) {
        return this.storage.delete(key);
    };
    UserManager.prototype.getAllStorage = function () {
        return this.storage.getAllKeys();
    };
    UserManager.prototype.checkForToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function (token) {
                if (token) {
                    _this.token = token;
                    resolve(token);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    UserManager.prototype.checkForCredentials = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getStorageKey('credentials').then(function (credentials) {
                if (credentials) {
                    _this.credentials = credentials;
                    resolve(credentials);
                }
                else {
                    _this.credentials = null;
                    resolve(null);
                }
            });
        });
    };
    return UserManager;
}());
UserManager = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__storage_service__["a" /* StorageService */], __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */]])
], UserManager);

//# sourceMappingURL=user-manager.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversionManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_manager__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConversionManager = (function () {
    function ConversionManager(userMgr) {
        this.userMgr = userMgr;
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
ConversionManager = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_manager__["a" /* UserManager */]])
], ConversionManager);

//# sourceMappingURL=conversion-manager.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeKeysPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_backbutton__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__driving_directions_driving_directions__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_full_screen__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__feedback_feedback__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_google_maps_manager__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__animations_animations__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_diagnostic__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__next_day_tasks_next_day__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__complete_notes_complete_notes__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_badge__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_in_app_browser__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_conversion_manager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_fcm__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_unique_device_id__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_sim__ = __webpack_require__(511);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};























var HomeKeysPipe = (function () {
    function HomeKeysPipe() {
    }
    HomeKeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value);
    };
    return HomeKeysPipe;
}());
HomeKeysPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'keys', pure: false })
], HomeKeysPipe);

var HomePage = (function () {
    function HomePage(navCtrl, taskMgr, plt, navParams, mapsManager, userMgr, appCtrl, geolocation, utils, callNumber, androidFullScreen, diagnostic, badge, iab, _backBtn, alertCtrl, conMgr, fcm, uniqueDeviceID, sim) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.taskMgr = taskMgr;
        this.plt = plt;
        this.navParams = navParams;
        this.mapsManager = mapsManager;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.geolocation = geolocation;
        this.utils = utils;
        this.callNumber = callNumber;
        this.androidFullScreen = androidFullScreen;
        this.diagnostic = diagnostic;
        this.badge = badge;
        this.iab = iab;
        this._backBtn = _backBtn;
        this.alertCtrl = alertCtrl;
        this.conMgr = conMgr;
        this.fcm = fcm;
        this.uniqueDeviceID = uniqueDeviceID;
        this.sim = sim;
        this.debug = true;
        this.currentTask = '';
        this.currentUser = '';
        this.hideMoreProject = true;
        this.divState = 'hide';
        this.isIos = false;
        this.isAndroid = false;
        this.desktop = false;
        this.myData = {};
        this.showTasks = false;
        this.userRole = 0;
        this.laborerTasks = '';
        this.expandTaskId = -1;
        this.taskId = -1;
        this.myAlerts = 0;
        this.showTimecard = false;
        this.isLessor = false;
        this.complete = false;
        this.fcmToken = '';
        // sets the status of the task using TaskManager
        // then loads the current task from the API
        this.setStatus = function (statusId, notes, showLoading) {
            showLoading = showLoading || false;
            if (statusId === 3) {
                var data = _this.dataFunction(notes, statusId);
                if (showLoading) {
                    _this.utils.presentLoading();
                }
                _this.taskMgr.updateTaskStatus(data).then(function (response) {
                    _this.setCurrentTask(true);
                }).catch(function (error) {
                    if (_this.debug) {
                        console.log("ERROR: " + __WEBPACK_IMPORTED_MODULE_12__utils_utils__["a" /* Utils */].toJson(error));
                    }
                });
            }
            else if (statusId === 4 ||
                statusId === 5 ||
                statusId === 6 ||
                statusId === 7 ||
                statusId === 9 ||
                statusId === 10 ||
                statusId === 13) {
                if (showLoading) {
                    _this.utils.presentLoading();
                }
                if (_this.desktop) {
                    var data = _this.dataFunction(notes, statusId, null, null);
                    if (data.statusId === 6 || data.statusId === 9) {
                        _this.showTasks = false;
                        _this.taskMgr.updateTaskStatus(data).then(function (response) {
                            _this.setCurrentTask(false);
                        }).catch(function (error) {
                            if (_this.debug) {
                                console.log("ERROR: " + __WEBPACK_IMPORTED_MODULE_12__utils_utils__["a" /* Utils */].toJson(error));
                            }
                        });
                    }
                    else if (data.statusId < 8 || data.statusId === 10 || data.statusId === 13) {
                        _this.taskMgr.updateTaskStatus(data).then(function (response) {
                            _this.setCurrentTask(false);
                        }).catch(function (error) {
                            if (_this.debug) {
                                console.log("error " + error);
                            }
                        });
                    }
                }
                else {
                    var data = _this.dataFunction(notes, statusId, _this.lat, _this.lon);
                    if (data.statusId === 6 || data.statusId === 9) {
                        _this.showTasks = false;
                        _this.taskMgr.updateTaskStatus(data).then(function (response) {
                            _this.setCurrentTask(false);
                        }).catch(function (error) {
                            if (_this.debug) {
                                console.log("error " + error);
                            }
                        });
                    }
                    else if (data.statusId < 8 || data.statusId === 10 || data.statusId === 13) {
                        _this.taskMgr.updateTaskStatus(data).then(function (response) {
                            _this.setCurrentTask(false);
                        }).catch(function (error) {
                            if (_this.debug) {
                                console.log("error " + error);
                            }
                        });
                    }
                }
            }
            else if (statusId === 8) {
                var data = _this.dataFunction(notes, statusId);
                _this.taskMgr.updateTaskStatus(data).then(function (response) {
                    _this.showTasks = false;
                    _this.setCurrentTask(false);
                }).catch(function (error) {
                    if (_this.debug) {
                        console.log("error " + error);
                    }
                });
            }
            _this.utils.dismissLoading();
        };
        this.setLaborerStatus = function (statusId, taskId, dateKey, taskIndex, notes) {
            if (statusId === 3) {
                _this.laborerTasks.data[dateKey][taskIndex].status_id = 3;
                var data = {
                    notes: notes || '',
                    statusId: statusId,
                    files: [],
                    timestamp: new Date(Date.now()),
                    taskId: taskId
                };
                _this.utils.presentLoading();
                _this.taskMgr.updateNextDayTaskStatus(data).then(function (response) {
                    _this.utils.dismissLoading();
                }).catch(function (error) {
                    if (_this.debug) {
                        console.log("ERROR: " + __WEBPACK_IMPORTED_MODULE_12__utils_utils__["a" /* Utils */].toJson(error));
                    }
                    _this.utils.dismissLoading();
                });
            }
            else if (statusId === 8) {
                _this.laborerTasks.data[dateKey][taskIndex].status_id = 8;
                var data = {
                    notes: notes || '',
                    statusId: statusId,
                    files: [],
                    timestamp: new Date(Date.now()),
                    taskId: taskId
                };
                _this.utils.presentLoading();
                _this.taskMgr.updateNextDayTaskStatus(data).then(function (response) {
                    _this.utils.dismissLoading();
                }).catch(function (error) {
                    if (_this.debug) {
                        console.log("ERROR: " + __WEBPACK_IMPORTED_MODULE_12__utils_utils__["a" /* Utils */].toJson(error));
                    }
                    _this.utils.dismissLoading();
                });
            }
        };
        plt.ready().then(function () {
            _this.plt.pause.subscribe(function () {
                if (_this.debug) {
                    console.log('[INFO] App paused');
                }
            });
            _this.plt.resume.subscribe(function () {
                _this.setLocation();
                if (_this.debug) {
                    console.log('[INFO] App resumed');
                }
            });
        });
        if (this.plt.is('cordova')) {
            this.uniqueDeviceID.get()
                .then(function (uuid) { return console.log('uuid - ' + uuid); })
                .catch(function (error) { return console.log('unique id error - ' + error); });
        }
        if (this.plt.is('cordova')) {
            fcm.getToken().then(function (token) {
                _this.fcmToken = token;
                if (_this.debug) {
                    console.log('FCM token 2 ', JSON.stringify(token));
                }
                _this.taskMgr.updateEmployeeToken(token).then(function (response) {
                });
            });
            fcm.onTokenRefresh().subscribe(function (token) {
                if (_this.debug) {
                    console.log('FCM token ', JSON.stringify(token));
                }
                _this.taskMgr.updateEmployeeToken(token).then(function (response) {
                });
            });
        }
        this.currentUser = this.userMgr.getUser();
        this.userRole = this.currentUser.role_id;
        if (this.currentUser.is_lessor === 1) {
            this.isLessor = true;
        }
        if (this.plt.is('core')) {
            this.desktop = true;
        }
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        if (this.isAndroid) {
            this.androidFullScreen.isImmersiveModeSupported()
                .then(function () { return _this.androidFullScreen.immersiveMode(); })
                .catch(function (error) { return console.log(error); });
        }
        this.hideMoreProject = true;
        this.divState = 'collapse';
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.setUser();
        setTimeout(function () { return _this.setCompany(); }, 500);
        this._backBtn.registerAction(function () {
            _this._backBtn.doubleBackToExit();
        }, 101);
        if (this.debug) {
            console.log("Platform Versions ", JSON.stringify(this.plt.versions()));
            console.log('Platform - ', JSON.stringify(this.plt.platforms()));
        }
        if (this.plt.is('cordova')) {
            setTimeout(function () { return _this.getSimInfo(); }, 10000);
        }
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.currentUser = this.userMgr.getUser();
        this.subscribeAgain();
        var tempNum = this.taskMgr.reportHomePage();
        if (tempNum === 0) {
            if (this.userRole === 6) {
                this.loadLaborersTasks();
            }
            else {
                this.setLocation();
                this.setCurrentTask(true);
                setTimeout(function () {
                    _this.setBadges();
                }, 3000);
            }
        }
        else if (tempNum === 1) {
            this.presentFutureAlert();
        }
        else if (tempNum === 2) {
            this.presentAlert();
        }
    };
    // helper method for the expand/collapse div animation
    HomePage.prototype.toggleDivState = function () {
        var states = {
            expand: 'collapse',
            collapse: 'expand'
        };
        this.divState = states[this.divState];
    };
    HomePage.prototype.getSimInfo = function () {
        var _this = this;
        this.sim.requestReadPermission().then(function () {
            console.log('Permission granted');
            _this.sim.getSimInfo().then(function (info) { return console.log('Sim info: ', info); }, function (err) { return console.log('Unable to get sim info: ', err); });
        }, function () { return console.log('Permission denied'); });
        // this.sim.hasReadPermission().then(
        //     (info) => console.log('Has permission: ', info)
        // );
    };
    //This sets the current user in the Task Manager so that when a user does not have a task the user ID is still available
    HomePage.prototype.setUser = function () {
        this.taskMgr.setUser();
    };
    HomePage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.navCtrl.parent.select(3);
                }
                else if (data.param1 === 'additional_notes') {
                    if (_this.showTasks === true) {
                        _this.presentAlert();
                    }
                }
                else if (data.param1 === "upcoming_task") {
                    _this.presentFutureAlert();
                }
                else if (data.param1 === 'crews') {
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    HomePage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: ['OK']
        });
        this.setCurrentTask(true);
        this.taskMgr.loadHomePage(0);
        alert.present();
    };
    HomePage.prototype.presentFutureAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Dispatched',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.taskMgr.loadHomePage(0);
                        _this.openNextDayTasks();
                    }
                }]
        });
        alert.present();
    };
    // /** logs the user out of the app */
    HomePage.prototype.logout = function () {
        var _this = this;
        if (this.timecardStatus === 1) {
            var alert_1 = this.alertCtrl.create({
                title: 'Timecard Alert!',
                cssClass: 'myAlerts',
                message: 'You are currently clocked in. Please clock out before logging out.',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var token = 'logged out';
            this.taskMgr.updateEmployeeToken(token, this.currentUser.userId).then(function (res) {
                console.log('res ', JSON.stringify(res));
            });
            this.userMgr.logout().then(function (response) {
                _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
            });
        }
    };
    HomePage.prototype.setBadges = function () {
        var _this = this;
        this.taskMgr.checkEmployeeAlerts().then(function (res) {
            _this.myAlerts = res.data.new_alert_count;
            _this.badge.set(_this.myAlerts);
        });
        this.requestPermission();
    };
    HomePage.prototype.requestPermission = function () {
        var hasPermission = this.badge.hasPermission();
        if (!hasPermission) {
            var permission = this.badge.registerPermission();
        }
    };
    HomePage.prototype.setCompany = function () {
        var holdingObject;
        holdingObject = this.currentUser;
        this.compName = holdingObject.company_name;
    };
    HomePage.prototype.getTimecardStatus = function () {
        var _this = this;
        this.taskMgr.getLastTimecardEntry(this.currentUser.userId).then(function (res) {
            if (res.data.length === 0) {
                _this.timecardStatus = 0;
            }
            else {
                _this.timecardStatus = res.data.status;
            }
        });
    };
    HomePage.prototype.presentLocationAlert = function () {
        var _this = this;
        var alertText = '';
        if (this.isAndroid) {
            alertText = 'Select OK to enable location on your device';
        }
        else if (this.isIos) {
            alertText = 'Location Services is enabled on your device but not for this app. Please open your device settings, scroll down and select clear-task-solutions-mobile, select Location, and then select the While Using the App option';
        }
        else {
            alertText = 'Select OK to enable location on your device';
        }
        var alert = this.alertCtrl.create({
            title: 'Location Required',
            message: alertText,
            cssClass: 'myAlerts',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        if (_this.isAndroid) {
                            _this.diagnostic.isLocationEnabled().then(function (res) {
                                if (res) {
                                    _this.diagnostic.isLocationAvailable().then(function (res) {
                                        if (_this.debug) {
                                            console.log('res for location ', JSON.stringify(res));
                                        }
                                    });
                                }
                                else if (res === false) {
                                    _this.diagnostic.switchToLocationSettings();
                                }
                            });
                        }
                        if (_this.isIos) {
                            _this.diagnostic.getLocationAuthorizationStatus().then(function (response) {
                                if (response === 'denied') {
                                    _this.setLocation();
                                }
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.setLocation = function () {
        var _this = this;
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.presentLocationAlert();
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please verify that your location settings are turned on", true);
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(function (resp) {
            if (locEnabled) {
                _this.geolocation.getCurrentPosition({ timeout: 40000 }).then(function (position) {
                    _this.lat = position.coords.latitude;
                    _this.lon = position.coords.longitude;
                }).catch(function (error) {
                    if (_this.debug) {
                        console.log('geo error ');
                    }
                });
            }
        }).catch(errorCallback);
    };
    HomePage.prototype.disableStart = function () {
        if (this.timecardStatus === 0) {
            return true;
        }
    };
    // function to replace writing this logic multiple times in this.setStatus
    HomePage.prototype.dataFunction = function (notes, statusId, lat, lon) {
        if (lat) {
            this.myData = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                lat: lat,
                lon: lon,
                timestamp: new Date(Date.now())
            };
        }
        else {
            this.myData = {
                notes: notes || '',
                statusId: statusId,
                files: [],
                timestamp: new Date(Date.now())
            };
        }
        return this.myData;
    };
    // sets the current task
    // @Param: optional showLoading:boolean show we show a loading spinner?
    HomePage.prototype.setCurrentTask = function (showLoading) {
        var _this = this;
        this.getTimecardStatus();
        this.setBadges();
        this.currentUser = this.userMgr.getUser();
        showLoading = showLoading || false;
        if (showLoading) {
            this.utils.presentLoading();
        }
        this.taskMgr.getCurrentTaskRemote().then(function (response) {
            _this.utils.dismissLoading();
            _this.data = response;
            _this.currentTask = _this.data.task;
            _this.currentUser = _this.data.user;
            if (_this.currentTask === []) {
                _this.showTasks = false;
            }
            else if (_this.currentTask.job_tasks.status_id === 2 ||
                _this.currentTask.job_tasks.status_id === 3 ||
                _this.currentTask.job_tasks.status_id === 4 ||
                _this.currentTask.job_tasks.status_id === 5 ||
                _this.currentTask.job_tasks.status_id === 7 ||
                _this.currentTask.job_tasks.status_id === 13) {
                _this.showTasks = true;
                console.log('this.currentTask ', JSON.stringify(_this.currentTask));
                // if (this.userRole === 1 || this.userRole === 2 || this.userRole === 4) {
                //     this.content.scrollTo(0, 79, 300)
                // }
            }
            else if (_this.currentTask.job_tasks.status_id === 8) {
                _this.showTasks = false;
            }
            else if (_this.currentTask.job_tasks.status_id === 9 || _this.currentTask.job_tasks.status_id === 6) {
                _this.taskMgr.getCurrentTaskRemote().then(function (response) {
                    _this.data = response;
                    _this.currentTask = _this.data.task;
                    _this.currentUser = _this.data.user;
                });
            }
        })
            .catch(function (error) {
            error = error || { error: 'is undefined' };
            _this.showTasks = false;
            _this.utils.dismissLoading();
            setTimeout(function () {
                if (!_this.currentTask.id) {
                    _this.showTasks = false;
                }
            }, 2500);
        });
    };
    // gets the directions, passes the directions as a param to
    // the driving directions page
    HomePage.prototype.showDrivingDirections = function (lat, lon) {
        var _this = this;
        this.utils.presentLoading();
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.utils.presentToast("Please verify that your location is turned on in your device settings", true);
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please verify that your location is turned on in your device settings", true);
            _this.utils.dismissLoading();
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(function (resp) {
            if (locEnabled) {
                var destination_1 = lat + "," + lon;
                _this.geolocation.getCurrentPosition({ timeout: 15000 }).then(function (position) {
                    var origin = position.coords.latitude + "," + position.coords.longitude;
                    return _this.mapsManager.getDirections(origin, destination_1);
                }).then(function (response) {
                    var params = {
                        directions: response
                    };
                    setTimeout(function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__driving_directions_driving_directions__["a" /* DrivingDirectionsPage */], params);
                        _this.utils.dismissLoading();
                    }, 2000);
                }).catch(function (error) {
                    _this.utils.dismissLoading();
                    if (_this.debug) {
                        console.log("ERROR: " + __WEBPACK_IMPORTED_MODULE_12__utils_utils__["a" /* Utils */].toJson(error));
                    }
                    _this.utils.presentToast("Please verify that your location is turned on in your device settings", true);
                });
            }
            if (locEnabled === false) {
                _this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    };
    // opens the reject task modal, handles the data passed back from the modal
    HomePage.prototype.openRejectModal = function () {
        var _this = this;
        var modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss(function (data) {
            if (data.save === true) {
                _this.setStatus(8, data.notes);
            }
        });
    };
    HomePage.prototype.openCompletePage = function () {
        this.complete = true;
        var params = {
            'task_id': this.currentTask.job_tasks.id,
            'user_id': this.currentUser.userId
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_16__complete_notes_complete_notes__["a" /* CompleteNotesPage */], params).then(function (res) {
        });
        return true;
    };
    // does not open a modal as the name might suggest.
    // Instead it navigates to a page
    HomePage.prototype.openFeedbackModal = function () {
        this.complete = true;
        var params = {
            'task_id': this.currentTask.job_tasks.id,
            'user_id': this.currentUser.userId
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__feedback_feedback__["a" /* FeedbackPage */], params).then(function (res) {
        });
        return true;
    };
    HomePage.prototype.openNextDayTasks = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__next_day_tasks_next_day__["b" /* NextDayPage */]).then(function (response) {
        });
        return true;
    };
    // laborer functions
    HomePage.prototype.loadLaborersTasks = function () {
        var _this = this;
        this.utils.presentLoading();
        this.taskMgr.loadLaborerTasks(this.currentUser.userId).then(function (response) {
            if (response.data === []) {
                _this.showTasks = false;
                _this.utils.dismissLoading();
            }
            else {
                _this.laborerTasks = response;
                _this.myFirstKey = _this.laborerTasks.data[Object.keys(_this.laborerTasks.data)[0]];
                if (_this.myFirstKey === undefined) {
                    _this.showTasks = false;
                    _this.utils.dismissLoading();
                }
                else {
                    _this.showTasks = true;
                    var firstKey = _this.laborerTasks.data[Object.keys(_this.laborerTasks.data)[0]];
                    firstKey.sort(function (a, b) {
                        return (a.task_start_time > b.task_start_time) ? 1 : ((b.task_start_time > a.task_start_time) ? -1 : 0);
                    });
                    _this.utils.dismissLoading();
                }
            }
        });
    };
    HomePage.prototype.openLaborerRejectModal = function (statusId, taskId, dateKey, taskIndex, notes) {
        var _this = this;
        var modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss(function (data) {
            if (data.save === true) {
                _this.setLaborerStatus(statusId, taskId, dateKey, taskIndex, data.notes);
            }
        });
    };
    HomePage.prototype.expandTask = function (id, index) {
        if (this.expandTaskId === id && this.taskId === index) {
            if (!this.isIos) {
                this.content.scrollTo(0, 0, 300).then(function (res) {
                });
            }
            this.expandTaskId = -1;
            this.taskId = -1;
        }
        else {
            if (!this.isIos) {
                this.content.scrollTo(0, ((index * 50) + 85), 300).then(function (res) {
                });
            }
            this.expandTaskId = id;
            this.taskId = index;
        }
    };
    HomePage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    HomePage.prototype.openInAppBrowser = function () {
        var options = "location=no";
        this.iab.create("https://www.cleartasksolutions.com/app/login/index.html", "_system", options);
    };
    HomePage.prototype.createTimecardEntry = function (status) {
        var _this = this;
        if (this.showTasks) {
            if (status === 0 && this.currentTask.job_tasks.status_id === 4) {
                var newNotes = "Clocked out while task was started";
                this.setStatus(13, newNotes, false);
            }
            if (status === 1 && this.currentTask.job_tasks.status_id === 13) {
                var newNotes = "Clocked in, resumed task";
                this.setStatus(4, newNotes, false);
            }
        }
        this.taskMgr.createTimecardEntry(this.currentUser.userId, this.lat, this.lon, status).then(function (res) {
            _this.timecardStatus = status;
            _this.showTimecard = false;
        });
    };
    HomePage.prototype.showClockInOut = function () {
        this.showTimecard = !this.showTimecard;
    };
    HomePage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('ctsNav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */])
], HomePage.prototype, "nav", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Content */])
], HomePage.prototype, "content", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/home/home.html"*/'<!--iOS header-->\n\n<ion-header *ngIf="isIos">\n    <ion-navbar>\n        <ion-row>\n            <ion-col width-50 class="bottom-pad">\n                <div text-center>\n                    <div class="main-title-ios">\n                        Current Task\n                    </div>\n                    <div text-nowrap class="company-name comp-wrap">\n                        {{compName}}\n                    </div>\n                </div>\n            </ion-col>\n            <ion-col width-25 class="mar-top13">\n                <ion-buttons class="mar-right6" end>\n                    <button class="refresh" ion-button round icon-right color="secondary"\n                            (click)="setCurrentTask(true)">\n                        Refresh\n                        <ion-icon class="logout-hide" name="refresh"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n            <ion-col width-25 class="mar-top13">\n                <ion-buttons class="mar-right6" end>\n                    <button class="logout" ion-button round icon-right color="danger" (click)="logout()"> Logout\n                        <ion-icon class="logout-hide" name="log-out"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n        </ion-row>\n    </ion-navbar>\n</ion-header>\n\n<!--android header-->\n\n<ion-header *ngIf="!isIos">\n    <ion-navbar>\n        <ion-row>\n            <ion-col width-50 class="bottom-pad">\n                <div text-center>\n                    <ion-title class="main-title-ios">\n                        Current Task\n                    </ion-title>\n                    <ion-title text-wrap class="company-name android-title">\n                        {{compName}}\n                    </ion-title>\n                </div>\n            </ion-col>\n            <ion-col width-25 class="mar-top10">\n                <ion-buttons class="mar-right6" end>\n                    <button class="refresh" ion-button round icon-right color="secondary"\n                            (click)="setCurrentTask(true)">\n                        Refresh\n                        <ion-icon class="logout-hide" name="refresh"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n            <ion-col width-25 class="mar-top10">\n                <ion-buttons class="mar-right6" end>\n                    <button class="logout" ion-button round icon-right color="danger" (click)="logout()"> Logout\n                        <ion-icon class="logout-hide" name="log-out"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n        </ion-row>\n    </ion-navbar>\n</ion-header>\n<ion-content footer *ngIf="userRole !== 6">\n\n\n    <ion-card class="manage-app" *ngIf="!isLessor">\n        <ion-card-header class="task-card-header time-font" (click)="showClockInOut()">\n\n            <div *ngIf="!showTimecard" text-center class="pad-top4">\n                <span class="hide-task">Timecard Status: </span>\n                <span class="show-task">Timecard:</span>\n                <span class="clockOut" *ngIf="timecardStatus === 0">Clocked Out</span><span\n                    class="clockIn"\n                    *ngIf="timecardStatus === 1">Clocked In</span>\n                <h3 class="orange">(Click here to clock <span *ngIf="timecardStatus === 0">in</span><span\n                        *ngIf="timecardStatus === 1">out</span>)</h3>\n            </div>\n            <div *ngIf="showTimecard">\n                <!--clock in-->\n                <div *ngIf="timecardStatus === 0">\n                    <ion-row class="clock-out">\n                        <ion-col width-30>\n                            <button class="home-btn" ion-button icon-left block\n                                    (click)="!showTimecard">\n                                Cancel\n                            </button>\n                        </ion-col>\n                        <ion-col width-70>\n                            <button class="home-btn" ion-button icon-left block color="secondary"\n                                    (click)="createTimecardEntry(1)">\n                                Clock In\n                            </button>\n                        </ion-col>\n                    </ion-row>\n                </div>\n                <!--clock out-->\n                <div *ngIf="timecardStatus === 1">\n                    <ion-row class="clock-out">\n                        <ion-col width-30>\n                            <button class="home-btn" ion-button icon-left block\n                                    (click)="!showTimecard">\n                                Cancel\n                            </button>\n                        </ion-col>\n                        <ion-col width-70>\n                            <button class="home-btn" ion-button icon-left block color="danger"\n                                    (click)="createTimecardEntry(0)">\n                                Clock Out\n                            </button>\n                        </ion-col>\n                    </ion-row>\n\n\n                </div>\n            </div>\n        </ion-card-header>\n\n    </ion-card>\n\n\n    <div *ngIf="showTasks">\n        <div *ngIf="currentTask">\n            <ion-card>\n                <ion-card-header class="task-card-header">\n                    Project Details - Live Deploy Test 3\n                </ion-card-header>\n                <ion-card-content class="task-card-content">\n                    <ion-list no-padding>\n                        <ion-item no-padding>\n                            <h4 class="project-name">\n                                {{currentTask.job_name}}\n                            </h4>\n                            <h4 class="contractor-main">Address:</h4>\n                            <h4 class="contractor-sub">\n                                {{currentTask.address}}\n                            </h4>\n                            <h4 class="contractor-sub">\n                                {{currentTask.city}}, {{currentTask.state}}&nbsp;{{currentTask.zip}}\n                            </h4>\n                        </ion-item>\n                    </ion-list>\n\n                    <ion-list no-padding text-wrap [@expandCollapse]="divState">\n                        <ion-item class="contractor-label" no-padding text-wrap [@expandCollapse]="divState">\n                            <h4 class="contractor-main" [@expandCollapse]="divState">Contractor:</h4>\n                            <h4 class="contractor-sub" [@expandCollapse]="divState">\n                                {{currentTask.contractor[0].name}}\n                            </h4>\n                            <h4 [@expandCollapse]="divState">\n                                <button ion-button icon-left clear medium\n                                        class="call-contractor"\n                                        (click)="callPhone(currentTask.contractor[0].office_phone)"\n                                        [@expandCollapse]="divState">\n                                    <span class="contractor-phone" [@expandCollapse]="divState">Office: </span> <span\n                                        class="contractor-underline" [@expandCollapse]="divState">{{currentTask.contractor[0].office_phone}}</span>\n                                </button>\n                            </h4>\n\n                        </ion-item>\n                    </ion-list>\n\n                    <ion-list no-padding text-wrap [@expandCollapse]="divState"\n                              *ngIf="currentTask.contractor_contacts?.length > 0">\n                        <ion-item no-padding text-wrap [@expandCollapse]="divState">\n                            <h4 class="contractor-main" [@expandCollapse]="divState">Contractor Contacts:</h4>\n                            <div class="contractor-div"\n                                 *ngFor="let contacts of currentTask.contractor_contacts; let p = index"\n                                 [@expandCollapse]="divState">\n                                <h4 class="contractor-sub" [@expandCollapse]="divState">\n                                    {{contacts.first_name}} {{contacts.last_name}} <span [@expandCollapse]="divState"\n                                                                                         *ngIf="contacts.title"> - {{contacts.title}}</span>\n                                </h4>\n\n                                <h4 *ngIf="contacts.office_phone" [@expandCollapse]="divState">\n                                    <button ion-button icon-left clear medium\n                                            class="call-contractor"\n                                            (click)="callPhone(contacts.office_phone)" [@expandCollapse]="divState">\n                                        <span class="contractor-phone" [@expandCollapse]="divState">Office: </span>\n                                        <span class="contractor-underline" [@expandCollapse]="divState">{{contacts.office_phone}}</span>\n                                    </button>\n                                </h4>\n                                <h4 *ngIf="contacts.cell_phone" [@expandCollapse]="divState">\n                                    <button ion-button icon-left clear medium\n                                            class="call-contractor"\n                                            (click)="callPhone(contacts.cell_phone)" [@expandCollapse]="divState">\n                                        <span class="contractor-phone" [@expandCollapse]="divState">Cell: </span> <span\n                                            class="contractor-underline" [@expandCollapse]="divState">{{contacts.cell_phone}}</span>\n                                    </button>\n                                </h4>\n                            </div>\n                        </ion-item>\n                    </ion-list>\n\n                </ion-card-content>\n\n                <div no-padding class="more-back mar-top-15">\n                    <ion-row>\n                        <ion-col>\n                            <button ion-button icon-left clear medium (click)="toggleDivState()">\n                                {{divState == \'collapse\' ? \'More\' : \'Less\'}}...\n                            </button>\n                        </ion-col>\n                        <ion-col>\n                            <button ion-button icon-left clear medium\n                                    (click)="showDrivingDirections(currentTask.lat, currentTask.lon)">\n                                <ion-icon name="navigate"></ion-icon>\n                                Get Directions\n                            </button>\n                        </ion-col>\n                    </ion-row>\n                </div>\n            </ion-card>\n\n            <ion-card>\n                <ion-card-header class="task-card-header">\n                    Current Task\n                </ion-card-header>\n                <ion-card-content>\n                    <div class="task-card-content">\n                        <ion-list no-padding text-wrap>\n                            <ion-item no-padding text-wrap>\n                                <h4 class="project-name capitalize">{{currentTask.job_tasks.task_description}}</h4>\n                                <h5 class="s-time">Start Time:\n                                    <span *ngIf="isIos">{{adjustTime(currentTask.job_tasks.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{currentTask.job_tasks.updatedTime | date:\'shortTime\'}}</span>\n                                </h5>\n\n                            </ion-item>\n\n                            <div *ngIf="currentTask.job_tasks.additional_notes.length > 0">\n                                <h5 class="text-info">Additional Task Notes</h5>\n                                <ion-item no-padding text-wrap\n                                          *ngFor="let newNotes of currentTask.job_tasks.additional_notes; let u = index">\n                                    <h5 class="add_notes">{{u + 1}}: {{newNotes.notes}}</h5>\n                                    <h5 class="add_by">Added By: <strong>{{newNotes.employee.first_name}}\n                                        {{newNotes.employee.last_name}}</strong>\n                                        at\n                                        <span *ngIf="isIos">{{adjustTime(newNotes.updatedTime) }}</span>\n                                        <span *ngIf="!isIos">{{newNotes.updatedTime | date:\'shortTime\'}}</span>\n                                    </h5>\n\n\n                                </ion-item>\n                            </div>\n                        </ion-list>\n                    </div>\n                </ion-card-content>\n            </ion-card>\n\n            <ion-card>\n                <ion-card-header class="task-card-header">\n                    Crew\n                </ion-card-header>\n                <ion-card-content>\n                    <div class="task-card-content">\n                        <ion-row *ngFor="let crewMember of currentTask.job_tasks.task_crew; let k = index">\n                            <ion-col class="margin-left-crew" *ngIf="crewMember.is_supervisor !== 1">\n                                <h4 class="crew-font">{{crewMember.first_name}}\n                                    {{crewMember.last_name}} </h4>\n                                <h4 *ngIf="crewMember.is_foreman === 1"> -- Foreman --</h4>\n                                <p class="crew-phone">\n                                    <button ion-button icon-left clear medium\n                                            class="phoneNum2"\n                                            (click)="callPhone(crewMember.phone)">\n                                        {{crewMember.phone}}\n                                    </button>\n                                </p>\n                            </ion-col>\n                        </ion-row>\n                        <div *ngIf="currentTask.job_tasks.task_crew === 0">No Crew Specified</div>\n                    </div>\n                </ion-card-content>\n            </ion-card>\n\n            <ion-card>\n                <ion-card-header class="task-card-header">\n                    Assigned Equipment\n                </ion-card-header>\n                <div *ngIf="currentTask.job_tasks.task_equipment.length > 0">\n                    <ion-card-content class="task-card-content">\n                        <ion-list no-padding text-wrap>\n                            <ion-item text-wrap no-padding\n                                      *ngFor="let item of currentTask.job_tasks.task_equipment; let z = index">\n                                <h3 class="text-info">{{item.equipment_name}} <span class="unassigned"\n                                                                                    *ngIf="item.employee_id === 0"> - Unassigned</span>\n                                </h3>\n                                <h4 class="s-time" *ngIf="item.notes">{{item.notes}}</h4>\n                            </ion-item>\n                        </ion-list>\n                    </ion-card-content>\n                </div>\n                <div *ngIf="currentTask.job_tasks.task_equipment.length === 0">\n                    <ion-card-content class="task-card-content crew-font">\n                        No Equipment\n                    </ion-card-content>\n                </div>\n            </ion-card>\n\n            <ion-card>\n                <ion-card-header class="task-card-header">\n                    Materials/Supplier\n                </ion-card-header>\n\n                <div *ngIf="currentTask.job_tasks.task_materials.length > 0">\n                    <div *ngFor="let material of currentTask.job_tasks.task_materials; let i = index">\n                        <ion-card-content class="task-card-content material-padding">\n                            <h3 class="text-info">{{material.material_name}}</h3>\n                            <ion-list no-padding text-wrap>\n                                <ion-item no-padding text-wrap>\n                                    <h4 class="contractor-main">\n                                        {{material.supplier.name}}\n                                    </h4>\n                                    <h4 class="contractor-sub">\n                                        {{material.supplier.address}}\n                                    </h4>\n                                    <h4 class="contractor-sub">\n                                        {{material.supplier.city}}, {{material.supplier.state}} &nbsp;{{material.supplier.zip}}\n                                    </h4>\n                                    <h4>\n                                        <button ion-button icon-left clear medium\n                                                class="call-contractor"\n                                                (click)="callPhone(material.supplier.phone)">\n                                            <span class="contractor-phone">Office: </span> <span\n                                                class="contractor-underline">{{material.supplier.phone}}</span>\n                                        </button>\n                                    </h4>\n                                </ion-item>\n                            </ion-list>\n                        </ion-card-content>\n                        <div class="more-back">\n                            <ion-row>\n                                <ion-col>\n                                    <button ion-button icon-left clear medium\n                                            (click)="showDrivingDirections(material.supplier.lat, material.supplier.lon)">\n                                        <ion-icon name="navigate"></ion-icon>\n                                        Get Directions\n                                    </button>\n                                </ion-col>\n                            </ion-row>\n                        </div>\n                    </div>\n                </div>\n\n                <div *ngIf="currentTask.job_tasks.task_materials?.length === 0">\n                    <ion-card-content class="task-card-content crew-font">\n                        No Materials\n                    </ion-card-content>\n                </div>\n\n            </ion-card>\n\n            <ion-card class="mar-bot75">\n                <ion-card-header class="task-card-header">\n                    Additional Options\n                </ion-card-header>\n                <ion-card-content padding>\n\n                    <ion-row>\n\n                        <button class="home-btn" ion-button icon-left block color="secondary"\n                                (click)="openNextDayTasks()">\n                            See Upcoming Tasks\n                        </button>\n\n                    </ion-row>\n                    <div *ngIf="userRole === 1 || userRole === 2 || userRole === 4 && showTasks && !isLessor">\n\n                        <ion-row padding-top>\n\n                            <button class="home-btn" ion-button icon-left block color="secondary"\n                                    (click)="openInAppBrowser()">\n                                Open Management App\n                            </button>\n                        </ion-row>\n                    </div>\n                </ion-card-content>\n            </ion-card>\n\n\n        </div>\n    </div>\n</ion-content>\n\n<ion-content footer *ngIf="userRole === 6">\n    <div class="pad-bot18">\n        <div *ngIf="showTasks">\n            <ion-card class="card-border pad-bot20 mar-top25"\n                      *ngFor="let date of laborerTasks.data | keys ; let i = index">\n                <ion-card-header class="task-card-header">\n                    <div bold class="head-font" text-center *ngIf="laborerTasks.data[date].length === 1">\n                        {{date | date:\'mediumDate\' }}: {{laborerTasks.data[date].length}} TASK\n                    </div>\n                    <div bold class="head-font" text-center *ngIf="laborerTasks.data[date].length > 1">\n                        {{date | date:\'mediumDate\' }}: {{laborerTasks.data[date].length}} TASKS\n                    </div>\n                </ion-card-header>\n                <ion-card-content>\n                    <div *ngFor="let task of laborerTasks.data[date]; let j = index">\n                        <div class="card-width">\n\n                            <ion-grid class="task-button">\n                                <ion-row (click)="expandTask(task.id, j)">\n                                    <ion-col class="accept-icon" width-10 *ngIf="task.status_id === 3">\n                                        <ion-icon name="fa-check"></ion-icon>\n                                    </ion-col>\n                                    <ion-col class="accept-icon" width-10 *ngIf="task.status_id === 8">\n                                        <ion-icon name="fa-times"></ion-icon>\n                                    </ion-col>\n                                    <ion-col class="accept-icon" width-10 *ngIf="task.status_id === 2">\n                                        <ion-icon name="fa-square-o"></ion-icon>\n                                    </ion-col>\n                                    <ion-col class="task-text" text-left\n                                             *ngIf="j === 0 && (expandTaskId !== task.id || taskId !== j)" width-50>\n                                        {{task.job_name}}\n                                    </ion-col>\n                                    <ion-col class="task-text" text-left\n                                             *ngIf="j > 0 && (expandTaskId !== task.id || taskId !== j)" width-50>\n                                        {{task.job_name}}\n                                    </ion-col>\n                                    <ion-col class="task-text" text-left\n                                             *ngIf="j === 0 && (expandTaskId === task.id && taskId === j)" width-80>\n                                        Hide Details\n                                    </ion-col>\n                                    <ion-col class="task-text" text-left\n                                             *ngIf="j > 0 && (expandTaskId === task.id && taskId === j)" width-80>\n                                        Hide Details\n                                    </ion-col>\n                                    <ion-col text-right width-30 class="newTime"\n                                             *ngIf="expandTaskId !== task.id || taskId !== j">\n                                        <span *ngIf="isIos">{{adjustTime(task.updatedTime) }}</span>\n                                        <span *ngIf="!isIos">{{task.updatedTime | date:\'shortTime\'}}</span>\n                                    </ion-col>\n                                    <ion-col class="task-icon" width-10>\n                                        <ion-icon *ngIf="expandTaskId !== task.id && taskId !== j"\n                                                  name="fa-chevron-circle-right"></ion-icon>\n                                        <ion-icon *ngIf="expandTaskId === task.id && taskId === j"\n                                                  name="fa-chevron-circle-down"></ion-icon>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-grid>\n\n\n                            <div class="mar-top25 next-space" *ngIf="expandTaskId === task.id && taskId === j">\n                                <ion-card class="card-border">\n                                    <ion-card-header class="task-card-header card-pad">\n                                        Project Details\n                                    </ion-card-header>\n\n\n                                    <ion-card-content class="task-card-content">\n                                        <ion-list no-padding>\n                                            <ion-item no-padding>\n                                                <h4 class="project-name">\n                                                    {{task.job_name}}\n                                                </h4>\n                                                <h4 class="contractor-main">Address:</h4>\n                                                <h4 class="contractor-sub">\n                                                    {{task.address}}\n                                                </h4>\n                                                <h4 class="contractor-sub">\n                                                    {{task.city}}, {{task.state}} {{task.zip}}\n                                                </h4>\n                                            </ion-item>\n                                        </ion-list>\n\n\n                                        <ion-list no-padding text-wrap [@expandCollapse]="divState">\n                                            <ion-item no-padding text-wrap [@expandCollapse]="divState">\n                                                <h4 [@expandCollapse]="divState" class="contractor-main">\n                                                    Contractor:</h4>\n                                                <h4 [@expandCollapse]="divState" class="contractor-sub">\n                                                    {{task.contractor[0].name}}\n                                                </h4>\n                                                <h4 [@expandCollapse]="divState">\n                                                    <button [@expandCollapse]="divState" ion-button icon-left clear\n                                                            medium\n                                                            class="call-contractor"\n                                                            (click)="callPhone(task.contractor[0].office_phone)">\n                                                        <span [@expandCollapse]="divState" class="contractor-phone">Office: </span>\n                                                        <span [@expandCollapse]="divState"\n                                                              class="contractor-underline">{{task.contractor[0].office_phone}}</span>\n                                                    </button>\n                                                </h4>\n\n                                            </ion-item>\n                                        </ion-list>\n                                    </ion-card-content>\n\n                                    <div no-padding class="more-back">\n                                        <ion-row>\n                                            <ion-col>\n                                                <button ion-button icon-left clear medium\n                                                        (click)="toggleDivState()">\n                                                    {{divState == \'collapse\' ? \'More\' : \'Less\'}}...\n                                                </button>\n                                            </ion-col>\n                                            <ion-col>\n                                                <button ion-button icon-left clear medium\n                                                        (click)="showDrivingDirections(task.lat, task.lon)">\n                                                    <ion-icon name="navigate"></ion-icon>\n                                                    Get Directions\n                                                </button>\n                                            </ion-col>\n                                        </ion-row>\n                                    </div>\n                                </ion-card>\n\n                                <ion-card class="card-border">\n                                    <ion-card-header class="task-card-header card-pad">\n                                        Task Details\n                                    </ion-card-header>\n                                    <ion-card-content>\n                                        <div class="task-card-content">\n                                            <ion-list no-padding text-wrap>\n                                                <ion-item no-padding text-wrap>\n                                                    <h4 class="text-info capitalize">\n                                                        {{task.task_description}}</h4>\n                                                    <h5 class="s-time">\n                                                        <span *ngIf="isIos">Start Time: {{adjustTime(task.updatedTime) }}</span>\n                                                        <span *ngIf="!isIos">Start Time: {{task.updatedTime | date:\'shortTime\'}}</span>\n                                                    </h5>\n\n                                                </ion-item>\n                                            </ion-list>\n                                        </div>\n                                    </ion-card-content>\n                                </ion-card>\n\n                                <ion-card class="card-border">\n                                    <ion-card-header class="task-card-header card-pad">\n                                        Foreman\n                                    </ion-card-header>\n                                    <ion-card-content>\n                                        <div class="task-card-content">\n\n                                            <ion-row *ngFor="let crewMember of task.task_crew; let k = index">\n                                                <ion-col class="margin-left-crew" *ngIf="crewMember.is_foreman === 1">\n                                                    <h4 class="crew-font">{{crewMember.first_name}}\n                                                        {{crewMember.last_name}} </h4>\n                                                    <p class="crew-phone">\n                                                        <button ion-button icon-left clear medium\n                                                                class="phoneNum2"\n                                                                (click)="callPhone(crewMember.phone)">\n                                                            {{crewMember.phone}}\n                                                        </button>\n                                                    </p>\n                                                </ion-col>\n\n                                            </ion-row>\n\n\n                                            <div *ngIf="task.task_crew.length === 0">No Foreman Has Been Assigned</div>\n                                        </div>\n                                    </ion-card-content>\n                                </ion-card>\n\n                                <ion-card class="laborer-action">\n                                    <ion-card-header class="task-card-header action-button">\n\n                                        <ion-row>\n                                            <ion-col width-50>\n                                                <button class="btn-shadow" ion-button icon-left block\n                                                        color="secondary"\n                                                        (click)="setLaborerStatus(3, laborerTasks.data[date][j].id, date, j)"\n                                                        *ngIf="task.status_id === 2 || task.status_id === 8">\n                                                    <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                                                    Accept\n                                                </button>\n                                                <button class="btn-shadow" disabled ion-button icon-left block\n                                                        color="secondary"\n                                                        *ngIf="task.status_id === 3">\n                                                    <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                                                    Accepted\n                                                </button>\n\n                                            </ion-col>\n                                            <ion-col width-50>\n                                                <button class="btn-shadow" ion-button icon-left block\n                                                        color="danger"\n                                                        (click)="openLaborerRejectModal(8, task.id, date, j)"\n                                                        *ngIf="task.status_id === 2 || task.status_id === 3">\n                                                    <ion-icon name="fa-thumbs-o-down"></ion-icon>\n                                                    Reject\n                                                </button>\n                                                <button class="btn-shadow" disabled ion-button icon-left block\n                                                        color="danger"\n                                                        *ngIf="task.status_id === 8">\n                                                    <ion-icon name="fa-thumbs-o-down"></ion-icon>\n                                                    Rejected\n                                                </button>\n                                            </ion-col>\n                                        </ion-row>\n\n                                    </ion-card-header>\n                                </ion-card>\n                            </div>\n                        </div>\n                    </div>\n                </ion-card-content>\n\n            </ion-card>\n\n\n            <ion-card class="mar-bot75">\n                <ion-card-header class="task-card-header">\n                    Additional Options\n                </ion-card-header>\n                <ion-card-content>\n\n                    <ion-row>\n\n                        <button class="home-btn" ion-button icon-left block color="secondary"\n                                (click)="openNextDayTasks()">\n                            See Upcoming Tasks\n                        </button>\n\n                    </ion-row>\n                </ion-card-content>\n            </ion-card>\n\n\n        </div>\n    </div>\n</ion-content>\n\n\n<ion-footer *ngIf="userRole !== 6">\n\n    <ion-grid\n            *ngIf="timecardStatus === 0 && currentTask && (currentTask.job_tasks.status_id === 2 || currentTask.job_tasks.status_id === 3) && !isLessor">\n        <ion-row>\n            <ion-col width-50>\n                <button class="btn-shadow" ion-button icon-left block color="secondary" (click)="setStatus(3)"\n                        *ngIf="currentTask && currentTask.job_tasks.status_id === 2">\n                    <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                    Accept\n                </button>\n                <button class="btn-shadow" ion-button icon-left block color="secondary"\n                        (click)="setStatus(4, \'\', true)" [disabled]="disableStart()"\n                        *ngIf="currentTask && currentTask.job_tasks.status_id === 3">\n                    <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                    Start Task\n                </button>\n            </ion-col>\n\n            <ion-col width-50>\n                <button class="btn-shadow" ion-button icon-left block color="danger" (click)="openRejectModal()"\n                        *ngIf="(currentTask && currentTask.job_tasks.status_id === 2) || (currentTask && currentTask.job_tasks.status_id === 3)">\n                    <ion-icon name="fa-thumbs-o-down"></ion-icon>\n                    Reject\n                </button>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <div *ngIf="timecardStatus === 1">\n        <ion-grid>\n            <ion-row>\n                <ion-col width-50>\n                    <button class="btn-shadow" ion-button icon-left block color="secondary" (click)="setStatus(3)"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id === 2">\n                        <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                        Accept\n                    </button>\n                    <button class="btn-shadow" ion-button icon-left block color="secondary"\n                            (click)="setStatus(4, \'\', true)"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id === 3">\n                        <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                        Start Task\n                    </button>\n                    <button class="btn-shadow" ion-button icon-left block color="secondary"\n                            (click)="setStatus(4,  \'\', true)"\n                            *ngIf="currentTask && (currentTask.job_tasks.status_id === 5 || currentTask.job_tasks.status_id === 6 || currentTask.job_tasks.status_id === 7 )">\n                        <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                        Resume Task\n                    </button>\n                    <button class="btn-shadow" ion-button icon-left block color="secondary" (click)="openCompletePage()"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id === 4">\n                        <ion-icon name="checkbox-outline"></ion-icon>\n                        Complete Task\n                    </button>\n                </ion-col>\n                <ion-col width-50>\n                    <button class="btn-shadow" ion-button icon-left block color="danger" (click)="openRejectModal()"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id === 2 || currentTask && currentTask.job_tasks.status_id === 3">\n                        <ion-icon name="fa-thumbs-o-down"></ion-icon>\n                        Reject\n                    </button>\n                    <button class="btn-shadow" ion-button icon-left block color="warning" (click)="openFeedbackModal()"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id >= 4">\n                        <ion-icon name="fa-chatbubble"></ion-icon>\n                        <span class="hide-task">Task Options</span>\n                        <span class="show-task">Options</span>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n\n    <div *ngIf="isLessor">\n        <ion-grid>\n            <ion-row>\n                <ion-col width-50>\n                    <button class="btn-shadow" ion-button icon-left block color="secondary" (click)="setStatus(3)"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id === 2">\n                        <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                        Accept\n                    </button>\n                    <button class="btn-shadow" ion-button icon-left block color="secondary"\n                            (click)="setStatus(4, \'\', true)"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id === 3">\n                        <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                        Start Task\n                    </button>\n                    <button class="btn-shadow" ion-button icon-left block color="secondary" (click)="setStatus(4)"\n                            *ngIf="currentTask && (currentTask.job_tasks.status_id === 5 || currentTask.job_tasks.status_id === 6 || currentTask.job_tasks.status_id === 7 )">\n                        <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                        Resume Task\n                    </button>\n                    <button class="btn-shadow" ion-button icon-left block color="secondary" (click)="openCompletePage()"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id === 4">\n                        <ion-icon name="checkbox-outline"></ion-icon>\n                        Complete Task\n                    </button>\n                </ion-col>\n                <ion-col width-50>\n                    <button class="btn-shadow" ion-button icon-left block color="danger" (click)="openRejectModal()"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id === 2">\n                        <ion-icon name="fa-thumbs-o-down"></ion-icon>\n                        Reject\n                    </button>\n                    <button class="btn-shadow" ion-button icon-left block color="warning" (click)="openFeedbackModal()"\n                            *ngIf="currentTask && currentTask.job_tasks.status_id >= 3">\n                        <ion-icon name="fa-chatbubble"></ion-icon>\n                        <span class="hide-task">Task Options</span>\n                        <span class="show-task">Options</span>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n\n</ion-footer>\n\n<div *ngIf="!isIos && !isLessor">\n    <div ion-fixed class="fs-no-results-container" *ngIf="showTasks === false">\n        <div class="content">\n            <div class="fs-no-results-msg">You Do Not Have<br/>A Current Task</div>\n            <div class="button-container">\n                <button class="home-btn" ion-button icon-right block color="secondary" (click)="setCurrentTask(true)">\n                    CHECK FOR NEW TASKS\n                </button>\n            </div>\n            <div class="button-container">\n                <button class="home-btn" ion-button icon-right block color="secondary" (click)="openNextDayTasks()">\n                    SEE UPCOMING TASKS\n                </button>\n            </div>\n            <div class="button-container" *ngIf="userRole === 1 || userRole === 2 || userRole === 4 && !isLessor">\n                <button class="home-btn" ion-button icon-left block color="secondary" (click)="openInAppBrowser()">\n                    OPEN MANAGEMENT APP\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div *ngIf="isIos  && !isLessor">\n    <div ion-fixed class="fs-no-results-container-ios" *ngIf="showTasks === false">\n        <div class="content">\n            <div class="fs-no-results-msg">You Do Not Have<br/>A Current Task</div>\n            <div class="button-container">\n                <button class="home-btn" ion-button icon-right block color="secondary" (click)="setCurrentTask(true)">\n                    CHECK FOR NEW TASKS\n                </button>\n            </div>\n            <div class="button-container">\n                <button class="home-btn" ion-button icon-right block color="secondary" (click)="openNextDayTasks()">\n                    SEE UPCOMING TASKS\n                </button>\n            </div>\n            <div class="button-container" *ngIf="userRole === 1 || userRole === 2 || userRole === 4 && !isLessor">\n                <button class="home-btn" ion-button icon-left block color="secondary" (click)="openInAppBrowser()">\n                    OPEN MANAGEMENT APP\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div *ngIf="!isIos && isLessor">\n    <div ion-fixed class="fs-no-results-container-lessor" *ngIf="showTasks === false">\n        <div class="content">\n            <div class="fs-no-results-msg">You Do Not Have<br/>A Current Task</div>\n            <div class="button-container">\n                <button class="home-btn" ion-button icon-right block color="secondary" (click)="setCurrentTask(true)">\n                    CHECK FOR NEW TASKS\n                </button>\n            </div>\n            <div class="button-container">\n                <button class="home-btn" ion-button icon-right block color="secondary" (click)="openNextDayTasks()">\n                    SEE UPCOMING TASKS\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div *ngIf="isIos  && isLessor">\n    <div ion-fixed class="fs-no-results-container-ios-lessor" *ngIf="showTasks === false">\n        <div class="content">\n            <div class="fs-no-results-msg">You Do Not Have<br/>A Current Task</div>\n            <div class="button-container">\n                <button class="home-btn" ion-button icon-right block color="secondary" (click)="setCurrentTask(true)">\n                    CHECK FOR NEW TASKS\n                </button>\n            </div>\n            <div class="button-container">\n                <button class="home-btn" ion-button icon-right block color="secondary" (click)="openNextDayTasks()">\n                    SEE UPCOMING TASKS\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/home/home.html"*/,
        animations: [
            __WEBPACK_IMPORTED_MODULE_13__animations_animations__["a" /* Animations */].expandCollapse
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_10__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_8__providers_google_maps_manager__["a" /* GoogleMapsManager */],
        __WEBPACK_IMPORTED_MODULE_11__providers_user_manager__["a" /* UserManager */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_12__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_full_screen__["a" /* AndroidFullScreen */],
        __WEBPACK_IMPORTED_MODULE_14__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_17__ionic_native_badge__["a" /* Badge */],
        __WEBPACK_IMPORTED_MODULE_18__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_1__providers_backbutton__["a" /* HardwareBackButtonService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_19__providers_conversion_manager__["a" /* ConversionManager */],
        __WEBPACK_IMPORTED_MODULE_20__ionic_native_fcm__["a" /* FCM */],
        __WEBPACK_IMPORTED_MODULE_21__ionic_native_unique_device_id__["a" /* UniqueDeviceID */],
        __WEBPACK_IMPORTED_MODULE_22__ionic_native_sim__["a" /* Sim */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HardwareBackButtonService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HardwareBackButtonService = (function () {
    function HardwareBackButtonService(_plt, _menuCtrl, _toastCtrl) {
        this._plt = _plt;
        this._menuCtrl = _menuCtrl;
        this._toastCtrl = _toastCtrl;
        this._didBackAlready = false;
        this._deregisterFn = null;
    }
    HardwareBackButtonService.prototype.registerAction = function (fn, p) {
        this._deregisterFn = this
            ._plt
            .registerBackButtonAction(function () {
            fn();
        }, p);
    };
    HardwareBackButtonService.prototype.deregisterAction = function () {
        this._deregisterFn && this._deregisterFn();
    };
    HardwareBackButtonService.prototype.doubleBackToExit = function () {
        var _this = this;
        // If sidemenu is open we close it instead of show the toast
        if (this._menuCtrl && this._menuCtrl.isOpen()) {
            return this
                ._menuCtrl
                .close();
        }
        // No sidemenu open lets handle double back to exit
        if (!this._didBackAlready) {
            this._didBackAlready = true;
            this._presentToast("Press back button again to exit");
            setTimeout(function () { return _this._didBackAlready = false; }, 2000);
            return;
        }
        this
            ._plt
            .exitApp();
    };
    HardwareBackButtonService.prototype._presentToast = function (content) {
        var toast = this
            ._toastCtrl
            .create({ message: content, position: 'bottom', duration: 2000 });
        toast.present();
    };
    return HardwareBackButtonService;
}());
HardwareBackButtonService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
], HardwareBackButtonService);

//# sourceMappingURL=backbutton.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FeedbackPage = (function () {
    function FeedbackPage(navCtrl, navParams, taskMgr, geolocation, actionSheetCtrl, platform, utils, camera, diagnostic, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.taskMgr = taskMgr;
        this.geolocation = geolocation;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.utils = utils;
        this.camera = camera;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.files = [];
        this.type = { options: '' };
        this.isIos = false;
        this.isAndroid = false;
        this.hasStatus = false;
        this.hasSelected = false;
        this.taskId = navParams.get('task_id');
        this.userId = navParams.get('user_id');
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.data = {
            userId: this.userId,
            taskId: this.taskId,
            notes: '',
            statusId: 0,
            files: this.files,
            save: false
        };
        this.type.options = [
            {
                "id": 3,
                "status": "Accepted",
                "system_only": 1
            }, {
                "id": 4,
                "status": "Rejected",
                "system_only": 1
            }, {
                "id": 12,
                "status": "Temporary Hold",
                "system_only": 0
            }, {
                "id": 5,
                "status": "Delayed",
                "system_only": 0
            }, {
                "id": 7,
                "status": "Emergency",
                "system_only": 0
            }, {
                "id": 9,
                "status": "Completed",
                "system_only": 1
            }, {
                "id": 10,
                "status": "General Notes",
                "system_only": 0
            }
        ];
        this.type.options = this.type.options.filter(function (value) {
            return value.system_only == 0;
        });
        var successCallback = function (isAvailable) {
            console.log('Is available? ' + isAvailable);
        };
        var errorCallback = function (e) {
            _this.diagnostic.requestCameraAuthorization().then(successCallback);
        };
        this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
    };
    FeedbackPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () { return _this.getLocation(); }, 500);
    };
    FeedbackPage.prototype.loadTaskInfo = function () {
        var _this = this;
        this.taskMgr.getCurrentTaskRemote().then(function (response) {
            _this.currentTask = response;
        });
    };
    FeedbackPage.prototype.getLocation = function () {
        var _this = this;
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.presentLocationAlert();
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please verify that your location settings are turned on", true);
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(function (resp) {
            if (locEnabled) {
                _this.geolocation.getCurrentPosition({ timeout: 20000 }).then(function (position) {
                    _this.lat = position.coords.latitude;
                    _this.lon = position.coords.longitude;
                }).catch(function (error) {
                    _this.presentLocationAlert();
                    // this.utils.presentToast('Unable to get a precise location. Some functionality will be limited until device location is available', true, '', 10000);
                });
            }
        }).catch(errorCallback);
    };
    FeedbackPage.prototype.presentLocationAlert = function () {
        var _this = this;
        var alertText = '';
        if (this.isAndroid) {
            alertText = 'Select OK to enable location on your device';
        }
        else if (this.isIos) {
            alertText = 'Location Services is enabled on your device but not for this app. Please open your device settings, scroll down and select clear-task-solutions-mobile, select Location, and then select the While Using the App option';
        }
        else {
            alertText = 'Select OK to enable location on your device';
        }
        var alert = this.alertCtrl.create({
            title: 'Location Required',
            message: alertText,
            cssClass: 'myAlerts',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        if (_this.isAndroid) {
                            _this.diagnostic.switchToLocationSettings();
                        }
                        if (_this.isIos) {
                            console.log("inside the ios handler ");
                            _this.diagnostic.isLocationAuthorized().then(function (res) {
                                console.log('res isLocationAuthorized ', JSON.stringify(res));
                            });
                            _this.diagnostic.getLocationAuthorizationStatus().then(function (response) {
                                if (response === 'denied') {
                                    _this.getLocation();
                                }
                                console.log('response getLocationAuthorizationStatus ', JSON.stringify(response));
                            });
                            _this.diagnostic.requestLocationAuthorization('when_in_use').then(function (res) {
                                console.log('res requestLocationAuthorization ', JSON.stringify(res));
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    /** delete image button clicked, remove from files array */
    FeedbackPage.prototype.deleteImage = function (index) {
        this.data.files.splice(index, 1);
    };
    /** used for HTML file upload only */
    FeedbackPage.prototype.showFiles = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        var file = files[0];
        var fileData = {
            name: file.name,
            caption: '',
            path: '',
            file: file
        };
        this.data.files.push(fileData);
    };
    /** save button clicked */
    FeedbackPage.prototype.save = function () {
        var _this = this;
        this.data.save = true;
        this.data.notes = this.data.notes.trim();
        this.data.lat = this.lat;
        this.data.lon = this.lon;
        this.utils.presentLoading();
        this.taskMgr.postFeedback(this.data).then(function (response) {
            if (_this.isIos) {
                _this.camera.cleanup().then(function (response) {
                    //
                }).catch(function (error) {
                    console.error("There was an error calling Camera.cleanup: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(error));
                });
            }
            _this.utils.dismissLoading();
            setTimeout(function () {
                if (response === true) {
                    _this.navCtrl.pop();
                }
                else {
                    _this.utils.toastError({ msg: 'There was an error posting feedback' });
                }
            }, 500);
        }).catch(function (error) {
            _this.utils.toastError({ msg: 'There was an error posting feedback' });
            if (_this.isIos) {
                _this.camera.cleanup().then(function (response) {
                    //
                }).catch(function (error) {
                    console.error("There was an error calling Camera.cleanup: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(error));
                });
            }
            _this.utils.dismissLoading();
        });
    };
    /** cancel button clicked, used when page was a modal */
    FeedbackPage.prototype.cancel = function () {
        this.data.save = false;
    };
    FeedbackPage.prototype.disableFormSubmit = function () {
        /**
         *  Used to disable a form button. So :
         *  if false OR false, then disable (true) OR
         *  if true AND true, the don't disable (false)
         */
        return !((this.data.notes.trim().length > 4) && (this.data.statusId > 0));
    };
    /** trim notes  */
    FeedbackPage.prototype.trimNotes = function () {
        this.data.notes = this.data.notes.trim();
    };
    /** when cordova, present an action sheet to take a pic or import from gallery */
    FeedbackPage.prototype.presentActionSheet = function () {
        var _this = this;
        var buttons = [];
        if (this.platform.is('cordova')) {
            buttons.push({
                text: 'Choose Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.PHOTOLIBRARY); // 0 == Library
                }
            }, {
                text: 'Take Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.CAMERA); // 1 == Camera
                }
            });
        }
        buttons.push({
            text: 'Cancel',
            role: 'cancel'
        });
        var actionSheet = this.actionSheetCtrl.create({
            buttons: buttons
        });
        actionSheet.present();
    };
    /**
     * get picture from gallery or camera
     * @Param sourceType:number camera or gallery
     */
    FeedbackPage.prototype.getPicture = function (sourceType) {
        var _this = this;
        this.utils.presentLoading();
        this.camera.getPicture({
            quality: 50,
            destinationType: 1,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true //this needs to be true to get a file:/// FILE_URI, otherwise android does not return a file uri. Yep.
        }).then(function (imageData) {
            console.log("IMAGEDATA: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(imageData, true));
            //fix for android, remove query string from end of file_uri or crashes android //
            imageData = imageData.split('?')[0];
            var filename = imageData.replace(/^.*[\\\/]/, '');
            var fileData = {
                name: filename,
                caption: '',
                //notes : '',
                path: imageData,
            };
            _this.data.files.push(fileData);
            _this.utils.dismissLoading();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Image Error',
                message: 'Unable to upload image. Please choose a different image or take an new picture',
                cssClass: 'myAlerts',
                buttons: ['OK']
            });
            alert.present();
            console.log("ERROR -> " + JSON.stringify(err));
            _this.utils.dismissLoading();
        });
    };
    FeedbackPage.prototype.selectedStatus = function (selection) {
        this.data.statusId = selection;
        this.hasSelected = false;
        this.hasStatus = true;
    };
    FeedbackPage.prototype.showNotes = function () {
        this.hasStatus = true;
        this.hasSelected = false;
    };
    FeedbackPage.prototype.backToSelection = function () {
        this.hasStatus = false;
        this.hasSelected = false;
    };
    FeedbackPage.prototype.createLoading = function () {
        this.utils.presentLoading();
    };
    return FeedbackPage;
}());
FeedbackPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-feedback',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/feedback/feedback.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Feedback</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n    <ion-card *ngIf="!hasStatus">\n        <ion-card-header class="task-card-header first-header">\n            Select Task Action Below\n        </ion-card-header>\n        <ion-card-content>\n            <ion-grid>\n                <ion-row>\n                    <ion-col width-10></ion-col>\n                    <ion-col width-80>\n                        <button class="btn-shadow delayed" ion-button color="danger" full (click)="selectedStatus(5)">\n                            Delayed\n                        </button>\n                    </ion-col>\n                    <ion-col width-10></ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col width-10></ion-col>\n                    <ion-col width-80>\n                        <button class="btn-shadow temp-color" ion-button color="danger" full\n                                (click)="selectedStatus(12)">Temporary\n                            Hold\n                        </button>\n                    </ion-col>\n                    <ion-col width-10></ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col width-10></ion-col>\n                    <ion-col width-80>\n                        <button class="btn-shadow emergency-color" ion-button color="danger" full\n                                (click)="selectedStatus(7)">\n                            Emergency\n                        </button>\n\n                    </ion-col>\n                    <ion-col width-10></ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col width-10></ion-col>\n                    <ion-col width-80>\n                        <button class="btn-shadow" ion-button color="light" full (click)="selectedStatus(10)">Feedback\n                        </button>\n                    </ion-col>\n                    <ion-col width-10></ion-col>\n                </ion-row>\n\n            </ion-grid>\n        </ion-card-content>\n    </ion-card>\n\n\n    <ion-card *ngIf="hasStatus">\n\n        <ion-card-header class="task-card-header">\n            <ion-grid>\n                <ion-row>\n                    <h3 class="action-desc">\n                        <span *ngIf="data.statusId === 5">Action: Delayed </span>\n                        <span *ngIf="data.statusId === 7">Action: Emergency</span>\n                        <span *ngIf="data.statusId === 12">Action: Temporary Hold</span>\n                        <span *ngIf="data.statusId === 10">Action: Feedback</span>\n                    </h3>\n                </ion-row>\n            </ion-grid>\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <ion-grid>\n\n                <ion-row class="action-margin">\n\n                    <span text-wrap *ngIf="data.statusId === 5">This will pause your current task. It can be resumed from the home tab\n                    </span>\n                    <span text-wrap *ngIf="data.statusId === 7">This will pause your current task. It can be resumed from the home tab\n                    </span>\n                    <span text-wrap *ngIf="data.statusId === 12">This will pause your\n                        current task and load the next task. Your current task can be resumed in the history tab\n                    </span>\n                    <span text-wrap *ngIf="data.statusId === 10">This will save your\n                        notes so others can read later\n                    </span>\n                </ion-row>\n            </ion-grid>\n\n\n            <ion-grid>\n                <ion-row>\n                    <div><strong>Notes: </strong>(4 Character minimum)</div>\n                </ion-row>\n                <ion-row>\n                    <ion-textarea class="ios-textarea" [(ngModel)]="data.notes" (blur)="trimNotes()"></ion-textarea>\n                </ion-row>\n            </ion-grid>\n\n            <ion-list>\n                <ion-row class="mar-bot15">\n                    <ion-col>\n                        <button class="btn-shadow width100" ion-button icon-left block\n                                (click)="presentActionSheet()">\n                            <ion-icon name="add-circle"></ion-icon>\n                            Add Image\n                        </button>\n                    </ion-col>\n                </ion-row>\n\n                <ion-list *ngFor="let file of data.files; let i = index">\n                    <ion-item>\n                        {{file.name}}\n                        <button ion-button icon-only item-right clear (click)="deleteImage(i)">\n                            <ion-icon color="danger" name="trash"></ion-icon>\n                        </button>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label stacked>Caption: (Tap Below to add a caption to this image)</ion-label>\n                        <ion-input [(ngModel)]="data.files[i].caption"></ion-input>\n                    </ion-item>\n                </ion-list>\n\n            </ion-list>\n\n        </ion-card-content>\n\n        <ion-row class="feedback-footer">\n            <ion-col class="pad-left0">\n                <button class="btn-shadow" ion-button icon-left block color="cancel" (click)="backToSelection()">\n                    <ion-icon name="fa-arrow-left"></ion-icon>\n                    Cancel\n                </button>\n            </ion-col>\n            <ion-col class="pad-right0">\n                <button class="btn-shadow" ion-button icon-left block color="secondary" (click)="save()"\n                        [disabled]="disableFormSubmit()">\n                    <ion-icon name="checkbox-outline"></ion-icon>\n                    Save\n                </button>\n            </ion-col>\n        </ion-row>\n\n\n    </ion-card>\n\n    <ion-card class="fixed-height" *ngIf="hasStatus">\n\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/feedback/feedback.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], FeedbackPage);

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoogleMapsService = (function () {
    function GoogleMapsService(http) {
        this.http = http;
        this.key = "AIzaSyCNru80Dz-6HKpPHbtj0oJAq2RvAlBcYL0";
        this.endpoint = "https://maps.googleapis.com/maps/api/directions/json?callback=JSONP_CALLBACK";
        console.log('Hello GoogleMapsService Provider');
        //this.directionsService = new google.maps.DirectionsService();
    }
    GoogleMapsService.prototype.getDirections = function (origin, destination) {
        var _this = this;
        this.directionsService = new google.maps.DirectionsService();
        return new Promise(function (resolve, reject) {
            //origin = '40.7441704,-111.8628205'; //somewhere in SLC
            //destination = 'Provo, UT';
            var request = {
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            };
            _this.directionsService.route(request, function (result, status) {
                //console.log(`ROUTE: ${status} ${Utils.toJson(result)}` );
                //console.log(result.routes[0])
                if (status == 'OK') {
                    resolve(JSON.parse(JSON.stringify(result)));
                }
                else {
                    reject(result);
                }
            });
        });
    };
    return GoogleMapsService;
}());
GoogleMapsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], GoogleMapsService);

//# sourceMappingURL=google-maps-service.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NextDayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__driving_directions_driving_directions__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_google_maps_manager__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__animations_animations__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_conversion_manager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_fcm__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value);
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'myKeys', pure: false })
], KeysPipe);

var NextDayPage = (function () {
    function NextDayPage(navCtrl, userMgr, appCtrl, taskMgr, mapsManager, geolocation, utils, callNumber, diagnostic, conMgr, alertCtrl, fcm) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.taskMgr = taskMgr;
        this.mapsManager = mapsManager;
        this.geolocation = geolocation;
        this.utils = utils;
        this.callNumber = callNumber;
        this.diagnostic = diagnostic;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.debug = false;
        this.nextDayTask = '';
        this.divState = 'hide';
        this.showTasks = false;
        this.newStart = '';
        this.isIos = false;
        this.showContractor = -1;
        this.expandDate = -1;
        this.expandTaskId = -1;
        this.taskId = -1;
        this.userId = '';
        this.setStatus = function (statusId, taskId, dateKey, taskIndex, notes) {
            if (statusId === 3) {
                _this.nextDayTask.data[dateKey][taskIndex].status_id = 3;
                var data = {
                    notes: notes || '',
                    statusId: statusId,
                    files: [],
                    timestamp: new Date(Date.now()),
                    taskId: taskId
                };
                _this.utils.presentLoading();
                _this.taskMgr.updateNextDayTaskStatus(data).then(function (response) {
                    _this.utils.dismissLoading();
                }).catch(function (error) {
                    if (_this.debug) {
                        console.log("ERROR: " + __WEBPACK_IMPORTED_MODULE_9__utils_utils__["a" /* Utils */].toJson(error));
                    }
                    _this.utils.toastError(error);
                });
            }
            else if (statusId === 8) {
                _this.nextDayTask.data[dateKey][taskIndex].status_id = 8;
                var data = {
                    notes: notes || '',
                    statusId: statusId,
                    files: [],
                    timestamp: new Date(Date.now()),
                    taskId: taskId
                };
                _this.utils.presentLoading();
                _this.taskMgr.updateNextDayTaskStatus(data).then(function (response) {
                    _this.utils.dismissLoading();
                }).catch(function (error) {
                    if (_this.debug) {
                        console.log("ERROR: " + __WEBPACK_IMPORTED_MODULE_9__utils_utils__["a" /* Utils */].toJson(error));
                    }
                    _this.utils.toastError(error);
                });
            }
        };
        this.user = this.userMgr.getUser();
        this.userId = this.user.userId;
        this.role_id = this.user.role_id;
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.divState = 'collapse';
    }
    NextDayPage.prototype.ionViewDidEnter = function () {
        this.loadTomorrowsTasks(this.userId);
        this.subscribeAgain();
    };
    NextDayPage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.navCtrl.parent.select(3);
                }
                else if (data.param1 === 'additional_notes') {
                    _this.presentAlert();
                }
                else if (data.param1 === "upcoming_task") {
                    _this.presentFutureAlert();
                }
                else if (data.param1 === 'crews') {
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    NextDayPage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.parent.select(0);
                    }
                }]
        });
        alert.present();
    };
    NextDayPage.prototype.presentFutureAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Dispatched',
            message: 'You have been assigned a new task. Please accept or reject before continuing',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.taskMgr.loadHomePage(0);
                        _this.loadTomorrowsTasks(_this.userId);
                    }
                }]
        });
        alert.present();
    };
    /** logs the user out of the app */
    NextDayPage.prototype.logout = function () {
        var _this = this;
        this.userMgr.logout().then(function (response) {
            _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        });
    };
    NextDayPage.prototype.toggleDivState = function () {
        var states = {
            expand: 'collapse',
            collapse: 'expand'
        };
        this.divState = states[this.divState];
    };
    NextDayPage.prototype.loadTomorrowsTasks = function (userId) {
        var _this = this;
        this.utils.presentLoading();
        this.taskMgr.loadNextDayTaskByDate(userId).then(function (response) {
            _this.nextDayTask = response;
            if (_this.nextDayTask.data === {}) {
                _this.showTasks = false;
                _this.utils.dismissLoading();
            }
            else {
                _this.showTasks = true;
                _this.user = response.user;
                var myKey1 = Object.keys(_this.nextDayTask.data);
                for (var m = 0; m < myKey1.length; m++) {
                    var firstKey = _this.nextDayTask.data[Object.keys(_this.nextDayTask.data)[m]];
                    firstKey.sort(function (a, b) {
                        return (a.task_start_time > b.task_start_time) ? 1 : ((b.task_start_time > a.task_start_time) ? -1 : 0);
                    });
                }
                _this.utils.dismissLoading();
            }
        });
    };
    NextDayPage.prototype.openRejectModal = function (statusId, taskId, dateKey, taskIndex, notes) {
        var _this = this;
        var modal = this.utils.presentRejectNotesModal();
        modal.onDidDismiss(function (data) {
            if (data.save === true) {
                _this.setStatus(statusId, taskId, dateKey, taskIndex, data.notes);
            }
        });
    };
    NextDayPage.prototype.showContractorInfo = function (index) {
        if (this.showContractor === index) {
            this.showContractor = -1;
        }
        else {
            this.showContractor = index;
        }
    };
    NextDayPage.prototype.showDrivingDirections = function (lat, lon) {
        var _this = this;
        this.utils.presentLoading();
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.utils.presentToast("Please enable your location in device settings", true);
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please enable your location in device settings", true);
            _this.utils.dismissLoading();
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(function (resp) {
            if (locEnabled) {
                var destination_1 = lat + "," + lon;
                _this.geolocation.getCurrentPosition({ timeout: 15000 }).then(function (position) {
                    var origin = position.coords.latitude + "," + position.coords.longitude;
                    return _this.mapsManager.getDirections(origin, destination_1);
                }).then(function (response) {
                    var params = {
                        directions: response
                    };
                    setTimeout(function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__driving_directions_driving_directions__["a" /* DrivingDirectionsPage */], params);
                        _this.utils.dismissLoading();
                    }, 2000);
                }).catch(function (error) {
                    _this.utils.dismissLoading();
                    if (_this.debug) {
                        console.log("ERROR: " + __WEBPACK_IMPORTED_MODULE_9__utils_utils__["a" /* Utils */].toJson(error));
                    }
                    _this.utils.presentToast("Please enable your location in device settings", true);
                });
            }
            if (locEnabled === false) {
                _this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    };
    NextDayPage.prototype.expandDateTasks = function (index) {
        if (this.expandDate === index) {
            this.expandDate = -1;
        }
        else {
            this.expandDate = index;
        }
    };
    NextDayPage.prototype.expandTask = function (id, index) {
        if (this.expandTaskId === id && this.taskId === index) {
            if (!this.isIos) {
                this.content.scrollTo(0, 0, 300).then(function (res) {
                });
            }
            this.expandTaskId = -1;
            this.taskId = -1;
        }
        else {
            if (!this.isIos) {
                this.content.scrollTo(0, ((index * 50) + 50), 300).then(function (res) {
                });
            }
            this.expandTaskId = id;
            this.taskId = index;
        }
    };
    NextDayPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    NextDayPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    return NextDayPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], NextDayPage.prototype, "content", void 0);
NextDayPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-next-day',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/next-day-tasks/next-day.html"*/'<ion-header>\n    <ion-navbar *ngIf="isIos">\n        <ion-row>\n            <ion-col width-50>\n                <div text-center>\n                    <div class="ios-title">\n                        Future Tasks\n                    </div>\n                </div>\n            </ion-col>\n\n            <ion-col width-33 class="ios-refresh">\n                <ion-buttons class="mar-right6" end>\n                    <button class="refresh" ion-button round icon-right color="secondary"\n                            (click)="loadTomorrowsTasks(userId)"> Refresh\n                        <ion-icon class="logout-hide" name="refresh"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n        </ion-row>\n    </ion-navbar>\n    <ion-navbar *ngIf="!isIos">\n        <ion-row>\n            <ion-title>Future Tasks</ion-title>\n            <ion-buttons class="mar-right6" end>\n                <button class="refresh" ion-button round icon-right color="secondary"\n                        (click)="loadTomorrowsTasks(userId)"> Refresh\n                    <ion-icon name="refresh"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-row>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content footer>\n\n    <div *ngIf="nextDayTask.data?.length === 0">\n        <ion-card>\n            <ion-card-header text-center class="task-card-header no-future">\n                No Upcoming Tasks\n            </ion-card-header>\n        </ion-card>\n    </div>\n\n    <div *ngIf="showTasks">\n        <div *ngIf="nextDayTask">\n            <ion-card class="card-border" *ngFor="let date of nextDayTask.data | myKeys ; let i = index">\n                <ion-card-header class="task-card-header">\n\n                    <div bold class="head-font" text-center *ngIf="nextDayTask.data[date].length === 1">\n                        {{date | date:\'mediumDate\' }}: {{nextDayTask.data[date].length}} TASK\n                    </div>\n                    <div bold class="head-font" text-center *ngIf="nextDayTask.data[date].length > 1">\n                        {{date | date:\'mediumDate\' }}: {{nextDayTask.data[date].length}} TASKS\n                    </div>\n                </ion-card-header>\n                <ion-card-content>\n                    <div *ngFor="let task of nextDayTask.data[date]; let j = index">\n                        <div class="card-width">\n\n                            <ion-grid class="task-button">\n                                <ion-row (click)="expandTask(task.id, j)">\n                                    <ion-col class="accept-icon" width-10 *ngIf="task.status_id === 3">\n                                        <ion-icon name="fa-check"></ion-icon>\n                                    </ion-col>\n                                    <ion-col class="accept-icon" width-10 *ngIf="task.status_id === 8">\n                                        <ion-icon name="fa-times"></ion-icon>\n                                    </ion-col>\n                                    <ion-col class="accept-icon" width-10 *ngIf="task.status_id === 2">\n                                        <ion-icon name="fa-square-o"></ion-icon>\n                                    </ion-col>\n                                    <ion-col class="task-text" text-left\n                                             *ngIf="j === 0 && (expandTaskId !== task.id || taskId !== j)" width-50>\n                                        {{task.job_name}}\n                                    </ion-col>\n                                    <ion-col class="task-text" text-left\n                                             *ngIf="j > 0 && (expandTaskId !== task.id || taskId !== j)" width-50>\n                                        {{task.job_name}}\n                                    </ion-col>\n                                    <ion-col class="task-text" text-left\n                                             *ngIf="j === 0 && (expandTaskId === task.id && taskId === j)" width-80>\n                                        Hide Details\n                                    </ion-col>\n                                    <ion-col class="task-text" text-left\n                                             *ngIf="j > 0 && (expandTaskId === task.id && taskId === j)" width-80>\n                                        Hide Details\n                                    </ion-col>\n                                    <ion-col width-30 text-right class="newTime"\n                                             *ngIf="expandTaskId !== task.id || taskId !== j">\n                                        <span *ngIf="isIos">{{adjustTime(task.updatedTime) }}</span>\n                                        <span *ngIf="!isIos">{{task.updatedTime | date:\'shortTime\'}}</span>\n                                    </ion-col>\n                                    <ion-col class="task-icon" width-10>\n                                        <ion-icon *ngIf="expandTaskId !== task.id || taskId !== j"\n                                                  name="fa-chevron-circle-right"></ion-icon>\n                                        <ion-icon *ngIf="expandTaskId === task.id && taskId === j"\n                                                  name="fa-chevron-circle-down"></ion-icon>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-grid>\n\n\n                            <div class="next-space" *ngIf="expandTaskId === task.id && taskId === j">\n                                <ion-card class="card-border">\n                                    <ion-card-header class="task-card-header">\n                                        Project Details\n\n                                    </ion-card-header>\n\n\n                                    <ion-card-content class="task-card-content">\n                                        <ion-list no-padding>\n                                            <ion-item no-padding>\n                                                <h4 class="project-name">\n                                                    {{task.job_name}}\n                                                </h4>\n                                                <h4 class="contractor-main">Address:</h4>\n                                                <h4 class="contractor-sub">\n                                                    {{task.address}}\n                                                </h4>\n                                                <h4 class="contractor-sub">\n                                                    {{task.city}}, {{task.state}} {{task.zip}}\n                                                </h4>\n                                            </ion-item>\n                                        </ion-list>\n\n\n                                        <ion-list no-padding text-wrap [@expandCollapse]="divState">\n                                            <ion-item no-padding text-wrap [@expandCollapse]="divState">\n                                                <h4 [@expandCollapse]="divState" class="contractor-main">\n                                                    Contractor:</h4>\n                                                <h4 [@expandCollapse]="divState" class="contractor-sub">\n                                                    {{task.contractor[0].name}}\n                                                </h4>\n                                                <h4 [@expandCollapse]="divState">\n                                                    <button [@expandCollapse]="divState" ion-button icon-left clear\n                                                            medium\n                                                            class="call-contractor"\n                                                            (click)="callPhone(task.contractor[0].office_phone)">\n                                                        <span [@expandCollapse]="divState" class="contractor-phone">Office: </span>\n                                                        <span [@expandCollapse]="divState"\n                                                              class="contractor-underline">{{task.contractor[0].office_phone}}</span>\n                                                    </button>\n                                                </h4>\n\n                                            </ion-item>\n                                        </ion-list>\n                                    </ion-card-content>\n\n                                    <div no-padding class="more-back">\n                                        <ion-row>\n                                            <ion-col>\n                                                <button ion-button icon-left clear medium\n                                                        (click)="toggleDivState()">\n                                                    {{divState == \'collapse\' ? \'More\' : \'Less\'}}...\n                                                </button>\n                                            </ion-col>\n                                            <ion-col>\n                                                <button ion-button icon-left clear medium\n                                                        (click)="showDrivingDirections(task.lat, task.lon)">\n                                                    <ion-icon name="navigate"></ion-icon>\n                                                    Get Directions\n                                                </button>\n                                            </ion-col>\n                                        </ion-row>\n                                    </div>\n                                </ion-card>\n\n                                <ion-card class="card-border">\n                                    <ion-card-header class="task-card-header">\n                                        Task Details\n                                    </ion-card-header>\n                                    <ion-card-content>\n                                        <div class="task-card-content">\n                                            <ion-list no-padding text-wrap>\n                                                <ion-item no-padding text-wrap>\n                                                    <h4 class="text-info capitalize">\n                                                        {{task.task_description}}</h4>\n                                                    <h5 class="s-time">\n                                                        Start Time:\n                                                        <span *ngIf="isIos">{{adjustTime(task.updatedTime) }}</span>\n                                                        <span *ngIf="!isIos">{{task.updatedTime | date:\'shortTime\'}}</span>\n                                                    </h5>\n\n                                                </ion-item>\n                                            </ion-list>\n                                        </div>\n                                    </ion-card-content>\n                                </ion-card>\n\n                                <ion-card class="card-border">\n                                    <ion-card-header *ngIf="role_id !== 6" class="task-card-header">\n                                        Crew\n                                    </ion-card-header>\n                                    <ion-card-header *ngIf="role_id === 6" class="task-card-header">\n                                        Foreman\n                                    </ion-card-header>\n                                    <ion-card-content>\n                                        <div class="task-card-content" *ngIf="role_id !== 6">\n\n                                            <ion-row *ngFor="let crewMember of task.task_crew; let k = index">\n                                                <ion-col class="margin-left-crew"\n                                                         *ngIf="crewMember.is_supervisor !== 1">\n                                                    <h4 class="crew-font">{{crewMember.first_name}}\n                                                        {{crewMember.last_name}} </h4>\n                                                    <h4 *ngIf="crewMember.is_foreman === 1"> --\n                                                        Foreman\n                                                        --</h4>\n                                                    <p class="crew-phone">\n                                                        <button ion-button icon-left clear medium\n                                                                class="phoneNum2"\n                                                                (click)="callPhone(crewMember.phone)">\n                                                            {{crewMember.phone}}\n                                                        </button>\n                                                    </p>\n                                                </ion-col>\n                                            </ion-row>\n\n\n                                            <div *ngIf="task.task_crew.length === 0">No Crew Specified</div>\n                                        </div>\n\n                                        <div class="task-card-content" *ngIf="role_id === 6">\n\n                                            <ion-row *ngFor="let crewMember of task.task_crew; let k = index">\n                                                <ion-col class="margin-left-crew" *ngIf="crewMember.is_foreman === 1">\n                                                    <h4 class="crew-font">{{crewMember.first_name}}\n                                                        {{crewMember.last_name}} </h4>\n                                                    <p class="crew-phone">\n                                                        <button ion-button icon-left clear medium\n                                                                class="phoneNum2"\n                                                                (click)="callPhone(crewMember.phone)">\n                                                            {{crewMember.phone}}\n                                                        </button>\n                                                    </p>\n                                                </ion-col>\n\n                                            </ion-row>\n\n\n                                            <div *ngIf="task.task_crew.length === 0">No Crew Specified</div>\n                                        </div>\n                                    </ion-card-content>\n                                </ion-card>\n\n                                <ion-card class="card-border" *ngIf="role_id !== 6">\n                                    <ion-card-header class="task-card-header">\n                                        Equipment\n                                    </ion-card-header>\n                                    <ion-card-content>\n                                        <div class="task-card-content">\n                                            <ol>\n                                                <li *ngFor="let item of task.task_equipment">\n                                                    <div>{{item.equipment_name}}</div>\n                                                </li>\n                                            </ol>\n                                            <div class="equip-center" *ngIf="task.task_equipment.length === 0">No\n                                                Equipment\n                                                Specified\n                                            </div>\n                                        </div>\n                                    </ion-card-content>\n                                </ion-card>\n\n                                <ion-card class="card-border" *ngIf="role_id !== 6 && task.task_materials?.length > 0">\n                                    <ion-card-header class="task-card-header">\n                                        Materials/Supplier\n                                    </ion-card-header>\n                                    <div *ngFor="let material of task.task_materials; let m = index">\n                                        <ion-card-content class="task-card-content material-padding">\n                                            <h3 class="text-info">{{material.material_name}}</h3>\n                                            <ion-list no-padding>\n                                                <ion-item no-padding>\n                                                    <h4 class="contractor-main">\n                                                        {{material.supplier.name}}\n                                                    </h4>\n                                                    <h4 class="contractor-sub">\n                                                        {{material.supplier.address}}\n                                                    </h4>\n                                                    <h4 class="contractor-sub">\n                                                        {{material.supplier.city}}, {{material.supplier.state}} &nbsp;{{material.supplier.zip}}\n                                                    </h4>\n\n                                                    <h4>\n                                                        <button ion-button icon-left clear medium\n                                                                class="call-contractor"\n                                                                (click)="callPhone(material.supplier.phone)">\n                                                            <span class="contractor-phone">Office: </span> <span\n                                                                class="contractor-underline">{{material.supplier.phone}}</span>\n                                                        </button>\n                                                    </h4>\n                                                </ion-item>\n                                            </ion-list>\n\n\n                                        </ion-card-content>\n                                        <div class="more-back">\n                                            <ion-row>\n                                                <ion-col>\n                                                    <button ion-button icon-left clear medium\n                                                            (click)="showDrivingDirections(material.supplier.lat, material.supplier.lon)">\n                                                        <ion-icon name="navigate"></ion-icon>\n                                                        Get Directions\n                                                    </button>\n                                                </ion-col>\n                                            </ion-row>\n                                        </div>\n                                    </div>\n                                </ion-card>\n\n                                <ion-card>\n                                    <ion-card-header class="task-card-header action-button">\n\n\n                                        <ion-row>\n                                            <ion-col width-50>\n                                                <button class="btn-shadow" ion-button icon-left block\n                                                        color="secondary"\n                                                        (click)="setStatus(3, nextDayTask.data[date][j].id, date, j)"\n                                                        *ngIf="task.status_id === 2 || task.status_id === 8">\n                                                    <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                                                    Accept\n                                                </button>\n                                                <button class="btn-shadow" disabled ion-button icon-left block\n                                                        color="secondary"\n                                                        *ngIf="task.status_id === 3">\n                                                    <ion-icon name="fa-thumbs-o-up"></ion-icon>\n                                                    Accepted\n                                                </button>\n\n                                            </ion-col>\n                                            <ion-col width-50>\n                                                <button class="btn-shadow" ion-button icon-left block\n                                                        color="danger"\n                                                        (click)="openRejectModal(8, task.id, date, j)"\n                                                        *ngIf="task.status_id === 2 || task.status_id === 3">\n                                                    <ion-icon name="fa-thumbs-o-down"></ion-icon>\n                                                    Reject\n                                                </button>\n                                                <button class="btn-shadow" disabled ion-button icon-left block\n                                                        color="danger"\n                                                        *ngIf="task.status_id === 8">\n                                                    <ion-icon name="fa-thumbs-o-down"></ion-icon>\n                                                    Rejected\n                                                </button>\n                                            </ion-col>\n                                        </ion-row>\n\n\n                                    </ion-card-header>\n                                </ion-card>\n                            </div>\n                        </div>\n                    </div>\n                </ion-card-content>\n\n            </ion-card>\n\n        </div>\n    </div>\n\n</ion-content>\n\n<!--<div *ngIf="nextDayTask.data?.length === 0">-->\n<!--<div *ngIf="!isIos">-->\n<!--<div ion-fixed class="fs-no-results-container" style="color:#2d2d2d">-->\n<!--<div class="content">-->\n<!--&lt;!&ndash;<ion-icon name="paper-plane"></ion-icon>&ndash;&gt;-->\n<!--<div class="fs-no-results-msg">You Do Not Have<br/>Any Future Tasks</div>-->\n<!--<div class="button-container">-->\n<!--<button class="home-btn" ion-button icon-right block color="secondary"-->\n<!--(click)="loadTomorrowsTasks(userId)">-->\n<!--Check for Future Tasks-->\n<!--</button>-->\n<!--</div>-->\n<!--</div>-->\n<!--</div>-->\n<!--</div>-->\n\n<!--<div *ngIf="isIos">-->\n<!--<div ion-fixed class="fs-no-results-container-ios" style="color:#2d2d2d">-->\n<!--<div class="content">-->\n<!--&lt;!&ndash;<ion-icon name="paper-plane"></ion-icon>&ndash;&gt;-->\n<!--<div class="fs-no-results-msg">You Do Not Have<br/>Any Future Tasks</div>-->\n<!--<div class="button-container">-->\n<!--<button class="home-btn" ion-button icon-right block color="secondary"-->\n<!--(click)="loadTomorrowsTasks(userId)">-->\n<!--Check for Future Tasks-->\n<!--</button>-->\n<!--</div>-->\n<!--</div>-->\n<!--</div>-->\n<!--</div>-->\n<!--</div>-->\n\n\n\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/next-day-tasks/next-day.html"*/,
        animations: [
            __WEBPACK_IMPORTED_MODULE_10__animations_animations__["a" /* Animations */].expandCollapse
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_8__providers_user_manager__["a" /* UserManager */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_7__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_5__providers_google_maps_manager__["a" /* GoogleMapsManager */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_9__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_12__providers_conversion_manager__["a" /* ConversionManager */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_native_fcm__["a" /* FCM */]])
], NextDayPage);

//# sourceMappingURL=next-day.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleteNotesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CompleteNotesPage = (function () {
    function CompleteNotesPage(navCtrl, navParams, taskMgr, geolocation, actionSheetCtrl, platform, utils, camera, diagnostic, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.taskMgr = taskMgr;
        this.geolocation = geolocation;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.utils = utils;
        this.camera = camera;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.files = [];
        this.type = { options: '' };
        this.isIos = false;
        this.isCordova = false;
        this.taskId = navParams.get('task_id');
        this.userId = navParams.get('user_id');
        console.log('this.taskId ', JSON.stringify(this.taskId));
        console.log('this.userId ', JSON.stringify(this.userId));
        this.isCordova = this.taskMgr.returnPlatform().isCordova;
        this.data = {
            userId: this.userId,
            taskId: this.taskId,
            notes: '',
            statusId: 9,
            files: this.files,
            save: false
        };
        console.log('this.data ', JSON.stringify(this.data));
        if (this.platform.is('ios')) {
            // This will only print when on iOS
            this.isIos = true;
        }
        var successCallback = function (isAvailable) {
            console.log('Is available? ' + isAvailable);
        };
        var errorCallback = function (e) {
            _this.diagnostic.requestCameraAuthorization().then(successCallback);
        };
        if (this.isCordova) {
            this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
        }
    }
    CompleteNotesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad FeedbackPage');
        setTimeout(function () { return _this.getLocation(); }, 500);
    };
    CompleteNotesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionView stuff');
        // this.loadTaskInfo();
        setTimeout(function () { return _this.getLocation(); }, 500);
    };
    CompleteNotesPage.prototype.loadTaskInfo = function () {
        var _this = this;
        this.taskMgr.getCurrentTaskRemote().then(function (response) {
            _this.currentTask = response;
            console.log('this.currentTask', JSON.stringify(_this.currentTask));
        });
    };
    CompleteNotesPage.prototype.getLocation = function () {
        var _this = this;
        if (this.isCordova) {
            this.geolocation.getCurrentPosition().then(function (resp) {
                _this.lat = resp.coords.latitude;
                _this.lon = resp.coords.longitude;
            }).catch(function (error) {
                console.log('Error getting location', error);
            });
        }
    };
    CompleteNotesPage.prototype.deleteImage = function (index) {
        this.data.files.splice(index, 1);
    };
    /** used for HTML file upload only */
    CompleteNotesPage.prototype.showFiles = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        var file = files[0];
        var fileData = {
            name: file.name,
            caption: '',
            path: '',
            file: file
        };
        this.data.files.push(fileData);
    };
    /** save button clicked */
    CompleteNotesPage.prototype.save = function () {
        var _this = this;
        this.data.save = true;
        this.data.notes = this.data.notes.trim();
        this.data.lat = this.lat;
        this.data.lon = this.lon;
        this.utils.presentLoading();
        this.taskMgr.postFeedback(this.data).then(function (response) {
            if (_this.isIos) {
                _this.camera.cleanup().then(function (response) {
                    //
                }).catch(function (error) {
                    console.error("There was an error calling Camera.cleanup: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(error));
                });
            }
            _this.utils.dismissLoading();
            setTimeout(function () {
                if (response === true) {
                    _this.navCtrl.pop().then(function (res) {
                        console.log('res in complete pages  ', JSON.stringify(res));
                    });
                }
                else {
                    _this.utils.toastError({ msg: 'There was an error posting feedback' });
                }
            }, 500);
        }).catch(function (error) {
            _this.utils.toastError({ msg: 'There was an error posting feedback' });
            if (_this.isIos) {
                _this.camera.cleanup().then(function (response) {
                    //
                }).catch(function (error) {
                    console.error("There was an error calling Camera.cleanup: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(error));
                });
            }
            _this.utils.dismissLoading();
        });
    };
    /** cancel button clicked, used when page was a modal */
    CompleteNotesPage.prototype.cancel = function () {
        this.data.save = false;
        this.navCtrl.pop();
    };
    CompleteNotesPage.prototype.disableFormSubmit = function () {
        /**
         *  Used to disable a form button. So :
         *  if false OR false, then disable (true) OR
         *  if true AND true, the don't disable (false)
         */
        return !((this.data.notes.trim().length > 4) && (this.data.statusId > 0));
    };
    /** trim notes  */
    CompleteNotesPage.prototype.trimNotes = function () {
        this.data.notes = this.data.notes.trim();
    };
    /** when cordova, present an action sheet to take a pic or import from gallery */
    CompleteNotesPage.prototype.presentActionSheet = function (editable) {
        var _this = this;
        var buttons = [];
        if (this.platform.is('cordova')) {
            buttons.push({
                text: 'Choose Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.PHOTOLIBRARY, editable); // 0 == Library
                }
            }, {
                text: 'Take Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.CAMERA, editable); // 1 == Camera
                }
            });
        }
        buttons.push({
            text: 'Cancel',
            role: 'cancel'
        });
        var actionSheet = this.actionSheetCtrl.create({
            buttons: buttons
        });
        actionSheet.present();
    };
    /**
     * get picture from gallery or camera
     * @Param sourceType:number camera or gallery
     */
    CompleteNotesPage.prototype.getPicture = function (sourceType, editable) {
        var _this = this;
        this.utils.presentLoading();
        this.camera.getPicture({
            quality: 40,
            destinationType: 1,
            sourceType: sourceType,
            targetWidth: 1000,
            targetHeight: 1333,
            allowEdit: true,
            mediaType: 0,
            saveToPhotoAlbum: false,
            correctOrientation: true //this needs to be true to get a file:/// FILE_URI, otherwise android does not return a file uri. Yep.
        }).then(function (imageData) {
            console.log("IMAGEDATA: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(imageData, true));
            //fix for android, remove query string from end of file_uri or crashes android //
            imageData = imageData.split('?')[0];
            var filename = imageData.replace(/^.*[\\\/]/, '');
            var fileData = {
                name: filename,
                caption: '',
                //notes : '',
                path: imageData,
            };
            _this.data.files.push(fileData);
            _this.utils.dismissLoading();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Image Error',
                message: 'Unable to upload image. Please choose a different image or take an new picture',
                cssClass: 'myAlerts',
                buttons: ['OK']
            });
            alert.present();
            console.log("ERROR -> " + JSON.stringify(err));
            _this.utils.dismissLoading();
        });
    };
    return CompleteNotesPage;
}());
CompleteNotesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-complete-notes',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/complete-notes/complete-notes.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Complete Task</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n    <ion-card>\n        <ion-card-content>\n            <ion-grid>\n                <ion-row>\n\n                    <div><strong>Enter Task Notes</strong> (not required)</div>\n\n\n                </ion-row>\n                <ion-row>\n                    <ion-textarea class="" [(ngModel)]="data.notes" placeholder="" (blur)="trimNotes()"></ion-textarea>\n                </ion-row>\n            </ion-grid>\n\n            <ion-list>\n\n                <ion-row class="mar-bot15">\n                    <ion-col>\n                        <button class="btn-shadow width100" ion-button icon-left block\n                                (click)="presentActionSheet(true)">\n                            <ion-icon name="add-circle"></ion-icon>\n                            Add Image\n                        </button>\n                    </ion-col>\n                </ion-row>\n\n\n                <ion-list *ngFor="let file of data.files; let i = index">\n                    <ion-item>\n                        {{file.name}}\n                        <button ion-button icon-only item-right clear (click)="deleteImage(i)">\n                            <ion-icon color="danger" name="trash"></ion-icon>\n                        </button>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label stacked>Caption: (Tap Below to add a caption to this image)</ion-label>\n                        <ion-input [(ngModel)]="data.files[i].caption"></ion-input>\n                    </ion-item>\n\n                </ion-list>\n\n\n            </ion-list>\n\n\n        </ion-card-content>\n\n        <ion-row class="feedback-footer">\n            <ion-col width-50>\n                <button class="btn-shadow" ion-button icon-left block color="cancel" (click)="cancel()">\n                    <ion-icon name="fa-arrow-left"></ion-icon>\n                    Cancel\n                </button>\n            </ion-col>\n            <ion-col width-50>\n                <button class="btn-shadow" ion-button icon-left block color="secondary" (click)="save()">\n                    <ion-icon name="checkbox-outline"></ion-icon>\n                    Save\n                </button>\n            </ion-col>\n        </ion-row>\n\n\n    </ion-card>\n\n    <ion-card class="fixed-height">\n\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/complete-notes/complete-notes.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], CompleteNotesPage);

//# sourceMappingURL=complete-notes.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__animations_animations__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__history_review_history_review__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_conversion_manager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_fcm__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__single_history_task_single_history_task__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_google_maps_manager__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__driving_directions_driving_directions__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var HistoryPage = (function () {
    function HistoryPage(navCtrl, navParams, userMgr, appCtrl, taskMgr, callNumber, utils, conMgr, alertCtrl, fcm, mapsManager, geolocation, diagnostic) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.taskMgr = taskMgr;
        this.callNumber = callNumber;
        this.utils = utils;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.mapsManager = mapsManager;
        this.geolocation = geolocation;
        this.diagnostic = diagnostic;
        this.hasHistory = true;
        this.hasPaused = true;
        this.user = '';
        this.userId = '';
        this.currentUser = '';
        this.historyLoaded = false;
        this.divState = 'hide';
        this.isIos = false;
        this.url = "https://www.cleartasksolutions.com/uploads/";
        this.tempArray = [];
        this.displayOptions = {
            proj: -1,
            task: -1
        };
        this.pausedDisplayOptions = {
            proj: -1,
            task: -1
        };
        this.pausedContractorDetails = {
            proj: -1
        };
        this.contractorDetails = {
            proj: -1
        };
        this.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.divState = 'collapse';
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    HistoryPage.prototype.ionViewDidEnter = function () {
        this.subscribeAgain();
        this.loadHistory();
    };
    HistoryPage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.navCtrl.parent.select(3);
                }
                else if (data.param1 === 'additional_notes') {
                    _this.presentAlert();
                }
                else if (data.param1 === "upcoming_task") {
                    _this.taskMgr.loadHomePage(1);
                    _this.navCtrl.parent.select(0);
                }
                else if (data.param1 === 'crews') {
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    HistoryPage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.parent.select(0);
                    }
                }]
        });
        alert.present();
    };
    HistoryPage.prototype.loadHistory = function () {
        var _this = this;
        this.displayOptions = {
            proj: -1,
            task: -1
        };
        this.utils.presentLoading();
        this.historyLoaded = false;
        this.taskMgr.getTaskHistoryRemoteV2(this.userId, "9").then(function (response) {
            _this.history = response;
            console.log('this.history ', JSON.stringify(_this.history));
            _this.user = response.userdata;
            _this.historyLoaded = true;
            var myHistory = response.data;
            var updatedHistory = [];
            for (var i = 0; i < myHistory.length; i++) {
                if (myHistory[i].job_tasks.length !== 0) {
                    updatedHistory.push(myHistory[i]);
                }
            }
            _this.history.data = updatedHistory;
            var jobTaskLength = 0;
            for (var p = 0; p < _this.history.data.length; p++) {
                jobTaskLength += _this.history.data[p].job_tasks.length;
            }
            if (jobTaskLength === 0) {
                _this.hasHistory = false;
            }
            else {
                _this.hasHistory = true;
            }
            _this.utils.dismissLoading();
        }).catch(function (error) {
            _this.utils.dismissLoading();
            setTimeout(function () {
                _this.utils.toastError(error);
            }, 500);
        }).then(function () {
            console.log('this.history in then  ', JSON.stringify(_this.history));
        });
        this.taskMgr.getPausedTasks(this.userId, "12").then(function (res) {
            _this.pausedTasks = res.data;
            var pausedTaskLength = 0;
            for (var i = 0; i < _this.pausedTasks.length; i++) {
                pausedTaskLength += _this.pausedTasks[i].job_tasks.length;
            }
            if (pausedTaskLength === 0) {
                _this.hasPaused = false;
            }
            else {
                _this.hasPaused = true;
            }
        });
    };
    HistoryPage.prototype.resumeTask = function (project, task) {
        var _this = this;
        this.taskMgr.getCurrentTaskRemote().then(function (res) {
            var currentStatus = res.task.job_tasks.status_id;
            if (currentStatus === 2 || currentStatus === 3 || currentStatus === 7) {
                var data = {
                    taskId: _this.pausedTasks[project].job_tasks[task].id,
                    userId: _this.userId,
                    notes: '',
                    statusId: 4,
                    files: [],
                    timestamp: new Date(Date.now())
                };
                _this.taskMgr.resumeOnHoldTask(data).then(function (response) {
                    _this.navCtrl.parent.select(0);
                });
            }
            else if (currentStatus === 4 || currentStatus === 5) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Task In Progress',
                    message: 'Please complete or place the current task on hold before resuming this task',
                    cssClass: 'myAlerts',
                    buttons: ['OK']
                });
                alert_1.present();
            }
        }).catch(function (error) {
            var data = {
                taskId: _this.pausedTasks[project].job_tasks[task].id,
                userId: _this.userId,
                notes: '',
                statusId: 4,
                files: [],
                timestamp: new Date(Date.now())
            };
            _this.taskMgr.resumeOnHoldTask(data).then(function (response) {
                _this.navCtrl.parent.select(0);
            });
        });
    };
    HistoryPage.prototype.openImage = function (image) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__history_review_history_review__["a" /* HistoryReviewPage */], image);
        return true;
    };
    HistoryPage.prototype.displayTask = function (i, j) {
        var _this = this;
        this.pausedDisplayOptions = {
            proj: -1,
            task: -1
        };
        if (this.displayOptions.proj === i && this.displayOptions.task === j) {
            this.displayOptions = {
                proj: -1,
                task: -1
            };
        }
        else {
            this.utils.presentLoading();
            this.taskMgr.loadTaskUserLogArray(this.history.data[i].job_tasks[j].id, this.userId).then(function (response) {
                var json = response;
                _this.history.data[i].job_tasks[j].task_user_log = json.data;
                _this.tempArray = json.data;
                _this.utils.dismissLoading();
                var myKey1 = Object.keys(_this.tempArray);
                for (var k = 0; k < myKey1.length; k++) {
                    var tempKey = _this.tempArray[Object.keys(_this.tempArray)[k]];
                    if (tempKey.fileData.length > 0) {
                        for (var m = 0; m < tempKey.fileData.length; m++) {
                            tempKey.fileData[m].file_name = _this.url + tempKey.fileData[m].file_name;
                        }
                    }
                }
            }).then(function () {
                var contractor = _this.history.data[i].contractor;
                var currentTask = _this.history.data[i].job_tasks[j];
                var params = {
                    id: currentTask.id,
                    updatedTime: currentTask.updatedTime,
                    task_description: currentTask.task_description,
                    status: currentTask.status,
                    task_crew: currentTask.task_crew,
                    task_equipment: currentTask.task_equipment,
                    additional_notes: currentTask.additional_notes,
                    task_materials: currentTask.task_materials,
                    contractor_contacts: currentTask.contractor_contacts,
                    task_user_log: currentTask.task_user_log,
                    contractor_name: contractor[0].name,
                    contractor_phone: contractor[0].office_phone
                };
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__single_history_task_single_history_task__["a" /* SingleHistoryTaskPage */], params).then(function () {
                });
            });
        }
    };
    HistoryPage.prototype.expandPausedTask = function (a, b) {
        var _this = this;
        this.displayOptions = {
            proj: -1,
            task: -1
        };
        if (this.pausedDisplayOptions.proj === a && this.pausedDisplayOptions.task === b) {
            this.pausedDisplayOptions = {
                proj: -1,
                task: -1
            };
        }
        else {
            this.utils.presentLoading();
            this.taskMgr.loadTaskUserLogArray(this.pausedTasks[a].job_tasks[b].id, this.userId).then(function (response) {
                var json = response;
                _this.pausedTasks[a].job_tasks[b].task_user_log = json.data;
                _this.tempArray = json.data;
                _this.utils.dismissLoading();
                var myKey1 = Object.keys(_this.tempArray);
                for (var k = 0; k < myKey1.length; k++) {
                    var tempKey = _this.tempArray[Object.keys(_this.tempArray)[k]];
                    if (tempKey.fileData.length > 0) {
                        for (var m = 0; m < tempKey.fileData.length; m++) {
                            tempKey.fileData[m].file_name = _this.url + tempKey.fileData[m].file_name;
                        }
                    }
                }
            }).then(function () {
                var contractor = _this.history.data[a].contractor;
                var currentTask = _this.history.data[a].job_tasks[b];
                var params = {
                    id: currentTask.id,
                    updatedTime: currentTask.updatedTime,
                    task_description: currentTask.task_description,
                    status: currentTask.status,
                    task_crew: currentTask.task_crew,
                    task_equipment: currentTask.task_equipment,
                    additional_notes: currentTask.additional_notes,
                    task_materials: currentTask.task_materials,
                    contractor_contacts: currentTask.contractor_contacts,
                    task_user_log: currentTask.task_user_log,
                    contractor_name: contractor[0].name,
                    contractor_phone: contractor[0].office_phone
                };
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__single_history_task_single_history_task__["a" /* SingleHistoryTaskPage */], params).then(function () {
                });
            });
        }
    };
    HistoryPage.prototype.logout = function () {
        var _this = this;
        this.userMgr.logout().then(function (response) {
            _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        });
    };
    HistoryPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    HistoryPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    HistoryPage.prototype.toggleDivStatePaused = function (proj) {
        if (this.pausedContractorDetails.proj === proj) {
            this.pausedContractorDetails.proj = -1;
        }
        else {
            this.pausedContractorDetails.proj = proj;
        }
    };
    HistoryPage.prototype.toggleDivState = function (proj) {
        if (this.contractorDetails.proj === proj) {
            this.contractorDetails.proj = -1;
        }
        else {
            this.contractorDetails.proj = proj;
        }
    };
    HistoryPage.prototype.showDrivingDirections = function (lat, lon) {
        var _this = this;
        this.utils.presentLoading();
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.utils.presentToast("Please enable your location in device settings", true);
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please enable your location in device settings", true);
            _this.utils.dismissLoading();
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(function (resp) {
            if (locEnabled) {
                var destination_1 = lat + "," + lon;
                _this.geolocation.getCurrentPosition({ timeout: 15000 }).then(function (position) {
                    var origin = position.coords.latitude + "," + position.coords.longitude;
                    return _this.mapsManager.getDirections(origin, destination_1);
                }).then(function (response) {
                    var params = {
                        directions: response
                    };
                    setTimeout(function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__driving_directions_driving_directions__["a" /* DrivingDirectionsPage */], params);
                        _this.utils.dismissLoading();
                    }, 2000);
                }).catch(function (error) {
                    _this.utils.dismissLoading();
                    _this.utils.presentToast("Please enable your location in device settings", true);
                });
            }
            if (locEnabled === false) {
                _this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    };
    return HistoryPage;
}());
HistoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-history',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/history/history.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-row *ngIf="isIos">\n            <ion-col width-50>\n                <div text-center>\n                    <div class="ios-title">\n                        History\n                    </div>\n                </div>\n            </ion-col>\n            <ion-col width-25>\n                <ion-buttons class="mar-right6" end>\n                    <button class="refresh" ion-button round icon-right color="secondary" (click)="loadHistory()">\n                        Refresh\n                        <ion-icon class="logout-hide" name="refresh"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf="!isIos">\n            <ion-title>History</ion-title>\n            <ion-buttons class="mar-right6" end>\n                <button class="refresh" ion-button round icon-right color="secondary" (click)="loadHistory()"> Refresh\n                    <ion-icon name="refresh"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-row>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <div *ngIf="hasPaused">\n        <div *ngFor="let task of pausedTasks; let a = index">\n            <ion-card *ngIf="task.job_tasks.length > 0">\n                <ion-card-header text-wrap class="task-card-header header-proj">\n                    {{task.job_name}}\n                </ion-card-header>\n\n                <ion-card-content *ngIf="pausedContractorDetails.proj === a">\n\n                    <div class="task-card-content">\n                        <ion-list no-padding>\n                            <ion-item no-padding>\n                                <h4 class="contractor-main">Project Address:</h4>\n                                <h4 class="contractor-sub">\n                                    {{task.address}}\n                                </h4>\n                                <h4 class="contractor-sub">\n                                    {{task.city}}, {{task.state}}&nbsp;{{task.zip}}\n                                </h4>\n\n\n                            </ion-item>\n                        </ion-list>\n                    </div>\n                    <div class="mar-bot25">\n\n                        <ion-list no-padding text-wrap>\n                            <ion-item no-padding text-wrap>\n                                <h4 class="contractor-main">Contractor:</h4>\n                                <h4 class="contractor-sub">\n                                    {{task.contractor[0].name}}\n                                </h4>\n                                <h4>\n                                    <button ion-button icon-left clear medium\n                                            class="call-contractor"\n                                            (click)="callPhone(task.contractor[0].office_phone)">\n                                        <span class="contractor-phone">Office: </span> <span\n                                            class="contractor-underline">{{task.contractor[0].office_phone}}</span>\n                                    </button>\n                                </h4>\n\n                            </ion-item>\n                        </ion-list>\n\n                    </div>\n                </ion-card-content>\n\n                <div no-padding class="more-back move-up">\n                    <ion-row>\n                        <ion-col>\n                            <button class="more-left" ion-button icon-left clear medium\n                                    (click)="toggleDivStatePaused(a)">\n                                <span *ngIf="pausedContractorDetails.proj !== a">More ...</span>\n                                <span *ngIf="pausedContractorDetails.proj === a">Less ...</span>\n                            </button>\n                        </ion-col>\n                        <ion-col text-right>\n                            <button class="pad8" ion-button icon-left clear medium\n                                    (click)="showDrivingDirections(task.lat, task.lon)">\n                                <ion-icon name="navigate"></ion-icon>\n                                Get Directions\n                            </button>\n                        </ion-col>\n                    </ion-row>\n                </div>\n\n                <ion-card-content *ngFor="let jobTasks of task.job_tasks; let b = index">\n                    <div class="task-card-content">\n                        <h3 class="text-info">{{b + 1}}: {{jobTasks.task_description}} </h3>\n                        <h4 class="date-info mar-top10">Date:\n                            <span *ngIf="isIos">{{jobTasks.updatedTime | date:\'mediumDate\'}}</span>\n                            <span *ngIf="!isIos">{{jobTasks.updatedTime | date:\'mediumDate\'}}</span>\n                        </h4>\n                        <div *ngIf="jobTasks.additional_notes?.length > 0">\n                            <h5 class="text-info">Additional Task Notes</h5>\n                            <ul class="add-ul" *ngFor="let newNotes of jobTasks.additional_notes; let u = index">\n                                <li class="more-notes">{{newNotes.notes}}</li>\n                                <li class="notes-by">Added By: <strong>{{newNotes.employee.first_name}}\n                                    {{newNotes.employee.last_name}}</strong> at <strong>\n                                    <span *ngIf="isIos">{{adjustTime(newNotes.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{newNotes.updatedTime | date:\'shortTime\'}}</span>\n                                </strong></li>\n                            </ul>\n                        </div>\n                    </div>\n\n                    <ion-row>\n                        <ion-col margin-bottom>\n                            <button *ngIf="pausedDisplayOptions.proj !== a || pausedDisplayOptions.task !== b"\n                                    class="details"\n                                    ion-button icon-left clear small (click)="expandPausedTask(a, b)">\n                                <ion-icon name="fa-chevron-circle-right"></ion-icon>\n                                <div>More Details</div>\n                            </button>\n                            <button *ngIf="pausedDisplayOptions.task === b && pausedDisplayOptions.proj === a"\n                                    class="details"\n                                    ion-button icon-left clear small\n                                    (click)="expandPausedTask(a, b)">\n                                <ion-icon name="fa-chevron-circle-down"></ion-icon>\n                                <div>Hide Details</div>\n                            </button>\n                        </ion-col>\n                    </ion-row>\n\n\n                    <div margin-vertical *ngIf="pausedDisplayOptions.proj === a && pausedDisplayOptions.task === b">\n                        <h4>Crew</h4>\n                        <ol>\n                            <li *ngFor="let taskCrew of jobTasks.task_crew">\n                                <div>{{taskCrew.first_name}} {{taskCrew.last_name}}</div>\n                                <div *ngIf="taskCrew.is_foreman === 1">-- Foreman --</div>\n                                <button ion-button icon-left clear medium\n                                        class="contractorPhoneNum"\n                                        (click)="callPhone(taskCrew.phone)">\n                                    {{taskCrew.phone}}\n                                </button>\n                            </li>\n                        </ol>\n                        <div *ngFor="let materials of jobTasks.task_materials; let c = index">\n                            <h4 *ngIf="c === 0">Materials</h4>\n                            <ol>\n                                <li>\n                                    <h5>{{materials.material_name}}</h5>\n                                    <h5>{{materials.supplier.name}}</h5>\n                                    <h5>{{materials.supplier.address}}</h5>\n                                    <h5>{{materials.supplier.city}} {{materials.supplier.state}},\n                                        {{materials.supplier.zip}}</h5>\n                                    <button ion-button icon-left clear medium\n                                            class="contractorPhoneNum"\n                                            (click)="callPhone(materials.supplier.phone)">\n                                        {{materials.supplier.phone}}\n                                    </button>\n                                </li>\n                            </ol>\n                        </div>\n                        <h4>Notes</h4>\n                        <ol>\n                            <li *ngFor="let notes of jobTasks.task_user_log">\n                                <h5>Time:\n                                    <span *ngIf="isIos">{{adjustTime(notes.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{notes.updatedTime | date:\'shortTime\'}}</span>\n                                </h5>\n                                <h5 class="mar-bot10">Notes: {{notes.notes}}</h5>\n                                <div *ngIf="notes.fileData.length > 0">\n                                    <h5 class="mar-bot5">Click On The Image To Review</h5>\n                                    <div *ngFor="let images of notes.fileData">\n                                        <img (click)="openImage(images)" src="{{images.file_name}}">\n                                        <h5 class="img-margin">Image Details: {{images.notes}}</h5>\n                                    </div>\n                                </div>\n                            </li>\n                        </ol>\n                    </div>\n                </ion-card-content>\n\n                <div padding class="more-back move-up">\n                    <ion-row>\n                        <button class="btn-shadow" ion-button icon-left block color="secondary"\n                                (click)="resumeTask(a,b)">\n                            Resume Task\n                        </button>\n                    </ion-row>\n                </div>\n            </ion-card>\n        </div>\n    </div>\n\n    <div *ngIf="history">\n        <ion-card *ngFor="let task of history.data; let i = index">\n            <ion-card-header text-wrap class="task-card-header header-proj">\n                {{task.job_name}}\n            </ion-card-header>\n\n            <ion-card-content *ngIf="contractorDetails.proj === i">\n\n                <div class="task-card-content">\n                    <ion-list no-padding>\n                        <ion-item no-padding>\n                            <h4 class="contractor-main">Project Address:</h4>\n                            <h4 class="contractor-sub">\n                                {{task.address}}\n                            </h4>\n                            <h4 class="contractor-sub">\n                                {{task.city}}, {{task.state}}&nbsp;{{task.zip}}\n                            </h4>\n\n\n                        </ion-item>\n                    </ion-list>\n                </div>\n                <div class="mar-bot25">\n\n                    <ion-list no-padding text-wrap>\n                        <ion-item no-padding text-wrap>\n                            <h4 class="contractor-main">Contractor:</h4>\n                            <h4 class="contractor-sub">\n                                {{task.contractor[0].name}}\n                            </h4>\n                            <h4>\n                                <button ion-button icon-left clear medium\n                                        class="call-contractor"\n                                        (click)="callPhone(task.contractor[0].office_phone)">\n                                    <span class="contractor-phone">Office: </span> <span\n                                        class="contractor-underline">{{task.contractor[0].office_phone}}</span>\n                                </button>\n                            </h4>\n\n                        </ion-item>\n                    </ion-list>\n\n                </div>\n            </ion-card-content>\n\n            <div no-padding class="more-back move-up">\n                <ion-row>\n                    <ion-col>\n                        <button class="more-left" ion-button icon-left clear medium (click)="toggleDivState(i   )">\n                            <span *ngIf="contractorDetails.proj !== i">More ...</span>\n                            <span *ngIf="contractorDetails.proj === i">Less ...</span>\n                        </button>\n                    </ion-col>\n                    <ion-col text-right>\n                        <button class="pad8" ion-button icon-left clear medium\n                                (click)="showDrivingDirections(task.lat, task.lon)">\n                            <ion-icon name="navigate"></ion-icon>\n                            Get Directions\n                        </button>\n                    </ion-col>\n                </ion-row>\n            </div>\n\n            <ion-card-content *ngFor="let jobTasks of task.job_tasks; let j = index">\n                <div class="task-card-content">\n                    <h3 class="text-info">{{j + 1}}: {{jobTasks.task_description}} </h3>\n                    <h4 class="date-info mar-top10">Date:\n                        <span *ngIf="isIos">{{jobTasks.updatedTime | date:\'mediumDate\'}}</span>\n                        <span *ngIf="!isIos">{{jobTasks.updatedTime | date:\'mediumDate\'}}</span>\n                    </h4>\n                    <div *ngIf="jobTasks.additional_notes.length > 0">\n                        <h5 class="text-info">Additional Task Notes</h5>\n                        <ul class="add-ul" *ngFor="let newNotes of jobTasks.additional_notes; let u = index">\n                            <li class="more-notes">{{newNotes.notes}}</li>\n                            <li class="notes-by">Added By: <strong>{{newNotes.employee.first_name}}\n                                {{newNotes.employee.last_name}}</strong> at <strong>\n                                <span *ngIf="isIos">{{adjustTime(newNotes.updatedTime) }}</span>\n                                <span *ngIf="!isIos">{{newNotes.updatedTime | date:\'shortTime\'}}</span>\n                            </strong></li>\n                        </ul>\n                    </div>\n                </div>\n\n                <ion-row>\n                    <ion-col>\n                        <button *ngIf="displayOptions.proj !== i || displayOptions.task !== j" class="details"\n                                ion-button icon-left clear small (click)="displayTask(i, j)">\n                            <ion-icon name="fa-chevron-circle-right"></ion-icon>\n                            <div>More Details</div>\n                        </button>\n                        <button *ngIf="displayOptions.task === j && displayOptions.proj === i" class="details"\n                                ion-button icon-left clear small\n                                (click)="displayTask(i, j)">\n                            <ion-icon name="fa-chevron-circle-down"></ion-icon>\n                            <div>Hide Details</div>\n                        </button>\n                    </ion-col>\n                </ion-row>\n\n            </ion-card-content>\n        </ion-card>\n    </div>\n\n    <div *ngIf="!hasHistory && !hasPaused">\n        <ion-card>\n            <ion-card-header text-center class="task-card-header no-history">\n                No Job History\n            </ion-card-header>\n        </ion-card>\n    </div>\n\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/history/history.html"*/,
        animations: [
            __WEBPACK_IMPORTED_MODULE_6__animations_animations__["a" /* Animations */].expandCollapse
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_manager__["a" /* UserManager */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_2__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_9__providers_conversion_manager__["a" /* ConversionManager */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_fcm__["a" /* FCM */],
        __WEBPACK_IMPORTED_MODULE_14__providers_google_maps_manager__["a" /* GoogleMapsManager */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */]])
], HistoryPage);

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HistoryReviewPage = (function () {
    function HistoryReviewPage(navCtrl, navParams, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.files = [];
        this.type = { options: '' };
        this.isIos = false;
        this.id = navParams.get("id");
        this.logId = navParams.get("log_id");
        this.fileName = navParams.get("file_name");
        if (this.platform.is('ios')) {
            this.isIos = true;
        }
    }
    HistoryReviewPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    return HistoryReviewPage;
}());
HistoryReviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-history-review',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/history-review/history-review.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Image Review</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n    <ion-card-content>\n        <img src="{{fileName}}">\n        <!--<ion-list>-->\n            <!--<ion-item>-->\n                <!---->\n            <!--</ion-item>-->\n            <!--<ion-item>-->\n                <!--<ion-row>-->\n                    <!--<ion-col width-50>-->\n                        <!--<button ion-button icon-left block color="secondary" (click)="presentActionSheet()">-->\n                            <!--<ion-icon name="checkbox-outline"></ion-icon>-->\n                            <!--Update-->\n                        <!--</button>-->\n                    <!--</ion-col>-->\n                    <!--<ion-col width-50>-->\n                        <!--<button ion-button icon-left block color="dark" (click)="pdfCreator()">-->\n                            <!--<ion-icon name="close"></ion-icon>-->\n                            <!--PDF-->\n                        <!--</button>-->\n                    <!--</ion-col>-->\n                    <!--<ion-col *ngIf="allowSave" width-100>-->\n                        <!--<button ion-button icon-left block color="secondary" (click)="save()">-->\n                            <!--<ion-icon name="checkbox-outline"></ion-icon>-->\n                            <!--Save-->\n                        <!--</button>-->\n                    <!--</ion-col>-->\n                <!--</ion-row>-->\n            <!--</ion-item>-->\n        <!--</ion-list>-->\n\n    </ion-card-content>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/history-review/history-review.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
], HistoryReviewPage);

//# sourceMappingURL=history-review.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SingleHistoryTaskPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_conversion_manager__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SingleHistoryTaskPage = (function () {
    function SingleHistoryTaskPage(navCtrl, navParams, taskMgr, callNumber, conMgr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.taskMgr = taskMgr;
        this.callNumber = callNumber;
        this.conMgr = conMgr;
        this.isIos = false;
        this.taskId = navParams.get('id');
        this.updatedTime = navParams.get('updatedTime');
        this.task_description = navParams.get('task_description');
        this.status = navParams.get('status');
        this.task_crew = navParams.get('task_crew');
        this.task_equipment = navParams.get('task_equipment');
        this.additional_notes = navParams.get('additional_notes');
        this.task_materials = navParams.get('task_materials');
        this.contractor_contacts = navParams.get('contractor_contacts');
        this.task_user_log = navParams.get('task_user_log');
        this.contractor_name = navParams.get('contractor_name');
        this.contractor_phone = navParams.get('contractor_phone');
        console.log('this.updatedTime ', JSON.stringify(this.updatedTime));
        console.log('this.task_description ', JSON.stringify(this.task_description));
        console.log('this.status ', JSON.stringify(this.status));
        console.log('this.task_crew ', JSON.stringify(this.task_crew));
        console.log('this.task_equipment ', JSON.stringify(this.task_equipment));
        console.log('this.additional_notes ', JSON.stringify(this.additional_notes));
        console.log('this.task_materials ', JSON.stringify(this.task_materials));
        console.log('this.contractor_contacts ', JSON.stringify(this.contractor_contacts));
        console.log('this.task_user_log ', JSON.stringify(this.task_user_log));
        console.log('this.contractor_phone ', JSON.stringify(this.contractor_phone));
        console.log('this.contractor_name ', JSON.stringify(this.contractor_name));
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    SingleHistoryTaskPage.prototype.ionViewWillEnter = function () {
    };
    SingleHistoryTaskPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    SingleHistoryTaskPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    return SingleHistoryTaskPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], SingleHistoryTaskPage.prototype, "content", void 0);
SingleHistoryTaskPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-single-history-task',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/single-history-task/single-history-task.html"*/'<ion-header>\n    <ion-navbar *ngIf="isIos">\n        <ion-row>\n            <ion-col width-50>\n                <div text-center>\n                    <div class="ios-title">\n                        Task History\n                    </div>\n                </div>\n            </ion-col>\n\n\n        </ion-row>\n    </ion-navbar>\n    <ion-navbar *ngIf="!isIos">\n        <ion-row>\n            <ion-title>Task History</ion-title>\n        </ion-row>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content footer>\n\n    <ion-card class="card-border">\n        <ion-card-header class="task-card-header">\n            Task Details\n        </ion-card-header>\n        <ion-card-content>\n            <div class="task-card-content">\n                <ion-list no-padding text-wrap>\n                    <ion-item no-padding text-wrap>\n                        <h4 class="text-info capitalize">\n                            {{task_description}}</h4>\n                        <h5 class="s-time">\n                            Start Time:\n                            <span>{{updatedTime | date: \'shortTime\'}}</span>\n                        </h5>\n                    </ion-item>\n\n                    <div *ngIf="additional_notes?.length > 0">\n                        <h5 class="text-info">Additional Task Notes</h5>\n                        <ion-item no-padding text-wrap\n                                  *ngFor="let newNotes of additional_notes; let u = index">\n                            <h5 class="add_notes">{{u + 1}}: {{newNotes.notes}}</h5>\n                            <h5 class="add_by">Added By: <strong>{{newNotes.employee.first_name}}\n                                {{newNotes.employee.last_name}}</strong> at\n                                <span *ngIf="isIos">{{adjustTime(newNotes.updatedTime) }}</span>\n                                <span *ngIf="!isIos">{{newNotes.updatedTime | date: \'shortTime\'}}</span>\n                            </h5>\n                        </ion-item>\n                    </div>\n                </ion-list>\n            </div>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card class="card-border">\n        <ion-card-header class="task-card-header">\n            Crew\n        </ion-card-header>\n        <ion-card-content>\n            <div class="task-card-content">\n                <ion-row *ngFor="let crewMember of task_crew; let j = index">\n                    <ion-col class="margin-left-crew" *ngIf="crewMember.is_supervisor !== 1">\n                        <h4 class="crew-font">{{crewMember.first_name}}\n                            {{crewMember.last_name}} </h4>\n                        <h4 *ngIf="crewMember.is_foreman === 1"> -- Foreman --</h4>\n                        <p class="crew-phone">\n                            <button ion-button icon-left clear medium\n                                    class="phoneNum2"\n                                    (click)="callPhone(crewMember.phone)">\n                                {{crewMember.phone}}\n                            </button>\n                        </p>\n                    </ion-col>\n                </ion-row>\n            </div>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card class="card-border" *ngIf="contractor_contacts?.length > 0">\n        <ion-card-header class="task-card-header">\n            Contractor Contacts\n        </ion-card-header>\n        <ion-card-content class="task-card-content contacts-padding">\n\n            <ion-list no-padding text-wrap>\n                <ion-item class="contractor-label" no-padding text-wrap>\n                    <h4 class="contractor-main">Contractor:</h4>\n                    <h4 class="contractor-sub">\n                        {{contractor_name}}\n                    </h4>\n                    <h4>\n                        <button ion-button icon-left clear medium\n                                class="call-contractor"\n                                (click)="callPhone(contractor_phone)">\n                            <span class="contractor-phone">Office: </span> <span\n                                class="contractor-underline">{{contractor_phone}}</span>\n                        </button>\n                    </h4>\n\n                </ion-item>\n            </ion-list>\n\n            <ion-list no-padding text-wrap *ngFor="let contact of contractor_contacts">\n                <ion-item no-padding text-wrap>\n                    <h4 class="contractor-main">Contractor Contacts:</h4>\n                    <div class="contractor-div">\n                        <h4 class="contractor-sub">\n                            {{contact.first_name}} {{contact.last_name}} <span\n                                *ngIf="contact.title"> - {{contact.title}}</span>\n                        </h4>\n\n                        <h4 *ngIf="contact.office_phone">\n                            <button ion-button icon-left clear medium\n                                    class="call-contractor"\n                                    (click)="callPhone(contact.office_phone)">\n                                <span class="contractor-phone">Office: </span>\n                                <span class="contractor-underline">{{contact.office_phone}}</span>\n                            </button>\n                        </h4>\n                        <h4 *ngIf="contact.cell_phone">\n                            <button ion-button icon-left clear medium\n                                    class="call-contractor"\n                                    (click)="callPhone(contact.cell_phone)">\n                                <span class="contractor-phone">Cell: </span> <span>{{contact.cell_phone}}</span>\n                            </button>\n                        </h4>\n                    </div>\n                </ion-item>\n            </ion-list>\n\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card class="card-border" *ngIf="task_user_log?.length > 0">\n        <ion-card-header class="task-card-header">\n            Notes\n        </ion-card-header>\n        <ion-card-content>\n            <div class="task-card-content">\n                <div class="equip-div" *ngFor="let note of task_user_log; let l = index">\n                    <h5 class="add_notes">{{l + 1}}: {{note.notes}}</h5>\n                    <h5 class="add_by">Added At:\n                        <span *ngIf="isIos">{{adjustTime(note.updatedTime) }}</span>\n                        <span *ngIf="!isIos">{{note.updatedTime | date: \'shortTime\'}}</span>\n                    </h5>\n                </div>\n            </div>\n        </ion-card-content>\n    </ion-card>\n\n\n    <ion-card class="card-border" *ngIf="task_equipment?.length > 0">\n        <ion-card-header class="task-card-header">\n            Equipment\n        </ion-card-header>\n        <ion-card-content>\n            <div class="task-card-content">\n                <div class="equip-div" *ngFor="let item of task_equipment">\n                    <h4 class="equip-name">{{item.equipment_name}}</h4>\n                </div>\n                <div class="equip-center" *ngIf="task_equipment.length === 0">\n                    No Equipment Specified\n                </div>\n            </div>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card class="card-border">\n        <ion-card-header class="task-card-header">\n            Materials/Supplier\n        </ion-card-header>\n        <div *ngIf="task_materials?.length > 0">\n            <ion-card-content>\n\n\n                <div *ngFor="let material of task_materials; let m = index">\n\n                    <h3 class="text-info">{{material.material_name}}</h3>\n                    <ion-list no-padding text-wrap>\n                        <ion-item no-padding text-wrap>\n                            <h4 class="contractor-main">\n                                {{material.supplier.name}}\n                            </h4>\n                            <h4 class="contractor-sub">\n                                {{material.supplier.address}}\n                            </h4>\n                            <h4 class="contractor-sub">\n                                {{material.supplier.city}}, {{material.supplier.state}}&nbsp;{{material.supplier.zip}}\n                            </h4>\n                            <h4>\n                                <button ion-button icon-left clear medium\n                                        class="call-contractor"\n                                        (click)="callPhone(material.supplier.phone)">\n                                    <span class="contractor-phone">Office: </span> <span\n                                        class="contractor-underline">{{material.supplier.phone}}</span>\n                                </button>\n                            </h4>\n                        </ion-item>\n                    </ion-list>\n\n                </div>\n            </ion-card-content>\n            <div class="more-back">\n                <ion-row>\n                    <ion-col>\n                        <button ion-button icon-left clear medium\n                                (click)="showDrivingDirections(material.supplier.lat, material.supplier.lon)">\n                            <ion-icon name="navigate"></ion-icon>\n                            Get Directions\n                        </button>\n                    </ion-col>\n                </ion-row>\n            </div>\n        </div>\n        <div class="task-card-content equip-center"\n             *ngIf="task_materials.length === 0">\n            <ion-card-content>\n                No Materials Specified\n            </ion-card-content>\n        </div>\n    </ion-card>\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/single-history-task/single-history-task.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_4__providers_conversion_manager__["a" /* ConversionManager */]])
], SingleHistoryTaskPage);

//# sourceMappingURL=single-history-task.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_conversion_manager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AlertsPage = (function () {
    function AlertsPage(navCtrl, navParams, userMgr, appCtrl, taskMgr, utils, callNumber, conMgr, alertCtrl, fcm) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.taskMgr = taskMgr;
        this.utils = utils;
        this.callNumber = callNumber;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.debug = false;
        this.hasAlerts = true;
        this.alerts = '';
        this.user = '';
        this.alertsLoaded = false;
        this.displayAlert = -1;
        this.isIos = false;
        this.didLoad = false;
        this.isCordova = false;
        this.pushAlert = navParams.get('message');
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.isCordova = this.taskMgr.returnPlatform().isCordova;
    }
    AlertsPage.prototype.ionViewDidEnter = function () {
        this.loadAlerts();
        this.subscribeAgain();
    };
    AlertsPage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.loadAlerts();
                }
                else if (data.param1 === 'additional_notes') {
                    _this.presentAlert();
                }
                else if (data.param1 === "upcoming_task") {
                    _this.taskMgr.loadHomePage(1);
                    _this.navCtrl.parent.select(0);
                }
                else if (data.param1 === 'crews') {
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    AlertsPage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.parent.select(0);
                    }
                }]
        });
        alert.present();
    };
    AlertsPage.prototype.loadAlerts = function () {
        var _this = this;
        this.utils.presentLoading();
        this.alertsLoaded = false;
        this.taskMgr.getEmployeeAlerts().then(function (response) {
            if (_this.debug) {
                console.log('response ', JSON.stringify(response));
            }
            if (response.data.length === 0) {
                _this.hasAlerts = false;
            }
            else {
                _this.hasAlerts = true;
            }
            _this.alerts = response;
            _this.user = response.userdata;
            _this.alertsLoaded = true;
            if (_this.debug) {
                console.log('this.pushAlert', JSON.stringify(_this.pushAlert));
                console.log('this.alerts', JSON.stringify(_this.alerts));
            }
            _this.utils.dismissLoading();
        }).catch(function (error) {
            _this.utils.dismissLoading();
            setTimeout(function () {
                _this.utils.toastError(error);
            }, 500);
        });
    };
    AlertsPage.prototype.loadAgain = function () {
        this.didLoad = true;
    };
    AlertsPage.prototype.callPhone = function (number) {
        if (this.isCordova) {
            this.callNumber.callNumber(number, false)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
    };
    AlertsPage.prototype.readMessage = function (i) {
        var _this = this;
        var holdObj = {
            alertId: this.alerts.data[i].id
        };
        if (this.alerts.data[i].viewed !== 1) {
            this.taskMgr.markEmployeeAlertRead(holdObj).then(function (response) {
                _this.alerts.data[i].time_stamp_viewed = response.data.time_stamp_viewed;
                _this.taskMgr.badgeNumber -= 1;
            }).catch(function (error) {
                _this.utils.dismissLoading();
                setTimeout(function () {
                    _this.utils.toastError(error);
                }, 500);
            });
        }
        if (this.displayAlert != i) {
            this.displayAlert = i;
        }
        else {
            this.displayAlert = -1;
        }
        this.alerts.data[i].viewed = 1;
    };
    AlertsPage.prototype.logout = function () {
        var _this = this;
        this.userMgr.logout().then(function (response) {
            _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        });
    };
    AlertsPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    return AlertsPage;
}());
AlertsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-alerts',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/alerts/alerts.html"*/'<ion-header>\n    <ion-navbar *ngIf="isIos">\n        <ion-row>\n            <ion-col width-50>\n                <div text-center>\n                    <div class="ios-title">\n                        Alerts\n                    </div>\n                </div>\n            </ion-col>\n            <ion-col width-25>\n                <ion-buttons class="mar-right6" end>\n                    <button class="refresh" ion-button round icon-right color="secondary" (click)="loadAlerts()">\n                        Refresh\n                        <ion-icon class="logout-hide" name="refresh"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n        </ion-row>\n    </ion-navbar>\n    <ion-navbar *ngIf="!isIos">\n        <ion-buttons class="mar-right6" end>\n            <button class="refresh" ion-button round icon-right color="secondary" (click)="loadAlerts()"> Refresh\n                <ion-icon name="refresh"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title>Alerts</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <div *ngIf="!hasAlerts">\n        <ion-card>\n            <ion-card-header text-center class="task-card-header no-alerts">\n                No Current Alerts\n            </ion-card-header>\n        </ion-card>\n    </div>\n\n    <div *ngIf="alerts">\n        <ion-card *ngFor="let alert of alerts.data; let i = index">\n            <ion-card-header *ngIf="alert.viewed === 1" class="read-alert">\n                <h3 class="text-info">From: {{alert.sending_emp.first_name}} {{alert.sending_emp.last_name}}</h3>\n            </ion-card-header>\n\n            <ion-card-header *ngIf="alert.viewed === 0" class="unread-alert">\n                New Alert!\n                <h3 class="text-info">From: {{alert.sending_emp.first_name}} {{alert.sending_emp.last_name}}</h3>\n            </ion-card-header>\n\n            <ion-card-content *ngIf="displayAlert === i" class="alert-padding">\n\n                <ion-row>\n                    <h4 class="contractor-main">Message:</h4>\n                </ion-row>\n                <ion-row>\n                    <h5 class="contractor-sub">{{alert.alert_description}}</h5>\n                </ion-row>\n                <ion-row>\n                    <h6 class="important">Sent:\n                        <span class="less-important" *ngIf="isIos">{{adjustTime(alert.updatedTimeSent) }} - {{alert.updatedTimeSent | date:\'mediumDate\'}}</span>\n                        <span class="less-important" *ngIf="!isIos">{{alert.updatedTimeSent | date:\'shortTime\'}} - {{alert.updatedTimeSent | date:\'mediumDate\'}}</span>\n                    </h6>\n                </ion-row>\n                <ion-row *ngIf="alert.updatedTimeView !== null">\n                    <h6 class="important">Read:\n                        <span class="less-important" *ngIf="isIos">{{adjustTime(alert.updatedTimeView) }} - {{alert.updatedTimeView | date:\'mediumDate\'}}</span>\n                        <span class="less-important" *ngIf="!isIos">{{alert.updatedTimeView | date:\'shortTime\'}} - {{alert.updatedTimeView | date:\'mediumDate\'}}</span>\n                    </h6>\n\n                </ion-row>\n                <ion-row>\n\n                    <h4>\n                        <button ion-button icon-left clear medium\n                                class="call-contractor"\n                                (click)="callPhone(alert.sending_emp.phone)">\n                            <span class="contractor-phone">{{alert.sending_emp.first_name}}\'s #: </span> <span\n                                class="contractor-underline">{{alert.sending_emp.phone}}</span>\n                        </button>\n                    </h4>\n                </ion-row>\n\n            </ion-card-content>\n            <div no-padding class="more-back move-up">\n                <ion-row>\n                    <ion-col>\n                        <button class="view-alert" ion-button icon-left clear small (click)="readMessage(i)">\n                            <span class="view-alert-icon" *ngIf="displayAlert === -1 || displayAlert !== i">View Alert</span>\n                            <span class="view-alert-icon" *ngIf="displayAlert === i">Hide Alert</span>\n                            <ion-icon *ngIf="displayAlert === -1 || displayAlert !== i"\n                                      name="fa-chevron-circle-right"></ion-icon>\n                            <ion-icon *ngIf="displayAlert === i" name="fa-chevron-circle-up"></ion-icon>\n                        </button>\n                    </ion-col>\n                </ion-row>\n            </div>\n        </ion-card>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/alerts/alerts.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__providers_user_manager__["a" /* UserManager */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_3__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_7__providers_conversion_manager__["a" /* ConversionManager */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__["a" /* FCM */]])
], AlertsPage);

//# sourceMappingURL=alerts.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForemanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__driving_directions_driving_directions__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_google_maps_manager__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__animations_animations__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_diagnostic__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_conversion_manager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_fcm__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__single_foreman_task_single_foreman_task__ = __webpack_require__(517);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ForemanPage = (function () {
    function ForemanPage(navCtrl, taskMgr, mapsManager, geolocation, utils, callNumber, diagnostic, conMgr, alertCtrl, fcm) {
        this.navCtrl = navCtrl;
        this.taskMgr = taskMgr;
        this.mapsManager = mapsManager;
        this.geolocation = geolocation;
        this.utils = utils;
        this.callNumber = callNumber;
        this.diagnostic = diagnostic;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.showTasks = true;
        this.divState = 'hide';
        this.expandTaskId = -1;
        this.taskId = -1;
        this.isIos = false;
        this.displayOptions = {
            proj: -1,
            task: -1
        };
        this.contractorDetails = {
            proj: -1
        };
        this.projTaskLength = {
            proj: 0,
            task: 0
        };
        this.currentDate = '-1';
        this.search = false;
        this.emergencyTaskId = 0;
        this.emergencyProjectId = 0;
        this.hasEmergency = false;
        this.emergencyWhileOpen = 0;
        this.taskLocation = [];
        this.iHolder = -2;
        this.jHolder = -2;
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    ForemanPage.prototype.ionViewWillEnter = function () {
        this.getForemanTasks(true);
    };
    ForemanPage.prototype.ionViewDidEnter = function () {
        this.subscribeAgain();
        if (this.taskMgr.returnEmergencyInfo().crewEmergency) {
            this.presentEmergencyAlert();
            var crewEmer = this.taskMgr.returnEmergencyInfo();
            this.hasEmergency = crewEmer.crewEmergency;
            this.emergencyTaskId = crewEmer.taskId;
            this.emergencyProjectId = crewEmer.projectId;
        }
    };
    ForemanPage.prototype.ionViewDidLeave = function () {
        this.emergencyWhileOpen = 0;
        this.taskMgr.saveEmergencyInfo(0, 0, false);
        this.hasEmergency = false;
        this.emergencyTaskId = -1;
        this.displayOptions = {
            proj: -1,
            task: -1
        };
    };
    ForemanPage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.navCtrl.parent.select(3);
                }
                else if (data.param1 === 'additional_notes') {
                    _this.presentAlert();
                }
                else if (data.param1 === "upcoming_task") {
                    _this.taskMgr.loadHomePage(1);
                    _this.navCtrl.parent.select(0);
                }
                else if (data.param1 === 'crews') {
                    _this.refreshView();
                    _this.emergencyTaskId = parseInt(data.task);
                    _this.presentEmergencyAlert();
                }
            });
        }
    };
    ForemanPage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.parent.select(0);
                    }
                }]
        });
        alert.present();
    };
    ForemanPage.prototype.presentEmergencyAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Emergency Reported',
            message: 'Please see the expanded task for details',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.expandTask(_this.iHolder, _this.jHolder, _this.emergencyTaskId);
                    }
                }]
        });
        alert.present();
    };
    ForemanPage.prototype.toggleDivState = function (proj) {
        if (this.contractorDetails.proj === proj) {
            this.contractorDetails.proj = -1;
        }
        else {
            this.contractorDetails.proj = proj;
        }
    };
    ForemanPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    ForemanPage.prototype.getForemanTasks = function (showLoading, refreshDate) {
        var _this = this;
        this.search = false;
        if (refreshDate) {
            this.currentDate = '-1';
        }
        if (this.currentDate === '-1') {
            var interimTime = new Date(Date.now());
            var myZone = interimTime.getTimezoneOffset();
            var year = interimTime.getFullYear();
            var month = interimTime.getMonth();
            var day = interimTime.getUTCDate();
            var hour = interimTime.getUTCHours() - (myZone / 60);
            var minute = interimTime.getUTCMinutes();
            var seconds = interimTime.getUTCSeconds();
            var adjustTimezone = new Date(Date.UTC(year, month, day, hour, minute, seconds));
            var timeZero = adjustTimezone.setHours(0, 0, 0, 0);
            this.currentDate = new Date(timeZero).toISOString().slice(0, 10);
        }
        if (showLoading) {
            this.utils.presentLoading();
        }
        this.taskMgr.loadForemanTasks(this.currentDate).then(function (response) {
            _this.tasks = response.data;
            if (response.data.length === 0) {
                _this.tasks = false;
            }
            var _loop_1 = function (i) {
                _this.projTaskLength.proj = _this.tasks.length;
                var projectTasks = _this.tasks[i].job_tasks;
                _this.projTaskLength.task += _this.tasks[i].job_tasks.length;
                var _loop_2 = function (j) {
                    var taskPlacement = {
                        taskId: projectTasks[j].id,
                        proj: i,
                        task: j
                    };
                    _this.taskLocation.push(taskPlacement);
                    projectTasks[j].importantStatus = 0;
                    projectTasks[j].statusArray = [];
                    var _loop_3 = function (k) {
                        //Loop through and push all crew status to status array, skip supervisors
                        if (projectTasks[j].task_crew[k].is_supervisor !== 1) {
                            projectTasks[j].statusArray.push(projectTasks[j].task_crew[k].status_id);
                        }
                        var myfilter = projectTasks[j].task_crew_status.filter(function (myfilter) {
                            return myfilter.employee_id === projectTasks[j].task_crew[k].employee_id;
                        });
                        projectTasks[j].task_crew[k].statusLog = myfilter;
                    };
                    for (var k = 0; k < projectTasks[j].task_crew.length; k++) {
                        _loop_3(k);
                    }
                    //Status 7 is Emergency
                    if (projectTasks[j].statusArray.indexOf(7) !== -1 || projectTasks[j].statusArray.indexOf(8) !== -1) {
                        projectTasks[j].importantStatus = 7;
                    }
                    else if (projectTasks[j].statusArray.indexOf(5) !== -1 || projectTasks[j].statusArray.indexOf(6) !== -1 || projectTasks[j].statusArray.indexOf(12) !== -1) {
                        projectTasks[j].importantStatus = 5;
                    }
                    else if (projectTasks[j].statusArray.indexOf(3) !== -1 || projectTasks[j].statusArray.indexOf(4) !== -1) {
                        projectTasks[j].importantStatus = 4;
                    }
                    else if (projectTasks[j].statusArray.indexOf(9) !== -1) {
                        projectTasks[j].importantStatus = 9;
                    }
                    else if (projectTasks[j].statusArray.indexOf(11) !== -1) {
                        projectTasks[j].importantStatus = 11;
                    }
                    else {
                        projectTasks[j].importantStatus = 0;
                    }
                };
                for (var j = 0; j < projectTasks.length; j++) {
                    _loop_2(j);
                }
                projectTasks.sort(function (a, b) {
                    return (a.task_start_time > b.task_start_time) ? 1 : ((b.task_start_time > a.task_start_time) ? -1 : 0);
                });
            };
            for (var i = 0; i < _this.tasks.length; i++) {
                _loop_1(i);
            }
            if (showLoading) {
                _this.utils.dismissLoading();
            }
        }).then(function () {
            console.log('this.tasks ', JSON.stringify(_this.tasks));
            console.log('this.taskLocation ', JSON.stringify(_this.taskLocation));
        });
    };
    ForemanPage.prototype.loadCurrentDay = function () {
        this.currentDate = '-1';
        this.hasEmergency = false;
        this.getForemanTasks(true);
    };
    ForemanPage.prototype.refreshCrews = function () {
        this.hasEmergency = false;
        this.getForemanTasks(true);
    };
    ForemanPage.prototype.refreshView = function () {
        this.tasks = [];
        this.taskId = -1;
        this.getForemanTasks(false);
    };
    ForemanPage.prototype.showDrivingDirections = function (lat, lon) {
        var _this = this;
        this.utils.presentLoading();
        var locEnabled = false;
        var successCallback = function (isAvailable) {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            }
            else {
                _this.utils.presentToast("Please enable your location in device settings", true);
                return;
            }
        };
        var errorCallback = function (e) {
            _this.utils.presentToast("Please enable your location in device settings", true);
            _this.utils.dismissLoading();
        };
        this.diagnostic.isLocationEnabled().then(successCallback).then(function (resp) {
            if (locEnabled) {
                var destination_1 = lat + "," + lon;
                _this.geolocation.getCurrentPosition({ timeout: 15000 }).then(function (position) {
                    var origin = position.coords.latitude + "," + position.coords.longitude;
                    return _this.mapsManager.getDirections(origin, destination_1);
                }).then(function (response) {
                    var params = {
                        directions: response
                    };
                    setTimeout(function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__driving_directions_driving_directions__["a" /* DrivingDirectionsPage */], params);
                        _this.utils.dismissLoading();
                    }, 2000);
                }).catch(function (error) {
                    _this.utils.dismissLoading();
                    _this.utils.presentToast("Please enable your location in device settings", true);
                });
            }
            if (locEnabled === false) {
                _this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    };
    ForemanPage.prototype.expandTask = function (i, j, task) {
        if (i !== -2 && j !== -2) {
            console.log('this.tasks[i] ', JSON.stringify(this.tasks[i]));
            var currentTask = this.tasks[i].job_tasks[j];
            var params = {
                id: currentTask.id,
                updatedTime: currentTask.updatedTime,
                task_description: currentTask.task_description,
                status_id: currentTask.status_id,
                task_crew: currentTask.task_crew,
                task_equipment: currentTask.task_equipment,
                additional_notes: currentTask.additional_notes,
                task_materials: currentTask.task_materials,
                contractor_contacts: currentTask.contractor_contacts,
                contractor_name: this.tasks[i].contractor[0].name,
                contractor_phone: this.tasks[i].contractor[0].office_phone
            };
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__single_foreman_task_single_foreman_task__["a" /* SingleForemanTaskPage */], params).then(function () { });
        }
        if (i === -2 && j === -2) {
            var obj = this.taskLocation.find(function (o) { return o.taskId === task; });
            var projectIndex = obj.proj;
            var taskIndex = obj.task;
            var currentTask = this.tasks[projectIndex].job_tasks[taskIndex];
            var params = {
                id: currentTask.id,
                updatedTime: currentTask.updatedTime,
                task_description: currentTask.task_description,
                status_id: currentTask.status_id,
                task_crew: currentTask.task_crew,
                task_equipment: currentTask.task_equipment,
                additional_notes: currentTask.additional_notes,
                task_materials: currentTask.task_materials,
                contractor_contacts: currentTask.contractor_contacts
            };
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__single_foreman_task_single_foreman_task__["a" /* SingleForemanTaskPage */], params).then(function () { });
        }
    };
    ForemanPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    return ForemanPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], ForemanPage.prototype, "content", void 0);
ForemanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-foreman',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/foreman/foreman.html"*/'<ion-header>\n    <ion-navbar *ngIf="isIos">\n        <ion-row>\n            <ion-col width-50>\n                <div text-center>\n                    <div class="ios-title">\n                        Crews <span *ngIf="!search">- {{currentDate | date: \'MMM dd, yyyy\'}}</span>\n                    </div>\n                </div>\n            </ion-col>\n\n            <ion-col width-25>\n                <ion-buttons class="mar-right6" end>\n                    <button class="refresh" ion-button round icon-right color="secondary"\n                            (click)="refreshCrews(true, true)"> Refresh\n                        <ion-icon class="logout-hide" name="refresh"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n        </ion-row>\n    </ion-navbar>\n    <ion-navbar *ngIf="!isIos">\n        <ion-buttons class="mar-right6" end>\n            <button class="refresh" ion-button round icon-right color="secondary"\n                    (click)="refreshCrews(true, true)"> Refresh\n                <ion-icon name="refresh"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title>Crews <span *ngIf="!search">- {{currentDate | date: \'MMM dd, yyyy\'}}</span></ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content footer>\n    <ion-card class="manage-app">\n        <ion-card-header class="task-card-header">\n            <div *ngIf="!search">\n                <ion-buttons text-center>\n                    <button color="secondary" ion-button block icon-left\n                            (click)="search = !search">\n                        <ion-icon name="search"></ion-icon>\n                        Search Future Crew\'s Tasks\n                    </button>\n                </ion-buttons>\n            </div>\n            <div *ngIf="search">\n                <ion-item>\n                    <ion-label>Foreman Task Search</ion-label>\n                    <ion-datetime displayFormat="MM/DD/YYYY" pickerFormat="MMM D YYYY"\n                                  [(ngModel)]="currentDate"></ion-datetime>\n                </ion-item>\n                <ion-row>\n                    <ion-col width-50>\n                        <ion-buttons text-center>\n                            <button color="primary" ion-button block icon-left\n                                    (click)="loadCurrentDay()">\n                                Today\'s Tasks\n                            </button>\n                        </ion-buttons>\n                    </ion-col>\n                    <ion-col width-50>\n                        <ion-buttons text-center>\n                            <button color="secondary" ion-button block icon-left\n                                    (click)="getForemanTasks(true)">\n                                <ion-icon name="search"></ion-icon>\n                                Search\n                            </button>\n                        </ion-buttons>\n                    </ion-col>\n                </ion-row>\n            </div>\n        </ion-card-header>\n    </ion-card>\n\n<!--Demo-->\n\n    <div *ngIf="showTasks">\n        <div *ngIf="!tasks">\n            <ion-card>\n                <ion-card-header text-center class="task-card-header">\n                    No Tasks For This Date\n                </ion-card-header>\n            </ion-card>\n        </div>\n        <div *ngIf="tasks">\n            <ion-card class="card-space" *ngFor="let project of tasks; let i = index">\n                <ion-card-header class="task-card-header">\n                    {{project.job_name}}\n                </ion-card-header>\n                <ion-card-content *ngIf="contractorDetails.proj === i">\n\n                    <div class="task-card-content">\n                        <ion-list no-padding>\n                            <ion-item no-padding>\n                                <h4 class="contractor-main">Project Address:</h4>\n                                <h4 class="contractor-sub">\n                                    {{project.address}}\n                                </h4>\n                                <h4 class="contractor-sub">\n                                    {{project.city}}, {{project.state}}&nbsp;{{project.zip}}\n                                </h4>\n\n\n                            </ion-item>\n                        </ion-list>\n                    </div>\n                    <div class="mar-bot25">\n\n                        <ion-list no-padding text-wrap>\n                            <ion-item no-padding text-wrap>\n                                <h4 class="contractor-main">Contractor:</h4>\n                                <h4 class="contractor-sub">\n                                    {{project.contractor[0].name}}\n                                </h4>\n                                <h4>\n                                    <button ion-button icon-left clear medium\n                                            class="call-contractor"\n                                            (click)="callPhone(project.contractor[0].office_phone)">\n                                        <span class="contractor-phone">Office: </span> <span\n                                            class="contractor-underline">{{project.contractor[0].office_phone}}</span>\n                                    </button>\n                                </h4>\n\n                            </ion-item>\n                        </ion-list>\n\n                    </div>\n                </ion-card-content>\n\n                <div no-padding class="more-back move-up">\n                    <ion-row>\n                        <ion-col>\n                            <button class="more-left" ion-button icon-left clear medium (click)="toggleDivState(i)">\n                                <span *ngIf="contractorDetails.proj !== i">More ...</span>\n                                <span *ngIf="contractorDetails.proj === i">Less ...</span>\n                            </button>\n                        </ion-col>\n                        <ion-col text-right>\n                            <button class="pad8" ion-button icon-left clear medium\n                                    (click)="showDrivingDirections(project.lat, project.lon)">\n                                <ion-icon name="navigate"></ion-icon>\n                                Get Directions\n                            </button>\n                        </ion-col>\n                    </ion-row>\n                </div>\n\n                <ion-card-content>\n                    <div *ngFor="let task of project.job_tasks; let j = index">\n                        <div class="card-width">\n                            <ion-grid class="task-button">\n                                <ion-row (click)="expandTask(i, j, task.id)">\n                                    <ion-col *ngIf="task.importantStatus === 7" width-5\n                                             class="current-status status-problem"></ion-col>\n                                    <ion-col *ngIf="task.importantStatus === 5" width-5\n                                             class="current-status status-delay"></ion-col>\n                                    <ion-col *ngIf="task.importantStatus === 4" width-5\n                                             class="current-status status-working"></ion-col>\n                                    <ion-col *ngIf="task.importantStatus === 9" width-5\n                                             class="current-status status-complete"></ion-col>\n                                    <ion-col *ngIf="task.importantStatus === 11" width-5\n                                             class="current-status status-cancelled"></ion-col>\n                                    <ion-col *ngIf="task.importantStatus === 0" width-5\n                                             class="current-status not-started"></ion-col>\n\n                                    <ion-col class="task-text" text-left *ngIf="j === 0" width-65>\n                                        <span>{{task.task_description}}</span>\n                                    </ion-col>\n                                    <ion-col class="task-text" text-left *ngIf="j > 0" width-65>\n                                        <span>{{task.task_description}}</span>\n                                    </ion-col>\n                                    <ion-col width-30 class="newTime" text-right>\n                                        <span *ngIf="isIos">{{adjustTime(task.updatedTime) }}</span>\n                                        <span *ngIf="!isIos">{{task.updatedTime | date:\'shortTime\'}}</span>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-grid>\n                        </div>\n                    </div>\n                </ion-card-content>\n            </ion-card>\n        </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/foreman/foreman.html"*/,
        animations: [
            __WEBPACK_IMPORTED_MODULE_8__animations_animations__["a" /* Animations */].expandCollapse
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_6__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_4__providers_google_maps_manager__["a" /* GoogleMapsManager */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_7__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_10__providers_conversion_manager__["a" /* ConversionManager */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_fcm__["a" /* FCM */]])
], ForemanPage);

//# sourceMappingURL=foreman.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SingleForemanTaskPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_conversion_manager__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SingleForemanTaskPage = (function () {
    function SingleForemanTaskPage(navCtrl, navParams, taskMgr, callNumber, conMgr, utils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.taskMgr = taskMgr;
        this.callNumber = callNumber;
        this.conMgr = conMgr;
        this.utils = utils;
        this.isIos = false;
        this.employeeId = -1;
        this.delayNotes = [];
        this.url = "https://www.cleartasksolutions.com/uploads/";
        this.detailedStats = {
            emp: -1
        };
        this.imageLength = -1;
        this.taskId = navParams.get('id');
        this.updatedTime = navParams.get('updatedTime');
        this.task_description = navParams.get('task_description');
        this.status_id = navParams.get('status_id');
        this.task_crew = navParams.get('task_crew');
        this.task_equipment = navParams.get('task_equipment');
        this.additional_notes = navParams.get('additional_notes');
        this.task_materials = navParams.get('task_materials');
        this.contractor_contacts = navParams.get('contractor_contacts');
        this.contractor_name = navParams.get('contractor_name');
        this.contractor_phone = navParams.get('contractor_phone');
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    SingleForemanTaskPage.prototype.setBackground = function (crew) {
        var cssClasses;
        if (crew.status_id === 3 && crew.role_id === 6) {
            cssClasses = {
                'completed': true
            };
        }
        else if (crew.status_id === 3) {
            cssClasses = {
                'accepted': true
            };
        }
        else if (crew.status_id === 4) {
            cssClasses = {
                'started': true
            };
        }
        else if (crew.status_id === 9) {
            cssClasses = {
                'completed': true
            };
        }
        else if (crew.status_id === 7) {
            cssClasses = {
                'emergency': true
            };
        }
        else if (crew.status_id === 8) {
            cssClasses = {
                'rejected': true
            };
        }
        else if (crew.status_id === 2 || crew.status_id === 1) {
            cssClasses = {
                'sent': true
            };
        }
        else if (crew.status_id === 11) {
            cssClasses = {
                'cancelled': true
            };
        }
        else if (crew.status_id === 12 || crew.status_id === 5 || crew.status_id === 13 || crew.status_id === 6) {
            cssClasses = {
                'temporary': true
            };
        }
        return cssClasses;
    };
    SingleForemanTaskPage.prototype.callPhone = function (number) {
        this.callNumber.callNumber(number, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    SingleForemanTaskPage.prototype.detailedStatus = function (emp) {
        this.imageLength = 0;
        if (this.detailedStats.emp === -1) {
            this.detailedStats.emp = emp;
        }
        else if (this.detailedStats.emp === emp) {
            this.detailedStats.emp = -1;
        }
        else if (this.detailedStats.emp !== emp && this.detailedStats.emp !== -1) {
            this.detailedStats.emp = emp;
        }
    };
    SingleForemanTaskPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    SingleForemanTaskPage.prototype.loadNotes = function (emp, taskId) {
        var _this = this;
        var empId = emp.employee_id;
        if (this.employeeId === empId) {
            this.employeeId = -1;
        }
        else {
            this.utils.presentLoading();
            this.employeeId = empId;
            this.taskMgr.loadSpecificTaskUserLog(empId, taskId).then(function (response) {
                _this.delayNotes = [];
                _this.imageLength = -1;
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].status_id === 5 || response.data[i].status_id === 6 || response.data[i].status_id === 7 || response.data[i].status_id === 12) {
                        var newEntry = {
                            notes: response.data[i].notes,
                            timestamp: response.data[i].updatedTime,
                            images: []
                        };
                        if (response.data[i].fileData.length > 0) {
                            _this.imageLength += response.data[i].fileData.length;
                            for (var j = 0; j < response.data[i].fileData.length; j++) {
                                var image = _this.url + response.data[i].fileData[j].file_name;
                                newEntry.images.push(image);
                            }
                        }
                        _this.delayNotes.push(newEntry);
                    }
                }
                _this.utils.dismissLoading();
            }).then(function (res) {
                return _this.delayNotes;
            });
        }
    };
    SingleForemanTaskPage.prototype.getEmployeeName = function (emps, equip) {
        equip.name = '';
        for (var i = 0; i < emps.length; i++) {
            if (emps[i].employee_id === equip.employee_id) {
                equip.name = emps[i].first_name + " " + emps[i].last_name;
            }
        }
        return equip.name;
    };
    return SingleForemanTaskPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], SingleForemanTaskPage.prototype, "content", void 0);
SingleForemanTaskPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-single-foreman-task',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/single-foreman-task/single-foreman-task.html"*/'<ion-header>\n    <ion-navbar *ngIf="isIos">\n        <ion-row>\n            <ion-col width-50>\n                <div text-center>\n                    <div class="ios-title">\n                        Task Status\n                    </div>\n                </div>\n            </ion-col>\n\n            <ion-col width-33 class="ios-refresh">\n                <ion-buttons class="mar-right6" end>\n                    <button class="refresh" ion-button round icon-right color="secondary"\n                            (click)="loadTomorrowsTasks(userId)"> Refresh\n                        <ion-icon class="logout-hide" name="refresh"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n        </ion-row>\n    </ion-navbar>\n    <ion-navbar *ngIf="!isIos">\n        <ion-row>\n            <ion-title>Task Status</ion-title>\n        </ion-row>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content footer>\n\n    <ion-card class="card-border">\n        <ion-card-header class="task-card-header">\n            Task Details\n        </ion-card-header>\n        <ion-card-content>\n            <div class="task-card-content">\n                <ion-list no-padding text-wrap>\n                    <ion-item no-padding text-wrap>\n                        <h4 class="text-info capitalize">\n                            {{task_description}}</h4>\n                        <h5 class="s-time">\n                            Start Time:\n                            <span>{{updatedTime | date: \'shortTime\'}}</span>\n                        </h5>\n                    </ion-item>\n\n                    <div *ngIf="additional_notes.length > 0">\n                        <h5 class="text-info">Additional Task Notes</h5>\n                        <ion-item no-padding text-wrap\n                                  *ngFor="let newNotes of additional_notes; let u = index">\n                            <h5 class="add_notes">{{u + 1}}: {{newNotes.notes}}</h5>\n                            <h5 class="add_by">Added By: <strong>{{newNotes.employee.first_name}}\n                                {{newNotes.employee.last_name}}</strong> at\n                                <span *ngIf="isIos">{{adjustTime(newNotes.updatedTime) }}</span>\n                                <span *ngIf="!isIos">{{newNotes.updatedTime | date: \'shortTime\'}}</span>\n                            </h5>\n                        </ion-item>\n                    </div>\n                </ion-list>\n            </div>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card class="card-border">\n        <ion-card-header class="task-card-header">\n            Crew Status\n        </ion-card-header>\n        <ion-card-content>\n            <div class="task-card-content">\n                <ion-row *ngFor="let crewMember of task_crew; let k = index">\n                    <ion-col [ngClass]="setBackground(crewMember)">\n                        <h4 class="emp-font">{{k + 1}}: {{crewMember.first_name}}\n                            {{crewMember.last_name}} </h4>\n                        <h4 class="indent19" *ngIf="crewMember.is_foreman === 1"> --\n                            Foreman\n                            --</h4>\n                        <h4 class="indent19" *ngIf="crewMember.is_supervisor === 1"> --\n                            Supervisor\n                            --</h4>\n                        <p class="crew-phone">\n                            <button ion-button icon-left clear medium\n                                    class="foremanPhone"\n                                    (click)="callPhone(crewMember.phone)">\n                                {{crewMember.phone}}\n                            </button>\n                        </p>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 1">\n                            Current\n                            Status: New</h4>\n\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 2">\n                            Current\n                            Status: Sent</h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 3">\n                            Current\n                            Status: <span ion-text color="accepted">Accepted</span>\n                        </h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 4">\n                            Current\n                            Status: <span ion-text color="started">Started</span>\n                        </h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 5">\n                            Current\n                            Status: <span ion-text color="on-hold">Delayed</span>\n                        </h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 6">\n                            Current\n                            Status: <span ion-text color="on-hold">On Hold</span>\n                        </h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 7">\n                            Current\n                            Status: <span ion-text color="on-hold">Emergency</span>\n                        </h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 11">\n                            Current\n                            Status: <span ion-text\n                                          color="on-hold">Cancelled</span>\n                        </h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 12">\n                            Current\n                            Status: <span ion-text\n                                          color="on-hold">Temporary Hold</span>\n                        </h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 13">\n                            Current\n                            Status: <span ion-text\n                                          color="on-hold">Timecard Pause</span>\n                        </h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 8">\n                            Current\n                            Status: <span ion-text color="on-hold">Rejected</span>\n                        </h4>\n                        <h4 class="job-status" *ngIf="crewMember.status_id === 9">\n                            Current\n                            Status: <span ion-text color="complete">Completed</span>\n                        </h4>\n\n                        <h4 class="margin-left18 link-blue"\n                            *ngIf="crewMember.statusLog.length > 0"\n                            (click)="detailedStatus(k)">\n                            View Detailed Status History\n                            <ion-icon *ngIf="detailedStats.emp !== k"\n                                      name="arrow-dropright"></ion-icon>\n                            <ion-icon\n                                    *ngIf="detailedStats.emp === k"\n                                    name="arrow-dropdown"></ion-icon>\n                        </h4>\n                        <div *ngIf="detailedStats.emp === k">\n                            <div *ngFor="let status of crewMember.statusLog">\n                                <h4 class="job-status"\n                                    *ngIf="status.status_id === 3">\n                                    <span ion-text color="accepted">Accepted</span> at\n                                    <span *ngIf="isIos">{{adjustTime(status.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{status.updatedTime | date:\'shortTime\'}}</span>\n\n                                    <span *ngIf="status.notes"><br>Notes: {{status.notes}}</span>\n                                </h4>\n                                <h4 class="job-status"\n                                    *ngIf="status.status_id === 4">\n                                    <span ion-text color="started">Started</span> at\n                                    <span *ngIf="isIos">{{adjustTime(status.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{status.updatedTime | date:\'shortTime\'}}</span>\n                                    <span *ngIf="status.notes"><br>Notes: {{status.notes}}</span>\n                                </h4>\n                                <h4 class="job-status"\n                                    *ngIf="status.status_id === 5">\n                                    <span ion-text color="on-hold">Delayed</span> at\n                                    <span *ngIf="isIos">{{adjustTime(status.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{status.updatedTime | date:\'shortTime\'}}</span>\n                                    <span *ngIf="status.notes"><br>Notes: {{status.notes}}</span>\n                                </h4>\n                                <h4 class="job-status"\n                                    *ngIf="status.status_id === 6">\n                                    <span ion-text color="on-hold">On Hold</span> at\n                                    <span *ngIf="isIos">{{adjustTime(status.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{status.updatedTime | date:\'shortTime\'}}</span>\n                                    <span *ngIf="status.notes"><br>Notes: {{status.notes}}</span>\n                                </h4>\n                                <h4 class="job-status"\n                                    *ngIf="status.status_id === 7">\n                                    <span ion-text color="on-hold">Emergency</span> at\n                                    <span *ngIf="isIos">{{adjustTime(status.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{status.updatedTime | date:\'shortTime\'}}</span>\n                                    <span *ngIf="status.notes"><br>Notes: {{status.notes}}</span>\n                                </h4>\n                                <h4 class="job-status"\n                                    *ngIf="status.status_id === 12">\n                                                                <span ion-text\n                                                                      color="on-hold">Temporary Hold</span> at\n                                    <span *ngIf="isIos">{{adjustTime(status.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{status.updatedTime | date:\'shortTime\'}}</span>\n                                    <span *ngIf="status.notes"><br>Notes: {{status.notes}}</span>\n                                </h4>\n                                <h4 class="job-status"\n                                    *ngIf="status.status_id === 13">\n                                                                <span ion-text\n                                                                      color="on-hold">Timecard Pause</span> at\n                                    <span *ngIf="isIos">{{adjustTime(status.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{status.updatedTime | date:\'shortTime\'}}</span>\n                                    <span *ngIf="status.notes"><br>Notes: {{status.notes}}</span>\n                                </h4>\n                                <h4 class="job-status"\n                                    *ngIf="status.status_id === 8">\n                                    <span ion-text color="on-hold">Rejected</span> at\n                                    <span *ngIf="isIos">{{adjustTime(status.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{status.updatedTime | date:\'shortTime\'}}</span>\n                                    <span *ngIf="status.notes"><br>Notes: {{status.notes}}</span>\n                                </h4>\n                                <h4 class="job-status"\n                                    *ngIf="status.status_id === 9">\n                                    <span ion-text color="complete">Completed</span> at\n                                    <span *ngIf="isIos">{{adjustTime(status.updatedTime) }}</span>\n                                    <span *ngIf="!isIos">{{status.updatedTime | date:\'shortTime\'}}</span>\n                                    <span *ngIf="status.notes"><br>Notes: {{status.notes}}</span>\n                                </h4>\n                            </div>\n                        </div>\n\n                        <button ion-button icon-left medium class="margin-left18"\n                                *ngIf="(crewMember.status_id === 5 || crewMember.status_id === 6 || crewMember.status_id === 7 || crewMember.status_id === 12) && (employeeId === -1 || employeeId !== crewMember.employee_id)"\n                                (click)="loadNotes(crewMember, taskId)">\n                            Check For Images\n                        </button>\n\n                        <button ion-button icon-left medium class="margin-left18"\n                                *ngIf="(crewMember.status_id === 5 || crewMember.status_id === 6 || crewMember.status_id === 7 || crewMember.status_id === 12) && (employeeId === crewMember.employee_id)"\n                                (click)="loadNotes(crewMember, taskId)">\n                            Hide Results\n                        </button>\n\n                        <div *ngIf="(imageLength === -1) && (employeeId === crewMember.employee_id)">\n                            <p class="no-images">No Images To Display</p>\n                        </div>\n\n                        <div *ngIf="employeeId === crewMember.employee_id && employeeId !== -1">\n                            <div *ngFor="let note of delayNotes">\n                                <div *ngFor="let image of note.images">\n                                    <img class="mar-bot10" src="{{image}}">\n                                </div>\n                            </div>\n                        </div>\n                    </ion-col>\n                </ion-row>\n                <div *ngIf="task_crew.length === 0">No Crew Specified</div>\n            </div>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card class="card-border" *ngIf="contractor_contacts.length > 0">\n        <ion-card-header class="task-card-header">\n            Contractor Information\n        </ion-card-header>\n        <ion-card-content>\n            <div class="task-card-content">\n                <ion-list no-padding text-wrap>\n                    <ion-item no-padding text-wrap>\n                        <h4 class="contractor-main">Contractor:</h4>\n                        <h4 class="contractor-sub">\n                            {{contractor_name}}\n                        </h4>\n                        <h4 *ngIf="contractor_phone">\n                            <button ion-button icon-left clear medium\n                                    class="call-contractor"\n                                    (click)="callPhone(contractor_phone)">\n                                <span class="contractor-phone">Office: </span> <span class="contractor-underline">{{contractor_phone}}</span>\n                            </button>\n                        </h4>\n\n                    </ion-item>\n                </ion-list>\n\n                <ion-list no-padding text-wrap>\n                    <ion-item no-padding text-wrap>\n                        <h4 class="contractor-main">Contractor Contacts:</h4>\n                        <div class="contractor-div" *ngFor="let contact of contractor_contacts; let p = index ">\n                            <h4 class="contractor-sub">\n                                {{contact.first_name}} {{contact.last_name}} <span *ngIf="contact.title"> - {{contact.title}}</span>\n                            </h4>\n\n                            <h4 *ngIf="contact.office_phone">\n                                <button ion-button icon-left clear medium\n                                        class="call-contractor"\n                                        (click)="callPhone(contact.office_phone)">\n                                    <span class="contractor-phone">Office: </span> <span class="contractor-underline">{{contact.office_phone}}</span>\n                                </button>\n                            </h4>\n                            <h4 *ngIf="contact.cell_phone">\n                                <button ion-button icon-left clear medium\n                                        class="call-contractor"\n                                        (click)="callPhone(contact.cell_phone)">\n                                    <span class="contractor-phone">Cell: </span> <span class="contractor-underline">{{contact.cell_phone}}</span>\n                                </button>\n                            </h4>\n                        </div>\n                    </ion-item>\n                </ion-list>\n            </div>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card class="card-border" *ngIf="role_id !== 6">\n        <ion-card-header class="task-card-header">\n            Equipment\n        </ion-card-header>\n        <ion-card-content>\n            <div class="task-card-content">\n                <div class="equip-div" *ngFor="let item of task_equipment">\n                    <h4 class="equip-name">{{item.equipment_name}}</h4>\n                    <h4 class="equip-assig" *ngIf="item.employee_id === 0">Assigned\n                        Employee: <span class="equip-bold">Unassigned</span>\n                    </h4>\n                    <h4 class="equip-assig" *ngIf="item.employee_id !== 0">Assigned\n                        Employee: <span\n                                class="equip-bold">{{getEmployeeName(task_crew, item)}}</span>\n                    </h4>\n                </div>\n                <div class="equip-center" *ngIf="task_equipment.length === 0">\n                    No Equipment Specified\n                </div>\n            </div>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card class="card-border">\n        <ion-card-header class="task-card-header">\n            Materials/Supplier\n        </ion-card-header>\n        <div  *ngIf="task_materials.length > 0">\n            <ion-card-content class="task-card-content material-padding"\n                              *ngFor="let material of task_materials; let m = index">\n                <h3 class="text-info">{{material.material_name}}</h3>\n\n                <ion-list no-padding text-wrap>\n                    <ion-item no-padding text-wrap>\n                        <h4 class="contractor-main">\n                            {{material.supplier.name}}\n                        </h4>\n                        <h4 class="contractor-sub">\n                            {{material.supplier.address}}\n                        </h4>\n                        <h4 class="contractor-sub">\n                            {{material.supplier.city}}, {{material.supplier.state}} &nbsp;{{material.supplier.zip}}\n                        </h4>\n\n                        <h4>\n                            <button ion-button icon-left clear medium\n                                    class="call-contractor"\n                                    (click)="callPhone(material.supplier.phone)">\n                                <span class="contractor-phone">Office: </span> <span\n                                    class="contractor-underline">{{material.supplier.phone}}</span>\n                            </button>\n                        </h4>\n\n\n                    </ion-item>\n                </ion-list>\n            </ion-card-content>\n            <div class="more-back">\n                <ion-row>\n                    <ion-col>\n                        <button ion-button icon-left clear medium\n                                (click)="showDrivingDirections(material.supplier.lat, material.supplier.lon)">\n                            <ion-icon name="navigate"></ion-icon>\n                            Get Directions\n                        </button>\n                    </ion-col>\n                </ion-row>\n            </div>\n        </div>\n        <div >\n\n        </div>\n    </ion-card>\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/single-foreman-task/single-foreman-task.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_5__providers_conversion_manager__["a" /* ConversionManager */],
        __WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* Utils */]])
], SingleForemanTaskPage);

//# sourceMappingURL=single-foreman-task.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimecardKeysPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TimecardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__timecard_search_timecard_search__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_conversion_manager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TimecardKeysPipe = (function () {
    function TimecardKeysPipe() {
    }
    TimecardKeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value); //.map(key => value[key]);
    };
    return TimecardKeysPipe;
}());
TimecardKeysPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'keys', pure: false })
], TimecardKeysPipe);

var TimecardPage = (function () {
    function TimecardPage(navCtrl, navParams, userMgr, appCtrl, taskMgr, utils, alertCtrl, conMgr, fcm) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userMgr = userMgr;
        this.appCtrl = appCtrl;
        this.taskMgr = taskMgr;
        this.utils = utils;
        this.alertCtrl = alertCtrl;
        this.conMgr = conMgr;
        this.fcm = fcm;
        this.isIos = false;
        this.userId = '';
        this.currentUser = '';
        this.showSearchResults = false;
        this.noEntry = false;
        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    TimecardPage.prototype.ionViewDidEnter = function () {
        this.subscribeAgain();
        this.loadTodaysTime();
    };
    TimecardPage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.navCtrl.parent.select(3);
                }
                else if (data.param1 === 'additional_notes') {
                    _this.presentAlert();
                }
                else if (data.param1 === "upcoming_task") {
                    _this.taskMgr.loadHomePage(1);
                    _this.navCtrl.parent.select(0);
                }
                else if (data.param1 === 'crews') {
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    TimecardPage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.parent.select(0);
                    }
                }]
        });
        alert.present();
    };
    TimecardPage.prototype.loadTodaysTime = function (test) {
        var _this = this;
        this.utils.presentLoading();
        var myTime = this.conMgr.convertDateTime(Date.now());
        this.currentDate = new Date(myTime).toISOString().slice(0, 10);
        this.startDate = new Date(Date.now()).toISOString();
        this.endDate = new Date(Date.now()).toISOString();
        this.taskMgr.loadTodaysTime(this.userId).then(function (response) {
            if (response.data.length === 0) {
                _this.noEntry = true;
            }
            _this.todaysTime = response.data;
            var dupArray = [];
            for (var i = 0; i < _this.todaysTime.length; i++) {
                var newEntryYear = _this.todaysTime[i].timestamp.slice(0, 10);
                var newEntryTime = _this.todaysTime[i].timestamp.slice(11);
                _this.todaysTime[i].timestamp = newEntryYear + 'T' + newEntryTime;
                if (_this.todaysTime[i].alt_timestamp === null) {
                    _this.todaysTime[i].alt_timestamp = _this.todaysTime[i].timestamp;
                }
                if (_this.todaysTime[i].notes === "NULL") {
                    _this.todaysTime[i].notes = '';
                }
                _this.todaysTime[i].originalNotes = _this.todaysTime[i].notes;
                if (_this.todaysTime[i].alt_timestamp) {
                    var newYear = _this.todaysTime[i].alt_timestamp.slice(0, 10);
                    var newTime = _this.todaysTime[i].alt_timestamp.slice(11);
                    _this.todaysTime[i].alt_timestamp = newYear + 'T' + newTime;
                    _this.todaysTime[i].timestamp = _this.todaysTime[i].alt_timestamp;
                    var compareMonthAndDay = _this.todaysTime[i].alt_timestamp[5] + '' + _this.todaysTime[i].alt_timestamp[6] + '' + _this.todaysTime[i].alt_timestamp[8] + '' + _this.todaysTime[i].alt_timestamp[9];
                    var compareCurrentDay = _this.currentDate[5] + '' + _this.currentDate[6] + '' + _this.currentDate[8] + '' + _this.currentDate[9];
                    if (compareMonthAndDay === compareCurrentDay) {
                        dupArray.push(_this.todaysTime[i]);
                    }
                }
            }
            _this.todaysTime = dupArray;
            _this.utils.dismissLoading();
        });
        this.showSearchResults = false;
    };
    TimecardPage.prototype.updateTodaysTimecard = function (id, newTime, repeatIndex, newestNote) {
        var _this = this;
        var notes = '';
        if (newestNote === '') {
            notes = "NULL";
        }
        else {
            notes = newestNote;
        }
        var newYear = newTime.slice(0, 10);
        var newestTime = newTime.slice(11, 19);
        var alt_timestamp = newYear + ' ' + newestTime;
        this.taskMgr.updateTimecard(this.userId, id, alt_timestamp, notes).then(function (res) {
            console.log('Timecard res ', JSON.stringify(res));
            _this.todaysTime[repeatIndex].alt_timestamp = newTime;
            _this.todaysTime[repeatIndex].timestamp = newTime;
            _this.todaysTime[repeatIndex].notes = newestNote;
            _this.todaysTime[repeatIndex].originalNotes = newestNote;
        });
    };
    // function to sort timecard data into their individual days
    TimecardPage.prototype.groupBy = function (array, property) {
        var hash = {};
        for (var i = 0; i < array.length; i++) {
            if (!hash[array[i][property]])
                hash[array[i][property]] = [];
            hash[array[i][property]].push(array[i]);
        }
        return hash;
    };
    TimecardPage.prototype.logout = function () {
        var _this = this;
        this.userMgr.logout().then(function (response) {
            _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        });
    };
    TimecardPage.prototype.goToSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__timecard_search_timecard_search__["a" /* TimecardSearchPage */]).then(function (response) {
            console.log('response', JSON.stringify(response));
        });
    };
    return TimecardPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], TimecardPage.prototype, "content", void 0);
TimecardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-timecard',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/timecard/timecard.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-row *ngIf="isIos">\n            <ion-col width-50>\n                <div text-center>\n                    <div class="ios-title">\n                        Timecard\n                    </div>\n                </div>\n            </ion-col>\n            <ion-col width-25>\n                <ion-buttons class="mar-right6" end>\n                    <button class="refresh" ion-button round icon-right color="secondary" (click)="loadTodaysTime()">\n                        Refresh\n                        <ion-icon class="logout-hide" name="refresh"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf="!isIos">\n            <ion-title>Timecard</ion-title>\n            <ion-buttons class="mar-right6" end>\n                <button class="refresh" ion-button round icon-right color="secondary" (click)="loadTodaysTime()">\n                    Refresh\n                    <ion-icon name="refresh"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-row>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <!--Today\'s Timecard-->\n    <ion-card>\n        <ion-card-header class="task-card-header">\n            Today\'s Timecard\n        </ion-card-header>\n\n        <ion-card-content *ngIf="noEntry">\n            <h3 class="noEntries">No Current Timecard Entries</h3>\n        </ion-card-content>\n\n        <ion-card-content *ngIf="!noEntry">\n            <ion-list class="first-list">\n                <div *ngFor="let time of todaysTime; let i = index;let first=first;">\n                    <ion-row [ngClass]="{first:first}">\n                        <ion-col width-100>\n                            <ion-item *ngIf="time.status === 0" class="o">\n                                <ion-label>\n                                    <span *ngIf="time.status === 0">Clocked Out</span>\n                                </ion-label>\n                                <ion-datetime displayFormat="h:mm a" pickerFormat="h mm A"\n                                              [(ngModel)]="todaysTime[i].alt_timestamp">\n                                </ion-datetime>\n                            </ion-item>\n                            <ion-item *ngIf="time.status === 1" class="e">\n                                <ion-label>\n                                    <span *ngIf="time.status === 1">Clocked In</span>\n                                </ion-label>\n                                <ion-datetime displayFormat="h:mm a" pickerFormat="h mm A"\n                                              [(ngModel)]="todaysTime[i].alt_timestamp">\n                                </ion-datetime>\n                            </ion-item>\n                        </ion-col>\n                    </ion-row>\n                    <ion-item class="notes">\n                        <ion-input class="mar0" [(ngModel)]="todaysTime[i].notes" placeholder="Notes"\n                                   clearInput></ion-input>\n                    </ion-item>\n\n                    <ion-row class="btn-margin">\n                        <ion-col width-50>\n                            <ion-buttons\n                                    *ngIf="todaysTime[i].alt_timestamp !== todaysTime[i].timestamp || todaysTime[i].originalNotes !== todaysTime[i].notes">\n                                <button ion-button block color="danger" small\n                                        (click)="loadTodaysTime()">\n                                    Discard Changes\n                                </button>\n                            </ion-buttons>\n                        </ion-col>\n                        <ion-col width-50>\n                            <ion-buttons\n                                    *ngIf="todaysTime[i].alt_timestamp !== todaysTime[i].timestamp || todaysTime[i].originalNotes !== todaysTime[i].notes">\n                                <button ion-button block color="secondary" small\n                                        (click)="updateTodaysTimecard(todaysTime[i].id, todaysTime[i].alt_timestamp, i, todaysTime[i].notes)">\n                                    Save Changes\n                                </button>\n                            </ion-buttons>\n                        </ion-col>\n                    </ion-row>\n                </div>\n            </ion-list>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n        <ion-card-header>\n            <ion-buttons text-center>\n                <button color="secondary" ion-button block icon-left\n                        (click)="goToSearch()">\n                    Search Timecard Entries\n                </button>\n            </ion-buttons>\n        </ion-card-header>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/timecard/timecard.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user_manager__["a" /* UserManager */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_2__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_conversion_manager__["a" /* ConversionManager */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__["a" /* FCM */]])
], TimecardPage);

//# sourceMappingURL=timecard.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimecardSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_ion2_calendar__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_conversion_manager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_fcm__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TimecardSearchPage = (function () {
    function TimecardSearchPage(navCtrl, calendarCtrl, utils, taskMgr, userMgr, conMgr, alertCtrl, fcm) {
        this.navCtrl = navCtrl;
        this.calendarCtrl = calendarCtrl;
        this.utils = utils;
        this.taskMgr = taskMgr;
        this.userMgr = userMgr;
        this.conMgr = conMgr;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.startDay = -1;
        this.isIos = false;
        this.endDay = -1;
        this.currentUser = '';
        this.userId = '';
        this.showSearchResults = false;
        this.totalSearchSeconds = 0;
        this.holdArray = [];
        this.currentUser = this.userMgr.getUser();
        this.userId = this.currentUser.userId;
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }
    TimecardSearchPage.prototype.ionViewDidEnter = function () {
        this.subscribeAgain();
    };
    TimecardSearchPage.prototype.subscribeAgain = function () {
        var _this = this;
        if (this.utils.FCMFlagDebug()) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.param1 === 'alert') {
                    _this.navCtrl.parent.select(3);
                }
                else if (data.param1 === 'additional_notes') {
                    _this.presentAlert();
                }
                else if (data.param1 === "upcoming_task") {
                    _this.taskMgr.loadHomePage(1);
                    _this.navCtrl.parent.select(0);
                }
                else if (data.param1 === 'crews') {
                    _this.taskMgr.saveEmergencyInfo(parseInt(data.task), parseInt(data.project), true);
                    _this.navCtrl.parent.select(1);
                }
            });
        }
    };
    TimecardSearchPage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'New Task Notes',
            message: 'Please see the new notes that have been added to the task',
            cssClass: 'myAlerts',
            buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.parent.select(0);
                    }
                }]
        });
        alert.present();
    };
    TimecardSearchPage.prototype.dateRange = function () {
        var _this = this;
        this.showSearchResults = false;
        this.startDay = -1;
        this.calendarCtrl.openCalendar({
            pickMode: 'range',
            title: '',
            canBackwardsSelected: true,
            color: 'timecard',
            autoDone: true,
            from: new Date(Date.now() - 7884000000)
        }).then(function (res) {
            _this.startDay = res.from.time;
            _this.endDay = res.to.time;
        })
            .catch(function (err) { return console.log(err); });
    };
    TimecardSearchPage.prototype.updateEntry = function (num) {
        if (num === 0) {
            return this.startDay;
        }
        else if (num === 1) {
            return this.endDay;
        }
    };
    TimecardSearchPage.prototype.timecardSearch = function () {
        var _this = this;
        this.holdArray = [];
        this.utils.presentLoading();
        var hasTime = false;
        var tempStart = this.conMgr.convertDateTime(this.startDay + 86400000);
        var tempEnd = this.conMgr.convertDateTime(this.endDay + 86400000);
        this.taskMgr.loadTimeCardTotal(this.userId, tempStart, tempEnd).then(function (response) {
            _this.timecardHistory = response.data;
            if (response.data.length > 0) {
                hasTime = true;
            }
            _this.utils.dismissLoading();
        });
        this.showSearchResults = true;
    };
    TimecardSearchPage.prototype.returnTime = function (time) {
        return this.conMgr.convertTimeToT(time);
    };
    TimecardSearchPage.prototype.adjustTime = function (time) {
        return this.conMgr.adjustTime(time);
    };
    TimecardSearchPage.prototype.convertSeconds = function (dateObject) {
        var timeObject = this.conMgr.secondsToTime(dateObject.total_seconds);
        if (timeObject.hour < 0 || timeObject.min < 0 || timeObject.sec < 0) {
            return "Incomplete";
        }
        else {
            if (this.holdArray.indexOf(dateObject.date) === -1) {
                this.totalSearchSeconds += dateObject.total_seconds;
                this.holdArray.push(dateObject.date);
            }
            return timeObject.hour + ' hrs ' + timeObject.min + ' min';
        }
    };
    TimecardSearchPage.prototype.convertTotalSeconds = function () {
        var timeObject = this.conMgr.secondsToTime(this.totalSearchSeconds);
        return timeObject.hour + ' hrs ' + timeObject.min + ' min';
    };
    // function to sort timecard data into their individual days
    TimecardSearchPage.prototype.groupBy = function (array, property) {
        var hash = {};
        for (var i = 0; i < array.length; i++) {
            if (!hash[array[i][property]])
                hash[array[i][property]] = [];
            hash[array[i][property]].push(array[i]);
        }
        return hash;
    };
    TimecardSearchPage.prototype.searchDate = function (date) {
        return this.conMgr.convertDate(date);
    };
    return TimecardSearchPage;
}());
TimecardSearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-timecard-search',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/timecard-search/timecard-search.html"*/'\n\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Timecard Search</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n\n    <ion-card>\n        <ion-card-header>\n            <ion-buttons text-center>\n                <button class="search-buttons" color="timecard" ion-button block icon-left\n                        (click)="dateRange()">\n                    Select Search Dates\n                </button>\n            </ion-buttons>\n        </ion-card-header>\n    </ion-card>\n\n\n    <!--Timecard Search-->\n    <div *ngIf="startDay !== -1">\n        <ion-card>\n            <ion-card-header text-center class="task-card-header">\n                {{startDay | date:\'mediumDate\'}} To {{endDay | date:\'mediumDate\'}}\n            </ion-card-header>\n            <ion-card-content>\n                <ion-buttons text-center>\n                    <button class="search-button search-buttons" color="secondary" ion-button block icon-left\n                            (click)="timecardSearch()">\n                        <ion-icon name="search"></ion-icon>\n                        Search\n                    </button>\n                </ion-buttons>\n            </ion-card-content>\n        </ion-card>\n    </div>\n\n\n    <!--Search Results-->\n\n    <div *ngIf="timecardHistory && showSearchResults">\n\n\n        <div *ngFor="let date of timecardHistory | keys; let j = index">\n            <ion-card class="card-border">\n                <ion-card-header class="task-card-header search-results">\n                    {{searchDate(date)}}\n                </ion-card-header>\n                <div *ngFor="let day of timecardHistory[date].entries;">\n                    <ion-card-content class="clock-pad">\n                        <ion-row>\n                            <ion-col width-10>\n                                <div *ngIf="day.status === 0" class="clock-out">\n                                    <h3>in</h3>\n\n                                </div>\n                                <div *ngIf="day.status === 1" class="clock-in">\n                                    <h3>in</h3>\n                                </div>\n\n\n                            </ion-col>\n\n                            <ion-col width-50 class="no-pad-left">\n\n                                <div class="normal-back">\n                                    <h3 class="clock-status" *ngIf="day.status === 0">Clocked Out</h3>\n                                </div>\n\n                                <div class="normal-back">\n                                    <h3 class="clock-status" *ngIf="day.status === 1">Clocked In</h3>\n                                </div>\n\n\n                            </ion-col>\n\n                            <ion-col width-40>\n                                <h3 *ngIf="!isIos" class="clock-time" text-right>{{day.updatedTime | date:\'h:mm a\'}}</h3>\n                                <h3 *ngIf="isIos" class="clock-time" text-right>{{adjustTime(day.updatedTime)}}</h3>\n                            </ion-col>\n\n\n                        </ion-row>\n                        <ion-row>\n                            <ion-col *ngIf="day.notes !== \'NULL\'">\n                                <h3 text-wrap class="clock-notes">Notes: {{day.notes}}</h3>\n                            </ion-col>\n                        </ion-row>\n\n\n                    </ion-card-content>\n                </div>\n                <ion-card-header class="task-card-header search-results">\n                    Total Time: {{convertSeconds(timecardHistory[date].totaltime)}}\n                </ion-card-header>\n\n\n            </ion-card>\n        </div>\n\n        <ion-card>\n            <ion-card-header class="task-card-header search-results">\n                Timecard Search Results\n            </ion-card-header>\n            <ion-card-content>\n                <ion-row>\n                    <ion-col width-45>\n                        <h4>Dates:</h4>\n                    </ion-col>\n                    <ion-col width-55>\n                        <h4 text-right>{{startDay | date:\'MMM d\'}} - {{endDay | date:\'MMM d\'}}</h4>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col width-45>\n                        <h4>Days Worked:</h4>\n                    </ion-col>\n                    <ion-col width-55>\n                        <h4 text-right>{{holdArray.length}}</h4>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col width-45>\n                        <h4>Total Time:</h4>\n                    </ion-col>\n                    <ion-col width-55>\n                        <h4 text-right>{{convertTotalSeconds()}}</h4>\n                    </ion-col>\n                </ion-row>\n            </ion-card-content>\n        </ion-card>\n\n\n    </div>\n\n\n</ion-content>\n\n<!--Code for editing past day\'s history-->\n<!--<ion-row class="btn-margin">-->\n<!--<ion-col width-50>-->\n<!--<ion-buttons-->\n<!--*ngIf="day.alt_timestamp !== day.timestamp || day.originalNotes !== day.notes">-->\n<!--<button ion-button block color="danger" small-->\n<!--(click)="timecardSearch()">-->\n<!--Discard Changes-->\n\n<!--</button>-->\n<!--</ion-buttons>-->\n<!--</ion-col>-->\n<!--<ion-col width-50>-->\n<!--<ion-buttons-->\n<!--*ngIf="day.alt_timestamp !== day.timestamp || day.originalNotes !== day.notes">-->\n<!--<button ion-button block color="secondary" small-->\n<!--(click)="updateTimecardSearch(day.id, day.alt_timestamp, day.newDate, k, day.notes)">-->\n<!--Save Changes-->\n\n<!--</button>-->\n<!--</ion-buttons>-->\n<!--</ion-col>-->\n<!--</ion-row>-->\n\n<!--<ion-buttons-->\n<!--*ngIf="day.alt_timestamp !== day.timestamp || day.originalNotes !== day.notes">-->\n<!--<button color="primary"-->\n<!--(click)="updateTimecardSearch(day.id, day.alt_timestamp, day.newDate, k, day.notes)">-->\n<!--Update Changes-->\n\n<!--</button>-->\n<!--</ion-buttons>-->\n\n\n<!--Code for editing past day\'s history-->\n<!--<ion-row>-->\n<!--<ion-col text-center>-->\n<!--<ion-buttons *ngIf="!showCreateOld || addOldEntry !== j">-->\n<!--<button ion-button block color="secondary" (click)="showOldEntryCreation(j)">-->\n<!--Create New Entry-->\n<!--</button>-->\n<!--</ion-buttons>-->\n<!--</ion-col>-->\n<!--</ion-row>-->\n\n<!--<div *ngIf="addOldEntry === j">-->\n<!--<ion-card class="card-border new-entry">-->\n<!--<ion-card-header class="task-card-header">-->\n<!--New Timecard Entry-->\n<!--</ion-card-header>-->\n<!--<ion-card-content>-->\n<!--<ion-list radio-group [(ngModel)]="oldDayEntry.status" required>-->\n<!--<ion-item class="pad7">-->\n<!--<ion-label>Clock In</ion-label>-->\n<!--<ion-radio value="1"></ion-radio>-->\n<!--</ion-item>-->\n\n<!--<ion-item class="pad7">-->\n<!--<ion-label>Clock Out</ion-label>-->\n<!--<ion-radio value="0"></ion-radio>-->\n<!--</ion-item>-->\n\n<!--</ion-list>-->\n<!--<ion-item class="pad7">-->\n<!--<ion-label>Time</ion-label>-->\n<!--<ion-datetime displayFormat="h:mm a" pickerFormat="h mm A"-->\n<!--[(ngModel)]="oldDayEntry.time">-->\n<!--</ion-datetime>-->\n<!--</ion-item>-->\n\n<!--<ion-item class="pad0">-->\n<!--<ion-input [(ngModel)]="oldDayEntry.notes" placeholder="Notes"-->\n<!--clearInput></ion-input>-->\n<!--</ion-item>-->\n\n<!--<ion-row>-->\n<!--<ion-col width-50>-->\n<!--<ion-buttons>-->\n<!--<button ion-button block color="danger" (click)="cancelOldEntry()">-->\n<!--Cancel-->\n<!--</button>-->\n<!--</ion-buttons>-->\n<!--</ion-col>-->\n<!--<ion-col width-50>-->\n<!--<ion-buttons>-->\n<!--<button ion-button block color="secondary"-->\n<!--(click)="createOldEntry(date, oldDayEntry.status, oldDayEntry.time, oldDayEntry.notes)"-->\n<!--[disabled]="disableOldEntry()">-->\n<!--Save-->\n<!--</button>-->\n<!--</ion-buttons>-->\n<!--</ion-col>-->\n<!--</ion-row>-->\n\n\n<!--</ion-card-content>-->\n<!--</ion-card>-->\n\n\n<!--</div>-->\n\n<!--<ion-card class="card-border">-->\n<!--<ion-card-header class="task-card-header">-->\n<!--Create New Day and Time Entry-->\n<!--</ion-card-header>-->\n<!--<ion-card-content>-->\n<!--<ion-list radio-group [(ngModel)]="oldDayAndTimeEntry.status" required>-->\n<!--<ion-item>-->\n<!--<ion-label>Clock In</ion-label>-->\n<!--<ion-radio value="1"></ion-radio>-->\n<!--</ion-item>-->\n\n<!--<ion-item>-->\n<!--<ion-label>Clock Out</ion-label>-->\n<!--<ion-radio value="0"></ion-radio>-->\n<!--</ion-item>-->\n\n<!--</ion-list>-->\n\n<!--<ion-row>-->\n<!--<ion-item>-->\n<!--<ion-label>Date</ion-label>-->\n<!--<ion-datetime displayFormat="MMM D, YYYY" pickerFormat="MMM D YYYY"-->\n<!--[(ngModel)]="oldDayAndTimeEntry.date"></ion-datetime>-->\n<!--</ion-item>-->\n<!--</ion-row>-->\n<!--<ion-row>-->\n<!--<ion-item>-->\n<!--<ion-label>Time</ion-label>-->\n<!--<ion-datetime displayFormat="h:mm a" pickerFormat="h mm A"-->\n<!--[(ngModel)]="oldDayAndTimeEntry.time">-->\n<!--</ion-datetime>-->\n<!--</ion-item>-->\n<!--</ion-row>-->\n\n\n<!--<ion-item>-->\n<!--<ion-input [(ngModel)]="oldDayAndTimeEntry.notes" placeholder="Notes"-->\n<!--clearInput></ion-input>-->\n<!--</ion-item>-->\n\n<!--<ion-row>-->\n<!--<ion-col width-50>-->\n<!--<ion-buttons>-->\n<!--<button ion-button block color="danger" (click)="cancelNewDayEntry()">-->\n<!--Cancel-->\n<!--</button>-->\n<!--</ion-buttons>-->\n<!--</ion-col>-->\n<!--<ion-col width-50>-->\n<!--<ion-buttons>-->\n<!--<button ion-button block color="secondary"-->\n<!--(click)="createDayAndTime(oldDayAndTimeEntry.date, oldDayAndTimeEntry.time, oldDayAndTimeEntry.status, oldDayAndTimeEntry.notes)"-->\n<!--[disabled]="disableNewDay()">-->\n<!--Save-->\n<!--</button>-->\n<!--</ion-buttons>-->\n<!--</ion-col>-->\n<!--</ion-row>-->\n<!--</ion-card-content>-->\n<!--</ion-card>-->\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/timecard-search/timecard-search.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__components_ion2_calendar__["a" /* CalendarController */],
        __WEBPACK_IMPORTED_MODULE_2__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_4__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_5__providers_user_manager__["a" /* UserManager */],
        __WEBPACK_IMPORTED_MODULE_6__providers_conversion_manager__["a" /* ConversionManager */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_fcm__["a" /* FCM */]])
], TimecardSearchPage);

//# sourceMappingURL=timecard-search.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_model__ = __webpack_require__(521);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_index__ = __webpack_require__(522);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar_module__ = __webpack_require__(984);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__calendar_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calendar_controller__ = __webpack_require__(642);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__calendar_controller__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarMonth; });
/* unused harmony export CalendarOptions */
/* unused harmony export CalendarResult */
var CalendarMonth = (function () {
    function CalendarMonth() {
    }
    return CalendarMonth;
}());

var CalendarOptions = (function () {
    function CalendarOptions() {
    }
    return CalendarOptions;
}());

var CalendarResult = (function () {
    function CalendarResult() {
    }
    return CalendarResult;
}());

//# sourceMappingURL=calendar.model.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CALENDAR_COMPONENTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_modal__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calendar_week_component__ = __webpack_require__(981);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__month_component__ = __webpack_require__(982);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calendar_component__ = __webpack_require__(983);




var CALENDAR_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_0__calendar_modal__["a" /* CalendarModal */],
    __WEBPACK_IMPORTED_MODULE_1__calendar_week_component__["a" /* CalendarWeekComponent */],
    __WEBPACK_IMPORTED_MODULE_2__month_component__["a" /* MonthComponent */],
    __WEBPACK_IMPORTED_MODULE_3__calendar_component__["a" /* CalendarComponent */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_calendar_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CalendarModal = (function () {
    function CalendarModal(_renderer, _elementRef, params, viewCtrl, ref, calSvc, plt) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.ref = ref;
        this.calSvc = calSvc;
        this.plt = plt;
        this.datesTemp = [null, null];
        this.monthFormatFilterStr = '';
        this.weekdays = [];
        this.weekStart = 0;
        this.isIos = false;
        this.debug = true;
        this._s = true;
        this._color = 'primary';
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
        var startTime = __WEBPACK_IMPORTED_MODULE_3_moment__(this._d.from).valueOf();
        var endTime = __WEBPACK_IMPORTED_MODULE_3_moment__(this._d.to).valueOf();
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
        var nextTime = __WEBPACK_IMPORTED_MODULE_3_moment__(final.original.time).add(1, 'M').valueOf();
        var rangeEnd = this.options.range_end ? __WEBPACK_IMPORTED_MODULE_3_moment__(this.options.range_end).subtract(1, 'M') : 0;
        if (len <= 0 || (rangeEnd !== 0 && __WEBPACK_IMPORTED_MODULE_3_moment__(final.original.time).isAfter(rangeEnd))) {
            infiniteScroll.enable(false);
            return;
        }
        (_a = this.calendarMonths).push.apply(_a, this.calSvc.createMonthsByPeriod(nextTime, 1, this._d));
        infiniteScroll.complete();
        var _a;
    };
    CalendarModal.prototype.backwardsMonth = function () {
        var first = this.calendarMonths[0];
        var firstTime = __WEBPACK_IMPORTED_MODULE_3_moment__(first.original.time).subtract(1, 'M').valueOf();
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
        var startDate = __WEBPACK_IMPORTED_MODULE_3_moment__(this.options.start);
        var defaultScrollTo = __WEBPACK_IMPORTED_MODULE_3_moment__(date);
        var isAfter = defaultScrollTo.isAfter(startDate);
        if (!isAfter)
            return 3;
        if (this.showYearPicker) {
            startDate = __WEBPACK_IMPORTED_MODULE_3_moment__(new Date(this.year, 0, 1));
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
        return __WEBPACK_IMPORTED_MODULE_3_moment__(__WEBPACK_IMPORTED_MODULE_3_moment__(date).format('YYYY-MM-DD')).valueOf();
    };
    return CalendarModal;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], CalendarModal.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('months'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], CalendarModal.prototype, "monthsEle", void 0);
CalendarModal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ion-calendar-modal',
        template: "\n        <ion-header>\n\n            <ion-navbar [color]=\"_color\">\n\n                <!--<ion-buttons start [hidden]=\"!showYearPicker\">-->\n                <!--<ion-select [(ngModel)]=\"year\" (ngModelChange)=\"changedYearSelection()\" interface=\"popover\">-->\n                <!--<ion-option *ngFor=\"let y of years\" value=\"{{y}}\">{{y}}</ion-option>-->\n                <!--</ion-select>-->\n                <!--</ion-buttons>-->\n\n                <ion-buttons end>\n                    <button ion-button icon-only clear (click)=\"onCancel()\">\n                        <span *ngIf=\"closeLabel !== '' && !closeIcon\">{{closeLabel}}</span>\n                        <ion-icon *ngIf=\"closeIcon\" name=\"close\"></ion-icon>\n                    </button>\n                </ion-buttons>\n\n                <ion-title>{{title}}</ion-title>\n\n                <ion-buttons end>\n                    <button ion-button icon-only *ngIf=\"!_d.autoDone\" clear [disabled]=\"!canDone()\" (click)=\"done()\">\n                        <span *ngIf=\"doneLabel !== '' && !doneIcon\">{{doneLabel}}</span>\n                        <ion-icon *ngIf=\"doneIcon\" name=\"checkmark\"></ion-icon>\n                    </button>\n\n                </ion-buttons>\n\n            </ion-navbar>\n\n            <ion-calendar-week\n                    [color]=\"_color\"\n                    [weekArray]=\"weekdays\"\n                    [weekStart]=\"weekStart\">\n            </ion-calendar-week>\n\n        </ion-header>\n\n        <ion-content (ionScroll)=\"onScroll($event)\" class=\"calendar-page\"\n                     [ngClass]=\"{'multi-selection': options.pickMode === 'multi'}\">\n\n            <div #months>\n                <div *ngFor=\"let month of calendarMonths;let i = index;\" class=\"month-box\" [attr.id]=\"'month-' + i\">\n                    <h4 class=\"text-center month-title\">{{month.original.date | date:monthFormatFilterStr}}</h4>\n                    <ion-calendar-month [month]=\"month\"\n                                        [pickMode]=\"options.pickMode\"\n                                        [isSaveHistory]=\"isSaveHistory\"\n                                        [id]=\"_id\"\n                                        [color]=\"_color\"\n                                        (onChange)=\"onChange($event)\"\n                                        [(ngModel)]=\"datesTemp\">\n\n                    </ion-calendar-month>\n                </div>\n            </div>\n\n            <ion-infinite-scroll (ionInfinite)=\"nextMonth($event)\">\n                <ion-infinite-scroll-content></ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n\n        </ion-content>\n    ",
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */],
        __WEBPACK_IMPORTED_MODULE_2__services_calendar_service__["a" /* CalendarService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
], CalendarModal);

//# sourceMappingURL=calendar.modal.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_utils__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = (function () {
    function LoginPage(platform, navCtrl, navParams, userMgr, taskMgr, utils, alertCtrl, iab) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userMgr = userMgr;
        this.taskMgr = taskMgr;
        this.utils = utils;
        this.alertCtrl = alertCtrl;
        this.iab = iab;
        this.debug = false;
        this.isLoggedIn = false;
        this.showEmail = false;
        this.validEmail = false;
        this.showEmailPrompt = false;
        this.credentials = {
            email: '',
            password: ''
        };
        this.platform = platform;
        this.platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Keyboard */].disableScroll(true);
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        if (this.debug) {
            console.log('ionViewDidLoad LoginPage');
        }
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        this.platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Keyboard */].disableScroll(true);
        });
        // disable back button to fix navigation //
        // otherwise back button could take you back to tasks //
        this.platform.registerBackButtonAction(function () {
            //do nothing....
        });
        this.isLoggedIn = this.userMgr.isLoggedIn();
        if (this.debug) {
            console.log('ionViewDidEnter LoginPage');
        }
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        // reverse android keyboard workaround //
        this.platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Keyboard */].disableScroll(false);
        });
        this.platform.registerBackButtonAction(function () {
            //this.navCtrl.pop();
        });
    };
    /** used to enable/disable login button */
    LoginPage.prototype.disableForm = function () {
        return this.credentials.email.trim().length < 1 || this.credentials.password.trim().length < 1;
    };
    // yep //
    LoginPage.prototype.trimNotes = function () {
        this.credentials.email = this.credentials.email.trim();
    };
    LoginPage.prototype.validateEmail = function (email) {
        var _this = this;
        var data = { "email": email };
        this.taskMgr.validateEmail(data).then(function (res) {
            if (res.code === 0) {
                _this.validEmail = true;
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Email Not Found',
                    message: 'The email address was not found. Please select cancel to re-enter your email address or select CTS Home to get more information about the CTS suite of tools.',
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: function () {
                                if (_this.debug) {
                                    console.log('Cancel clicked');
                                }
                            }
                        },
                        {
                            text: 'CTS Home',
                            handler: function () {
                                var options = "location=no";
                                _this.iab.create("https://www.cleartasksolutions.com/#contact", "_system", options);
                            }
                        }
                    ]
                });
                alert_1.present();
                _this.showEmailPrompt = true;
            }
        });
    };
    LoginPage.prototype.backToEmail = function () {
        this.credentials.email = '';
        this.validEmail = false;
    };
    /** log the user in */
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        this.utils.presentLoading('Logging in...');
        var credentials = {};
        Object.assign(credentials, this.credentials);
        this.userMgr.authenticate(credentials).then(function (valid) {
            _this.utils.dismissLoading();
            if (valid) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
            }
            else {
                var msg = "Unable to log you in. Check your username and password and try again";
                _this.utils.presentToast(msg, true, 'OK');
            }
        });
    };
    LoginPage.prototype.showPasswordReset = function () {
        this.showEmail = true;
    };
    LoginPage.prototype.resetPassword = function () {
        this.taskMgr.resetPassword(this.resetEmail);
        this.resetEmail = '';
        this.showEmail = false;
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/login/login.html"*/'<ion-content padding class="cts-login-content">\n\n    <div class="title"><img src="assets/img/cts-lg.png"></div>\n    <div>\n\n        <ion-list *ngIf="!showEmail">\n            <ion-item *ngIf="!validEmail" class="login-pad">\n                <ion-label floating>Email Address</ion-label>\n                <ion-input type="email" [(ngModel)]="credentials.email" required></ion-input>\n            </ion-item>\n            <ion-item *ngIf="validEmail" class="login-pad">\n                <ion-label floating>Password</ion-label>\n                <ion-input type="password" [(ngModel)]="credentials.password" required></ion-input>\n            </ion-item>\n            <ion-row>\n                <ion-col class="login-btn" width-100>\n                    <button *ngIf="!validEmail" ion-button icon-left block color="secondary" (click)="validateEmail(credentials.email)">\n                        NEXT\n                    </button>\n                    <button *ngIf="validEmail" ion-button icon-left block color="secondary" (click)="doLogin()" [disabled]="disableForm()">\n                        LOGIN\n                    </button>\n                    <button *ngIf="validEmail" class="btn-shadow browser" ion-button icon-left block\n                            (click)="backToEmail()">\n                        BACK\n                    </button>\n                </ion-col>\n\n            </ion-row>\n            <ion-row>\n                <ion-col class="login-btn" width-100>\n                    <button class="pass-reset" ion-button icon-left block clear (click)="showPasswordReset()">\n                        Forgot Password?\n                    </button>\n                </ion-col>\n\n            </ion-row>\n        </ion-list>\n        <ion-row>\n            <ion-item *ngIf="showEmail" class="login-pad">\n                <ion-label floating>Email Address</ion-label>\n                <ion-input type="email" [(ngModel)]="resetEmail" required></ion-input>\n            </ion-item>\n            <ion-col *ngIf="showEmail" class="login-btn" width-100>\n                <button ion-button icon-left block color="primary" (click)="resetPassword()">\n                    Reset Password\n                </button>\n            </ion-col>\n            <ion-col *ngIf="showEmail" class="login-btn" width-100>\n                <button ion-button icon-left block color="primary" (click)="showEmail = false">\n                    Back To Login\n                </button>\n            </ion-col>\n        </ion-row>\n\n\n\n\n    </div>\n</ion-content>\n\n\n<ion-row>\n    <ion-col text-center class="version">\n        Version: 1.3.0\n    </ion-col>\n</ion-row>\n\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user_manager__["a" /* UserManager */],
        __WEBPACK_IMPORTED_MODULE_5__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_7__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_calendar_modal__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_calendar_service__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CalendarController = (function () {
    function CalendarController(modalCtrl, calSvc) {
        this.modalCtrl = modalCtrl;
        this.calSvc = calSvc;
    }
    CalendarController.prototype.openCalendar = function (calendarOptions, modalOptions) {
        var _this = this;
        if (modalOptions === void 0) { modalOptions = {}; }
        var options = this.calSvc.safeOpt(calendarOptions);
        var calendarModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__components_calendar_modal__["a" /* CalendarModal */], Object.assign({
            options: options,
        }, options), modalOptions);
        calendarModal.present().then(function (res) {
            console.log('res ', JSON.stringify(res));
        });
        return new Promise(function (resolve, reject) {
            calendarModal.onDidDismiss(function (data) {
                if (data && Array.isArray(data)) {
                    resolve(_this.calSvc.wrapResult(data, options.pickMode));
                }
                else {
                    reject('cancelled');
                }
            });
        });
    };
    CalendarController.prototype.setHistory = function (param) {
        localStorage.setItem("ion-calendar-" + param.id, JSON.stringify(param.date));
    };
    CalendarController.prototype.getHistory = function (id) {
        var _history = localStorage.getItem("ion-calendar-" + id);
        if (_history) {
            return JSON.parse(_history);
        }
    };
    CalendarController.prototype.removeHistory = function (id) {
        localStorage.removeItem("ion-calendar-" + id);
    };
    return CalendarController;
}());
CalendarController = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__services_calendar_service__["a" /* CalendarService */]])
], CalendarController);

//# sourceMappingURL=calendar.controller.js.map

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/** Splash page */
var SplashPage = (function () {
    function SplashPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SplashPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SplashPage');
    };
    SplashPage.prototype.ionViewDidEnter = function () {
    };
    return SplashPage;
}());
SplashPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-splash',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/splash/splash.html"*/'<!--\n  Generated template for the Splash page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n\n<ion-content padding style="background-color:deepskyblue">\n\n</ion-content>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/splash/splash.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], SplashPage);

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(649);

// import {enableProdMode} from '@angular/core';

// enableProdMode();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 649:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MyErrorHandler */
/* unused harmony export provideStorage */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_action_sheet__ = __webpack_require__(985);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_android_full_screen__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_badge__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_call_number__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_fcm__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__ = __webpack_require__(986);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_in_app_browser__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_keyboard__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_launch_navigator__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_sim__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_storage__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_unique_device_id__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_alerts_alerts__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_complete_notes_complete_notes__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_driving_directions_driving_directions__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_feedback_feedback__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_foreman_foreman__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_history_feedback_history_feedback__ = __webpack_require__(987);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_history_history__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_history_review_history_review__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_home_home__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_next_day_tasks_next_day__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_reject_notes_reject_notes__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_single_foreman_task_single_foreman_task__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_single_history_task_single_history_task__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_splash_splash__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_tabs_tabs__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_timecard_timecard__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_timecard_search_timecard_search__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__providers_api_service__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_ion2_calendar__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__providers_conversion_manager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__providers_google_maps_manager__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__providers_google_maps_service__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__providers_backbutton__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__providers_storage_service__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_pro__ = __webpack_require__(988);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_pro___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_52__ionic_pro__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//libraries//







//plugins
















//pages//


















//providers//












var IonicPro = __WEBPACK_IMPORTED_MODULE_52__ionic_pro__["Pro"].init('379d0062', {
    appVersion: "1.3.0"
});
var MyErrorHandler = (function () {
    function MyErrorHandler(injector) {
        try {
            this.ionicErrorHandler = injector.get(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicErrorHandler */]);
        }
        catch (e) {
            // Unable to get the IonicErrorHandler provider, ensure
            // IonicErrorHandler has been added to the providers list below
        }
    }
    MyErrorHandler.prototype.handleError = function (err) {
        IonicPro.monitoring.handleNewError(err);
        // Remove this if you want to disable Ionic's auto exception handling
        // in development mode.
        this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    };
    return MyErrorHandler;
}());
MyErrorHandler = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_core__["D" /* Injector */]])
], MyErrorHandler);

// import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
// CloudModule.forRoot(cloudSettings),
// const cloudSettings: CloudSettings = {
//     'core': {
//         'app_id': 'a1e0e4dc'
//     }
// };
function provideStorage() {
    return new __WEBPACK_IMPORTED_MODULE_21__ionic_storage__["a" /* Storage */]({ name: '_ctsdb' });
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_23__pages_alerts_alerts__["a" /* AlertsPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_complete_notes_complete_notes__["a" /* CompleteNotesPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_driving_directions_driving_directions__["a" /* DrivingDirectionsPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_feedback_feedback__["a" /* FeedbackPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_foreman_foreman__["a" /* ForemanPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_history_feedback_history_feedback__["a" /* HistoryFeedbackPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_history_review_history_review__["a" /* HistoryReviewPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_home_home__["a" /* HomeKeysPipe */],
            __WEBPACK_IMPORTED_MODULE_31__pages_home_home__["b" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_next_day_tasks_next_day__["a" /* KeysPipe */],
            __WEBPACK_IMPORTED_MODULE_33__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_next_day_tasks_next_day__["b" /* NextDayPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_reject_notes_reject_notes__["a" /* RejectNotesPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_splash_splash__["a" /* SplashPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_single_foreman_task_single_foreman_task__["a" /* SingleForemanTaskPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_single_history_task_single_history_task__["a" /* SingleHistoryTaskPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_timecard_timecard__["a" /* TimecardKeysPipe */],
            __WEBPACK_IMPORTED_MODULE_39__pages_timecard_timecard__["b" /* TimecardPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_timecard_search_timecard_search__["a" /* TimecardSearchPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["d" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_42__components_ion2_calendar__["b" /* CalendarModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {
                scrollAssist: false,
                autoFocusAssist: false,
                tabsPlacement: 'bottom',
                platforms: {
                    android: {}
                }
            }, {
                links: []
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_23__pages_alerts_alerts__["a" /* AlertsPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_complete_notes_complete_notes__["a" /* CompleteNotesPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_driving_directions_driving_directions__["a" /* DrivingDirectionsPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_feedback_feedback__["a" /* FeedbackPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_foreman_foreman__["a" /* ForemanPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_history_feedback_history_feedback__["a" /* HistoryFeedbackPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_history_review_history_review__["a" /* HistoryReviewPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_home_home__["b" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_next_day_tasks_next_day__["b" /* NextDayPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_reject_notes_reject_notes__["a" /* RejectNotesPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_single_foreman_task_single_foreman_task__["a" /* SingleForemanTaskPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_single_history_task_single_history_task__["a" /* SingleHistoryTaskPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_splash_splash__["a" /* SplashPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_timecard_timecard__["b" /* TimecardPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_timecard_search_timecard_search__["a" /* TimecardSearchPage */]
        ],
        /** NB: providers are singletons */
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_4__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicErrorHandler */] },
            { provide: __WEBPACK_IMPORTED_MODULE_21__ionic_storage__["a" /* Storage */], useFactory: provideStorage },
            [{ provide: __WEBPACK_IMPORTED_MODULE_4__angular_core__["v" /* ErrorHandler */], useClass: MyErrorHandler }],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_android_full_screen__["a" /* AndroidFullScreen */],
            __WEBPACK_IMPORTED_MODULE_41__providers_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_badge__["a" /* Badge */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_43__providers_conversion_manager__["a" /* ConversionManager */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_fcm__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_44__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_45__providers_google_maps_manager__["a" /* GoogleMapsManager */],
            __WEBPACK_IMPORTED_MODULE_46__providers_google_maps_service__["a" /* GoogleMapsService */],
            __WEBPACK_IMPORTED_MODULE_47__providers_backbutton__["a" /* HardwareBackButtonService */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_sim__["a" /* Sim */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_48__providers_storage_service__["a" /* StorageService */],
            __WEBPACK_IMPORTED_MODULE_49__providers_task_manager__["a" /* TaskManager */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_unique_device_id__["a" /* UniqueDeviceID */],
            __WEBPACK_IMPORTED_MODULE_50__providers_user_manager__["a" /* UserManager */],
            __WEBPACK_IMPORTED_MODULE_51__utils_utils__["a" /* Utils */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_manager__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_splash_splash__ = __webpack_require__(643);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = (function () {
    function MyApp(platform, statusBar, keyboard, splashscreen, userMgr, utils) {
        var _this = this;
        this.statusBar = statusBar;
        this.keyboard = keyboard;
        this.splashscreen = splashscreen;
        this.userMgr = userMgr;
        this.utils = utils;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_splash_splash__["a" /* SplashPage */];
        this.utils.presentLoading();
        platform.ready().then(function () {
            var lastTimeBackPress = 0;
            var timePeriodToExit = 2000;
            _this.statusBar.styleDefault();
            _this.splashscreen.hide();
            _this.keyboard.disableScroll(true);
            // do we have a user in storage?
            _this.userMgr.checkForToken().then(function (response) {
                if (response) {
                    _this.nextPage = __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */];
                }
                else {
                    _this.nextPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                }
                // now initialize userMgr vars
                return _this.userMgr.initializeVars();
            }).then(function (response) {
                setTimeout(function (nav, utils, page) {
                    utils.dismissLoading();
                    nav.push(page);
                }, 500, _this.nav, _this.utils, _this.nextPage);
            });
        });
    }
    MyApp.prototype.ngOnInit = function () {
        //console.log('ngOnInit()');
    };
    ;
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('ctsNav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/app/app.html"*/'<ion-nav #ctsNav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5__providers_user_manager__["a" /* UserManager */],
        __WEBPACK_IMPORTED_MODULE_6__utils_utils__["a" /* Utils */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrivingDirectionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_launch_navigator__ = __webpack_require__(503);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DrivingDirectionsPage = (function () {
    function DrivingDirectionsPage(utils, navCtrl, plt, launchNavigator, params, platform, geolocation) {
        this.utils = utils;
        this.navCtrl = navCtrl;
        this.plt = plt;
        this.launchNavigator = launchNavigator;
        this.params = params;
        this.platform = platform;
        this.geolocation = geolocation;
        this.mapInitialised = false;
        this.isIos = false;
        this.start = '';
        if (this.plt.is('ios')) {
            // This will only print when on iOS
            this.isIos = true;
        }
        this.directions = this.params.get('directions');
        this.destination = '';
    }
    DrivingDirectionsPage.prototype.ionViewDidLoad = function () {
        this.loadGoogleMaps();
    };
    /** utility function so entire polyline displays on map */
    DrivingDirectionsPage.prototype.midpoint = function (lat1, long1, lat2, long2, per) {
        return [lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per];
    };
    /** open the destination in google maps or default mapping app when cordova */
    DrivingDirectionsPage.prototype.openInMaps = function () {
        var _this = this;
        var endLat = this.directions.routes[0].legs[0].end_location.lat;
        var endLng = this.directions.routes[0].legs[0].end_location.lng;
        if (this.platform.is('cordova')) {
            this.utils.presentLoading();
            this.geolocation.getCurrentPosition().then(function (position) {
                _this.utils.dismissLoading();
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                var newStart = [];
                newStart.push(lat);
                newStart.push(lon);
                _this.destination = endLat + "," + endLng;
                var options = {
                    start: newStart
                };
                _this.launchNavigator.navigate(_this.destination)
                    .then(function (success) { return console.log("Launched Navigator"); }, function (error) { return console.log('Error launching navigator: ' + error); });
            }).catch(function (error) {
                _this.utils.presentToast('Could not get current location', true, 'OK');
            });
        }
    };
    /** this builds the map and directions */
    DrivingDirectionsPage.prototype.loadGoogleMaps = function () {
        var bounds = this.directions.routes[0].bounds;
        var midpoint = this.midpoint((bounds.south), (bounds.west), (bounds.north), (bounds.east), .5);
        var latitude = midpoint[0];
        var longitude = midpoint[1];
        var latLng = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: latLng,
            //zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            // draggable:false,
            disableDefaultUI: true,
            //disableDoubleClickZoom: true
            styles: [{
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "geometry",
                    "stylers": [{ "visibility": "on" }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [{ "color": "#c2d1d6" }]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [{ "color": "#dde3e3" }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{ "color": "#c2d1d6" }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{ "color": "#a9b4b8" }, { "lightness": "0" }]
                }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#a3c7df" }] }]
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var latLngBoundsLiteral = {
            'north': bounds.north,
            'east': bounds.east,
            'south': bounds.south,
            'west': bounds.west
        };
        this.map.fitBounds(latLngBoundsLiteral);
        var ion_md_pin = {
            path: 'M160 416c88 0 160 -71 160 -157c0 -118 -160 -291 -160 -291s-160 173 -160 291c0 86 72 157 160 157zM160 203c32 0 57 25 57 56s-25 56 -57 56s-57 -25 -57 -56s25 -56 57 -56z',
            fillColor: '#32db64',
            fillOpacity: 1,
            rotation: 180,
            scale: .065,
            anchor: new google.maps.Point(160, -80)
        };
        var startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.directions.routes[0].legs[0].start_location.lat, this.directions.routes[0].legs[0].start_location.lng),
            icon: ion_md_pin,
        });
        // To add the marker to the map, call setMap();
        startMarker.setMap(this.map);
        var route = new google.maps.Polyline({
            path: this.directions.routes[0].overview_path,
            geodesic: true,
            //strokeColor: '#FF0000',
            strokeColor: '#337AF9',
            strokeOpacity: 1.0,
            strokeWeight: 4
        });
        route.setMap(this.map);
        var endMarker = new google.maps.Marker({
            position: {
                lat: this.directions.routes[0].legs[0].end_location.lat,
                lng: this.directions.routes[0].legs[0].end_location.lng
            },
            icon: {
                path: 'M160 416c88 0 160 -71 160 -157c0 -118 -160 -291 -160 -291s-160 173 -160 291c0 86 72 157 160 157zM160 203c32 0 57 25 57 56s-25 56 -57 56s-57 -25 -57 -56s25 -56 57 -56z',
                fillColor: '#f53d3d',
                fillOpacity: 1,
                rotation: 180,
                scale: .065,
                anchor: new google.maps.Point(160, -80)
            }
        });
        // To add the marker to the map, call setMap();
        endMarker.setMap(this.map);
    };
    return DrivingDirectionsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], DrivingDirectionsPage.prototype, "mapElement", void 0);
DrivingDirectionsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-driving-directions',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/driving-directions/driving-directions.html"*/'<!--\n  Generated template for the DrivingDirections page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Directions</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n\n  <div #map id="map"></div>\n\n  <ion-card class="driving-directions">\n\n  <!--\n  <ion-fab right top>\n    <button ion-fab>\n      <ion-icon name="pin"></ion-icon>\n    </button>\n  </ion-fab>\n  -->\n\n  <ion-item>\n    <span item-left>{{directions.routes[0].legs[0].distance.text}}</span>\n    <span item-left>(About {{directions.routes[0].legs[0].duration.text}})</span>\n    <button ion-button icon-left clear item-right (click)="openInMaps()">\n      <ion-icon name="navigate"></ion-icon>\n      Open in Maps\n    </button>\n  </ion-item>\n\n  <ion-item text-wrap class="address">\n    <ion-icon name="pin" color="secondary" item-left large></ion-icon>\n    <h2>{{directions.routes[0].legs[0].start_address}}</h2>\n  </ion-item>\n\n  <!--\n    <ion-item>\n    <span item-left class="map-step-avatar" [class]="\'map-step-avatar turn-sharp-left\'"></span>turn-sharp-left\n  </ion-item>\n  <ion-item>\n    <span item-left class="map-step-avatar" [class]="\'map-step-avatar uturn-right\'"></span>uturn-right\n  </ion-item>\n  <ion-item>\n    <span item-left class="map-step-avatar" [class]="\'map-step-avatar ramp-left\'"></span>ramp left\n  </ion-item>\n  -->\n\n  <ion-item text-wrap *ngFor="let item of directions.routes[0].legs[0].steps">\n    <!--<ion-avatar item-left class="map-step-avatar" [class]="\'map-step-avatar \' + item.maneuver"></ion-avatar>-->\n    <span item-left class="map-step-avatar" [class]="\'map-step-avatar \' + item.maneuver"></span>\n    <h2 text-wrap [innerHTML]="item.instructions"></h2>\n    <p [innerHTML]="item.distance.text"></p>\n    <!--<p [innerHTML]="item.distance.text + \' | \' + item.maneuver"></p>-->\n    <!--<ion-row wrap>\n      <ion-col width-10></ion-col>\n      <ion-col width-10></ion-col>\n      <ion-col width-67 text-left text-wrap><p text-wrap [innerHTML]="item.instructions"></p></ion-col>\n      <ion-col width-10 text-left><p [innerHTML]="item.distance.text"></p></ion-col>\n    </ion-row> -->\n\n  </ion-item>\n\n  <ion-item class="address">\n    <ion-icon text-wrap name="pin" color="danger" item-left large ></ion-icon>\n    <h2>{{directions.routes[0].legs[0].end_address}}</h2>\n  </ion-item>\n\n</ion-card>\n\n</ion-content>\n\n<ion-footer>\n  <!--<ion-toolbar>-->\n    <!--<ion-grid>-->\n      <!--<ion-row>-->\n        <!--<ion-col width-50>-->\n          <!--<button ion-button icon-left block color="secondary">-->\n            <!--<ion-icon name="fa-thumbs-o-up"></ion-icon>-->\n            <!--Accept-->\n          <!--</button>-->\n        <!--</ion-col>-->\n        <!--<ion-col width-50>-->\n          <!--<button ion-button icon-left block color="danger">-->\n            <!--<ion-icon name="fa-thumbs-o-down"></ion-icon>-->\n            <!--Reject-->\n          <!--</button>-->\n        <!--</ion-col>-->\n      <!--</ion-row>-->\n    <!--</ion-grid>-->\n  <!--</ion-toolbar>-->\n</ion-footer>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/driving-directions/driving-directions.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */]])
], DrivingDirectionsPage);

//# sourceMappingURL=driving-directions.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__google_maps_service__ = __webpack_require__(506);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { GeolocationService } from '../geolocation-service/geolocation-service';

//import { Utils } from '../../utils/utils';
var GoogleMapsManager = (function () {
    function GoogleMapsManager(http, mapsService) {
        this.http = http;
        this.mapsService = mapsService;
        console.log('Hello GoogleMapsManager Provider');
    }
    GoogleMapsManager.prototype.getDirections = function (origin, destination) {
        //let origin = '40.7441704,-111.8628205';
        console.log("Getting directions: (" + origin + "), (" + destination + ")");
        return this.mapsService.getDirections(origin, destination);
    };
    return GoogleMapsManager;
}());
GoogleMapsManager = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__google_maps_service__["a" /* GoogleMapsService */]])
], GoogleMapsManager);

//# sourceMappingURL=google-maps-manager.js.map

/***/ }),

/***/ 980:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 524,
	"./af.js": 524,
	"./ar": 525,
	"./ar-dz": 526,
	"./ar-dz.js": 526,
	"./ar-kw": 527,
	"./ar-kw.js": 527,
	"./ar-ly": 528,
	"./ar-ly.js": 528,
	"./ar-ma": 529,
	"./ar-ma.js": 529,
	"./ar-sa": 530,
	"./ar-sa.js": 530,
	"./ar-tn": 531,
	"./ar-tn.js": 531,
	"./ar.js": 525,
	"./az": 532,
	"./az.js": 532,
	"./be": 533,
	"./be.js": 533,
	"./bg": 534,
	"./bg.js": 534,
	"./bm": 535,
	"./bm.js": 535,
	"./bn": 536,
	"./bn.js": 536,
	"./bo": 537,
	"./bo.js": 537,
	"./br": 538,
	"./br.js": 538,
	"./bs": 539,
	"./bs.js": 539,
	"./ca": 540,
	"./ca.js": 540,
	"./cs": 541,
	"./cs.js": 541,
	"./cv": 542,
	"./cv.js": 542,
	"./cy": 543,
	"./cy.js": 543,
	"./da": 544,
	"./da.js": 544,
	"./de": 545,
	"./de-at": 546,
	"./de-at.js": 546,
	"./de-ch": 547,
	"./de-ch.js": 547,
	"./de.js": 545,
	"./dv": 548,
	"./dv.js": 548,
	"./el": 549,
	"./el.js": 549,
	"./en-au": 550,
	"./en-au.js": 550,
	"./en-ca": 551,
	"./en-ca.js": 551,
	"./en-gb": 552,
	"./en-gb.js": 552,
	"./en-ie": 553,
	"./en-ie.js": 553,
	"./en-nz": 554,
	"./en-nz.js": 554,
	"./eo": 555,
	"./eo.js": 555,
	"./es": 556,
	"./es-do": 557,
	"./es-do.js": 557,
	"./es-us": 558,
	"./es-us.js": 558,
	"./es.js": 556,
	"./et": 559,
	"./et.js": 559,
	"./eu": 560,
	"./eu.js": 560,
	"./fa": 561,
	"./fa.js": 561,
	"./fi": 562,
	"./fi.js": 562,
	"./fo": 563,
	"./fo.js": 563,
	"./fr": 564,
	"./fr-ca": 565,
	"./fr-ca.js": 565,
	"./fr-ch": 566,
	"./fr-ch.js": 566,
	"./fr.js": 564,
	"./fy": 567,
	"./fy.js": 567,
	"./gd": 568,
	"./gd.js": 568,
	"./gl": 569,
	"./gl.js": 569,
	"./gom-latn": 570,
	"./gom-latn.js": 570,
	"./gu": 571,
	"./gu.js": 571,
	"./he": 572,
	"./he.js": 572,
	"./hi": 573,
	"./hi.js": 573,
	"./hr": 574,
	"./hr.js": 574,
	"./hu": 575,
	"./hu.js": 575,
	"./hy-am": 576,
	"./hy-am.js": 576,
	"./id": 577,
	"./id.js": 577,
	"./is": 578,
	"./is.js": 578,
	"./it": 579,
	"./it.js": 579,
	"./ja": 580,
	"./ja.js": 580,
	"./jv": 581,
	"./jv.js": 581,
	"./ka": 582,
	"./ka.js": 582,
	"./kk": 583,
	"./kk.js": 583,
	"./km": 584,
	"./km.js": 584,
	"./kn": 585,
	"./kn.js": 585,
	"./ko": 586,
	"./ko.js": 586,
	"./ky": 587,
	"./ky.js": 587,
	"./lb": 588,
	"./lb.js": 588,
	"./lo": 589,
	"./lo.js": 589,
	"./lt": 590,
	"./lt.js": 590,
	"./lv": 591,
	"./lv.js": 591,
	"./me": 592,
	"./me.js": 592,
	"./mi": 593,
	"./mi.js": 593,
	"./mk": 594,
	"./mk.js": 594,
	"./ml": 595,
	"./ml.js": 595,
	"./mr": 596,
	"./mr.js": 596,
	"./ms": 597,
	"./ms-my": 598,
	"./ms-my.js": 598,
	"./ms.js": 597,
	"./my": 599,
	"./my.js": 599,
	"./nb": 600,
	"./nb.js": 600,
	"./ne": 601,
	"./ne.js": 601,
	"./nl": 602,
	"./nl-be": 603,
	"./nl-be.js": 603,
	"./nl.js": 602,
	"./nn": 604,
	"./nn.js": 604,
	"./pa-in": 605,
	"./pa-in.js": 605,
	"./pl": 606,
	"./pl.js": 606,
	"./pt": 607,
	"./pt-br": 608,
	"./pt-br.js": 608,
	"./pt.js": 607,
	"./ro": 609,
	"./ro.js": 609,
	"./ru": 610,
	"./ru.js": 610,
	"./sd": 611,
	"./sd.js": 611,
	"./se": 612,
	"./se.js": 612,
	"./si": 613,
	"./si.js": 613,
	"./sk": 614,
	"./sk.js": 614,
	"./sl": 615,
	"./sl.js": 615,
	"./sq": 616,
	"./sq.js": 616,
	"./sr": 617,
	"./sr-cyrl": 618,
	"./sr-cyrl.js": 618,
	"./sr.js": 617,
	"./ss": 619,
	"./ss.js": 619,
	"./sv": 620,
	"./sv.js": 620,
	"./sw": 621,
	"./sw.js": 621,
	"./ta": 622,
	"./ta.js": 622,
	"./te": 623,
	"./te.js": 623,
	"./tet": 624,
	"./tet.js": 624,
	"./th": 625,
	"./th.js": 625,
	"./tl-ph": 626,
	"./tl-ph.js": 626,
	"./tlh": 627,
	"./tlh.js": 627,
	"./tr": 628,
	"./tr.js": 628,
	"./tzl": 629,
	"./tzl.js": 629,
	"./tzm": 630,
	"./tzm-latn": 631,
	"./tzm-latn.js": 631,
	"./tzm.js": 630,
	"./uk": 632,
	"./uk.js": 632,
	"./ur": 633,
	"./ur.js": 633,
	"./uz": 634,
	"./uz-latn": 635,
	"./uz-latn.js": 635,
	"./uz.js": 634,
	"./vi": 636,
	"./vi.js": 636,
	"./x-pseudo": 637,
	"./x-pseudo.js": 637,
	"./yo": 638,
	"./yo.js": 638,
	"./zh-cn": 639,
	"./zh-cn.js": 639,
	"./zh-hk": 640,
	"./zh-hk.js": 640,
	"./zh-tw": 641,
	"./zh-tw.js": 641
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 980;

/***/ }),

/***/ 981:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarWeekComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarWeekComponent = (function () {
    function CalendarWeekComponent() {
        this._weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this._weekStart = 0;
        this.color = 'primary';
    }
    Object.defineProperty(CalendarWeekComponent.prototype, "weekArray", {
        set: function (value) {
            if (value && value.length === 7) {
                this._weekArray = value;
                this.adjustSort();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarWeekComponent.prototype, "weekStart", {
        set: function (value) {
            if (value === 0 || value === 1) {
                this._weekStart = value;
                this.adjustSort();
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarWeekComponent.prototype.adjustSort = function () {
        if (this._weekStart === 1) {
            this._weekArray.push(this._weekArray.shift());
        }
    };
    return CalendarWeekComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], CalendarWeekComponent.prototype, "color", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], CalendarWeekComponent.prototype, "weekArray", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], CalendarWeekComponent.prototype, "weekStart", null);
CalendarWeekComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ion-calendar-week',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/components/ion2-calendar/components/calendar-week.html"*/'<ion-grid>\n    <ion-row>\n        <ion-col width-14>Sun</ion-col>\n        <ion-col width-14>Mon</ion-col>\n        <ion-col width-14>Tue</ion-col>\n        <ion-col width-14>Wed</ion-col>\n        <ion-col width-14>Thu</ion-col>\n        <ion-col width-14>Fri</ion-col>\n        <ion-col width-14>Sat</ion-col>\n    </ion-row>\n</ion-grid>\n\n\n\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/components/ion2-calendar/components/calendar-week.html"*/
    }),
    __metadata("design:paramtypes", [])
], CalendarWeekComponent);

//# sourceMappingURL=calendar-week.component.js.map

/***/ }),

/***/ 982:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MONTH_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonthComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar_model__ = __webpack_require__(521);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MONTH_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALUE_ACCESSOR */],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* forwardRef */])(function () { return MonthComponent; }),
    multi: true,
};
var MonthComponent = (function () {
    function MonthComponent(ref) {
        this.ref = ref;
        this.color = 'primary';
        this.onChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this._date = [];
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
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__calendar_model__["a" /* CalendarMonth */])
], MonthComponent.prototype, "month", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], MonthComponent.prototype, "pickMode", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Boolean)
], MonthComponent.prototype, "isSaveHistory", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "id", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], MonthComponent.prototype, "color", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
], MonthComponent.prototype, "onChange", void 0);
MonthComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ion-calendar-month',
        providers: [MONTH_VALUE_ACCESSOR],
        template: "\n    <div [class]=\"color\">\n      <div *ngIf=\"pickMode !== 'range'\">\n        <div class=\"days-box\">\n          <div class=\"days\" *ngFor=\"let day of month.days\">\n            <button [class]=\"'days-btn ' + day.cssClass\"\n                    *ngIf=\"day\"\n                    [class.today]=\"day.isToday\"\n                    (click)=\"onSelected(day)\"\n                    [class.marked]=\"day.marked\"\n                    [class.on-selected]=\"isSelected(day.time)\"\n                    [disabled]=\"day.disable\">\n              <p>{{day.title}}</p>\n              <small *ngIf=\"day.subTitle\">{{day?.subTitle}}</small>\n            </button>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"pickMode === 'range'\">\n        <div class=\"days-box\">\n          <div class=\"days\"\n               *ngFor=\"let day of month.days\"\n               [class.startSelection]=\"isStartSelection(day)\"\n               [class.endSelection]=\"isEndSelection(day)\"\n               [class.between]=\"isBetween(day)\">\n            <button [class]=\"'days-btn ' + day.cssClass\"\n                    *ngIf=\"day\"\n                    [class.today]=\"day.isToday\"\n                    (click)=\"onSelected(day)\"\n                    [class.marked]=\"day.marked\"\n                    [class.on-selected]=\"isSelected(day.time)\"\n                    [disabled]=\"day.disable\">\n              <p>{{day.title}}</p>\n              <small *ngIf=\"day.subTitle\">{{day?.subTitle}}</small>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], MonthComponent);

//# sourceMappingURL=month.component.js.map

/***/ }),

/***/ 983:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ION_CAL_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_calendar_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ION_CAL_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* NG_VALUE_ACCESSOR */],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* forwardRef */])(function () { return CalendarComponent; }),
    multi: true
};
var CalendarComponent = (function () {
    function CalendarComponent(calSvc) {
        this.calSvc = calSvc;
        this.format = 'YYYY-MM-DD';
        this.onChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this._calendarMonthValue = [null, null];
        this._onChanged = function () {
        };
        this._onTouched = function () {
        };
    }
    CalendarComponent.prototype.ionViewDidLoad = function () {
    };
    CalendarComponent.prototype.ngOnInit = function () {
        this._d = this.calSvc.safeOpt(this.options || {});
        this.monthOpt = this.createMonth(new Date().getTime());
    };
    CalendarComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this._writeValue(obj);
            if (this._calendarMonthValue[0] && this._calendarMonthValue[0].time) {
                this.monthOpt = this.createMonth(this._calendarMonthValue[0].time);
            }
            else {
                this.monthOpt = this.createMonth(new Date().getTime());
            }
        }
        console.log(this._calendarMonthValue[0]);
    };
    CalendarComponent.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    CalendarComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    CalendarComponent.prototype.createMonth = function (date) {
        return this.calSvc.createMonthsByPeriod(date, 1, this._d)[0];
    };
    CalendarComponent.prototype.nextMonth = function () {
        var nextTime = __WEBPACK_IMPORTED_MODULE_3_moment__(this.monthOpt.original.time).add(1, 'months').valueOf();
        this.monthOpt = this.createMonth(nextTime);
    };
    CalendarComponent.prototype.canNext = function () {
        if (!this._d.to)
            return true;
        return this.monthOpt.original.time < __WEBPACK_IMPORTED_MODULE_3_moment__(this._d.to).valueOf();
    };
    CalendarComponent.prototype.backMonth = function () {
        var backTime = __WEBPACK_IMPORTED_MODULE_3_moment__(this.monthOpt.original.time).subtract(1, 'months').valueOf();
        this.monthOpt = this.createMonth(backTime);
    };
    CalendarComponent.prototype.canBack = function () {
        if (!this._d.from)
            return true;
        return this.monthOpt.original.time > __WEBPACK_IMPORTED_MODULE_3_moment__(this._d.from).valueOf();
    };
    CalendarComponent.prototype.onChanged = function ($event) {
        switch (this._d.pickMode) {
            case 'single':
                var date = __WEBPACK_IMPORTED_MODULE_3_moment__($event[0].time).format(this.format);
                this._onChanged(date);
                this.onChange.emit(date);
                break;
            case 'range':
                if ($event[0] && $event[1]) {
                    var rangeDate = {
                        from: __WEBPACK_IMPORTED_MODULE_3_moment__($event[0].time).format(this.format),
                        to: __WEBPACK_IMPORTED_MODULE_3_moment__($event[1].time).format(this.format)
                    };
                    this._onChanged(rangeDate);
                    this.onChange.emit(rangeDate);
                }
                break;
            case 'multi':
                var dates = [];
                for (var i = 0; i < $event.length; i++) {
                    if ($event[i] && $event[i].time) {
                        dates.push(__WEBPACK_IMPORTED_MODULE_3_moment__($event[i].time).format(this.format));
                    }
                }
                this._onChanged(dates);
                this.onChange.emit(dates);
                break;
            default:
        }
    };
    CalendarComponent.prototype._writeValue = function (value) {
        var _this = this;
        if (!value)
            return;
        switch (this._d.pickMode) {
            case 'single':
                var date = __WEBPACK_IMPORTED_MODULE_3_moment__(value, this.format);
                this._calendarMonthValue[0] = this.calSvc.createCalendarDay(date.valueOf(), this._d);
                break;
            case 'range':
                if (value.from) {
                    var from = __WEBPACK_IMPORTED_MODULE_3_moment__(value.from, this.format);
                    this._calendarMonthValue[0] = this.calSvc.createCalendarDay(from.valueOf(), this._d);
                }
                if (value.to) {
                    var to = __WEBPACK_IMPORTED_MODULE_3_moment__(value.to, this.format);
                    this._calendarMonthValue[1] = this.calSvc.createCalendarDay(to.valueOf(), this._d);
                }
                break;
            case 'multi':
                if (Array.isArray(value)) {
                    this._calendarMonthValue = value.map(function (e) {
                        return _this.calSvc.createCalendarDay(__WEBPACK_IMPORTED_MODULE_3_moment__(e, _this.format).valueOf(), _this._d);
                    });
                }
                else {
                    this._calendarMonthValue = [];
                }
                break;
            default:
        }
    };
    return CalendarComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], CalendarComponent.prototype, "options", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], CalendarComponent.prototype, "format", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
], CalendarComponent.prototype, "onChange", void 0);
CalendarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ion-calendar',
        providers: [ION_CAL_VALUE_ACCESSOR],
        template: "\n    <div class=\"title\">\n      <div class=\"text\">\n        {{monthOpt.original.time | date: _d.monthFormat}}\n      </div>\n      <button ion-button clear class=\"back\" [disabled]=\"!canBack()\" (click)=\"backMonth()\">\n        <ion-icon name=\"ios-arrow-back\"></ion-icon>\n      </button>\n      <button ion-button clear class=\"forward\" [disabled]=\"!canNext()\" (click)=\"nextMonth()\">\n        <ion-icon name=\"ios-arrow-forward\"></ion-icon>\n      </button>\n    </div>\n\n    <ion-calendar-week color=\"transparent\"\n                       [weekStart]=\"_d.weekStart\">\n    </ion-calendar-week>\n\n    <ion-calendar-month\n      [(ngModel)]=\"_calendarMonthValue\"\n      [month]=\"monthOpt\"\n      (onChange)=\"onChanged($event)\"\n      [pickMode]=\"_d.pickMode\"\n      [color]=\"_d.color\">\n\n    </ion-calendar-month>\n\n  ",
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_calendar_service__["a" /* CalendarService */]])
], CalendarComponent);

//# sourceMappingURL=calendar.component.js.map

/***/ }),

/***/ 984:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export calendarController */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calendar_controller__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_calendar_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_index__ = __webpack_require__(522);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





function calendarController(modalCtrl, calSvc) {
    return new __WEBPACK_IMPORTED_MODULE_1__calendar_controller__["a" /* CalendarController */](modalCtrl, calSvc);
}
var CalendarModule = (function () {
    function CalendarModule() {
    }
    return CalendarModule;
}());
CalendarModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */]],
        declarations: __WEBPACK_IMPORTED_MODULE_4__components_index__["a" /* CALENDAR_COMPONENTS */],
        exports: __WEBPACK_IMPORTED_MODULE_4__components_index__["a" /* CALENDAR_COMPONENTS */],
        entryComponents: __WEBPACK_IMPORTED_MODULE_4__components_index__["a" /* CALENDAR_COMPONENTS */],
        providers: [{
                provide: __WEBPACK_IMPORTED_MODULE_1__calendar_controller__["a" /* CalendarController */],
                useFactory: calendarController,
                deps: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__services_calendar_service__["a" /* CalendarService */]],
            }, __WEBPACK_IMPORTED_MODULE_3__services_calendar_service__["a" /* CalendarService */]],
        schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]],
    })
], CalendarModule);

//# sourceMappingURL=calendar.module.js.map

/***/ }),

/***/ 987:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryFeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_task_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HistoryFeedbackPage = (function () {
    function HistoryFeedbackPage(navCtrl, navParams, actionSheetCtrl, platform, taskMgr, utils, camera, diagnostic, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.taskMgr = taskMgr;
        this.utils = utils;
        this.camera = camera;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.files = [];
        this.type = { options: '' };
        this.isIos = false;
        this.mySelection = 0;
        this.lastCheck = null;
        this.id = navParams.get("id");
        console.log("this.id " + this.id);
        this.data = {
            notes: '',
            statusId: 9,
            files: this.files,
            save: false,
            taskId: this.id
        };
        if (this.platform.is('ios')) {
            // This will only print when on iOS
            this.isIos = true;
        }
        var successCallback = function (isAvailable) {
            console.log('Is available? ' + isAvailable);
        };
        var errorCallback = function (e) {
            _this.diagnostic.requestCameraAuthorization().then(successCallback);
        };
        this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
    }
    HistoryFeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
        // setTimeout(() => this.getLocation(), 500);
    };
    HistoryFeedbackPage.prototype.ionViewDidEnter = function () {
        console.log('ionView stuff');
    };
    HistoryFeedbackPage.prototype.deleteImage = function (index) {
        this.data.files.splice(index, 1);
    };
    /** used for HTML file upload only */
    HistoryFeedbackPage.prototype.showFiles = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        var file = files[0];
        var fileData = {
            name: file.name,
            caption: '',
            path: '',
            file: file
        };
        this.data.files.push(fileData);
    };
    /** save button clicked */
    HistoryFeedbackPage.prototype.save = function () {
        var _this = this;
        this.data.save = true;
        console.log('this.data.notes', JSON.stringify(this.data.notes));
        if (this.data.notes === '') {
            this.data.notes = "New Image";
        }
        this.data.notes = this.data.notes.trim();
        this.data.lat = this.lat;
        this.data.lon = this.lon;
        this.utils.presentLoading();
        this.taskMgr.postHistoryFeedback(this.data).then(function (response) {
            if (_this.isIos) {
                _this.camera.cleanup().then(function (response) {
                    //
                }).catch(function (error) {
                    console.error("There was an error calling Camera.cleanup: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(error));
                });
            }
            _this.utils.dismissLoading();
            setTimeout(function () {
                if (response === true) {
                    _this.navCtrl.pop();
                }
                else {
                    _this.utils.toastError({ msg: 'There was an error posting feedback' });
                }
            }, 500);
        }).catch(function (error) {
            _this.utils.toastError({ msg: 'There was an error posting feedback' });
            if (_this.isIos) {
                _this.camera.cleanup().then(function (response) {
                    //
                }).catch(function (error) {
                    console.error("There was an error calling Camera.cleanup: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(error));
                });
            }
            _this.utils.dismissLoading();
        });
    };
    /** cancel button clicked, used when page was a modal */
    HistoryFeedbackPage.prototype.cancel = function () {
        this.data.save = false;
        this.navCtrl.pop();
    };
    HistoryFeedbackPage.prototype.disableFormSubmit = function () {
        /**
         *  Used to disable a form button. So :
         *  if false OR false, then disable (true) OR
         *  if true AND true, the don't disable (false)
         */
        return !((this.data.notes.trim().length > 4) && (this.data.statusId > 0));
    };
    /** trim notes  */
    HistoryFeedbackPage.prototype.trimNotes = function () {
        this.data.notes = this.data.notes.trim();
    };
    /** when cordova, present an action sheet to take a pic or import from gallery */
    HistoryFeedbackPage.prototype.presentActionSheet = function () {
        var _this = this;
        var buttons = [];
        if (this.platform.is('cordova')) {
            buttons.push({
                text: 'Choose Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.PHOTOLIBRARY); // 0 == Library
                }
            }, {
                text: 'Take Photo',
                handler: function () {
                    _this.getPicture(_this.camera.PictureSourceType.CAMERA); // 1 == Camera
                }
            });
        }
        buttons.push({
            text: 'Cancel',
            role: 'cancel'
        });
        var actionSheet = this.actionSheetCtrl.create({
            buttons: buttons
        });
        actionSheet.present();
    };
    /**
     * get picture from gallery or camera
     * @Param sourceType:number camera or gallery
     */
    HistoryFeedbackPage.prototype.getPicture = function (sourceType) {
        var _this = this;
        this.utils.presentLoading();
        this.camera.getPicture({
            quality: 50,
            destinationType: 1,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true //this needs to be true to get a file:/// FILE_URI, otherwise android does not return a file uri. Yep.
        }).then(function (imageData) {
            console.log("IMAGEDATA: " + __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].toJson(imageData, true));
            //fix for android, remove query string from end of file_uri or crashes android //
            imageData = imageData.split('?')[0];
            var filename = imageData.replace(/^.*[\\\/]/, '');
            var fileData = {
                name: filename,
                caption: '',
                //notes : '',
                path: imageData,
            };
            _this.data.files.push(fileData);
            _this.utils.dismissLoading();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Image Error',
                message: 'Unable to upload image. Please choose a different image or take an new picture',
                cssClass: 'myAlerts',
                buttons: ['OK']
            });
            alert.present();
            console.log("ERROR -> " + JSON.stringify(err));
            _this.utils.dismissLoading();
        });
    };
    return HistoryFeedbackPage;
}());
HistoryFeedbackPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-history-feedback',template:/*ion-inline-start:"/Users/justin/dev/cts-field-user/src/pages/history-feedback/history-feedback.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Add Feedback</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n    <ion-card>\n        <ion-card-content>\n            <ion-grid>\n                <ion-row>\n\n                    <div><strong>Enter Task Notes</strong> (not required)</div>\n\n\n                </ion-row>\n                <ion-row>\n                    <ion-textarea class="" [(ngModel)]="data.notes" placeholder="" (blur)="trimNotes()"></ion-textarea>\n                </ion-row>\n            </ion-grid>\n\n            <ion-list>\n\n\n                <ion-row class="mar-bot15">\n                    <ion-col width-50>\n                        <button class="btn-shadow width100" ion-button icon-left block color="secondary"\n                                (click)="presentActionSheet(false)">\n                            <ion-icon name="add-circle"></ion-icon>\n                            Add Image\n                        </button>\n                    </ion-col>\n                    <ion-col width-50>\n\n                    </ion-col>\n                </ion-row>\n\n                <ion-list *ngFor="let file of data.files; let i = index">\n                    <ion-item>\n                        {{file.name}}\n                        <button ion-button icon-only item-right clear (click)="deleteImage(i)">\n                            <ion-icon color="danger" name="trash"></ion-icon>\n                        </button>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label stacked>Caption: (Tap Below to add a caption to this image)</ion-label>\n                        <ion-input [(ngModel)]="data.files[i].caption"></ion-input>\n                    </ion-item>\n\n                </ion-list>\n\n\n\n            </ion-list>\n\n        </ion-card-content>\n\n\n        <ion-row class="feedback-footer">\n            <ion-col width-50>\n                <button class="btn-shadow" ion-button icon-left block (click)="cancel()">\n                    <ion-icon name="fa-arrow-left"></ion-icon>\n                    Cancel\n                </button>\n            </ion-col>\n            <ion-col width-50>\n                <button class="btn-shadow" ion-button icon-left block color="secondary" (click)="save()">\n                    <ion-icon name="checkbox-outline"></ion-icon>\n                    Save\n                </button>\n            </ion-col>\n        </ion-row>\n\n\n\n\n    </ion-card>\n\n    <ion-card class="fixed-height">\n\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/justin/dev/cts-field-user/src/pages/history-feedback/history-feedback.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__providers_task_manager__["a" /* TaskManager */],
        __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], HistoryFeedbackPage);

//# sourceMappingURL=history-feedback.js.map

/***/ })

},[644]);
//# sourceMappingURL=main.js.map