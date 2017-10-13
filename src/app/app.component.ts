import { Component } from '@angular/core';

import { DateModel, NgxDatePickerOptions } from '../ngx-date-picker/ngx-date-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  date: DateModel;
  options: NgxDatePickerOptions;

  constructor() {
    this.options = new NgxDatePickerOptions({
      views: ['month', 'year', 'day'],
      formatDisplay: 'MM/YYYY',
      locale: 'es',
      firstWeekdaySunday: false
    });
  }
}
