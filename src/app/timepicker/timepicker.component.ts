import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit, OnDestroy {

  // +++ Inputs +++
  @Input() dateTime = moment();
  @Input() hourChangeAmount = 1;
  @Input() minuteChangeAmount = 1;
  @Input() maxDateTime: moment.Moment;
  @Input() minDateTime: moment.Moment;

  // Outputs
  @Output() updatedDateTime: EventEmitter<moment.Moment> = new EventEmitter();

  // Internal Variables
  minControlSub: Subscription = new Subscription();
  hourControlSub: Subscription = new Subscription();
  minChangeControl = new FormControl();
  hourChangeControl = new FormControl();

  private currentHour = 0;
  private currentMin = 0;


  constructor() { }

  /**
   * @description - establish the beginning time and start the subscriptions
   */
  ngOnInit() {
    this.updateDateTime();

    this.minControlSub = this.minChangeControl.valueChanges.pipe(debounceTime(500)).subscribe(
      (data: number) => {
        this.currentMin = data;
        this.changeMinute(data);
      }
    );

    this.hourControlSub = this.hourChangeControl.valueChanges.pipe(debounceTime(500)).subscribe(
      (data: number) => {
        this.currentHour = data;
        this.changeHour(data);
      }
    );
  }

  /**
   * @description - cleanup on destroying the component
   */
  ngOnDestroy() {
    this.minControlSub.unsubscribe();
    this.hourControlSub.unsubscribe();
  }

  /**
   * @description - ensure we have the latest hour/min - needed for if we go over on days
   */
  updateDateTime(): void {
    this.currentHour = this.extractHourFromDateTime();
    this.currentMin = this.extractMinFromDateTime();
    this.updatedDateTime.emit(this.dateTime);
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

    const tempDateTime = moment(this.dateTime).set('hour', newHour);

    if (newHour < 0 || newHour > 23 
      || tempDateTime.isAfter(this.maxDateTime) || tempDateTime.isBefore(this.minDateTime)) {  // invalid hours
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

    const tempDateTime = moment(this.dateTime).set('minute', newMin);

    if (newMin < 0 || newMin > 59 || tempDateTime.isAfter(this.maxDateTime) || tempDateTime.isBefore(this.minDateTime)) {  // invalid mins
      return;
    }

    // else change the min in the datetime

    this.dateTime.set('minute', newMin);
    this.updateDateTime();
  }

  /**
   * @description - increment hours by the inputted amount, default 1
   */
  incrementHour(): void {

    const tempDateTime = moment(this.dateTime).add(1, 'hour');

    if (tempDateTime.isAfter(this.maxDateTime)) {  // invalid hours
      return;
    }

    this.dateTime.add(this.hourChangeAmount, 'hour');
    this.updateDateTime();
  }

  /**
   * @description - decrement hours by the inputted amount, default 1
   */
  decrementHour(): void {

    const tempDateTime = moment(this.dateTime).add(-1, 'hour');

    if (tempDateTime.isBefore(this.minDateTime)) {  // invalid hours
      return;
    }

    this.dateTime.add(-this.hourChangeAmount, 'hour');
    this.updateDateTime();
  }

  /**
   * @description - increment mins by the inputted amount, default 1
   */
  incrementMinute(): void {

    const tempDateTime = moment(this.dateTime).add(1, 'minute');

    if (tempDateTime.isAfter(this.maxDateTime)) {  // invalid hours
      return;
    }

    this.dateTime.add(this.minuteChangeAmount, 'minute');
    this.updateDateTime();
  }

  /**
   * @description - decrement mins by the inputted amount, default 1
   */
  decrementMinute(): void {

    const tempDateTime = moment(this.dateTime).add(-1, 'minute');

    if (tempDateTime.isBefore(this.minDateTime)) {  // invalid hours
      return;
    }

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
