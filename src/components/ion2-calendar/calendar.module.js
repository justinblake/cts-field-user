import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalendarController } from './calendar.controller';
import { IonicModule, ModalController } from 'ionic-angular';
import { CalendarService } from "./services/calendar.service";
import { CALENDAR_COMPONENTS } from "./components/index";
export function calendarController(modalCtrl, calSvc) {
    return new CalendarController(modalCtrl, calSvc);
}
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    return CalendarModule;
}());
export { CalendarModule };
//# sourceMappingURL=calendar.module.js.map