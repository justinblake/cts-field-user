import {Injectable} from '@angular/core';
import {Geolocation, GeolocationOptions} from '@ionic-native/geolocation';
import {Diagnostic} from '@ionic-native/diagnostic';

@Injectable()

/**
 * Service to get the current users geolocation
 */
export class GeolocationService {

    lat: number;
    lon: number;
    accuracy: number;
    locEnabled: boolean = false;
    platform: string;
    debug: boolean = false;

    constructor(private diagnostic: Diagnostic,
                private geolocation: Geolocation) {
    }

    returnLatestPosition() {
        return ({lat: this.lat, lon: this.lon, accuracy: this.accuracy})
    }

    getCurrentBackgroundLocation(maxAge?: number, maxTime?: number) {
        return new Promise((resolve, reject) => {

            let options = {
                maximumAge: 0,
                timeout: 30000
            } as GeolocationOptions;

            if (maxAge) {
                options.maximumAge = maxAge;
                options.timeout = maxTime;
            }

            this.geolocation.getCurrentPosition(options).then(position => {
                this.lat = position.coords.latitude;
                this.lon = position.coords.longitude;
                this.accuracy = position.coords.accuracy;
                if (this.debug) {
                    console.log('this.accuracy 1 ', this.accuracy);
                    console.log('this.lon 1 ', this.lon);
                    console.log('this.lat 1 ', this.lat);
                }

                let locationObj = {
                    lat: this.lat,
                    lon: this.lon,
                    accuracy: this.accuracy
                };
                resolve(locationObj);
            }).catch((error) => {
                let locationObj = {
                    lat: 0,
                    lon: 0,
                    accuracy: 0
                };
                resolve(locationObj);
                if (this.debug) {
                    console.log('error in catch ', error);
                }
            });


        })
    }


    getCurrentPosition(plat) {
        this.locEnabled = false;
        this.lat = 0;
        this.lon = 0;
        this.platform = plat;
        return new Promise((resolve, reject) => {
            this.verifyLocationEnabled().then((res: any) => {
                if (!this.locEnabled) {
                    if (this.platform === 'android') {
                        this.diagnostic.switchToLocationSettings();
                    } else if (this.platform === 'ios') {
                        this.diagnostic.switchToSettings().then((res: any) => {
                        })
                    }
                } else {
                    return
                }
            }).then(() => {
                this.diagnostic.getLocationAuthorizationStatus().then((res: any) => {
                    if (this.debug) {
                        console.log('res ', JSON.stringify(res));
                    }
                    if (res === 'GRANTED' || res === 'authorized_when_in_use' || res === 'authorized') {

                        let options = {
                            timeout: 10000
                        } as GeolocationOptions;


                        this.geolocation.getCurrentPosition(options).then(position => {
                            this.lat = position.coords.latitude;
                            this.lon = position.coords.longitude;
                            this.accuracy = position.coords.accuracy;
                            if (this.debug) {
                                console.log('this.accuracy ', this.accuracy);
                                console.log('this.lon ', this.lon);
                                console.log('this.lat ', this.lat);
                            }
                            let locationObj = {
                                lat: this.lat,
                                lon: this.lon,
                                accuracy: this.accuracy
                            };
                            resolve(locationObj);
                        }).catch((error) => {
                            if (this.debug) {
                                console.log('error in catch ', error);
                                console.log('inside the catch after two attempts ');
                            }
                            let locationObj = {
                                lat: 0,
                                lon: 0,
                                accuracy: 0
                            };
                            resolve(locationObj);
                        });
                    } else if (res === 'denied' || res === 'DENIED_ALWAYS') {

                        let locationObj = {
                            lat: 0,
                            lon: 0,
                            accuracy: 0
                        };
                        resolve(locationObj);
                    }
                    else {
                        this.diagnostic.requestLocationAuthorization().then((res: any) => {
                        })
                    }
                }, (error: any) => {
                })
            })
        })
    }

    watchPosition() {
        //not implemented
    }

    verifyLocationEnabled() {
        return new Promise((resolve, reject) => {
            let successCallback = (isAvailable) => {
                if (isAvailable) {
                    this.locEnabled = true;
                    resolve(this.locEnabled);
                } else {
                    resolve(this.locEnabled);
                }
            };
            let errorCallback = (e) => {
                reject(this.locEnabled);
            };
            this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
        })
    }
}
