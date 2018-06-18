import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController, Platform, AlertController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Diagnostic} from '@ionic-native/diagnostic';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';
import {ManagesTasksManager} from "../../providers/manages-tasks-manager";
import {GeolocationService} from "../../providers/geolocation-service";

@Component({
    selector: 'page-complete-notes',
    templateUrl: 'complete-notes.html'
})
export class CompleteNotesPage {

    debug: boolean;
    data: any;
    files: Array<any> = [];
    type: any = {options: ''};
    isIos: boolean = false;
    isAndroid: boolean;
    lat: number;
    lon: number;
    locationTimestamp: number;
    locationAccuracy: number;
    public taskId;
    public userId;
    isCordova: boolean = false;
    retrievingLocation: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public managesTskMgr: ManagesTasksManager,
                public geoSrvc: GeolocationService,
                private taskMgr: TaskManager,
                private actionSheetCtrl: ActionSheetController,
                private platform: Platform,
                private utils: Utils,
                private camera: Camera,
                private diagnostic: Diagnostic,
                private alertCtrl: AlertController) {

        this.debug = this.utils.returnDebug();
        this.taskId = navParams.get('task_id');


        this.userId = navParams.get('user_id');
        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;


        if (this.debug) {
            console.log('this.taskId ', JSON.stringify(this.taskId));
            console.log('this.userId ', JSON.stringify(this.userId));
        }
        this.isCordova = this.taskMgr.returnPlatform().isCordova;

        this.data = {
            userId: this.userId,
            taskId: this.taskId,
            notes: '',
            statusId: 9,
            files: this.files,
            save: false
        };


        if (this.platform.is('ios')) {
            // This will only print when on iOS
            this.isIos = true;
        }

        let successCallback = (isAvailable) => {
            if (this.debug) {
                console.log('Is available? ' + isAvailable);
            }
        };
        let errorCallback = (e) => {
            this.diagnostic.requestCameraAuthorization().then(successCallback)
        };

        if (this.isCordova) {
            this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
        }


    }

    ionViewWillEnter() {
        if (this.isCordova) {
            this.setLocation().then(() => {
                this.data.lat = this.lat;
                this.data.lon = this.lon;
                this.data.accuracy = this.locationAccuracy;
            })
        } else {
            this.retrievingLocation = true;
            setTimeout(() => {
                this.data.lat = 0;
                this.data.lon = 0;
                this.retrievingLocation = false;
            }, 5000)

        }

    }

    setLocation() {
        this.retrievingLocation = true;
        return new Promise((resolve, reject) => {

            this.lat = 0;
            this.lon = 0;

            let platform = 'ios';
            if (this.isAndroid) {
                platform = 'android'
            }

            if (this.isCordova) {
                this.geoSrvc.getCurrentPosition(platform).then((res: any) => {
                    this.lat = res.lat;
                    this.lon = res.lon;
                    this.locationTimestamp = res.timestamp;
                    this.locationAccuracy = res.accuracy;
                    console.log('res in new location service', JSON.stringify(res));
                    this.retrievingLocation = false;
                    resolve(`${this.lat},${this.lon}`);
                }, (err: any) => {
                    console.log('err ', JSON.stringify(err));
                    this.retrievingLocation = false;
                    reject(err)
                })
            }

        })
    }

    //Nothing is loaded, everything is passed from the home page

    deleteImage(index) {
        this.data.files.splice(index, 1);
    }

    /** used for HTML file upload only */
    showFiles(event) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        let file: any = files[0];
        let fileData = {
            name: file.name,
            caption: '',
            path: '',
            file: file
        };

        this.data.files.push(fileData);
    }

    /** save button clicked */
    save() {
        this.data.save = true;
        this.data.notes = this.data.notes.trim();
        console.log('this.data ', JSON.stringify(this.data));
        this.utils.presentLoading();


        this.taskMgr.postFeedback(this.data).then(response => {
            if (this.isIos) {
                this.camera.cleanup().then(response => {
                    //
                }).catch(error => {

                    if (this.debug) {
                        console.error(`There was an error calling Camera.cleanup: ${Utils.toJson(error)}`);
                    }
                });
            }
            this.utils.dismissLoading();
            setTimeout(() => {
                if (response === true) {
                    this.taskMgr.passCompleteTask(true);
                    this.managesTskMgr.removeTask();
                    this.navCtrl.popToRoot().then(res => {
                        if (this.debug) {
                            console.log('res in complete pages  ', JSON.stringify(res));
                        }
                    });
                } else {
                    this.utils.toastError({msg: 'There was an error posting feedback'});
                }
            }, 500);
        }).catch(error => {
            this.utils.toastError({msg: 'There was an error posting feedback'});
            if (this.isIos) {
                this.camera.cleanup().then(response => {
                    //
                }).catch(error => {

                    if (this.debug) {
                        console.error(`There was an error calling Camera.cleanup: ${Utils.toJson(error)}`);
                    }
                });
            }
            this.utils.dismissLoading();
        })
    }

    /** cancel button clicked, used when page was a modal */
    cancel() {
        this.data.save = false;
        this.navCtrl.pop();
    }

    disableFormSubmit() {
        /**
         *  Used to disable a form button. So :
         *  if false OR false, then disable (true) OR
         *  if true AND true, the don't disable (false)
         */
        return !((this.data.notes.trim().length > 4) && (this.data.statusId > 0))
    }

    /** trim notes  */
    trimNotes() {
        this.data.notes = this.data.notes.trim();
    }

    /** when cordova, present an action sheet to take a pic or import from gallery */
    presentActionSheet(editable: boolean) {
        let buttons: any = [];
        if (this.platform.is('cordova')) {
            buttons.push({
                text: 'Choose Photo',
                handler: () => {
                    this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY); // 0 == Library
                }
            }, {
                text: 'Take Photo',
                handler: () => {
                    this.getPicture(this.camera.PictureSourceType.CAMERA); // 1 == Camera
                }
            })
        }
        buttons.push(
            {
                text: 'Cancel',
                role: 'cancel'
            }
        );

        let actionSheet = this.actionSheetCtrl.create({
            buttons: buttons
        });
        actionSheet.present();
    }

    /**
     * get picture from gallery or camera
     * @Param sourceType:number camera or gallery
     */
    getPicture(sourceType: number) {
        this.utils.presentLoading();
        this.camera.getPicture({
            quality: 40,
            sourceType: sourceType,
            allowEdit: true,
            mediaType: 0,
            correctOrientation: true //this needs to be true to get a file:/// FILE_URI, otherwise android does not return a file uri. Yep.
        }).then((imageData) => {

            if (this.debug) {
                console.log(`IMAGEDATA: ${Utils.toJson(imageData, true)}`);
            }
            //fix for android, remove query string from end of file_uri or crashes android //
            imageData = imageData.split('?')[0];
            let filename = imageData.replace(/^.*[\\\/]/, '');
            let fileData = {
                name: filename,
                caption: '',
                //notes : '',
                path: imageData,
                //file : file
            };
            console.log("image log 1")
            // this.createBlob(fileData.path);

            this.data.files.push(fileData);
            this.utils.dismissLoading();
        }, (err) => {
            let alert = this.alertCtrl.create({
                title: 'Image Error',
                message: 'Unable to upload image. Please choose a different image or take an new picture',
                cssClass: 'myAlerts',
                buttons: ['OK']
            });
            alert.present();

            if (this.debug) {
                console.log(`ERROR -> ${JSON.stringify(err)}`);
            }
            this.utils.dismissLoading();
        });
    }



}
