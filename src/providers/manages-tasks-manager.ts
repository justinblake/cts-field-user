import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ManagesTasksManager {

    activeTask: any;
    hasTask: boolean = false;

    constructor() {
        console.log('manages tasks manager here')
    }


    storeTask(task) {
        this.activeTask = task;
        this.hasTask = true;
    }

    removeTask() {
        this.activeTask = {};
        this.hasTask = false;
    }

    updateTaskStatus(status) {
        this.activeTask.status_id = status;
    }

    returnTask() {
        console.log('this.hasTask in manager ', JSON.stringify(this.hasTask));
        console.log('this.activeTask in manager ', JSON.stringify(this.activeTask));
        return {activeTask: this.activeTask, hasTask: this.hasTask};
    }



}