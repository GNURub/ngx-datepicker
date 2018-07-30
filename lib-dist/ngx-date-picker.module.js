import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlimScrollModule } from 'ng2-slimscroll';
import { NgxDatePickerComponent } from './ngx-date-picker.component';
import { NgxFormatPipe } from "./ngx-format.pipe";
export { NgxDatePickerOptions, DateModel } from './ngx-date-picker.component';
var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    return DatePickerModule;
}());
export { DatePickerModule };
DatePickerModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
/** @nocollapse */
DatePickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ngx-date-picker.module.js.map