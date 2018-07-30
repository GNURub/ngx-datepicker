import { Pipe } from '@angular/core';
import * as dateFns from 'date-fns';
import { locales } from './constants';
var NgxFormatPipe = (function () {
    function NgxFormatPipe() {
    }
    NgxFormatPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var options = {};
        if (args && args[1] && locales.hasOwnProperty(args[1])) {
            options.locale = locales[args[1]];
        }
        return dateFns.format(value, args[0] || "DD/MM/YYYY", options);
    };
    return NgxFormatPipe;
}());
export { NgxFormatPipe };
NgxFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'ngxFormat'
            },] },
];
/** @nocollapse */
NgxFormatPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=ngx-format.pipe.js.map