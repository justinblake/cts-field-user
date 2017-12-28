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

        return new Promise((resolve, reject) => {
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
                this.geolocation.getCurrentPosition({timeout: 20000, enableHighAccuracy: true}).then(position => {
                    this.lat = position.coords.latitude;
                    this.lon = position.coords.longitude;
                    console.log('this.lat in high accuracy', JSON.stringify(this.lat));
                    console.log('this.lon in high accuracy', JSON.stringify(this.lon));
                    resolve(`${this.lat},${this.lon}`);
                }).catch((error) => {
                    console.log('geo error catch');

                    this.geolocation.getCurrentPosition({
                        timeout: 40000,
                        enableHighAccuracy: false
                    }).then(position => {
                        this.lat = position.coords.latitude;
                        this.lon = position.coords.longitude;

                        console.log('this.lon in low accuracy', JSON.stringify(this.lon));
                        console.log('this.lat in low accuracy', JSON.stringify(this.lat));

                        resolve(`${this.lat},${this.lon}`);
                    }).catch((error) => {
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
