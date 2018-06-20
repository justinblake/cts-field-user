import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {Diagnostic} from '@ionic-native/diagnostic';

@Injectable()

/**
 * Service to get the current users geolocation
 */
export class GeolocationService {

    lat: number;
    lon: number;
    locEnabled: boolean = false;
    platform: string;

    constructor(private diagnostic: Diagnostic,
                private geolocation: Geolocation) {
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
                    console.log('res ', JSON.stringify(res));
                    if (res === 'GRANTED' || res === 'authorized_when_in_use' || res === 'authorized') {
                        this.geolocation.getCurrentPosition().then(position => {
                            this.lat = position.coords.latitude;
                            this.lon = position.coords.longitude;
                            let accuracy = position.coords.accuracy;
                            let timestamp = position.timestamp;
                            let locationObj = {
                                lat: this.lat,
                                lon: this.lon,
                                timestamp: timestamp,
                                accuracy: accuracy
                            };
                            resolve(locationObj);
                        }).catch((error) => {
                            this.geolocation.getCurrentPosition().then(position => {
                                this.lat = position.coords.latitude;
                                this.lon = position.coords.longitude;
                                let accuracy = position.coords.accuracy;
                                let timestamp = position.timestamp;
                                let locationObj = {
                                    lat: this.lat,
                                    lon: this.lon,
                                    timestamp: timestamp,
                                    accuracy: accuracy
                                };
                                resolve(locationObj);
                            }).catch((error) => {
                                let locationObj = {
                                    lat: 0,
                                    lon: 0,
                                    accuracy: 0
                                };
                                resolve(locationObj);
                            })
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
