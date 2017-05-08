import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SlimScrollModule } from 'ng2-slimscroll';

import { NgxDatePickerComponent } from './ngx-datepicker.component';
import {NgxFormatPipe} from "./ngx-format.pipe";
export { NgxDatePickerOptions, DateModel } from './ngx-datepicker.component';

@NgModule({
  declarations: [
    NgxDatePickerComponent,
    NgxFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SlimScrollModule
  ],
  exports: [
    NgxDatePickerComponent,
    SlimScrollModule,
    FormsModule
  ]
})
export class DatePickerModule { }
