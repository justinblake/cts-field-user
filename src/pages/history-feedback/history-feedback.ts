import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController, Platform, AlertController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Diagnostic} from '@ionic-native/diagnostic';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';

@Component({
    selector: 'page-history-feedback',
    templateUrl: 'history-feedback.html'
})
export class HistoryFeedbackPage {

    debug: boolean;
    data: any;
    files: Array<any> = [];
    type: any = {options: ''};
    currentTask: any;
    origin: any;
    isIos: boolean = false;
    lat: any;
    lon: any;
    public id;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private actionSheetCtrl: ActionSheetController,
                private platform: Platform,
                private taskMgr: TaskManager,
                private utils: Utils,
                private camera: Camera,
                private diagnostic: Diagnostic,
                private alertCtrl: AlertController) {
        this.debug = this.utils.returnDebug();

        this.id = navParams.get("id");

        if (this.debug) {
            console.log("this.id " + this.id);
        }


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

        if (this.debug) {
            console.log('this.data.notes', JSON.stringify(this.data.notes));
        }
        if (this.data.notes === '') {
            this.data.notes = "New Image"
        }
        this.data.notes = this.data.notes.trim();
        this.data.lat = this.lat;
        this.data.lon = this.lon;
        this.utils.presentLoading();
        this.taskMgr.postHistoryFeedback(this.data).then(response => {
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
                    this.navCtrl.pop();

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
        return !( (this.data.notes.trim().length > 4) && (this.data.statusId > 0) )
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

            this.utils.dismissLoading();
        });
    }

}
