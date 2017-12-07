import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';
import { AlertsPage } from '../alerts/alerts';
import { TaskManager } from "../../providers/task-manager";
import { UserManager } from '../../providers/user-manager';
import { ForemanPage } from "../foreman/foreman";
import { TimecardPage } from "../timecard/timecard";
var TabsPage = /** @class */ (function () {
    function TabsPage(taskManager, userMgr) {
        this.taskManager = taskManager;
        this.userMgr = userMgr;
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
    }
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.js.map