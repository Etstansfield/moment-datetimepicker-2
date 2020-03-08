import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moment-datepicker';
  maxDateTimeTest = moment('02/04/2020', 'DD/MM/YYYY');
}
