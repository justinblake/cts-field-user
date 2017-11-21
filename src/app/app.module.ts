//libraries//
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {NgModule, ErrorHandler} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MyApp} from './app.component';

//plugins
import {ActionSheet} from '@ionic-native/action-sheet';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {Badge} from '@ionic-native/badge';
import {CallNumber} from '@ionic-native/call-number';
import {Camera} from '@ionic-native/camera';
import {Diagnostic} from '@ionic-native/diagnostic';
import {FCM} from '@ionic-native/fcm';
import {File} from '@ionic-native/file';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Keyboard} from '@ionic-native/keyboard';
import {LaunchNavigator} from '@ionic-native/launch-navigator';
import {Sim} from '@ionic-native/sim';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Storage} from '@ionic/storage';
import {UniqueDeviceID} from '@ionic-native/unique-device-id';

//pages//
import {AlertsPage} from '../pages/alerts/alerts';
import {CompleteNotesPage} from '../pages/complete-notes/complete-notes';
import {DrivingDirectionsPage} from '../pages/driving-directions/driving-directions';
import {FeedbackPage} from '../pages/feedback/feedback';
import {ForemanPage} from '../pages/foreman/foreman'
import {HistoryFeedbackPage} from '../pages/history-feedback/history-feedback';
import {HistoryPage} from '../pages/history/history';
import {HistoryReviewPage} from '../pages/history-review/history-review';
import {HomeKeysPipe, HomePage} from '../pages/home/home';
import {KeysPipe, NextDayPage} from '../pages/next-day-tasks/next-day';
import {LoginPage} from '../pages/login/login';
import {RejectNotesPage} from '../pages/reject-notes/reject-notes';
import {SingleForemanTaskPage} from "../pages/single-foreman-task/single-foreman-task";
import {SingleHistoryTaskPage} from "../pages/single-history-task/single-history-task";
import {SplashPage} from '../pages/splash/splash';
import {TabsPage} from '../pages/tabs/tabs';
import {TimecardKeysPipe, TimecardPage} from '../pages/timecard/timecard'
import {TimecardSearchPage} from '../pages/timecard-search/timecard-search'

//providers//
import {ApiService} from '../providers/api-service';
import {CalendarModule, CALENDAR_COMPONENTS} from '../components/ion2-calendar';
import {ConversionManager} from "../providers/conversion-manager";
import {Geolocation} from '@ionic-native/geolocation';
import {GoogleMapsManager} from '../providers/google-maps-manager';
import {GoogleMapsService} from '../providers/google-maps-service';
import {HardwareBackButtonService} from '../providers/backbutton';
import {StorageService} from '../providers/storage-service';
import {TaskManager} from '../providers/task-manager';
import {UserManager} from '../providers/user-manager';
import {Utils} from '../utils/utils';


// import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
// CloudModule.forRoot(cloudSettings),
// const cloudSettings: CloudSettings = {
//     'core': {
//         'app_id': 'a1e0e4dc'
//     }
// };


export function provideStorage() {
    return new Storage({name: '_ctsdb'});
}

@NgModule({
    declarations: [
        MyApp,
        AlertsPage,
        CompleteNotesPage,
        DrivingDirectionsPage,
        FeedbackPage,
        ForemanPage,
        HistoryFeedbackPage,
        HistoryPage,
        HistoryReviewPage,
        HomeKeysPipe,
        HomePage,
        KeysPipe,
        LoginPage,
        NextDayPage,
        RejectNotesPage,
        SplashPage,
        SingleForemanTaskPage,
        SingleHistoryTaskPage,
        TabsPage,
        TimecardKeysPipe,
        TimecardPage,
        TimecardSearchPage
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        CalendarModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(MyApp, {
            scrollAssist: false,
            autoFocusAssist: false,
            tabsPlacement: 'bottom',
            platforms: {
                android: {
                    //tabsPlacement : 'top'
                }
            }
        }, {
            links: []
        }), //end IonicModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AlertsPage,
        CompleteNotesPage,
        DrivingDirectionsPage,
        FeedbackPage,
        ForemanPage,
        HistoryFeedbackPage,
        HistoryPage,
        HistoryReviewPage,
        HomePage,
        LoginPage,
        NextDayPage,
        RejectNotesPage,
        SingleForemanTaskPage,
        SingleHistoryTaskPage,
        SplashPage,
        TabsPage,
        TimecardPage,
        TimecardSearchPage
    ],
    /** NB: providers are singletons */
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: Storage, useFactory: provideStorage},
        ActionSheet,
        AndroidFullScreen,
        ApiService,
        Badge,
        CallNumber,
        Camera,
        ConversionManager,
        Diagnostic,
        FCM,
        File,
        Geolocation,
        GoogleMapsManager,
        GoogleMapsService,
        HardwareBackButtonService,
        InAppBrowser,
        Keyboard,
        LaunchNavigator,
        Sim,
        SplashScreen,
        StatusBar,
        StorageService,
        TaskManager,
        UniqueDeviceID,
        UserManager,
        Utils
    ]
})
export class AppModule {
}
