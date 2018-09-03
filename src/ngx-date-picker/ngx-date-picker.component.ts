import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  forwardRef,
  Input,
  Output,
  EventEmitter, ViewEncapsulation,
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

import * as dateFns from 'date-fns';
import {locales} from './constants';
import {ISlimScrollOptions} from 'ngx-slimscroll';

export interface IDateModel {
  day: string;
  month: string;
  year: string;
  formatted: string;
  formattedToDisplay: string;
  date: Date;
}

export class DateModel {
  day: string;
  month: string;
  year: string;
  date: Date;
  formatted: string;
  formattedToDisplay: string;

  constructor(obj?: IDateModel) {
    this.day = obj && obj.day ? obj.day : null;
    this.month = obj && obj.month ? obj.month : null;
    this.year = obj && obj.year ? obj.year : null;
    this.formatted = obj && obj.formatted ? obj.formatted : null;
    this.formattedToDisplay = obj && obj.formattedToDisplay ? obj.formattedToDisplay : this.formatted;
    this.date = obj && obj.date ? obj.date : null;
  }
}

export interface IDatePickerOptions {
  autoApply?: boolean;
  style?: 'normal' | 'big' | 'bold';
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  dayNamesFormat?: string;
  firstCalendarDay?: number;
  formatOut?: string;
  formatDisplay?: string;
  selectYearText?: string;
  todayText?: string;
  clearText?: string;
  disablePassDate?: boolean;
  views?: Array<'day' | 'month' | 'year'>;
}

export class NgxDatePickerOptions {
  autoApply?: boolean;
  style?: 'normal' | 'big' | 'bold';
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  dayNamesFormat?: string;
  firstCalendarDay?: number;
  formatOut?: string;
  formatDisplay?: string;
  selectYearText?: string;
  todayText?: string;
  clearText?: string;
  disablePassDate?: boolean;
  views?: Array<'day' | 'month' | 'year'> = [];

  constructor(obj?: IDatePickerOptions) {
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
}

export interface CalendarDate {
  day: number;
  month: number;
  year: number;
  enabled: boolean;
  today: boolean;
  selected: boolean;
  date: Date;
}

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxDatePickerComponent),
  multi: true
};

@Component({
  selector: 'ngx-date-picker',
  templateUrl: './ngx-date-picker.component.html',
  styleUrls: ['./ngx-date-picker.component.sass'],
  providers: [CALENDAR_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class NgxDatePickerComponent implements ControlValueAccessor, OnInit {
  @Input() inputStyle: Object;
  @Input() iconClass: string;
  @Input() placeholder: string = '';
  @Input() options: NgxDatePickerOptions;
  @Input() inputEvents: EventEmitter<{ type: string, data: string | DateModel }>;
  @Output() outputEvents: EventEmitter<{ type: string, data: string | DateModel }>;

  date: DateModel;
  view: 'day' | 'month' | 'year' = 'day';

  opened: boolean;
  currentDate: Date;
  days: CalendarDate[];
  years: number[];
  months: string[];
  scrollOptions: ISlimScrollOptions;

  minDate: Date | any;
  maxDate: Date | any;

  dayNames: string[];

  private onTouchedCallback: () => void = () => {
  };
  private onChangeCallback: (_: any) => void = () => {
  };

  constructor(@Inject(ElementRef) public el: ElementRef) {
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

    this.outputEvents = new EventEmitter<{ type: string, data: string | DateModel }>();

    if (!this.inputEvents) {
      return;
    }

    this.inputEvents.subscribe((event: { type: string, data: string | DateModel }) => {
      if (event.type === 'setDate') {
        this.value = event.data as DateModel;
      } else if (event.type === 'default') {
        if (event.data === 'open') {
          this.open();
        } else if (event.data === 'close') {
          this.close();
        }
      }
    });
  }

  initDayNames(): void {
    this.dayNames = [];
    const start = this.options.firstCalendarDay;
    for (let i = start; i <= 6 + start; i++) {
      const date = dateFns.setDay(new Date(), i);
      this.dayNames.push(dateFns.format(date, this.options.dayNamesFormat, { locale: this.options.locale }));
    }
  }

  get value(): DateModel {
    return this.date;
  }

  set value(date: DateModel) {
    if (!date) {
      return;
    }
    this.date = date;
    this.onChangeCallback(date);
  }

  ngOnInit() {

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
    } else {
      this.minDate = null;
    }

    if (this.options.maxDate instanceof Date) {
      this.maxDate = new Date(this.options.maxDate);
    } else {
      this.maxDate = null;
    }

    this.view = this.options.views[0];

    this.generateYears();
    this.generateMonths();

    this.generateCalendar();
    this.outputEvents.emit({type: 'default', data: 'init'});

    if (typeof window !== 'undefined') {
      const body = document.querySelector('body');
      body.addEventListener('click', e => {
        if (!this.opened || !e.target) {
          return;
        }

        if (this.el.nativeElement !== e.target && !this.el.nativeElement.contains((<any>e.target))) {
          this.close();
        }
      }, false);
    }

    if (this.inputEvents) {
      this.inputEvents.subscribe((e: any) => {
        if (e.type === 'action') {
          if (e.data === 'toggle') {
            this.toggle();
          }
          if (e.data === 'close') {
            this.close();
          }
          if (e.data === 'open') {
            this.open();
          }
        }

        if (e.type === 'setDate') {
          if (!(e.data instanceof Date)) {
            throw new Error(`Input data must be an instance of Date!`);
          }
          const date: Date = new (e.data);
          if (!date) {
            throw new Error(`Invalid date: ${e.data}`);
          }
          this.value = {
            day: dateFns.format(date, 'DD'),
            month: dateFns.format(date, 'MM'),
            year: dateFns.format(date, 'YYYY'),
            formatted: dateFns.format(date, this.options.formatOut),
            formattedToDisplay: dateFns.format(date, this.options.formatDisplay),
            date
          };
        }
      });
    }
  }

  generateCalendar() {
    const date: Date = new Date(this.currentDate);
    const month = dateFns.getMonth(date);
    const year = dateFns.getYear(date);
    let initDay = dateFns.startOfWeek(dateFns.startOfMonth(date), {weekStartsOn: this.options.firstCalendarDay});

    this.days = [];
    const selectedDate: Date = this.date.date;


    while (dateFns.isBefore(initDay, dateFns.endOfMonth(date))) {
      const currentDate: Date = initDay;
      const today: boolean = (dateFns.isSameDay(new Date(), currentDate) && dateFns.isSameMonth(new Date(), currentDate));
      const selected: boolean = (selectedDate && dateFns.isSameDay(selectedDate, currentDate));
      let betweenMinMax = true;

      if (this.minDate !== null) {
        if (this.maxDate !== null) {
          betweenMinMax = (dateFns.isEqual(currentDate, this.minDate) ||
            dateFns.isAfter(currentDate, this.minDate)) &&
            (dateFns.isEqual(currentDate, this.minDate) && dateFns.isBefore(currentDate, this.minDate));
        } else {
          betweenMinMax = dateFns.isBefore(currentDate, this.minDate);
        }
      } else {
        if (this.maxDate !== null) {
          betweenMinMax = dateFns.isAfter(currentDate, this.minDate);
        }
      }

      let i = dateFns.getDate(initDay);
      const day: CalendarDate = {
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
  }

  isDisabledDay(d) {
    return this.getCurrentYear() >= this.getSelectedYear() &&
      this.getCurrentMonth() >= this.getSelectedMonth() && this.getCurrentDay() > d  && this.options.disablePassDate;
  }

  isDisabledMonth(m) {
    return this.getCurrentYear() >= this.getSelectedYear() &&
      this.getCurrentMonth() > m  && this.options.disablePassDate;
  }

  isDisabledYear(y) {
    return this.getCurrentYear() > y && this.options.disablePassDate;
  }

  selectDate(e: MouseEvent, date: Date, isDisabled: boolean) {
    if (e) {
      e.preventDefault();
    }

    if (isDisabled && this.options.disablePassDate) {
      return;
    }

    setTimeout(() => {
      this.value = {
        day: dateFns.format(date, 'DD'),
        month: dateFns.format(date, 'MM'),
        year: dateFns.format(date, 'YYYY'),
        formatted: dateFns.format(date, this.options.formatOut),
        formattedToDisplay: dateFns.format(date, this.options.formatDisplay),
        date
      };
      this.currentDate = date;

      if (this.options.views.length > 1) {
        this.view = this.options.views[(this.options.views.indexOf('day') + 1) % this.options.views.length];
      } else {
        this.opened = false;
      }

      this.generateCalendar();

      this.outputEvents.emit({type: 'dateChanged', data: this.value});
    });

    this.opened = false;
  }

  getCurrentYear() {
    return  dateFns.format(new Date(), 'YYYY');
  }

  getCurrentMonth() {
    return  dateFns.format(new Date(), 'MM');
  }


  getCurrentDay() {
    return  dateFns.format(new Date(), 'DD');
  }

  getSelectedYear() {
    return  dateFns.format(this.currentDate, 'YYYY');
  }

  getSelectedMonth() {
    return  dateFns.format(this.currentDate, 'MM');
  }

  getSelectedDay() {
    return  dateFns.format(this.currentDate, 'DD');
  }

  selectMonth(e: MouseEvent, month: number, isDisabled: boolean) {
    e.preventDefault();

    if (isDisabled && this.options.disablePassDate) {
      return;
    }

    setTimeout(() => {
      const date: Date = dateFns.setMonth(this.currentDate, month);
      this.value = {
        day: dateFns.format(date, 'DD'),
        month: dateFns.format(date, 'MM'),
        year: dateFns.format(date, 'YYYY'),
        formatted: dateFns.format(date, this.options.formatOut),
        formattedToDisplay: dateFns.format(date, this.options.formatDisplay),
        date
      };

      this.currentDate = date;

      if (this.options.views.length > 1 && 'month' !== this.options.views[this.options.views.length - 1]) {
        this.view = this.options.views[(this.options.views.indexOf('month') + 1) % this.options.views.length];
      } else {
        this.opened = false;
      }

      this.generateCalendar();
    });
  }

  selectYear(e: MouseEvent, year: number, isDisabled: boolean) {
    e.preventDefault();

    if (isDisabled && this.options.disablePassDate) {
      return;
    }

    setTimeout(() => {
      const date: Date = dateFns.setYear(this.currentDate, year);
      this.value = {
        day: dateFns.format(date, 'DD'),
        month: dateFns.format(date, 'MM'),
        year: dateFns.format(date, 'YYYY'),
        formatted: dateFns.format(date, this.options.formatOut),
        formattedToDisplay: dateFns.format(date, this.options.formatDisplay),
        date
      };
      this.currentDate = date;

      if (this.options.views.length > 1 && 'year' !== this.options.views[this.options.views.length - 1]) {
        this.view = this.options.views[(this.options.views.indexOf('year') + 1) % this.options.views.length];
      } else {
        this.opened = false;
      }

      this.generateCalendar();
    });
  }

  generateMonths() {
    const date: Date = new Date();

    for (let i = 0; i < 12; i++) {
      let month = dateFns.format(dateFns.setMonth(date, i), "MMM", {locale: locales[this.options.locale]});
      this.months.push(month.charAt(0).toUpperCase() + month.slice(1));
    }
  }

  generateYears() {
    const years = 100;
    const date: Date = this.minDate || dateFns.subYears(new Date(), years);
    const toDate: Date = this.maxDate || dateFns.addYears(new Date(), years);
    const diff = dateFns.getYear(toDate) - dateFns.getYear(date);

    for (let i = 0; i < diff; i++) {
      this.years.push(dateFns.getYear(dateFns.addYears(date, i)));
    }
  }

  writeValue(date: DateModel) {
    if (!date) {
      return;
    }
    this.date = date;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  prevMonth() {
    this.currentDate = dateFns.subMonths(this.currentDate, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = dateFns.addMonths(this.currentDate, 1);
    this.generateCalendar();
  }

  today() {
    this.currentDate = new Date();
    this.selectDate(null, this.currentDate, false);
  }

  toggle() {
    this.opened = !this.opened;
    if (this.opened) {
      this.onOpen();
    }

    this.outputEvents.emit({type: 'default', data: 'opened'});
  }

  open() {
    this.opened = true;
    this.onOpen();
  }

  close() {
    this.opened = false;
    this.outputEvents.emit({type: 'default', data: 'closed'});
  }

  onOpen() {
    this.view = this.options.views[0];
  }

  openYearPicker() {
    if (!this.isAllowedView('year')) return;
    setTimeout(() => this.view = 'year');
  }

  openMonthPicker() {
    if (!this.isAllowedView('month')) return;
    setTimeout(() => this.view = 'month');
  }

  private isAllowedView(view) {
    return (this.options.views || []).indexOf(view);
  }

  clear() {
    this.value = {day: null, month: null, year: null, date: null, formatted: null, formattedToDisplay: null};
    this.close();
  }
}
