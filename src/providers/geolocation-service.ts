import { Injectable } from '@angular/core';
import { Geolocation } from 'ionic-native';

@Injectable()

/**
 * Service to get the current users geolocation
 */
export class GeolocationService {

  constructor() {  }

  getCurrentPosition(){
    return Geolocation.getCurrentPosition();
  }

  watchPosition(){
    //not implemented
  }

}
