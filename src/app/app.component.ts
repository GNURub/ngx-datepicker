import { Component } from '@angular/core';

import { DateModel, NgxDatePickerOptions } from '../ngx-datepicker/ngx-datepicker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  date: DateModel;
  options: NgxDatePickerOptions;

  constructor() {
    this.options = new NgxDatePickerOptions({
      view: 'month'
    });
  }
}
