# ngx-date-picker
Angular2 Datepicker Component

***ngx-date-picker*** is a date-picker component for Angular2.

## Demo

[https://gnurub.github.io/ngx-date-picker/](https://gnurub.github.io/ngx-date-picker/)

Looking for a date range picker? Check this one: [https://gnurub.github.io/ngx-daterangepicker/](https://gnurub.github.io/ngx-daterangepicker/)

## Installation:

Install ngx-date-picker via `npm`

````shell
npm install ngx-date-picker --save
````

## Integration

```ts
// app.module.ts
import { DatePickerModule } from 'ngx-date-picker';

@NgModule({
  ...
  imports: [ DatePickerModule ]
  ...
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ngx-date-picker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  date: DateModel;
  options: DatePickerOptions;

  constructor() {
    this.options = new DatePickerOptions();
  }
}

// app.component.html
<ngx-date-picker [options]="options" [(ngModel)]="date"></ngx-date-picker>
```

For more info about options please see [this](https://github.com/GNURub/ngx-date-picker/blob/master/src/ngx-date-picker/ngx-date-picker.component.ts#L41-L53).

## Run Included Demo

```shell
git clone https://github.com/GNURub/ngx-date-picker.git --depth 1
cd ngx-date-picker
npm install
npm start
```

## AoT Library Build

```shell
npm run build:lib
```

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
