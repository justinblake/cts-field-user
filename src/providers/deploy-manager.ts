import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';

declare var IonicCordova;

export function update(callback?: (err: any, success: boolean) => void) {



    // Set our app data (OPTIONAL)
    let config = {
        appId: "379d0062",
        channel: "Master"
    };

    // Initialize the deploy plugin (OPTIONAL)
    IonicCordova.deploy.init(config, (res: any) => {
        console.log(res)
    }, (err: any) => {
        handleError(err, callback)
    });

    let myResponse: string;
    // Check for available updates
    IonicCordova.deploy.check((res: any) => {
        console.log("Check result:", res);


        if (res === 'true') {
            myResponse = 'true';
        } else if (res === 'false') {
            myResponse = 'false';
        }


        if (res === 'true') {

            // A new version is ready to download
            IonicCordova.deploy.download((res: any) => {
                if (res === 'true' || res == 'false') {

                    // We can unzip the latest version
                    IonicCordova.deploy.extract(config.appId, (res: any) => {
                        if (res === 'true' || res == 'false') {

                            // we're ready to load the new version
                            IonicCordova.deploy.load(() => {
                                callback(null, true)
                            }, (e: any) => {
                                handleError(e, callback)
                            })
                        } else {

                            // It's a progress update
                            console.log('Extract progress:', res)
                        }
                    }, (e: any) => {
                        handleError(e, callback)
                    })
                } else {

                    // It's a progress update
                    console.log('Download progress:', res)
                }
            }, (e: any) => {
                handleError(e, callback)
            })
        }

        console.log('myResponse ' + myResponse);
        return myResponse

    }, (e: any) => {
        handleError(e, callback)
    });


}

export function handleError(error: any, callback: (err: any, success: boolean) => void) {
    console.error(error);
    callback(error, false)
}

export function loadNewVersion() {
    console.log('inside deploy manager load new version');
    IonicCordova.deploy.load();
}



