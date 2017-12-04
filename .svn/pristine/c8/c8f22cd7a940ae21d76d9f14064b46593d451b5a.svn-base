import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { GeolocationService } from '../geolocation-service/geolocation-service';

import { GoogleMapsService } from './google-maps-service';
//import { Utils } from '../../utils/utils';

@Injectable()
export class GoogleMapsManager {

  constructor(public http: Http, private mapsService:GoogleMapsService) {
    console.log('Hello GoogleMapsManager Provider');
  }

  getDirections(origin, destination){
    //let origin = '40.7441704,-111.8628205';
    console.log(`Getting directions: (${origin}), (${destination})`);
    return this.mapsService.getDirections(origin, destination);
  }

}
