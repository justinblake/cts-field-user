"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//libraries//
var core_1 = require("@angular/core");
//import { JsonPipe } from '@angular/common';
var ionic_angular_1 = require("ionic-angular");
var storage_1 = require("@ionic/storage");
var app_component_1 = require("./app.component");
//pages//
var history_1 = require("../pages/history/history");
var alerts_1 = require("../pages/alerts/alerts");
var home_1 = require("../pages/home/home");
var driving_directions_1 = require("../pages/driving-directions/driving-directions");
var tabs_1 = require("../pages/tabs/tabs");
var login_1 = require("../pages/login/login");
var splash_1 = require("../pages/splash/splash");
var reject_notes_1 = require("../pages/reject-notes/reject-notes");
var feedback_1 = require("../pages/feedback/feedback");
//providers//
var api_service_1 = require("../providers/api-service");
var task_manager_1 = require("../providers/task-manager");
var storage_service_1 = require("../providers/storage-service");
var google_maps_manager_1 = require("../providers/google-maps-manager");
var google_maps_service_1 = require("../providers/google-maps-service");
var user_manager_1 = require("../providers/user-manager");
var geolocation_service_1 = require("../providers/geolocation-service");
var utils_1 = require("../utils/utils");
function provideStorage() {
    return new storage_1.Storage(['sqlite', 'indexeddb', 'websql'], { name: '_ctsdb' });
}
exports.provideStorage = provideStorage;
;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.MyApp,
            alerts_1.AlertsPage,
            history_1.HistoryPage,
            home_1.HomePage,
            tabs_1.TabsPage,
            driving_directions_1.DrivingDirectionsPage,
            login_1.LoginPage,
            splash_1.SplashPage,
            reject_notes_1.RejectNotesPage,
            feedback_1.FeedbackPage
        ],
        imports: [
            ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp, {
                scrollAssist: false,
                autoFocusAssist: false,
                tabsPlacement: 'bottom',
                platforms: {
                    android: {}
                }
            }, {}) //end IonicModule.forRoot()
        ],
        bootstrap: [ionic_angular_1.IonicApp],
        entryComponents: [
            app_component_1.MyApp,
            history_1.HistoryPage,
            alerts_1.AlertsPage,
            home_1.HomePage,
            tabs_1.TabsPage,
            driving_directions_1.DrivingDirectionsPage,
            login_1.LoginPage,
            splash_1.SplashPage,
            reject_notes_1.RejectNotesPage,
            feedback_1.FeedbackPage
        ],
        /** NB: providers are singletons */
        providers: [
            { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler },
            { provide: storage_1.Storage, useFactory: provideStorage },
            api_service_1.ApiService,
            task_manager_1.TaskManager,
            storage_service_1.StorageService,
            google_maps_manager_1.GoogleMapsManager,
            google_maps_service_1.GoogleMapsService,
            user_manager_1.UserManager,
            geolocation_service_1.GeolocationService,
            utils_1.Utils
        ]
    })
], AppModule);
exports.AppModule = AppModule;
