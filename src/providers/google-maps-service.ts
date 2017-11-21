import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Utils } from '../utils/utils';

declare var google;
@Injectable()
export class GoogleMapsService {
  key:string = "AIzaSyCNru80Dz-6HKpPHbtj0oJAq2RvAlBcYL0";
  endpoint:string = "https://maps.googleapis.com/maps/api/directions/json?callback=JSONP_CALLBACK";
  directionsService:any;
  constructor(public http: Http) {
    console.log('Hello GoogleMapsService Provider');
    //this.directionsService = new google.maps.DirectionsService();
  }

  getDirections(origin, destination){
    this.directionsService = new google.maps.DirectionsService();
    return new Promise((resolve, reject) => {
      //origin = '40.7441704,-111.8628205'; //somewhere in SLC
      //destination = 'Provo, UT';
      let request = {
        origin : origin,
        destination: destination,
        travelMode: 'DRIVING'
      }
      this.directionsService.route(request, (result, status) => {
        //console.log(`ROUTE: ${status} ${Utils.toJson(result)}` );
        //console.log(result.routes[0])
        if (status == 'OK') {
          resolve(JSON.parse(JSON.stringify(result)));
        }else{
          reject(result);
        }
      });
    })
  }
}
