# ngx-date-picker
Angular Datepicker Component

***ngx-date-picker*** is a date-picker component for Angular

## Demo

[https://gnurub.github.io/ngx-datepicker/](https://gnurub.github.io/ngx-datepicker/)

Looking for a date range picker? Check this one: [https://gnurub.github.io/ngx-daterangepicker/](https://gnurub.github.io/ngx-daterangepicker/)

## Installation:

Install ngx-date-picker via `npm`

````shell
npm install ngx-date-picker-fns --save
````

## Integration

```ts
// app.module.ts
import { NgxDatePickerModule } from 'ngx-date-picker-fns';

@NgModule({
  ...
  imports: [ NgxDatePickerModule ]
  ...
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';
import { NgxDatePickerOptions, DateModel } from 'ngx-date-picker-fns';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  date: DateModel;
  options: NgxDatePickerOptions;

  constructor() {
    this.options = new NgxDatePickerOptions();
  }
}

// app.component.html
<ngx-date-picker [options]="options" [(ngModel)]="date"></ngx-date-picker>
```

For more info about options please see [this](https://github.com/GNURub/ngx-date-picker/blob/master/src/ngx-date-picker/ngx-date-picker.component.ts#L41-L53).

## Run Included Demo

```shell
git clone https://github.com/GNURub/ngx-datepicker.git --depth 1
cd ngx-datepicker
npm install
npm start
```

## AoT Library Build

```shell
npm run build:lib
```

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
