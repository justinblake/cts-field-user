"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ionic_native_1 = require("ionic-native");
require("rxjs/add/operator/map");
require("rxjs/add/operator/timeout");
require("rxjs/add/operator/delay");
var utils_1 = require("../utils/utils");
var ApiService = (function () {
    function ApiService(http, ngZone) {
        var _this = this;
        this.http = http;
        this.ngZone = ngZone;
        this.uploading = true;
        this.current = 1;
        /**
         * utility method for generating requestOptions for the utilApi
         * @Param endpoint:string the endpoint
         * @Param bodyData:object the body of the request
         * @Return RequestOptions
         */
        this.utilApiPostRequestOptions = function (endpoint, bodyData) {
            var requestOptions = new http_1.RequestOptions({
                'method': http_1.RequestMethod.Post,
                'headers': _this.utilApiPostRequestHeaders(),
                'url': endpoint,
                'body': (JSON.stringify(bodyData))
            });
            return requestOptions;
        };
        /**
         * utility method for generating requestOptions for the ctsApi
         * @Param endpoint:string the endpoint
         * @Param bodyData:object the body of the request
         * @Return RequestOptions
         */
        this.ctsApiPostRequestOptions = function (endpoint, bodyData) {
            var requestOptions = new http_1.RequestOptions({
                'method': http_1.RequestMethod.Post,
                'headers': _this.ctsApiPostRequestHeaders(),
                'url': endpoint,
                'body': (JSON.stringify(bodyData))
            });
            return requestOptions;
        };
        /**
         * md5 user
         *  creates a request for the md5 endpoint
         *  @Param string:string
         *  @Note: app does not use this endpoint
         *  @Return Promise
         */
        this.md5 = function (string) {
            var requestOptions = _this.utilApiPostRequestOptions(_this.apiUrls.md5, string);
            return _this.request(requestOptions);
        };
        //makeRequest = (endpoint, data) => {
        //  return this.request(this.ctsApiPostRequestOptions(endpoint, data))
        //}
        /**
         * loads the current task from the api
         * @Param user:currentUser
         * @Param token: string
         * @Return Promise
         */
        this.loadCurrentTask = function (data) {
            // TODO: pass this from the task manager //
            //let data = { userId : user.userId };
            var endpoint = _this.apiUrls.loadCurrentTask;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        /**
         *  loads the task history from the api
         *  @Param data:any = {userId:number}
         *  @Return Promise
         */
        this.loadTaskHistory = function (data) {
            var endpoint = _this.apiUrls.loadTaskHistory;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        /**
         *  loads task user log for a task
         *  @Param data:any = { "userId":number, "taskId":number }
         *  @Param token: string
         *  @Return Promise
         */
        this.loadTaskUserLog = function (data) {
            var endpoint = _this.apiUrls.loadTaskUserLog;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, data);
            return _this.request(requestOptions);
        };
        /**
         * creates a postTaskFeedback request
         * @Return Promise
         */
        this.postTaskFeedback = function (feedback) {
            var endpoint = _this.apiUrls.createTaskUserLog;
            var requestOptions = _this.ctsApiPostRequestOptions(endpoint, feedback);
            return _this.request(requestOptions);
        };
        /**
         * creates a postTaskFeedbackImage request on devices only
         * @Return Promise
         */
        this.postTaskFeedbackImageNative = function (feedbackId, image) {
            var url = _this.apiUrls.createTaskUserLogFiles;
            //url = "http://www.ridedata.local/api/index.php/v1/ctsapi/postFile";
            var options = {
                fileName: image.name,
                fileKey: 'file',
                httpMethod: "POST",
                mimeType: 'image/jpeg',
                chunkedMode: false,
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    //'Accept'      : 'application/json; charset=utf-8',
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
            //console.log(`OPTIONS => ${Utils.toJson(options, true)}`);
            var transfer = new ionic_native_1.Transfer();
            // call this if you want to do something with progress in the future, like show a progress bar //
            //transfer.onProgress(this.onProgress);
            return new Promise(function (resolve, reject) {
                transfer.upload(image.path, url, options, true).then(function (data) {
                    console.log('HTTP.get RESPONSE');
                    console.log("" + utils_1.Utils.toJson(data, true));
                    resolve(data);
                })["catch"](function (error) {
                    console.log('ERROR');
                    console.log("" + utils_1.Utils.toJson(error, true));
                    reject(error);
                });
            });
        };
        /* show progress of upload -- not implemented */
        this.onProgress = function (progressEvent) {
            //console.log(`progressEvent.currentTarget => ${progressEvent.currentTarget}`);
            _this.ngZone.run(function () {
                if (progressEvent.lengthComputable) {
                    var progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    //console.log(`${progress}% of ${progressEvent.total}` );
                    _this.progress = progress;
                }
                else {
                }
            });
        };
        /**
         * creates a postTaskFeedbackImage HTML5
         * @Note: only used in development, not sure if still implemented
         * @Return Promise
         */
        this.postTaskFeedbackImage = function (feedbackId, image) {
            var url = _this.apiUrls.createTaskUserLogFiles;
            //console.log(`postTaskFeedbackImage: ${feedbackId} ${image.name}` )
            return new Promise(function (resolve, reject) {
                var formData = new FormData();
                var xhr = new XMLHttpRequest();
                formData.append('logId', feedbackId);
                formData.append('caption', image.caption);
                formData.append("feedbackImage", image.file, image.name);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            console.log("" + utils_1.Utils.toJson(xhr.response, true));
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
        // used for testing //
        this.apiData = new ApiData();
        // settings for api endpoints //
        this.apiBase = 'https://www.cleartasksolutions.com/api/';
        this.utilApi = this.apiBase + "/utilApi.php";
        this.ctsApi = this.apiBase + "/ctsapi.php";
        this.apiUrls = {
            "md5": this.utilApi + "/md5",
            "authenticateUser": this.utilApi + "/authenticate_user",
            "loadCurrentTask": this.ctsApi + "/loadCurrentTask",
            "loadTaskHistory": this.ctsApi + "/loadTaskHistory",
            "createTaskUserLog": this.ctsApi + "/createTaskUserLog",
            "createTaskUserLogFiles": this.ctsApi + "/createTaskUserLogFiles",
            "loadTaskUserLog": this.ctsApi + "/loadTaskUserLog"
        };
    }
    /**
     * make the request to the api
     * @Param requestOptions:RequestOptions the request options
     * @Return Promise:any
     */
    ApiService.prototype.request = function (requestOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.request(new http_1.Request(requestOptions))
                .timeout(30000, { error: true, reason: 'timeout', msg: 'Request timed out. Check your internet connection' })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                //console.log(`API RESPOSNE: ${Utils.toJson(data)}`)
                resolve(data);
            }, function (error) {
                //console.log(`API ERROR: ${Utils.toJson(error)}`)
                reject(error);
            });
        });
    };
    ;
    // utility method for generating headers for the ctsApi //
    ApiService.prototype.ctsApiPostRequestHeaders = function () {
        var headers = new http_1.Headers({
            'Content-Type': 'text/plain',
            'Accept': 'application/json; charset=utf-8',
            'jwt': this.jwtHeader
        });
        return headers;
    };
    // utility method for generating headers for the utilApi //
    ApiService.prototype.utilApiPostRequestHeaders = function () {
        return new http_1.Headers({
            'Content-Type': 'text/plain'
        });
    };
    /**
     * Authenticate user
     * creates a request for authenticate endpoint
     * @Param data:any = { email: string, password: md5-String }
     * @Return Promise
     */
    ApiService.prototype.authenticate = function (data) {
        console.log('Authenticating User: ' + data.email);
        var endpoint = this.apiUrls.authenticateUser;
        var requestOptions = this.utilApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable()
], ApiService);
exports.ApiService = ApiService;
// TODO: this is no longer needed //
var ApiData = (function () {
    function ApiData() {
    }
    return ApiData;
}());
ApiData.data = {
    "authenticateUser": {
        "userdata": {
            "userId": "5",
            "email": "officeuser@test.com",
            "first_name": "Sam",
            "last_name": "Edwards",
            "company_id": "1",
            "role_id": "2",
            "portal": "management"
        },
        "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0ODQ2NjQyNTAsImp0aSI6ImFmMlwvd3M0WWxUYXF0cjd0ZWlJRk9uQlJHUWkrRGVMbXRJdEt2d2ZCV2ljPSIsImlzcyI6Ind3dy5jbGVhcnRhc2tzb2x1dGlvbnMuY29tIiwibmJmIjoxNDg0NjY0MjUwLCJleHAiOjE0ODQ2NzE0NTAsImRhdGEiOnsidXNlcklkIjoiNSIsInJvbGVJZCI6IjIifX0.fenR15TjcD3DByitBiyT41-p-hHrS8oYgeMVd-84HPM-ta2rY_gYk0S12iUg75IhjiMnDLH1v2En9fG9-Q0Shg"
    },
    "loadTaskHistory": {
        "code": 0,
        "data": [{
                "id": 11,
                "company_id": 1,
                "contractor_id": 7,
                "contractor_contact_id": 12,
                "manager_id": 0,
                "job_name": "Harrison Heights Phase 9",
                "address": "Christley Lane",
                "city": "Elk Ridge",
                "state": "UT",
                "zip": 84651,
                "lat": 40.026135642168,
                "lon": -111.68154889718,
                "notes": "Change",
                "status_id": 1,
                "job_tasks": [{
                        "id": 51,
                        "job_id": 11,
                        "task_date": "2016-12-21",
                        "task_start_time": "00:00:00",
                        "task_description": "This is Cloned 2",
                        "status_id": 1,
                        "template": 1,
                        "task_crew": [{
                                "id": 47,
                                "task_id": 51,
                                "employee_id": 3,
                                "start_time": "16:00:00",
                                "end_time": "00:00:00",
                                "is_foreman": 0,
                                "priority": 8,
                                "notes": ""
                            }, {
                                "id": 48,
                                "task_id": 51,
                                "employee_id": 6,
                                "start_time": "16:00:00",
                                "end_time": "00:00:00",
                                "is_foreman": 1,
                                "priority": 99,
                                "notes": ""
                            }],
                        "task_equipment": [],
                        "task_materials": [{
                                "id": 16,
                                "task_id": 51,
                                "material_id": 3,
                                "supplier_id": 5,
                                "material_name": "Roadbase",
                                "material_price": 0,
                                "notes": "",
                                "supplier": {
                                    "id": 5,
                                    "company_id": 1,
                                    "name": "New one today",
                                    "address": "255 West 1100 North",
                                    "city": "Nephi",
                                    "state": "UT",
                                    "zip": 84648,
                                    "phone": 2222222222,
                                    "lat": 39.72415459234,
                                    "lon": -111.8404340744,
                                    "notes": "Amazing Place",
                                    "active": 1
                                }
                            }],
                        "task_comments": []
                    }, {
                        "id": 49,
                        "job_id": 11,
                        "task_date": "2016-12-21",
                        "task_start_time": "00:00:00",
                        "task_description": "Please Deliver the material accordingly to the Location!",
                        "status_id": 1,
                        "template": 1,
                        "task_crew": [{
                                "id": 82,
                                "task_id": 49,
                                "employee_id": 6,
                                "start_time": "14:50:00",
                                "end_time": "00:00:00",
                                "is_foreman": 0,
                                "priority": 5,
                                "notes": ""
                            }, {
                                "id": 83,
                                "task_id": 49,
                                "employee_id": 4,
                                "start_time": "14:50:00",
                                "end_time": "00:00:00",
                                "is_foreman": 1,
                                "priority": 99,
                                "notes": ""
                            }],
                        "task_equipment": [{
                                "id": 51,
                                "task_id": 49,
                                "employee_id": 6,
                                "equipment_id": 2,
                                "equipment_name": "Truck 1",
                                "notes": ""
                            }],
                        "task_materials": [{
                                "id": 30,
                                "task_id": 49,
                                "material_id": 2,
                                "supplier_id": 5,
                                "material_name": "3\/4\" Washed Rock",
                                "material_price": 0,
                                "notes": "",
                                "supplier": {
                                    "id": 5,
                                    "company_id": 1,
                                    "name": "New one today",
                                    "address": "255 West 1100 North",
                                    "city": "Nephi",
                                    "state": "UT",
                                    "zip": 84648,
                                    "phone": 2222222222,
                                    "lat": 39.72415459234,
                                    "lon": -111.8404340744,
                                    "notes": "Amazing Place",
                                    "active": 1
                                }
                            }],
                        "task_comments": []
                    }, {
                        "id": 53,
                        "job_id": 11,
                        "task_date": "2016-12-21",
                        "task_start_time": "00:00:00",
                        "task_description": "No Materials",
                        "status_id": 1,
                        "template": 1,
                        "task_crew": [{
                                "id": 93,
                                "task_id": 53,
                                "employee_id": 3,
                                "start_time": "16:00:00",
                                "end_time": "00:00:00",
                                "is_foreman": 0,
                                "priority": 2,
                                "notes": ""
                            }, {
                                "id": 94,
                                "task_id": 53,
                                "employee_id": 6,
                                "start_time": "16:00:00",
                                "end_time": "00:00:00",
                                "is_foreman": 1,
                                "priority": 99,
                                "notes": ""
                            }],
                        "task_equipment": [],
                        "task_materials": [],
                        "task_comments": []
                    }, {
                        "id": 139,
                        "job_id": 11,
                        "task_date": "2016-12-21",
                        "task_start_time": "00:00:00",
                        "task_description": "Another Clone",
                        "status_id": 1,
                        "template": 1,
                        "task_crew": [{
                                "id": 430,
                                "task_id": 139,
                                "employee_id": 10,
                                "start_time": "00:00:00",
                                "end_time": "00:00:00",
                                "is_foreman": 0,
                                "priority": 2,
                                "notes": ""
                            }, {
                                "id": 431,
                                "task_id": 139,
                                "employee_id": 6,
                                "start_time": "00:00:00",
                                "end_time": "00:00:00",
                                "is_foreman": 1,
                                "priority": 99,
                                "notes": ""
                            }],
                        "task_equipment": [],
                        "task_materials": [],
                        "task_comments": []
                    }]
            }]
    },
    "loadCurrentTask": {
        "code": 0,
        "data": {
            "id": 50,
            "company_id": 1,
            "contractor_id": 7,
            "contractor_contact_id": 8,
            "manager_id": 0,
            "job_name": "CTS",
            "address": "400 North 150 East",
            "city": "Springville",
            "state": "UT",
            "zip": 84663,
            "lat": 40.16065456271,
            "lon": -111.60774707794,
            "notes": "Big Project",
            "status_id": 1,
            "job_tasks": {
                "id": 259,
                "job_id": 50,
                "task_date": "2017-01-13",
                "task_start_time": "07:00:00",
                "task_description": "This would be the task instructions",
                "status_id": 1,
                "template": 1,
                "task_crew": [{
                        "id": 749,
                        "task_id": 259,
                        "employee_id": 6,
                        "start_time": "00:00:00",
                        "end_time": "00:00:00",
                        "is_foreman": 0,
                        "priority": 1,
                        "notes": ""
                    }, {
                        "id": 750,
                        "task_id": 259,
                        "employee_id": 4,
                        "start_time": "07:00:00",
                        "end_time": "00:00:00",
                        "is_foreman": 1,
                        "priority": 99,
                        "notes": ""
                    }],
                "task_equipment": [{
                        "id": 563,
                        "task_id": 259,
                        "employee_id": 6,
                        "equipment_id": 1,
                        "equipment_name": "D-9",
                        "notes": ""
                    }],
                "task_materials": [{
                        "id": 242,
                        "task_id": 259,
                        "material_id": 2,
                        "supplier_id": 1,
                        "material_name": "3\/4\" Washed Rock",
                        "material_price": 0,
                        "notes": "",
                        "supplier": {
                            "id": 1,
                            "company_id": 1,
                            "name": "Geneva Rock",
                            "address": "1947 North Chappel Drive",
                            "city": "Spanish Fork",
                            "state": "UT",
                            "zip": 84660,
                            "phone": 8014567890,
                            "lat": 40.13449559174,
                            "lon": -111.64295911789,
                            "notes": "this is it",
                            "active": 1
                        }
                    }],
                "task_comments": []
            }
        }
    }
};
exports.ApiData = ApiData;
