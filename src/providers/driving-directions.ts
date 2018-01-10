import {Injectable} from '@angular/core';
import {GoogleMapsService} from './google-maps-service';
import {GeolocationService} from "./geolocation-service";

@Injectable()
export class DrivingDirectionsService {

    constructor(public geoSrvc: GeolocationService,
                private mapsService: GoogleMapsService) {
        console.log('Hello Driving Directions Service');
    }

    generalDirections(lat, lon, plat) {
        let origin: any;
        let destination: any;
        let platform = 'ios';
        if (!plat) {
            platform = 'android'
        }
        return new Promise((resolve, reject) => {
            this.geoSrvc.getCurrentPosition(platform).then((res: any) => {
                origin = `${res.lat},${res.lon}`;
                destination = `${lat},${lon}`;
                return this.mapsService.getDirections(origin, destination).then(response => {
                    resolve(response);
                })
            }, (err: any) => {
                console.log('err ', JSON.stringify(err));
                reject('error ' + JSON.stringify(err));

            })

        })
    }
}
