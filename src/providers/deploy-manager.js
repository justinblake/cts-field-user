export function checkForUpdate(callback) {
    return new Promise(function (resolve, reject) {
        IonicCordova.deploy.check(function (res) {
            console.log("Check result: ", res);
            resolve(res);
        });
    });
}
export function downloadUpdate() {
    return new Promise(function (resolve, reject) {
        IonicCordova.deploy.download(function (res) {
            if (res === 'true' || res == 'false') {
                console.log('res in download ', JSON.stringify(res));
                resolve(res);
            }
            else {
                console.log('Download progress:', res);
            }
        });
    });
}
export function extractUpdate() {
    return new Promise(function (resolve, reject) {
        IonicCordova.deploy.extract(function (res) {
            if (res === 'done') {
                console.log('res in extract ', JSON.stringify(res));
                resolve(res);
            }
            else {
                console.log('extract progress:', res);
            }
        });
    });
}
export function loadNewVersion() {
    console.log('inside deploy manager load new version');
    IonicCordova.deploy.redirect().then(function (res) {
        console.log('res ', JSON.stringify(res));
    });
}
export function checkVersions() {
    return new Promise(function (resolve, reject) {
        IonicCordova.deploy.getVersions(function (res) {
            console.log('res ', JSON.stringify(res));
            resolve(res);
        });
    });
}
export function checkVersionInfo() {
    return new Promise(function (resolve, reject) {
        IonicCordova.deploy.info(function (res) {
            console.log('res ', JSON.stringify(res));
            resolve(res);
        });
    });
}
export function deleteOldVersions() {
    var allVersions = [];
    var currentVersion = '';
    return new Promise(function (resolve, reject) {
        IonicCordova.deploy.info(function (res) {
            console.log('res ', JSON.stringify(res));
            currentVersion = res.deploy_uuid;
            IonicCordova.deploy.getVersions(function (res) {
                console.log('res ', JSON.stringify(res));
                allVersions = res;
                for (var i = 0; i < allVersions.length; i++) {
                    if (allVersions[i] !== currentVersion) {
                        IonicCordova.deploy.deleteVersion(allVersions[i]);
                    }
                }
                resolve(allVersions);
            });
        });
    });
}
export function handleError(error, callback) {
    console.error(error);
    callback(error, false);
}
//# sourceMappingURL=deploy-manager.js.map