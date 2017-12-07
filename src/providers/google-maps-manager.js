import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { GeolocationService } from '../geolocation-service/geolocation-service';
import { GoogleMapsService } from './google-maps-service';
//import { Utils } from '../../utils/utils';
var 
//import { Utils } from '../../utils/utils';
GoogleMapsManager = /** @class */ (function () {
    function GoogleMapsManager(http, mapsService) {
        this.http = http;
        this.mapsService = mapsService;
        console.log('Hello GoogleMapsManager Provider');
    }
    GoogleMapsManager.prototype.getDirections = function (origin, destination) {
        //let origin = '40.7441704,-111.8628205';
        console.log("Getting directions: (" + origin + "), (" + destination + ")");
        return this.mapsService.getDirections(origin, destination);
    };
    return GoogleMapsManager;
}());
//import { Utils } from '../../utils/utils';
export { GoogleMapsManager };
//# sourceMappingURL=google-maps-manager.js.map