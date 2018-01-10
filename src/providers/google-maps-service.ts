import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
//import { Utils } from '../utils/utils';

declare var google;

@Injectable()
export class GoogleMapsService {
    key: string = "AIzaSyCNru80Dz-6HKpPHbtj0oJAq2RvAlBcYL0";
    endpoint: string = "https://maps.googleapis.com/maps/api/directions/json?callback=JSONP_CALLBACK";
    directionsService: any;

    constructor() {
        console.log('Hello GoogleMapsService Provider');
    }

    getDirections(origin, destination) {
        this.directionsService = new google.maps.DirectionsService();
        return new Promise((resolve, reject) => {
            let request = {
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            };
            this.directionsService.route(request, (result, status) => {
                if (status == 'OK') {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(result);
                }
            });
        })
    }
}
