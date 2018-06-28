import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController, Platform, AlertController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Diagnostic} from '@ionic-native/diagnostic';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';
import {ManagesTasksManager} from "../../providers/manages-tasks-manager";
import {GeolocationService} from "../../providers/geolocation-service";


@Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.html'
})
export class FeedbackPage {

    debug: boolean;
    data: any;
    files: Array<any> = [];
    type: any = {options: ''};
    origin: any;
    isIos: boolean = false;
    isAndroid: boolean = false;
    lat: any;
    lon: any;
    public taskId;
    public userId;
    hasStatus: boolean = false;
    hasSelected: boolean = false;
    accuracy: any;
    isCordova: boolean;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public managesTskMgr: ManagesTasksManager,
                private taskMgr: TaskManager,
                private actionSheetCtrl: ActionSheetController,
                private platform: Platform,
                private utils: Utils,
                private camera: Camera,
                private diagnostic: Diagnostic,
                public geoSrvc: GeolocationService,
                private alertCtrl: AlertController) {

        this.debug = this.utils.returnDebug();
        this.taskId = navParams.get('task_id');
        this.userId = navParams.get('user_id');

        this.isAndroid = this.taskMgr.returnPlatform().isAndroid;
        this.isIos = this.taskMgr.returnPlatform().isIos;
        this.isCordova = this.taskMgr.returnPlatform().isCordova;


        this.data = {
            userId: this.userId,
            taskId: this.taskId,
            notes: '',
            statusId: 0,
            files: this.files,
            save: false,
            lat: this.lat,
            lon: this.lon,
            accuracy: this.accuracy
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
        this.type.options = this.type.options.filter((value) => {
            return value.system_only == 0;
        });

        let successCallback = (isAvailable) => {

            if (this.debug) {
                console.log('Is available? ' + isAvailable);
            }
        };
        let errorCallback = (e) => {
            this.diagnostic.requestCameraAuthorization().then(successCallback)
        };
        this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
    }

    ionViewWillEnter() {
        if (this.isCordova) {
            this.geoSrvc.getCurrentBackgroundLocation(45000, 10000).then((res: any) => {
                this.data.lat = res.lat;
                this.data.lon = res.lon;
                this.data.accuracy = res.accuracy;
            })
        } else {
            setTimeout(() => {
                this.data.lat = 0;
                this.data.lon = 0;
                this.data.accuracy = 0;
            }, 5000)

        }

    }

    /** delete image button clicked, remove from files array */
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
        console.log('this.data in feedback', JSON.stringify(this.data));
        this.data.save = true;
        this.data.notes = this.data.notes.trim();
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
                    if (this.data.statusId === 12 || this.data.statusId === 7) {
                        this.managesTskMgr.removeTask();
                        this.taskMgr.passTempHold(true, false);
                    }
                    // if(this.data.statusId === 12) {
                    //     this.managesTskMgr.removeTask();
                    //     this.taskMgr.passTempHold(true, false);
                    // }
                    this.navCtrl.popToRoot();
                    // if(this.data.statusId === 12) {
                    //     this.taskMgr.passTempHold(true, false);
                    //     this.navCtrl.popToRoot();
                    // }

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
    presentActionSheet() {
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
            destinationType: 1,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
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

    selectedStatus(selection) {
        this.data.statusId = selection;
        this.hasSelected = false;
        this.hasStatus = true;
    }

    showNotes() {
        this.hasStatus = true;
        this.hasSelected = false;
    }

    backToSelection() {
        this.hasStatus = false;
        this.hasSelected = false;
    }

    createLoading() {
        this.utils.presentLoading();
    }

}