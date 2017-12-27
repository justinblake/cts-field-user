import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GoogleMapsService } from './google-maps-service';

@Injectable()
export class GoogleMapsManager {

  constructor(public http: Http, private mapsService:GoogleMapsService) {
    console.log('Hello GoogleMapsManager Provider');
  }

  getDirections(origin, destination){
    console.log(`Getting directions: (${origin}), (${destination})`);
    return this.mapsService.getDirections(origin, destination);
  }

}
