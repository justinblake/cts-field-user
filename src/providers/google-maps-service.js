"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var GoogleMapsService = (function () {
    function GoogleMapsService(http) {
        this.http = http;
        this.key = "AIzaSyCNru80Dz-6HKpPHbtj0oJAq2RvAlBcYL0";
        this.endpoint = "https://maps.googleapis.com/maps/api/directions/json?callback=JSONP_CALLBACK";
        console.log('Hello GoogleMapsService Provider');
        //this.directionsService = new google.maps.DirectionsService();
    }
    GoogleMapsService.prototype.getDirections = function (origin, destination) {
        var _this = this;
        this.directionsService = new google.maps.DirectionsService();
        return new Promise(function (resolve, reject) {
            //origin = '40.7441704,-111.8628205'; //somewhere in SLC
            //destination = 'Provo, UT';
            var request = {
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            };
            _this.directionsService.route(request, function (result, status) {
                //console.log(`ROUTE: ${status} ${Utils.toJson(result)}` );
                //console.log(result.routes[0])
                if (status == 'OK') {
                    resolve(JSON.parse(JSON.stringify(result)));
                }
                else {
                    reject(result);
                }
            });
        });
    };
    return GoogleMapsService;
}());
GoogleMapsService = __decorate([
    core_1.Injectable()
], GoogleMapsService);
exports.GoogleMapsService = GoogleMapsService;
