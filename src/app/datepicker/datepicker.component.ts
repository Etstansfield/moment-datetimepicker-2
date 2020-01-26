import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() startDateTime: moment.Moment;
  @Input() pickedDateTime: moment.Moment;
  currentMonth: number;
  lastDayOfMonth: number; // 29,30,31
  monthArray: any[];

  constructor() { }

  ngOnInit() {

    if (!this.startDateTime) {
      this.startDateTime = moment();
    }

    if (!this.pickedDateTime) {
      this.pickedDateTime = moment(this.startDateTime);
    }

    this.currentMonth = this.startDateTime.month();
    this.lastDayOfMonth = moment(this.startDateTime).endOf('month').date();
    this.monthArray = Array(this.lastDayOfMonth).fill(1).map((x, i) => i + 1);

  }

  /**
   * @description - change the calendar date to the inputted value
   * @param date - a number from 1 - 31
   */
  pickDate(date: number): void {

    if (date <= 0 || date > 31) {
      return;   // invalid date
    }

    this.pickedDateTime.set('date', date);

  }

  /**
   * @description - determine if the inputted date is equal to the currently selected one
   * @param date - the date we want to check a number 1 - 31
   */
  isCurrentDate(date: number): boolean {

    const curDate = this.pickedDateTime.date();

    // console.log(`+++ Date: ${date} | CurDate: ${curDate} | Equal: ${date === curDate} +++`);

    return date === curDate;

  }

}
