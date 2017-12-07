//libraries//
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgModule, ErrorHandler, Injectable, Injector } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MyApp } from './app.component';
//plugins
import { ActionSheet } from '@ionic-native/action-sheet';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Badge } from '@ionic-native/badge';
import { CallNumber } from '@ionic-native/call-number';
import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { FCM } from '@ionic-native/fcm';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Keyboard } from '@ionic-native/keyboard';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Sim } from '@ionic-native/sim';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
//pages//
import { AlertsPage } from '../pages/alerts/alerts';
import { CompleteNotesPage } from '../pages/complete-notes/complete-notes';
import { DrivingDirectionsPage } from '../pages/driving-directions/driving-directions';
import { FeedbackPage } from '../pages/feedback/feedback';
import { ForemanPage } from '../pages/foreman/foreman';
import { HistoryFeedbackPage } from '../pages/history-feedback/history-feedback';
import { HistoryPage } from '../pages/history/history';
import { HistoryReviewPage } from '../pages/history-review/history-review';
import { HomeKeysPipe, HomePage } from '../pages/home/home';
import { KeysPipe, NextDayPage } from '../pages/next-day-tasks/next-day';
import { LoginPage } from '../pages/login/login';
import { RejectNotesPage } from '../pages/reject-notes/reject-notes';
import { SingleForemanTaskPage } from "../pages/single-foreman-task/single-foreman-task";
import { SingleHistoryTaskPage } from "../pages/single-history-task/single-history-task";
import { SplashPage } from '../pages/splash/splash';
import { TabsPage } from '../pages/tabs/tabs';
import { TimecardKeysPipe, TimecardPage } from '../pages/timecard/timecard';
import { TimecardSearchPage } from '../pages/timecard-search/timecard-search';
//providers//
import { ApiService } from '../providers/api-service';
import { CalendarModule, CALENDAR_COMPONENTS } from '../components/ion2-calendar';
import { ConversionManager } from "../providers/conversion-manager";
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsManager } from '../providers/google-maps-manager';
import { GoogleMapsService } from '../providers/google-maps-service';
import { HardwareBackButtonService } from '../providers/backbutton';
import { StorageService } from '../providers/storage-service';
import { TaskManager } from '../providers/task-manager';
import { UserManager } from '../providers/user-manager';
import { Utils } from '../utils/utils';
import { Pro } from '@ionic/pro';
var IonicPro = Pro.init('379d0062', {
    appVersion: "1.3.116"
});
var MyErrorHandler = /** @class */ (function () {
    function MyErrorHandler(injector) {
        try {
            this.ionicErrorHandler = injector.get(IonicErrorHandler);
        }
        catch (e) {
            // Unable to get the IonicErrorHandler provider, ensure
            // IonicErrorHandler has been added to the providers list below
        }
    }
    MyErrorHandler.prototype.handleError = function (err) {
        IonicPro.monitoring.handleNewError(err);
        // Remove this if you want to disable Ionic's auto exception handling
        // in development mode.
        this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    };
    return MyErrorHandler;
}());
export { MyErrorHandler };
export function provideStorage() {
    return new Storage({ name: '_ctsdb' });
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map