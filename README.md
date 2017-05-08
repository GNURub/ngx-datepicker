# ngx-datepicker
Angular2 Datepicker Component

***ngx-datepicker*** is a datepicker component for Angular2.

## Demo

[https://gnurub.github.io/ngx-datepicker/](https://gnurub.github.io/ngx-datepicker/)

Looking for a date range picker? Check this one: [https://gnurub.github.io/ngx-daterangepicker/](https://gnurub.github.io/ngx-daterangepicker/)

## Installation:

Install ngx-datepicker via `npm`

````shell
npm install ngx-datepicker --save
````

## Integration

```ts
// app.module.ts
import { DatePickerModule } from 'ngx-datepicker';

@NgModule({
  ...
  imports: [ DatePickerModule ]
  ...
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ngx-datepicker';

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
<ngx-datepicker [options]="options" [(ngModel)]="date"></ngx-datepicker>
```

For more info about options please see [this](https://github.com/GNURub/ngx-datepicker/blob/master/src/ngx-datepicker/ngx-datepicker.component.ts#L41-L53).

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
