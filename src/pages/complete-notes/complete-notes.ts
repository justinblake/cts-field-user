import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController, Platform, AlertController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Diagnostic} from '@ionic-native/diagnostic';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';

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
    lat: any;
    lon: any;
    public taskId;
    public userId;
    isCordova: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private taskMgr: TaskManager,
                private actionSheetCtrl: ActionSheetController,
                private platform: Platform,
                private utils: Utils,
                private camera: Camera,
                private diagnostic: Diagnostic,
                private alertCtrl: AlertController) {

        this.debug = this.utils.returnDebug();
        this.taskId = navParams.get('task_id');
        this.lat = navParams.get('lat');
        this.lon = navParams.get('lon');
        this.userId = navParams.get('user_id');


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
            save: false,
            lat: this.lat,
            lon: this.lon
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
                    this.navCtrl.pop().then(res => {
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
                    this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY, editable); // 0 == Library
                }
            }, {
                text: 'Take Photo',
                handler: () => {
                    this.getPicture(this.camera.PictureSourceType.CAMERA, editable); // 1 == Camera
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
    getPicture(sourceType: number, editable: boolean) {
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

    // createBlob(image) {
    //     console.log('Image in create blob', image);
    //     window.resolveLocalFileSystemURL(image, (entry: FileEntry) => {
    //         console.log("image log 2")
    //         entry.file(file => {
    //             console.log("image log 3")
    //             console.log('file', JSON.stringify(file));
    //             let reader = new FileReader();
    //             reader.onload = (ev) => console.log('onload', ev);
    //
    //             reader.onloadend = (ev) => {
    //                 console.log("image log 6")
    //                 console.log('ev ', JSON.stringify(ev));
    //                 let blob = new Blob([new Uint8Array(reader.result)], {type: "image/png"});
    //                 console.log('blob type ' + typeof blob + ' plus contents ' + JSON.stringify(blob))
    //                 let oReq = new XMLHttpRequest();
    //                 oReq.open("POST", "https://www.cleartasksolutions.com/api/ctsapi.php/createTaskUserLogFiles", true);
    //                 oReq.onload = (oEvent) => {
    //                     console.log('oEvent ', JSON.stringify(oEvent));
    //                     console.log("image log 6")
    //                     // all done!
    //                 };
    //                 // Pass the blob in to XHR's send method
    //                 oReq.send(blob);
    //                 console.log('onloadend', ev)
    //             };
    //             reader.onloadstart = (ev) => console.log('onloadstart', ev);
    //             console.log("image log 4")
    //             reader.readAsArrayBuffer(file)
    //             console.log("image log 5")
    //         })
    //     })
    // }

}
