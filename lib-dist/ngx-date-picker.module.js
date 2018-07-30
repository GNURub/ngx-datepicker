import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlimScrollModule } from 'ng2-slimscroll';
import { NgxDatePickerComponent } from './ngx-date-picker.component';
import { NgxFormatPipe } from "./ngx-format.pipe";
export { NgxDatePickerOptions, DateModel } from './ngx-date-picker.component';
var NgxDatePickerModule = (function () {
    function NgxDatePickerModule() {
    }
    return NgxDatePickerModule;
}());
export { NgxDatePickerModule };
NgxDatePickerModule.decorators = [
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
NgxDatePickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ngx-date-picker.module.js.map