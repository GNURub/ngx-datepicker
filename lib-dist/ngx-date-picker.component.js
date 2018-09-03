import { Component, ElementRef, Inject, forwardRef, Input, Output, EventEmitter, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as dateFns from 'date-fns';
import { locales } from './constants';
var DateModel = /** @class */ (function () {
    function DateModel(obj) {
        this.day = obj && obj.day ? obj.day : null;
        this.month = obj && obj.month ? obj.month : null;
        this.year = obj && obj.year ? obj.year : null;
        this.formatted = obj && obj.formatted ? obj.formatted : null;
        this.formattedToDisplay = obj && obj.formattedToDisplay ? obj.formattedToDisplay : this.formatted;
        this.date = obj && obj.date ? obj.date : null;
    }
    return DateModel;
}());
export { DateModel };
var NgxDatePickerOptions = /** @class */ (function () {
    function NgxDatePickerOptions(obj) {
        this.views = [];
        this.autoApply = (obj && obj.autoApply === true);
        this.style = obj && obj.style ? obj.style : 'normal';
        this.locale = obj && obj.locale ? obj.locale : 'en';
        this.minDate = obj && obj.minDate ? obj.minDate : null;
        this.maxDate = obj && obj.maxDate ? obj.maxDate : null;
        this.initialDate = obj && obj.initialDate ? obj.initialDate : null;
        this.firstCalendarDay = obj && obj.firstCalendarDay ? obj.firstCalendarDay : 1;
        this.formatOut = obj && obj.formatOut ? obj.formatOut : 'YYYY-MM-DD';
        this.formatDisplay = obj && obj.formatDisplay ? obj.formatDisplay : this.formatOut;
        this.selectYearText = obj && obj.selectYearText ? obj.selectYearText : 'Select Year';
        this.todayText = obj && obj.todayText ? obj.todayText : 'Today';
        this.clearText = obj && obj.clearText ? obj.clearText : 'Clear';
        this.dayNamesFormat = obj && obj.dayNamesFormat ? obj.dayNamesFormat : 'ddd';
        this.disablePassDate = obj && !!obj.disablePassDate;
        this.views = obj && obj.views && Array.isArray(obj.views) && obj.views.length > 0 ? obj.views : ['day', 'month', 'year'];
    }
    return NgxDatePickerOptions;
}());
export { NgxDatePickerOptions };
export var CALENDAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgxDatePickerComponent; }),
    multi: true
};
var NgxDatePickerComponent = /** @class */ (function () {
    function NgxDatePickerComponent(el) {
        var _this = this;
        this.el = el;
        this.placeholder = '';
        this.view = 'day';
        this.onTouchedCallback = function () {
        };
        this.onChangeCallback = function () {
        };
        this.opened = false;
        this.currentDate = new Date();
        this.options = this.options || new NgxDatePickerOptions();
        this.days = [];
        this.years = [];
        this.months = [];
        this.date = new DateModel({
            day: null,
            month: null,
            year: null,
            formatted: null,
            formattedToDisplay: null,
            date: null
        });
        this.outputEvents = new EventEmitter();
        if (!this.inputEvents) {
            return;
        }
        this.inputEvents.subscribe(function (event) {
            if (event.type === 'setDate') {
                _this.value = event.data;
            }
            else if (event.type === 'default') {
                if (event.data === 'open') {
                    _this.open();
                }
                else if (event.data === 'close') {
                    _this.close();
                }
            }
        });
    }
    NgxDatePickerComponent.prototype.initDayNames = function () {
        this.dayNames = [];
        var start = this.options.firstCalendarDay;
        for (var i = start; i <= 6 + start; i++) {
            var date = dateFns.setDay(new Date(), i);
            this.dayNames.push(dateFns.format(date, this.options.dayNamesFormat, { locale: this.options.locale }));
        }
    };
    Object.defineProperty(NgxDatePickerComponent.prototype, "value", {
        get: function () {
            return this.date;
        },
        set: function (date) {
            if (!date) {
                return;
            }
            this.date = date;
            this.onChangeCallback(date);
        },
        enumerable: true,
        configurable: true
    });
    NgxDatePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = new NgxDatePickerOptions(this.options);
        this.scrollOptions = {
            barBackground: '#C9C9C9',
            barWidth: '7',
            gridBackground: '#C9C9C9',
            gridWidth: '2'
        };
        if (this.options.initialDate instanceof Date) {
            this.currentDate = new Date(this.options.initialDate);
            this.selectDate(null, this.currentDate, false);
        }
        if (this.options.minDate instanceof Date) {
            this.minDate = this.options.minDate;
        }
        else {
            this.minDate = null;
        }
        if (this.options.maxDate instanceof Date) {
            this.maxDate = new Date(this.options.maxDate);
        }
        else {
            this.maxDate = null;
        }
        this.view = this.options.views[0];
        this.generateYears();
        this.generateMonths();
        this.generateCalendar();
        this.outputEvents.emit({ type: 'default', data: 'init' });
        if (typeof window !== 'undefined') {
            var body = document.querySelector('body');
            body.addEventListener('click', function (e) {
                if (!_this.opened || !e.target) {
                    return;
                }
                if (_this.el.nativeElement !== e.target && !_this.el.nativeElement.contains(e.target)) {
                    _this.close();
                }
            }, false);
        }
        if (this.inputEvents) {
            this.inputEvents.subscribe(function (e) {
                if (e.type === 'action') {
                    if (e.data === 'toggle') {
                        _this.toggle();
                    }
                    if (e.data === 'close') {
                        _this.close();
                    }
                    if (e.data === 'open') {
                        _this.open();
                    }
                }
                if (e.type === 'setDate') {
                    if (!(e.data instanceof Date)) {
                        throw new Error("Input data must be an instance of Date!");
                    }
                    var date = new (e.data);
                    if (!date) {
                        throw new Error("Invalid date: " + e.data);
                    }
                    _this.value = {
                        day: dateFns.format(date, 'DD'),
                        month: dateFns.format(date, 'MM'),
                        year: dateFns.format(date, 'YYYY'),
                        formatted: dateFns.format(date, _this.options.formatOut),
                        formattedToDisplay: dateFns.format(date, _this.options.formatDisplay),
                        date: date
                    };
                }
            });
        }
    };
    NgxDatePickerComponent.prototype.generateCalendar = function () {
        var date = new Date(this.currentDate);
        var month = dateFns.getMonth(date);
        var year = dateFns.getYear(date);
        var initDay = dateFns.startOfWeek(dateFns.startOfMonth(date), { weekStartsOn: this.options.firstCalendarDay });
        this.days = [];
        var selectedDate = this.date.date;
        while (dateFns.isBefore(initDay, dateFns.endOfMonth(date))) {
            var currentDate = initDay;
            var today = (dateFns.isSameDay(new Date(), currentDate) && dateFns.isSameMonth(new Date(), currentDate));
            var selected = (selectedDate && dateFns.isSameDay(selectedDate, currentDate));
            var betweenMinMax = true;
            if (this.minDate !== null) {
                if (this.maxDate !== null) {
                    betweenMinMax = (dateFns.isEqual(currentDate, this.minDate) ||
                        dateFns.isAfter(currentDate, this.minDate)) &&
                        (dateFns.isEqual(currentDate, this.minDate) && dateFns.isBefore(currentDate, this.minDate));
                }
                else {
                    betweenMinMax = dateFns.isBefore(currentDate, this.minDate);
                }
            }
            else {
                if (this.maxDate !== null) {
                    betweenMinMax = dateFns.isAfter(currentDate, this.minDate);
                }
            }
            var i = dateFns.getDate(initDay);
            var day = {
                day: i > 0 ? i : null,
                month: i > 0 ? month : null,
                year: i > 0 ? year : null,
                enabled: i > 0 ? betweenMinMax : false,
                today: i > 0 && today,
                selected: i > 0 && selected,
                date: currentDate
            };
            this.days.push(day);
            initDay = dateFns.addDays(initDay, 1);
        }
    };
    NgxDatePickerComponent.prototype.isDisabledDay = function (d) {
        return this.getCurrentYear() >= this.getSelectedYear() &&
            this.getCurrentMonth() >= this.getSelectedMonth() && this.getCurrentDay() > d && this.options.disablePassDate;
    };
    NgxDatePickerComponent.prototype.isDisabledMonth = function (m) {
        return this.getCurrentYear() >= this.getSelectedYear() &&
            this.getCurrentMonth() > m && this.options.disablePassDate;
    };
    NgxDatePickerComponent.prototype.isDisabledYear = function (y) {
        return this.getCurrentYear() > y && this.options.disablePassDate;
    };
    NgxDatePickerComponent.prototype.selectDate = function (e, date, isDisabled) {
        var _this = this;
        if (e) {
            e.preventDefault();
        }
        if (isDisabled && this.options.disablePassDate) {
            return;
        }
        setTimeout(function () {
            _this.value = {
                day: dateFns.format(date, 'DD'),
                month: dateFns.format(date, 'MM'),
                year: dateFns.format(date, 'YYYY'),
                formatted: dateFns.format(date, _this.options.formatOut),
                formattedToDisplay: dateFns.format(date, _this.options.formatDisplay),
                date: date
            };
            _this.currentDate = date;
            if (_this.options.views.length > 1) {
                _this.view = _this.options.views[(_this.options.views.indexOf('day') + 1) % _this.options.views.length];
            }
            else {
                _this.opened = false;
            }
            _this.generateCalendar();
            _this.outputEvents.emit({ type: 'dateChanged', data: _this.value });
        });
        this.opened = false;
    };
    NgxDatePickerComponent.prototype.getCurrentYear = function () {
        return dateFns.format(new Date(), 'YYYY');
    };
    NgxDatePickerComponent.prototype.getCurrentMonth = function () {
        return dateFns.format(new Date(), 'MM');
    };
    NgxDatePickerComponent.prototype.getCurrentDay = function () {
        return dateFns.format(new Date(), 'DD');
    };
    NgxDatePickerComponent.prototype.getSelectedYear = function () {
        return dateFns.format(this.currentDate, 'YYYY');
    };
    NgxDatePickerComponent.prototype.getSelectedMonth = function () {
        return dateFns.format(this.currentDate, 'MM');
    };
    NgxDatePickerComponent.prototype.getSelectedDay = function () {
        return dateFns.format(this.currentDate, 'DD');
    };
    NgxDatePickerComponent.prototype.selectMonth = function (e, month, isDisabled) {
        var _this = this;
        e.preventDefault();
        if (isDisabled && this.options.disablePassDate) {
            return;
        }
        setTimeout(function () {
            var date = dateFns.setMonth(_this.currentDate, month);
            _this.value = {
                day: dateFns.format(date, 'DD'),
                month: dateFns.format(date, 'MM'),
                year: dateFns.format(date, 'YYYY'),
                formatted: dateFns.format(date, _this.options.formatOut),
                formattedToDisplay: dateFns.format(date, _this.options.formatDisplay),
                date: date
            };
            _this.currentDate = date;
            if (_this.options.views.length > 1 && 'month' !== _this.options.views[_this.options.views.length - 1]) {
                _this.view = _this.options.views[(_this.options.views.indexOf('month') + 1) % _this.options.views.length];
            }
            else {
                _this.opened = false;
            }
            _this.generateCalendar();
        });
    };
    NgxDatePickerComponent.prototype.selectYear = function (e, year, isDisabled) {
        var _this = this;
        e.preventDefault();
        if (isDisabled && this.options.disablePassDate) {
            return;
        }
        setTimeout(function () {
            var date = dateFns.setYear(_this.currentDate, year);
            _this.value = {
                day: dateFns.format(date, 'DD'),
                month: dateFns.format(date, 'MM'),
                year: dateFns.format(date, 'YYYY'),
                formatted: dateFns.format(date, _this.options.formatOut),
                formattedToDisplay: dateFns.format(date, _this.options.formatDisplay),
                date: date
            };
            _this.currentDate = date;
            if (_this.options.views.length > 1 && 'year' !== _this.options.views[_this.options.views.length - 1]) {
                _this.view = _this.options.views[(_this.options.views.indexOf('year') + 1) % _this.options.views.length];
            }
            else {
                _this.opened = false;
            }
            _this.generateCalendar();
        });
    };
    NgxDatePickerComponent.prototype.generateMonths = function () {
        var date = new Date();
        for (var i = 0; i < 12; i++) {
            var month = dateFns.format(dateFns.setMonth(date, i), "MMM", { locale: locales[this.options.locale] });
            this.months.push(month.charAt(0).toUpperCase() + month.slice(1));
        }
    };
    NgxDatePickerComponent.prototype.generateYears = function () {
        var years = 100;
        var date = this.minDate || dateFns.subYears(new Date(), years);
        var toDate = this.maxDate || dateFns.addYears(new Date(), years);
        var diff = dateFns.getYear(toDate) - dateFns.getYear(date);
        for (var i = 0; i < diff; i++) {
            this.years.push(dateFns.getYear(dateFns.addYears(date, i)));
        }
    };
    NgxDatePickerComponent.prototype.writeValue = function (date) {
        if (!date) {
            return;
        }
        this.date = date;
    };
    NgxDatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    NgxDatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    NgxDatePickerComponent.prototype.prevMonth = function () {
        this.currentDate = dateFns.subMonths(this.currentDate, 1);
        this.generateCalendar();
    };
    NgxDatePickerComponent.prototype.nextMonth = function () {
        this.currentDate = dateFns.addMonths(this.currentDate, 1);
        this.generateCalendar();
    };
    NgxDatePickerComponent.prototype.today = function () {
        this.currentDate = new Date();
        this.selectDate(null, this.currentDate, false);
    };
    NgxDatePickerComponent.prototype.toggle = function () {
        this.opened = !this.opened;
        if (this.opened) {
            this.onOpen();
        }
        this.outputEvents.emit({ type: 'default', data: 'opened' });
    };
    NgxDatePickerComponent.prototype.open = function () {
        this.opened = true;
        this.onOpen();
    };
    NgxDatePickerComponent.prototype.close = function () {
        this.opened = false;
        this.outputEvents.emit({ type: 'default', data: 'closed' });
    };
    NgxDatePickerComponent.prototype.onOpen = function () {
        this.view = this.options.views[0];
    };
    NgxDatePickerComponent.prototype.openYearPicker = function () {
        var _this = this;
        if (!this.isAllowedView('year'))
            return;
        setTimeout(function () { return _this.view = 'year'; });
    };
    NgxDatePickerComponent.prototype.openMonthPicker = function () {
        var _this = this;
        if (!this.isAllowedView('month'))
            return;
        setTimeout(function () { return _this.view = 'month'; });
    };
    NgxDatePickerComponent.prototype.isAllowedView = function (view) {
        return (this.options.views || []).indexOf(view);
    };
    NgxDatePickerComponent.prototype.clear = function () {
        this.value = { day: null, month: null, year: null, date: null, formatted: null, formattedToDisplay: null };
        this.close();
    };
    NgxDatePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-date-picker',
                    template: "<div class=\"datepicker-container u-is-unselectable\"><div class=\"datepicker-input-container\"><input class=\"datepicker-input\" [placeholder]=\"placeholder\" [ngStyle]=\"inputStyle\" (click)=\"toggle()\" [(ngModel)]=\"date.formattedToDisplay\"><div *ngIf=\"iconClass\" class=\"datepicker-input-icon\" (click)=\"toggle()\"><i [class]=\"iconClass\"></i></div></div><div class=\"datepicker-calendar\" *ngIf=\"opened\"><div class=\"arrow\" [ngStyle]=\"{background: (view == 'year') ? 'black' : '#222628'}\"></div><div *ngIf=\"view == 'year'\" class=\"datepicker-calendar-top\"><span class=\"year-title\">{{ currentDate | ngxFormat:'YYYY' }}</span> <button type=\"button\" (click)=\"openYearPicker()\" *ngIf=\"view != 'year'\">{{options.selectYearText}}</button> <i class=\"close\" (click)=\"close()\"><svg width=\"350px\" height=\"349px\" viewBox=\"-1 0 350 349\" version=\"1.1\"><g id=\"delete\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M336.559,68.611 L231.016,174.165 L336.559,279.714 C352.258,295.419 352.258,320.859 336.559,336.564 C328.715,344.408 318.431,348.333 308.152,348.333 C297.856,348.333 287.571,344.414 279.733,336.564 L174.167,231.003 L68.609,336.563 C60.766,344.407 50.481,348.332 40.193,348.332 C29.908,348.332 19.63,344.413 11.78,336.563 C-3.919,320.865 -3.919,295.424 11.78,279.713 L117.32,174.164 L11.774,68.611 C-3.925,52.912 -3.925,27.466 11.774,11.767 C27.47,-3.92 52.901,-3.92 68.603,11.767 L174.166,117.321 L279.721,11.767 C295.426,-3.92 320.86,-3.92 336.553,11.767 C352.258,27.466 352.258,52.912 336.559,68.611 Z\" id=\"Shape\" fill=\"#000000\" fill-rule=\"nonzero\"></path></g></svg></i></div><div class=\"datepicker-calendar-container\"><div *ngIf=\"view == 'day'\"><div class=\"datepicker-calendar-month-section\"><i (click)=\"prevMonth()\"><svg width=\"190px\" height=\"306px\" viewBox=\"58 0 190 306\" version=\"1.1\"><g id=\"keyboard-left-arrow-button\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(58.000000, 0.000000)\"><g id=\"chevron-left\" fill-rule=\"nonzero\" fill=\"#000000\"><polygon id=\"Shape\" points=\"189.35 35.7 153.65 0 0.65 153 153.65 306 189.35 270.3 72.05 153\"></polygon></g></g></svg> </i><a class=\"month-title\" (click)=\"openMonthPicker()\" href=\"javascript:void(0);\">{{ currentDate | ngxFormat:'MMMM':options.locale }}</a> <i (click)=\"nextMonth()\"><svg width=\"190px\" height=\"306px\" viewBox=\"58 0 190 306\" version=\"1.1\"><g id=\"keyboard-right-arrow-button\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(58.000000, 0.000000)\"><g id=\"chevron-right\" fill-rule=\"nonzero\" fill=\"#000000\"><polygon id=\"Shape\" points=\"36.35 0 0.65 35.7 117.95 153 0.65 270.3 36.35 306 189.35 153\"></polygon></g></g></svg></i></div><div class=\"datepicker-calendar-day-names\"><span>M</span> <span>T</span> <span>W</span> <span>T</span> <span>F</span> <span>S</span> <span>S</span></div><div class=\"datepicker-calendar-days-container\"><span class=\"day\" [class.disabled]=\"isDisabledDay(d.day)\" *ngFor=\"let d of days; let i = index\" (click)=\"selectDate($event, d.date, isDisabledDay(d.day))\" [ngClass]=\"{ 'disabled': !d.enabled, 'today': d.today, 'selected': d.selected }\">{{ d.day }}</span></div><div class=\"datepicker-buttons\" *ngIf=\"!options.autoApply\"><button type=\"button\" class=\"a-button u-is-secondary u-is-small\" (click)=\"clear()\">{{options.clearText}}</button> <button type=\"button\" class=\"a-button u-is-primary u-is-small\" (click)=\"today()\">{{options.todayText}}</button></div></div><div *ngIf=\"view == 'month'\"><div class=\"datepicker-calendar-months-container\"><span class=\"month\" [class.disabled]=\"isDisabledMonth(i + 1)\" *ngFor=\"let m of months; let i = index\" (click)=\"selectMonth($event, i, isDisabledMonth(i + 1))\">{{ m }}</span></div></div><div *ngIf=\"view == 'year'\"><div class=\"datepicker-calendar-years-container\" slimScroll [options]=\"scrollOptions\"><span class=\"year\" [class.disabled]=\"isDisabledYear(y)\" *ngFor=\"let y of years; let i = index\" (click)=\"selectYear($event, y, isDisabledYear(y))\">{{ y }}</span></div></div></div></div></div>",
                    styles: [".datepicker-container{display:inline-block;position:relative}.datepicker-container .datepicker-input-container{display:inline-block;background:0 0}.datepicker-container .datepicker-input-container .datepicker-input{display:inline-block;width:160px;margin-right:10px;border:0;outline:0;border-bottom:1px solid #ced4da;font-size:14px;color:#000;text-align:center}.datepicker-container .datepicker-input-container .datepicker-input::-webkit-input-placeholder{color:#343a40}.datepicker-container .datepicker-input-container .datepicker-input::-moz-placeholder{color:#343a40}.datepicker-container .datepicker-input-container .datepicker-input:-ms-input-placeholder{color:#343a40}.datepicker-container .datepicker-input-container .datepicker-input:-moz-placeholder{color:#343a40}.datepicker-container .datepicker-input-container .datepicker-input-icon{display:inline-block}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i,.datepicker-container .datepicker-input-container .datepicker-input-icon i{cursor:pointer}.datepicker-container .datepicker-input-container .datepicker-input-icon i svg{width:15px;height:15px}.datepicker-container .datepicker-input-container .datepicker-input-icon i svg g g{fill:#000}.datepicker-container .datepicker-calendar{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:250px;position:absolute;z-index:99;background:#343a40;border-bottom-left-radius:4px;border-bottom-right-radius:4px;-webkit-box-shadow:0 2px 5px rgba(0,0,0,.5);box-shadow:0 2px 5px rgba(0,0,0,.5);top:100%;margin-top:15px}.datepicker-container .datepicker-calendar .arrow{position:absolute;display:block;min-width:15px;min-height:15px;top:-6px;left:60px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-transition:left .5s;transition:left .5s}.datepicker-container .datepicker-calendar .datepicker-calendar-top{width:100%;height:80px;background:#000;display:inline-block;position:relative}.datepicker-container .datepicker-calendar .datepicker-calendar-top .year-title{display:block;margin-top:12px;color:#fff;font-size:28px;text-align:center}.datepicker-container .datepicker-calendar .datepicker-calendar-top button{width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;margin:0 auto;color:#fff;text-transform:uppercase;background:0 0;border:0;outline:0;font-size:12px;cursor:pointer;position:relative}.datepicker-container .datepicker-calendar .datepicker-calendar-top button svg{display:block;float:left;width:15px;height:15px;position:absolute;top:2px;left:12px}.datepicker-container .datepicker-calendar .datepicker-calendar-top .close svg g path,.datepicker-container .datepicker-calendar .datepicker-calendar-top button svg g,.datepicker-container .datepicker-calendar .datepicker-calendar-top button svg g path,.datepicker-container svg g,.datepicker-container svg g g{fill:#fff}.datepicker-container .datepicker-calendar .datepicker-calendar-top .close{position:absolute;top:5px;right:5px;font-size:20px;color:#fff;cursor:pointer}.datepicker-container .datepicker-calendar .datepicker-calendar-top .close svg{width:12px;height:12px}.datepicker-container .datepicker-calendar .datepicker-calendar-container{display:inline-block;width:100%;padding:10px;background:#222628}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-size:14px;color:#ddd;text-transform:uppercase}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i:first-child{margin-left:12px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i:last-child{margin-right:12px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-day-names{width:230px;margin-top:10px;display:inline-block;border:1px solid transparent}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-day-names span{font-size:12px;display:block;float:left;width:calc(100%/7);text-align:center}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container{width:230px;margin-top:5px;display:inline-block;border:1px solid transparent}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day,.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-months-container .month,.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;float:left;font-size:14px;color:#8e8e8e;width:calc(100%/7);height:33px;text-align:center;border-radius:50%;cursor:pointer}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.disabled{border:0!important;cursor:not-allowed}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.selected,.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day:hover{background:#222628;border:1px solid #366aab;border-radius:4px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.disabled{pointer-events:none}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.today{color:#366aab}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container{width:100%;height:240px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-months-container .month,.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year{width:calc(100%/4);height:50px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year.disabled{border:0!important;cursor:not-allowed}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year.selected,.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year:hover{background:#222628;border:1px solid #366aab;border-radius:4px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-months-container{width:100%;height:auto}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-months-container .month.disabled{border:0!important;cursor:not-allowed}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-months-container .month.selected,.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-months-container .month:hover{background:#222628;border:1px solid #366aab;border-radius:4px;outline:0}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons{width:235px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button{width:100%;outline:0;display:inline-block;border:1px solid #366aab;background:#099268;color:#fff;margin-right:5px;border-radius:5px;cursor:pointer;text-align:center;padding:5px 10px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-primary{background:#366aab}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-primary:active{background:#222628}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary{background:#222628;color:#099268}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary:active{background:#366aab;color:#ddd}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary:hover{color:#fff}.datepicker-container svg{display:block;width:20px;height:20px}"],
                    providers: [CALENDAR_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NgxDatePickerComponent.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] },] },
    ]; };
    NgxDatePickerComponent.propDecorators = {
        'inputStyle': [{ type: Input },],
        'iconClass': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'options': [{ type: Input },],
        'inputEvents': [{ type: Input },],
        'outputEvents': [{ type: Output },],
    };
    return NgxDatePickerComponent;
}());
export { NgxDatePickerComponent };
//# sourceMappingURL=ngx-date-picker.component.js.map