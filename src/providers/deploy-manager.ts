import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';

declare var IonicCordova;

@Injectable()
export class DeployManager {

    myResponse: boolean;


    update(callback?: (err: any, success: boolean) => void) {
        // Set our app data (OPTIONAL)
        let config = {
            appId: "379d0062",
            channel: "Master"
        };



        // Initialize the deploy plugin (OPTIONAL)
        IonicCordova.deploy.init(config, (res: any) => {
            console.log(res)
        }, (err: any) => {
            this.handleError(err, callback)
        });

        // Check for available updates
        IonicCordova.deploy.check((res: any) => {
            console.log("Check result:", res);

            if(res === 'true') {
                this.myResponse = true;
            } else {
                this.myResponse = false
            }




            // if (res === 'true') {
            //
            //     // A new version is ready to download
            //     IonicCordova.deploy.download((res: any) => {
            //         if (res === 'true' || res == 'false') {
            //
            //             // We can unzip the latest version
            //             IonicCordova.deploy.extract(appId, (res: any) => {
            //                 if (res === 'true' || res == 'false') {
            //
            //                     // we're ready to load the new version
            //                     IonicCordova.deploy.redirect(() => {
            //                         callback(null, true)
            //                     }, (e: any) => {
            //                         this.handleError(e, callback)
            //                     })
            //                 } else {
            //
            //                     // It's a progress update
            //                     console.log('Extract progress:', res)
            //                 }
            //             }, (e: any) => {
            //                 this.handleError(e, callback)
            //             })
            //         } else {
            //
            //             // It's a progress update
            //             console.log('Download progress:', res)
            //         }
            //     }, (e: any) => {
            //         this.handleError(e, callback)
            //     })
            // }
        }, (e: any) => {
            this.handleError(e, callback)
        }).then(()=> {
            return this.myResponse;
        })


    }

    returnResults() {
        return this.myResponse;
    }



    handleError(error: any, callback: (err: any, success: boolean) => void) {
        console.error(error);
        callback(error, false)
    }


}
