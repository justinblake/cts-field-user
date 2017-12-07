import { Injectable } from '@angular/core';
import { Geolocation } from 'ionic-native';
/**
 * Service to get the current users geolocation
 */
var /**
 * Service to get the current users geolocation
 */
GeolocationService = /** @class */ (function () {
    function GeolocationService() {
    }
    GeolocationService.prototype.getCurrentPosition = function () {
        return Geolocation.getCurrentPosition();
    };
    GeolocationService.prototype.watchPosition = function () {
        //not implemented
    };
    return GeolocationService;
}());
/**
 * Service to get the current users geolocation
 */
export { GeolocationService };
//# sourceMappingURL=geolocation-service.js.map