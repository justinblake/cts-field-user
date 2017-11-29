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

    return new Promise((resolve, reject) => {

        let myResponse: string;
        // Check for available updates
        IonicCordova.deploy.check((response: any) => {

            console.log("Check result:", response);

            if (response === 'true') {
                myResponse = 'true';
            } else if (response === 'false') {
                myResponse = 'false';
            }
            if (response === 'true') {
                // A new version is ready to download
                IonicCordova.deploy.download((result: any) => {
                    if (result === 'true' || result == 'false') {
                        // We can unzip the latest version
                        IonicCordova.deploy.extract(config.appId, (res: any) => {
                            if (res === 'true' || res == 'false') {
                                resolve(myResponse);
                                // // we're ready to load the new version
                                // IonicCordova.deploy.redirect(() => {
                                //     callback(null, true)
                                // }, (e: any) => {
                                //     handleError(e, callback)
                                // })
                            } else {
                                // It's a progress update
                                console.log('Extract progress:', res)
                            }
                        }, (e: any) => {
                            handleError(e, callback)
                        })
                    } else {

                        // It's a progress update
                        console.log('Download progress:', result)
                    }
                }, (e: any) => {
                    handleError(e, callback)
                })
            }
            if(response === 'false') {
                resolve(myResponse);
            }
            console.log('myResponse ' + myResponse + 'type of ' + typeof myResponse);


        }, (e: any) => {
            reject(handleError(e, callback))
        });

    })


}

export function handleError(error: any, callback: (err: any, success: boolean) => void) {
    console.error(error);
    callback(error, false)
}

export function loadNewVersion() {
    console.log('inside deploy manager load new version');
    IonicCordova.deploy.redirect().then((res: any) => {
        console.log('res ', JSON.stringify(res));
    });
}



