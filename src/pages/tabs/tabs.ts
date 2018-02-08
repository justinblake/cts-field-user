import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {ManageTasksHomePage} from "../manage-tasks-home/manage-tasks-home";
import {HistoryPage} from '../history/history';
import {AlertsPage} from '../alerts/alerts';
import {TaskManager} from "../../providers/task-manager";
import {UserManager} from '../../providers/user-manager';
import {ForemanPage} from "../foreman/foreman";
import {TimecardPage} from "../timecard/timecard";

@Component({
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root: any = HomePage;
    tab2Root: any = HistoryPage;
    tab3Root: any = AlertsPage;
    tab4Root: any = TimecardPage;
    tab5Root: any = ForemanPage;
    tab6Root: any = ManageTasksHomePage;

    currentUser: any = '';
    disableTabs: boolean = false;
    foremanTab: boolean = false;
    isLessor: boolean = false;
    managesTasks: boolean = false;

    constructor(public taskManager: TaskManager,
                private userMgr: UserManager) {
        this.currentUser = this.userMgr.getUser();

        if (this.currentUser.role_id === 6) {
            this.disableTabs = true;
        }
        if (this.currentUser.role_id === 5 || this.currentUser.role_id === 2 || this.currentUser.role_id === 4) {
            this.foremanTab = true;
        }
        if (this.currentUser.is_lessor === 1) {
            this.isLessor = true;
        }


        //This will load a new home page for the user where all the
        // tasks are visible on the home page instead of one at a time
        if (this.currentUser.manages_tasks === 1) {
            this.managesTasks = true;
        }
    }
}
