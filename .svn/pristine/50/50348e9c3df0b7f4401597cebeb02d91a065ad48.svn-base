import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-calendar-week',
  templateUrl: 'calendar-week.html'
})

export class CalendarWeekComponent {

  _weekArray: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  _weekStart: number = 0;
  @Input() color: string = 'primary';

  constructor() {
  }

  @Input()
  set weekArray(value: string[]) {
    if (value && value.length === 7) {
      this._weekArray = value;
      this.adjustSort();
    }
  }

  @Input()
  set weekStart(value: number) {
    if (value === 0 || value === 1) {
      this._weekStart = value;
      this.adjustSort();
    }
  }

  adjustSort() {
    if (this._weekStart === 1) {
      this._weekArray.push(this._weekArray.shift())
    }
  }

}
