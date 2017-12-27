import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';

import {CallNumber} from '@ionic-native/call-number';
import {TaskManager} from '../../providers/task-manager';
import {Utils} from '../../utils/utils';
import {ConversionManager} from "../../providers/conversion-manager";
import {Diagnostic} from "@ionic-native/diagnostic";
import {Geolocation} from '@ionic-native/geolocation';
import {DrivingDirectionsPage} from '../driving-directions/driving-directions';
import {GoogleMapsManager} from "../../providers/google-maps-manager";


@Component({
    selector: 'page-single-foreman-task',
    templateUrl: 'single-foreman-task.html',

})

export class SingleForemanTaskPage {
    @ViewChild(Content) content: Content;

    debug: boolean;
    currentTask: any;
    strTime: any;
    task_description: any;
    status_id: any;
    task_crew: any;
    task_equipment: any;
    additional_notes: any;
    task_materials: any;
    contractor_contacts: any;
    isIos: boolean = false;
    employeeId: number = -1;
    taskId: any;
    delayNotes: any = [];
    contractor_name: any;
    contractor_phone: any;
    url: string = "https://www.cleartasksolutions.com/uploads/";
    detailedStats: any = {
        emp: -1
    };
    imageLength: number = -1;
    role_id: number = -1;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public taskMgr: TaskManager,
                private callNumber: CallNumber,
                private conMgr: ConversionManager,
                private utils: Utils,
                private diagnostic: Diagnostic,
                private geolocation: Geolocation,
                private mapsManager: GoogleMapsManager) {

        this.debug = this.utils.returnDebug();

        this.taskId = navParams.get('id');
        this.strTime = navParams.get('strTime');
        this.task_description = navParams.get('task_description');
        this.status_id = navParams.get('status_id');
        this.task_crew = navParams.get('task_crew');
        this.task_equipment = navParams.get('task_equipment');
        this.additional_notes = navParams.get('additional_notes');
        this.task_materials = navParams.get('task_materials');
        this.contractor_contacts = navParams.get('contractor_contacts');
        this.contractor_name = navParams.get('contractor_name');
        this.contractor_phone = navParams.get('contractor_phone');
        this.isIos = this.taskMgr.returnPlatform().isIos;
    }

    setBackground(crew) {
        let cssClasses;

        if (crew.status_id === 3 && crew.role_id === 6) {
            cssClasses = {
                'completed': true
            }
        } else if (crew.status_id === 3) {
            cssClasses = {
                'accepted': true
            }
        } else if (crew.status_id === 4) {
            cssClasses = {
                'started': true
            }
        } else if (crew.status_id === 9) {
            cssClasses = {
                'completed': true
            }
        } else if (crew.status_id === 7) {
            cssClasses = {
                'emergency': true
            }
        } else if (crew.status_id === 8) {
            cssClasses = {
                'rejected': true
            }
        } else if (crew.status_id === 2 || crew.status_id === 1) {
            cssClasses = {
                'sent': true
            }
        } else if (crew.status_id === 11) {
            cssClasses = {
                'cancelled': true
            }
        } else if (crew.status_id === 12 || crew.status_id === 5 || crew.status_id === 13 || crew.status_id === 6) {
            cssClasses = {
                'temporary': true
            }
        }
        return cssClasses
    }

    callPhone(number) {
        this.callNumber.callNumber(number, false)
            .then(() => {
                if (this.debug) {
                    console.log('Launched dialer!')
                }
            })
            .catch(() => {
                if (this.debug) {
                    console.log('Error launching dialer')
                }
            });
    }

    detailedStatus(emp) {
        this.imageLength = 0;

        if (this.detailedStats.emp === -1) {
            this.detailedStats.emp = emp;
        }
        else if (this.detailedStats.emp === emp) {
            this.detailedStats.emp = -1;
        }
        else if (this.detailedStats.emp !== emp && this.detailedStats.emp !== -1) {
            this.detailedStats.emp = emp;
        }

    }

    adjustTime(time) {
        return this.conMgr.adjustTime(time);
    }

    loadNotes(emp, taskId) {
        let empId = emp.employee_id;

        if (this.employeeId === empId) {
            this.employeeId = -1;
        } else {
            this.utils.presentLoading();
            this.employeeId = empId;
            this.taskMgr.loadSpecificTaskUserLog(empId, taskId).then((response: any) => {

                this.delayNotes = [];
                this.imageLength = -1;
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].status_id === 5 || response.data[i].status_id === 6 || response.data[i].status_id === 7 || response.data[i].status_id === 12) {

                        let newEntry = {
                            notes: response.data[i].notes,
                            timestamp: response.data[i].updatedTime,
                            images: []
                        };
                        if (response.data[i].fileData.length > 0) {
                            this.imageLength += response.data[i].fileData.length;
                            for (let j = 0; j < response.data[i].fileData.length; j++) {

                                let image = this.url + response.data[i].fileData[j].file_name;
                                newEntry.images.push(image);
                            }
                        }
                        this.delayNotes.push(newEntry);
                    }
                }
                this.utils.dismissLoading();
            }).then(res => {
                return this.delayNotes;
            });
        }
    }

    getEmployeeName(emps: any, equip) {
        equip.name = '';
        for (let i = 0; i < emps.length; i++) {
            if (emps[i].employee_id === equip.employee_id) {
                equip.name = emps[i].first_name + " " + emps[i].last_name;
            }
        }
        return equip.name;
    }

    showDrivingDirections(lat, lon) {
        this.utils.presentLoading();
        let locEnabled: boolean = false;
        let successCallback = (isAvailable) => {
            if (isAvailable) {
                locEnabled = true;
                return locEnabled;
            } else {
                this.utils.presentToast("Please enable your location in device settings", true);
                return;
            }
        };
        let errorCallback = (e) => {
            this.utils.presentToast("Please enable your location in device settings", true);
            this.utils.dismissLoading();
        };

        this.diagnostic.isLocationEnabled().then(successCallback).then(resp => {
            if (locEnabled) {
                let destination = `${lat},${lon}`;
                this.geolocation.getCurrentPosition({timeout: 15000}).then((position) => {
                    let origin = `${position.coords.latitude},${position.coords.longitude}`;
                    return this.mapsManager.getDirections(origin, destination);
                }).then((response) => {
                    let params = {
                        directions: response
                    };
                    setTimeout(() => {
                        this.navCtrl.push(DrivingDirectionsPage, params);
                        this.utils.dismissLoading();
                    }, 2000)
                }).catch((error) => {
                    this.utils.dismissLoading();
                    this.utils.presentToast("Please enable your location in device settings", true);
                })
            }
            if (locEnabled === false) {
                this.utils.dismissLoading();
            }
        }).catch(errorCallback);
    }
}
