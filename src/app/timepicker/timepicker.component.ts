import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  // +++ Inputs +++
  @Input() dateTime = moment();
  @Input() hourChangeAmount = 1;
  @Input() minuteChangeAmount = 1;


  // Internal Variables
  private currentHour = 0;
  private currentMin = 0;

  constructor() { }

  ngOnInit() {
    this.updateDateTime();
  }

  /**
   * @description - ensure we have the latest hour/min - needed for if we go over on days
   */
  updateDateTime(): void {
    this.currentHour = this.extractHourFromDateTime();
    this.currentMin = this.extractMinFromDateTime();
  }

  /**
   * @description - get the current hour of the datetime
   */
  extractHourFromDateTime(): number {
    return this.dateTime.hour();
  }

  /**
   * @description - get the current minute of the datetime
   */
  extractMinFromDateTime(): number {
    return this.dateTime.minute();
  }

  /**
   * @description - change the cur hour to the one specified
   * @param newHour - our new hour
   */
  changeHour(newHour: number): void {

    if (newHour < 0 || newHour > 23) {  // invalid hours
      return;
    }

    // else change the hour in the datetime

    this.dateTime.set('hour', newHour); this.currentHour = this.extractHourFromDateTime();
    this.currentMin = this.extractMinFromDateTime();
    this.updateDateTime();
  }

  /**
   * @description - change the cur min
   * @param newMin - our new minute
   */
  changeMinute(newMin: number): void {

    if (newMin < 0 || newMin > 59) {  // invalid mins
      return;
    }

    // else change the hour in the datetime

    this.dateTime.set('minute', newMin);
    this.updateDateTime();
  }

  /**
   * @description - increment hours by the inputted amount, default 1
   */
  incrementHour(): void {
    this.dateTime.add(this.hourChangeAmount, 'hour');
    this.updateDateTime();
  }

  /**
   * @description - decrement hours by the inputted amount, default 1
   */
  decrementHour(): void {
    this.dateTime.add(-this.hourChangeAmount, 'hour');
    this.updateDateTime();
  }

  /**
   * @description - increment mins by the inputted amount, default 1
   */
  incrementMinute(): void {
    this.dateTime.add(this.minuteChangeAmount, 'minute');
    this.updateDateTime();
  }

  /**
   * @description - decrement mins by the inputted amount, default 1
   */
  decrementMinute(): void {
    this.dateTime.add(-this.minuteChangeAmount, 'minute');
    this.updateDateTime();
  }

  /**
   * @description - getter for the internal min value
   */
  getCurrentMin(): number {
    return this.currentMin;
  }

  /**
   * @description - getter for the internal hour value
   */
  getCurrentHour(): number {
    return this.currentHour;
  }

}
