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
            if (res === 'true' || res == 'false') {
                console.log('res in download ', JSON.stringify(res));
                resolve(res);
            }
            // else {
            //     console.log('Download progress:', res)
            // }
        })
    })
}

export function extractUpdate() {
    return new Promise((resolve, reject) => {
        IonicCordova.deploy.extract((res: any) => {
            if (res === 'done') {
                console.log('res in extract ', JSON.stringify(res));
                resolve(res);
            }
            // else {
            //     console.log('extract progress:', res)
            // }
        })
    })
}

export function loadNewVersion() {
    IonicCordova.deploy.redirect().then(() => {

    });
}

// export function checkVersions() {
//     return new Promise((resolve, reject) => {
//         IonicCordova.deploy.getVersions((res: any) => {
//             console.log('res ', JSON.stringify(res));
//             resolve(res);
//         })
//     })
// }
//
// export function checkVersionInfo() {
//     return new Promise((resolve, reject) => {
//         IonicCordova.deploy.info((res: any) => {
//             console.log('res ', JSON.stringify(res));
//             resolve(res);
//         })
//     })
// }
//
// export function deleteOldVersions() {
//
//     let allVersions = [];
//     let currentVersion = '';
//
//     return new Promise((resolve, reject) => {
//
//         IonicCordova.deploy.info((res: any) => {
//             console.log('res ', JSON.stringify(res));
//             currentVersion = res.deploy_uuid;
//             IonicCordova.deploy.getVersions((res: any) => {
//                 console.log('res ', JSON.stringify(res));
//                 allVersions = res;
//
//                 for(let i = 0; i < allVersions.length; i++) {
//                     if(allVersions[i] !== currentVersion) {
//                         IonicCordova.deploy.deleteVersion(allVersions[i])
//                     }
//                 }
//                 resolve(allVersions);
//             })
//         })
//     })
// }


export function handleError(error: any, callback: (err: any, success: boolean) => void) {
    console.error(error);
    callback(error, false)
}
