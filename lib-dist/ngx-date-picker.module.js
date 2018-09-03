import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatePickerComponent } from './ngx-date-picker.component';
import { NgxFormatPipe } from "./ngx-format.pipe";
import { NgSlimScrollModule } from 'ngx-slimscroll';
export { NgxDatePickerOptions, DateModel } from './ngx-date-picker.component';
var NgxDatePickerModule = /** @class */ (function () {
    function NgxDatePickerModule() {
    }
    NgxDatePickerModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    NgxDatePickerModule.ctorParameters = function () { return []; };
    return NgxDatePickerModule;
}());
export { NgxDatePickerModule };
//# sourceMappingURL=ngx-date-picker.module.js.map