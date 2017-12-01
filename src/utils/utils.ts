import {Injectable} from '@angular/core';
import {LoadingController, Loading, AlertController, ToastController, Modal, ModalController, Platform} from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import {RejectNotesPage} from '../pages/reject-notes/reject-notes';


@Injectable()
export class Utils {

    loading: Loading;
    modal: Modal;
    loadingIsPresent: boolean = false;
    homePage: number = 0;
    appVersion: string = '1.3.103';

    constructor(public loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public plt: Platform,
                private toastCtrl: ToastController,
                private modalCtrl: ModalController) {


    }

    /**
     * utility function for JSON.stringify
     * @Param o:jsonObject the obj you want to stringify
     * @Param pretty:boolean pretty print y/n
     */
    static toJson(o, pretty?: boolean | number) {
        pretty = pretty || false;
        return pretty ? JSON.stringify(o, null, '\t') : JSON.stringify(o)
        //return JSON.stringify(o, )
    }

    /**
     * utility function to md5 hash a string
     * @Param str:string the string you want to hash
     */
    static md5hashStr(str: string) {
        let md5str = Md5.hashStr(str, false);
        return md5str;
    }

    /**
     * presents a loading spinner
     * @Param content:string the spinner caption
     * @Return: void
     */
    presentLoading(content?: string) {
        let opts: any = {
            content: content || 'Tap the background to dismiss loading',
            enableBackdropDismiss: true,
            spinner: 'dots',
        };
        this.loading = this.loadingCtrl.create(opts);
        this.loading.present().then(response => {
            this.loadingIsPresent = true;
        });
    }



    /**
     * dismiss a loading spinner
     * @Return: void
     */
    dismissLoading() {
        this.loading.dismissAll() || console.log('Unable to dismiss loading...');
    }

    /**
     * display a toast error
     * @Param error:string the error message
     * @Return: void
     */
    toastError = (error): void => {
        let msg: string = 'An unknown error has occurred';
        if (error.msg) {
            msg = error.msg;
        }
        this.presentToast(msg, true, 'OK');
    };

    /**
     * presents a toast
     * @Param message:string the toast msg
     * @Param showCloseButton:boolean optional show the closed button display
     * @Param closeButtonTest:string optional the close button text, usually 'X' or 'OK'
     * @Return: void
     */
    presentToast(message: string, showCloseButton?: boolean, closeButtonText?: string, dur?: number) {
        let options = {
            message: message,
            position: 'bottom',
            showCloseButton: (showCloseButton || false),
            closeButtonText: (closeButtonText || 'OK'),
            duration: (dur || 5000)
        };
        let toast = this.toastCtrl.create(options);
        toast.present();
    }

    /**
     * presents rejects notes modal
     * put it here b/c for modularity and code reuse
     * @Return: void
     */
    presentRejectNotesModal(): Modal {
        this.modal = this.modalCtrl.create(RejectNotesPage);
        this.modal.present();
        return this.modal;
    }

    /** dismiss whatever modal we've presented */
    dismissModal() {
        this.modal.dismiss();
    }

    //Return false when testing on a browser
    //Return true when building for iOS or Android
    FCMFlagDebug() {
        return this.plt.is('cordova')
    }

    returnAppVersion() {
        return this.appVersion;
    }
}
