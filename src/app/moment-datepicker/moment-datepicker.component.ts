import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-moment-datepicker',
  templateUrl: './moment-datepicker.component.html',
  styleUrls: ['./moment-datepicker.component.scss']
})
export class MomentDatepickerComponent implements OnInit {

  @Input() momentDateTimeModel: moment.Moment;
  datePickerOpen = false;

  constructor() { }

  ngOnInit() {
  }


  /**
   * @description - open/close the datepicker
   */
  toggleDatePicker(): void {
    this.datePickerOpen = !this.datePickerOpen;
  }

  /**
   * @description - update the datetime to the one picked
   * @param newDateTime - the new moment we want
   */
  updateDateTime(newDateTime: moment.Moment): void {
    // console.log(`+++ New DateTime Model: ${newDateTime} +++`);
    this.momentDateTimeModel = moment(newDateTime);
  }
}
