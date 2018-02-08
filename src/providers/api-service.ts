import {Injectable} from '@angular/core';
//NgZone from above
import {Http, Request, RequestMethod, RequestOptions, Headers} from '@angular/http';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
// import {File} from '@ionic-native/file';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import {Utils} from '../utils/utils';

@Injectable()

export class ApiService {

    apiBase: String;
    utilApi: String;
    ctsApi: String;
    crudApi: String;
    apiUrls: any;
    jwtHeader: string;
    uploading: boolean = true;
    current: number = 1;
    total: number;
    progress: number;


    constructor(public http: Http,
                private transfer: FileTransfer) {

        //remove private ngZone: NgZone from constructor
        // settings for api endpoints //
        this.apiBase = 'https://www.cleartasksolutions.com/api';
        this.utilApi = `${this.apiBase}/utilApi.php`;
        this.ctsApi = `${this.apiBase}/ctsapi.php`;
        this.crudApi = `${this.apiBase}/crudApi.php`;
        this.apiUrls = {

            "getMd5": `${this.utilApi}/getMobileMd5`,
            "authenticateUser": `${this.utilApi}/authenticate_user`,
            "sendPasswordReset": `${this.ctsApi}/sendPasswordReset`,
            "loadCurrentTask": `${this.ctsApi}/loadCurrentTask`,
            "loadCurrentTaskV2": `${this.ctsApi}/loadCurrentTaskV2`,
            "loadTaskHistoryV2": `${this.ctsApi}/loadTaskHistoryV2`,
            "createTaskUserLog": `${this.ctsApi}/createTaskUserLog`,
            "createTaskUserLogFiles": `${this.ctsApi}/createTaskUserLogFiles`,
            "loadTaskUserLog": `${this.ctsApi}/loadTaskUserLog`,
            "loadEmployeeAlerts": `${this.ctsApi}/loadEmployeeAlerts`,
            "markEmployeeAlertRead": `${this.ctsApi}/markEmployeeAlertRead`,
            "checkEmployeeAlerts": `${this.ctsApi}/checkEmployeeAlerts`,
            "loadSingleAlert": `${this.ctsApi}/loadSingleAlert`,
            "updateEmployeeToken": `${this.ctsApi}/updateEmployeeToken`,
            "loadTaskUserNotes": `${this.ctsApi}/loadTaskUserNotes`,
            "loadNextDayTaskByDateV2": `${this.ctsApi}/loadNextDayTaskByDateV2`,
            "loadForemanTasks": `${this.ctsApi}/loadForemanTasks`,
            "loadLaborerTasks": `${this.ctsApi}/loadLaborerTasks`,
            "createTimecardEntry": `${this.ctsApi}/createTimecardEntry`,
            "loadTimecardData": `${this.ctsApi}/loadTimecardData`,
            "loadTimeCardTotal": `${this.ctsApi}/loadTimeCardTotal`,
            "updateTimecard": `${this.ctsApi}/updateTimecard`,
            "makeTimecardEntryInactive": `${this.ctsApi}/makeTimecardEntryInactive`,
            "validateEmail": `${this.ctsApi}/validateEmail`,
            "getLastTimecardEntry": `${this.ctsApi}/getLastTimecardEntry`
        }

    }

    // * make the request to the api
    // * @Param requestOptions:RequestOptions the request options
    // * @Return Promise:any
    private request(requestOptions: RequestOptions) {
        return new Promise((resolve, reject) => {
            this.http.request(new Request(requestOptions))
            // .timeout(30000, {
            // 	error: true,
            // 	reason: 'timeout',
            // 	msg: 'Request timed out. Check your internet connection'
            // })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (error: any) => {
                    reject(error);
                })
        });
    };

    // utility method for generating headers for the ctsApi //
    private ctsApiPostRequestHeaders() {
        let headers = new Headers({
            'Content-Type': 'text/plain',
            'Accept': 'application/json; charset=utf-8',
            'jwt': this.jwtHeader
        });
        return headers;
    }

    // * utility method for generating requestOptions for the ctsApi
    // * @Param endpoint:string the endpoint
    // * @Param bodyData:object the body of the request
    // * @Return RequestOptions
    ctsApiPostRequestOptions = (endpoint, bodyData) => {
        let requestOptions = new RequestOptions({
            'method': RequestMethod.Post,
            'headers': this.ctsApiPostRequestHeaders(),
            'url': endpoint,
            'body': (JSON.stringify(bodyData))
        });
        return requestOptions;
    };

    // utility method for generating headers for the utilApi //
    utilApiPostRequestHeaders() {
        return new Headers({
            'Content-Type': 'text/plain'
        });
    }

    // * utility method for generating requestOptions for the utilApi
    // * @Param endpoint:string the endpoint
    // * @Param bodyData:object the body of the request
    // * @Return RequestOptions
    utilApiPostRequestOptions = (endpoint, bodyData) => {
        let requestOptions = new RequestOptions({
            'method': RequestMethod.Post,
            'headers': this.utilApiPostRequestHeaders(),
            'url': endpoint,
            'body': (JSON.stringify(bodyData))
        });
        return requestOptions;
    };

    // utility method for generating headers for the crudApi //
    crudApiPostRequestHeaders() {
        return new Headers({
            'Content-Type': 'text/plain'
        });
    }

    // * utility method for generating requestOptions for the crudApi
    // * @Param endpoint:string the endpoint
    // * @Param bodyData:object the body of the request
    // * @Return RequestOptions
    crudApiPostRequestOptions = (endpoint, bodyData) => {
        let requestOptions = new RequestOptions({
            'method': RequestMethod.Post,
            'headers': this.crudApiPostRequestHeaders(),
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
    md5 = (string) => {
        let requestOptions = this.utilApiPostRequestOptions(this.apiUrls.getMd5, string);
        return this.request(requestOptions);
    };

    // * Authenticate user
    // * creates a request for authenticate endpoint
    // * @Param data:any = { email: string, password: md5-String }
    // * @Return Promise
    authenticate(data) {
        let endpoint = this.apiUrls.authenticateUser;
        let requestOptions = this.utilApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    }

    validateEmail(data) {
        let endpoint = this.apiUrls.validateEmail;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    }


    updateEmployeeToken = (data) => {
        let endpoint = this.apiUrls.updateEmployeeToken;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };

    sendPasswordReset(data) {
        let endpoint = this.apiUrls.sendPasswordReset;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    }

    createTimecardEntry(data) {
        let endpoint = this.apiUrls.createTimecardEntry;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    }

    loadTimecardData(data) {
        let endpoint = this.apiUrls.loadTimecardData;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    }

    loadTimeCardTotal(data) {
        let endpoint = this.apiUrls.loadTimeCardTotal;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    }

    updateTimecard(data) {
        let endpoint = this.apiUrls.updateTimecard;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    }

    makeTimecardEntryInactive(data) {
        let endpoint = this.apiUrls.makeTimecardEntryInactive;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    }

    getLastTimecardEntry(data) {
        let endpoint = this.apiUrls.getLastTimecardEntry;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    }


    // * loads the current task from the api
    // * @Param user:currentUser
    // * @Param token: string
    // * @Return Promise
    loadCurrentTask = (data) => {
        let endpoint = this.apiUrls.loadCurrentTask;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };

    loadCurrentTaskV2 = (data) => {
        console.log('multiple in api-service ')
        let endpoint = this.apiUrls.loadCurrentTaskV2;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions);
    };

    // loadNextDayTask = (data) => {
    //     let endpoint = this.apiUrls.loadNextDayTask;
    //     let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
    //     return this.request(requestOptions);
    // };

    // *  loads the task history from the api
    // *  @Param data:any = {userId:number}
    // *  @Return Promise
    loadTaskHistoryV2 = (data) => {
        let endpoint = this.apiUrls.loadTaskHistoryV2;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    loadNextDayTaskByDate = (data) => {
        let endpoint = this.apiUrls.loadNextDayTaskByDateV2;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    loadForemanTasks = (data) => {
        let endpoint = this.apiUrls.loadForemanTasks;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    loadLaborerTasks = (data) => {
        let endpoint = this.apiUrls.loadLaborerTasks;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    loadEmployeeAlerts = (data) => {
        let endpoint = this.apiUrls.loadEmployeeAlerts;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    checkEmployeeAlerts = (data) => {
        let endpoint = this.apiUrls.checkEmployeeAlerts;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    loadSingleAlert = (data) => {
        let endpoint = this.apiUrls.loadSingleAlert;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    markEmployeeAlertRead = (data) => {
        let endpoint = this.apiUrls.markEmployeeAlertRead;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    // *  loads task user log for a task
    // *  @Param data:any = { "userId":number, "taskId":number }
    // *  @Param token: string
    // *  @Return Promise
    loadTaskUserLog = (data) => {
        let endpoint = this.apiUrls.loadTaskUserLog;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    loadTaskUserNotes = (data) => {
        let endpoint = this.apiUrls.loadTaskUserNotes;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, data);
        return this.request(requestOptions)
    };

    // * creates a postTaskFeedback request
    // * @Return Promise
    postTaskFeedback = (feedback) => {
        let endpoint = this.apiUrls.createTaskUserLog;
        let requestOptions = this.ctsApiPostRequestOptions(endpoint, feedback);
        return this.request(requestOptions)
    };

    // * creates a postTaskFeedbackImage request on devices only
    // * @Return Promise
    postTaskFeedbackImageNative = (feedbackId, image) => {
        let url = this.apiUrls.createTaskUserLogFiles;
        let options = {
            fileName: image.name,
            fileKey: 'file',
            httpMethod: "POST",
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'jwt': this.jwtHeader
            },
            params: {
                logId: feedbackId,
                caption: image.caption,
                fileName: image.name,
                path: image.path,
                debug: true
            }
        };
        const fileTransfer: FileTransferObject = this.transfer.create();
        return new Promise((resolve, reject) => {
            fileTransfer.upload(image.path, url, options, true).then((data) => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    };

    // // /* show progress of upload -- not implemented */
    // onProgress = (progressEvent: ProgressEvent): void => {
    //     this.ngZone.run(() => {
    //         if (progressEvent.lengthComputable) {
    //             this.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    //         } else {
    //             // -- //
    //         }
    //     });
    // };


    // * creates a postTaskFeedbackImage HTML5
    // * @Note: only used in development, not sure if still implemented
    // * @Return Promise
    postTaskFeedbackImage = (feedbackId, image) => {
        let url = this.apiUrls.createTaskUserLogFiles;
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            formData.append('logId', feedbackId);
            formData.append('caption', image.caption);
            formData.append("feedbackImage", image.file, image.name);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
}
