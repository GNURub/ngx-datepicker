import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxDatePickerModule } from '../ngx-date-picker/ngx-date-picker.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxDatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
