import { Component } from '@angular/core';

import { DateModel, NgxDatePickerOptions } from '../ngx-date-picker/ngx-date-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date: DateModel;
  options: NgxDatePickerOptions;

  constructor() {
    this.options =new NgxDatePickerOptions({
      views: ['year', 'month', 'day'],
      formatDisplay: 'YYYY/MM/DD',
      maxDate: (new Date()),
      locale: 'es',
      disablePassDate: false
    });
  }
}
