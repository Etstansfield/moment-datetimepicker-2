import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnDestroy {

  // Inputs
  @Input() startDateTime: moment.Moment;
  @Input() pickedDateTime: moment.Moment;
  @Input() maxDateTime: moment.Moment = moment('20991231', 'YYYYMMDD');
  @Input() minDateTime: moment.Moment = moment('19010102', 'YYYYMMDD');
  @Input() debugInfo = false;

  // Outputs
  @Output() newDateTime: EventEmitter<moment.Moment> = new EventEmitter();

  // subscription(s)
  yearChangeSub: Subscription = new Subscription();

  // private members
  private currentMonth: number;
  private lastDayOfMonth: number; // 29,30,31
  private monthArray: moment.Moment[];
  private pickedYear: number;
  private yearChangeControl: FormControl = new FormControl();
  private months = [
    'January',
    'February',
    'March',    // lousy smarch weather
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

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
    // this.monthArray = Array(this.lastDayOfMonth).fill(1).map((x, i) => i + 1);
    this.monthArray = this.fillMonthArray(this.currentMonth, this.startDateTime.year());
    this.pickedYear = this.pickedDateTime.year();
    // console.log('+++ Test Month Array: ', testMonthArray, ' +++');

    this.yearChangeSub = this.yearChangeControl.valueChanges.pipe(debounceTime(500)).subscribe(
      (data: number) => {
        this.setSpecificYear(data);
      }
    );

  }

  ngOnDestroy() {
    this.yearChangeSub.unsubscribe();
  }

  /**
   * @description - fillin the month array with moments for each day
   * @param curMonth - the month we want to fill in, number 0 - 11
   */
  fillMonthArray(curMonth: number, year: number): moment.Moment[] {
    const newMomentArray = [];

    // we want to get the month and calculate the end day from a moment
    const internalMoment = moment().set('month', curMonth).set('year', year);

    // console.log('+++ New internal moment: ', internalMoment, ' +++');
    const lastDayOfMonth = moment(internalMoment).endOf('month').date();

    for (let i = 0; i < lastDayOfMonth; i++) {
      const newMoment = moment().set('month', curMonth).set('year', year).set('date', i + 1);
      newMomentArray.push(newMoment);
    }


    return newMomentArray;
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
    this.updateDateTime(this.pickedDateTime);
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

  /**
   * @description - change the current picked month by the amount specified
   * @param month - the month we want to change to - can be minus
   */
  changeMonth(month: number): void {

    // ensure we dont go into max/min
    const pickedAddedMonth = moment(this.pickedDateTime).add(month, 'month');
    if (pickedAddedMonth.isBefore(this.minDateTime) || pickedAddedMonth.isAfter(this.maxDateTime)) {
      return;
    }

    // need to redraw the current month
    this.pickedDateTime = moment(pickedAddedMonth);
    this.updateDateTime(this.pickedDateTime);

  }

  /**
   * @description - change the current picked year by the amount specified
   * @param year - the month we want to change to - can be minus
   */
  changeYear(year: number): void {

    // need to redraw the current month

    this.pickedDateTime.add(year, 'year');
    this.updateDateTime(this.pickedDateTime);

  }

  /**
   * @description - set the month to the one specified
   * @param month - the month number we are trying to set
   */
  setSpecificMonth(month: number): void {

    if (month <= 0 || month >= 13) {
      return;
    }

    this.pickedDateTime.set('month', month);

    this.updateDateTime(this.pickedDateTime);
  }

  /**
   * @description - set a specific year
   * @param year - the year we want to set
   */
  setSpecificYear(year: number): void {

    if (year < this.minDateTime.year() || year > this.maxDateTime.year()) {
      return;
    }

    this.pickedYear = year;
    this.pickedDateTime.set('year', year);

    this.updateDateTime(this.pickedDateTime);
  }

  /**
   * @description - update the displays for showing date and time
   * @param newDateTime - the new date/time moment we want to display
   */
  updateDateTime(newDateTime: moment.Moment): void {

    this.currentMonth = newDateTime.month();
    this.pickedYear = newDateTime.year();
    this.lastDayOfMonth = moment(newDateTime).endOf('month').date();
    this.monthArray = this.fillMonthArray(newDateTime.month(), newDateTime.year());
    this.newDateTime.emit(newDateTime);
    // console.log(`+++ Emitting new date time: ${newDateTime} +++`);
  }

  /**
   * @description - return the current month
   */
  getCurrentMonth(): number {
    return this.currentMonth;
  }

  /**
   * @description - return the current year
   */
  getCurrentYear(): number {
    return this.pickedYear;
  }

  /**
   * @description - return the current last day of the month
   */
  getLastDayOfMonth(): number {
    return this.lastDayOfMonth;
  }

  /**
   * @description - return the current month array
   */
  getMonthArray(): moment.Moment[] {
    return this.monthArray;
  }
}
