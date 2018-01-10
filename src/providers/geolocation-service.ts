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
        this.platform = plat;

        console.log('step 1')

        return new Promise((resolve, reject) => {
            console.log('step 2')
            this.verifyLocationEnabled().then(() => {
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
                console.log('new maximum age');
                this.geolocation.getCurrentPosition({
                    maximumAge: 15000,
                    timeout: 20000,
                    enableHighAccuracy: true
                }).then(position => {
                    console.log('position ', JSON.stringify(position));
                    this.lat = position.coords.latitude;
                    this.lon = position.coords.longitude;
                    let accuracy = position.coords.accuracy;
                    let timestamp = position.timestamp;

                    console.log('timestamp ', JSON.stringify(timestamp));
                    console.log('accuracy ', JSON.stringify(accuracy));
                    console.log('this.lat in high accuracy', JSON.stringify(this.lat));
                    console.log('this.lon in high accuracy', JSON.stringify(this.lon));

                    let locationObj = {
                        lat: this.lat,
                        lon: this.lon,
                        timestamp: timestamp,
                        accuracy: accuracy
                    };


                    resolve(locationObj);
                }).catch((error) => {
                    console.log('error ', JSON.stringify(error));
                    console.log('geo error catch');

                    this.geolocation.getCurrentPosition({
                        timeout: 40000,
                        enableHighAccuracy: false
                    }).then(position => {
                        this.lat = position.coords.latitude;
                        this.lon = position.coords.longitude;
                        let accuracy = position.coords.accuracy;
                        let timestamp = position.timestamp;

                        console.log('this.lon in low accuracy', JSON.stringify(this.lon));
                        console.log('this.lat in low accuracy', JSON.stringify(this.lat));
                        console.log('timestamp in low accuracy', JSON.stringify(timestamp));
                        console.log('accuracy in low accuracy', JSON.stringify(accuracy));

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
                console.log('e in error of verifyLocationEnabled() ', JSON.stringify(e));
                reject(this.locEnabled);
            };
            this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
        })
    }

}
