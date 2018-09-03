import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgxDatePickerComponent} from './ngx-date-picker.component';
import {NgxFormatPipe} from "./ngx-format.pipe";
import {NgSlimScrollModule} from 'ngx-slimscroll';

export {NgxDatePickerOptions, DateModel} from './ngx-date-picker.component';

@NgModule({
  declarations: [
    NgxDatePickerComponent,
    NgxFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSlimScrollModule
  ],
  exports: [
    NgxDatePickerComponent,
    CommonModule,
    NgSlimScrollModule,
    FormsModule
  ]
})
export class NgxDatePickerModule {
}
