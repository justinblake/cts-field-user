import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var GoogleMapsService = /** @class */ (function () {
    function GoogleMapsService(http) {
        this.http = http;
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
export { GoogleMapsService };
//# sourceMappingURL=google-maps-service.js.map