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

        console.log('step 1');

        return new Promise((resolve, reject) => {
            console.log('step 2');
            this.verifyLocationEnabled().then((res: any) => {

                console.log('res in verify location ', JSON.stringify(res));

                if (!this.locEnabled) {
                    if (this.platform === 'android') {
                        this.diagnostic.switchToLocationSettings();
                    } else if (this.platform === 'ios') {
                        this.diagnostic.switchToSettings().then((res: any) => {
                            console.log('res in ios switchToSettings() ', JSON.stringify(res));
                        })
                    }

                } else {
                    return
                }
            }).then(() => {
                this.diagnostic.getLocationAuthorizationStatus().then((res: any) => {

                    if (res === 'GRANTED') {
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
                            // console.log('this.lon in high accuracy', JSON.stringify(this.lon));
                            // console.log('this.lat in high accuracy', JSON.stringify(this.lat));
                            // console.log('timestamp in high accuracy', JSON.stringify(timestamp));
                            // console.log('accuracy in high accuracy', JSON.stringify(accuracy));
                            resolve(locationObj);
                        }).catch((error) => {
                            console.log('geo error catch');
                            this.geolocation.getCurrentPosition().then(position => {
                                this.lat = position.coords.latitude;
                                this.lon = position.coords.longitude;
                                let accuracy = position.coords.accuracy;
                                let timestamp = position.timestamp;
                                // console.log('this.lon in low accuracy', JSON.stringify(this.lon));
                                // console.log('this.lat in low accuracy', JSON.stringify(this.lat));
                                // console.log('timestamp in low accuracy', JSON.stringify(timestamp));
                                // console.log('accuracy in low accuracy', JSON.stringify(accuracy));
                                let locationObj = {
                                    lat: this.lat,
                                    lon: this.lon,
                                    timestamp: timestamp,
                                    accuracy: accuracy
                                };
                                resolve(locationObj);
                            }).catch((error) => {
                                console.log('error ', JSON.stringify(error));
                                reject("error");
                            })
                        });
                    } else {
                        this.diagnostic.requestLocationAuthorization().then((res: any) => {
                            console.log('res in request location authorization ', JSON.stringify(res));
                        })
                    }
                }, (error: any) => {
                    console.log('error in getLocationAuthorizationStatus ', JSON.stringify(error));
                })
            })
        })
    }

    watchPosition() {
        //not implemented
    }

    verifyLocationEnabled() {

        console.log('inside verify ');

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
                console.log('e in error of verifyLocationEnabled() ', JSON.stringify(e));
                reject(this.locEnabled);
            };
            this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
        })
    }

}
