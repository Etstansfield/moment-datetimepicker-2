import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TimepickerComponent } from './timepicker/timepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    TimepickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
