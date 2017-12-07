import { Injectable, NgZone } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Headers } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import { Utils } from '../utils/utils';
var ApiService = /** @class */ (function () {
    function ApiService(http, ngZone, transfer, file) {
        this.http = http;
        this.ngZone = ngZone;
        this.transfer = transfer;
        this.file = file;
        // settings for api endpoints //
        this.apiBase = 'https://www.cleartasksolutions.com/api';
        this.utilApi = this.apiBase + "/utilApi.php";
        this.ctsApi = this.apiBase + "/ctsapi.php";
        this.crudApi = this.apiBase + "/crudApi.php";
        this.apiUrls = {
            "getMd5": this.utilApi + "/getMobileMd5",
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
    // * make the request to the api
    // * @Param requestOptions:RequestOptions the request options
    // * @Return Promise:any
    ApiService.prototype.request = 
    // * make the request to the api
    // * @Param requestOptions:RequestOptions the request options
    // * @Return Promise:any
    function (requestOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.request(new Request(requestOptions))
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
    // utility method for generating headers for the ctsApi //
    ApiService.prototype.ctsApiPostRequestHeaders = 
    // utility method for generating headers for the ctsApi //
    function () {
        var headers = new Headers({
            'Content-Type': 'text/plain',
            'Accept': 'application/json; charset=utf-8',
            'jwt': this.jwtHeader
        });
        return headers;
    };
    // utility method for generating headers for the utilApi //
    // utility method for generating headers for the utilApi //
    ApiService.prototype.utilApiPostRequestHeaders = 
    // utility method for generating headers for the utilApi //
    function () {
        return new Headers({
            'Content-Type': 'text/plain'
        });
    };
    // utility method for generating headers for the crudApi //
    // utility method for generating headers for the crudApi //
    ApiService.prototype.crudApiPostRequestHeaders = 
    // utility method for generating headers for the crudApi //
    function () {
        return new Headers({
            'Content-Type': 'text/plain'
        });
    };
    // * Authenticate user
    // * creates a request for authenticate endpoint
    // * @Param data:any = { email: string, password: md5-String }
    // * @Return Promise
    // * Authenticate user
    // * creates a request for authenticate endpoint
    // * @Param data:any = { email: string, password: md5-String }
    // * @Return Promise
    ApiService.prototype.authenticate = 
    // * Authenticate user
    // * creates a request for authenticate endpoint
    // * @Param data:any = { email: string, password: md5-String }
    // * @Return Promise
    function (data) {
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
export { ApiService };
//# sourceMappingURL=api-service.js.map