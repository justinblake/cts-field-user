import {Component} from '@angular/core';
import {Platform, NavController, NavParams, AlertController} from 'ionic-angular';
import {Keyboard} from 'ionic-native';
import {TabsPage} from '../tabs/tabs';
import {UserManager} from '../../providers/user-manager';
import {TaskManager} from '../../providers/task-manager';
import {InAppBrowser} from '@ionic-native/in-app-browser';


import {Utils} from '../../utils/utils';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    debug: boolean = false;
    isLoggedIn: boolean = false;
    platform: Platform;
    showEmail: boolean = false;
    resetEmail: '';
    validEmail: boolean = false;
    showEmailPrompt: boolean = false;
    appVersion: string;


    credentials = {
        email: '',
        password: ''
    };

    constructor(platform: Platform,
                public navCtrl: NavController,
                public navParams: NavParams,
                private userMgr: UserManager,
                private taskMgr: TaskManager,
                private utils: Utils,
                private alertCtrl: AlertController,
                private iab: InAppBrowser) {
        this.platform = platform;
        this.platform.ready().then(() => {
            // Keyboard.disableScroll(true);
        });
        this.appVersion = this.utils.returnAppVersion();
    }

    // ionViewDidLoad() {
    //
    //     console.log('ionViewDidLoad LoginPage');
    //
    // }

    ionViewWillEnter() {
        this.validEmail = false;
    }

    ionViewDidEnter() {



        this.platform.ready().then(() => {
            // Keyboard.disableScroll(true);


        });
        // disable back button to fix navigation //
        // otherwise back button could take you back to tasks //
        this.platform.registerBackButtonAction(() => {
            //do nothing....
        });
        this.isLoggedIn = this.userMgr.isLoggedIn();

        console.log('ionViewDidEnter LoginPage');


    }

    ionViewWillLeave() {

        console.log('ionViewWillLeave LoginPage');

        // reverse android keyboard workaround //
        this.platform.ready().then(() => {
            Keyboard.disableScroll(false);
        });
        this.platform.registerBackButtonAction(() => {
            //this.navCtrl.pop();
        });

        this.validEmail = false;

    }

    /** used to enable/disable login button */
    disableForm() {
        return this.credentials.email.trim().length < 1 || this.credentials.password.trim().length < 1;
    }

    // yep //
    trimNotes() {
        this.credentials.email = this.credentials.email.trim();
    }

    validateEmail(email) {
        this.validEmail = false;
        let data = {"email": email};
        this.taskMgr.validateEmail(data).then((res: any) => {
            console.log('res in login ', JSON.stringify(res));

            if (res.code === 0) {
                this.validEmail = true;
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Email Not Found',
                    message: 'The email address was not found. Please select cancel to re-enter your email address or select CTS Home to get more information about the CTS suite of tools.',
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                if (this.debug) {
                                    console.log('Cancel clicked');
                                }
                            }
                        },
                        {
                            text: 'CTS Home',
                            handler: () => {
                                let options = "location=no";
                                this.iab.create("https://www.cleartasksolutions.com/#contact", "_system", options);
                            }
                        }
                    ]
                });
                alert.present();
                this.showEmailPrompt = true;
            }

        })
    }

    backToEmail() {
        this.credentials.email = '';
        this.validEmail = false;
    }

    /** log the user in */
    doLogin() {
        this.utils.presentLoading('Logging in...');
        let credentials: any = {};
        Object.assign(credentials, this.credentials);

        // console.log('credentials ', JSON.stringify(credentials));

        this.userMgr.md5Password(credentials).then((res: any) => {
            // console.log('res ', JSON.stringify(res));
            credentials.password = res.md5Pass;

            this.userMgr.authenticate(credentials).then(valid => {
                this.utils.dismissLoading();
                if (valid) {
                    this.navCtrl.push(TabsPage);
                } else {
                    let msg = "Unable to log you in. Check your username and password and try again";
                    this.utils.presentToast(msg, true, 'OK');
                }
            })
        })


    }

    showPasswordReset() {
        this.showEmail = true;
    }

    resetPassword() {
        this.taskMgr.resetPassword(this.resetEmail);
        this.resetEmail = '';
        this.showEmail = false;
    }

    presentHelpAlert() {

        let alert = this.alertCtrl.create({
            title: 'Login Questions',
            message: 'Please enter the email address that was used when your account with CTS was created. <br><br> ' +
            'If you are unsure which email address was used, please contact your office admin or call our support line at: <br><br> ' +
            ' <a href="tel:1-385-625-6884">385-625-6884</a>',
            cssClass: 'loginMessage',
            buttons: ['Close']
        });
        alert.present();
    }

}
