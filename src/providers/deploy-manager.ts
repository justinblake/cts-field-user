declare var IonicCordova;


export function checkForUpdate(callback?: (err: any, success: boolean) => void) {

    return new Promise((resolve, reject) => {
        IonicCordova.deploy.check((res: any) => {
            console.log("Check result: ", res);
            resolve(res);
        })
    })
}

export function downloadUpdate() {
    return new Promise((resolve, reject) => {
        IonicCordova.deploy.download((res: any) => {
        if  (res === 'true' || res == 'false') {
            console.log('res in download ', JSON.stringify(res));
            resolve(res);
        }
        else {
          console.log('Download progress:', res)
        }
        })
    })
}

export function extractUpdate() {
    return new Promise((resolve, reject) => {
        IonicCordova.deploy.extract((res: any) => {
        if  (res === 'done') {
            console.log('res in extract ', JSON.stringify(res));
            resolve(res);
        }
        else {
          console.log('extract progress:', res)
        }
        })
    })
}

export function loadNewVersion() {
    console.log('inside deploy manager load new version');
    IonicCordova.deploy.redirect().then((res: any) => {
        console.log('res ', JSON.stringify(res));
    });
}

export function handleError(error: any, callback: (err: any, success: boolean) => void) {
    console.error(error);
    callback(error, false)
}



