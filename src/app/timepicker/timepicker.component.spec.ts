import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerComponent } from './timepicker.component';
import * as moment from 'moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

describe('TimepickerComponent', () => {
  let component: TimepickerComponent;
  let fixture: ComponentFixture<TimepickerComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ TimepickerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimepickerComponent);
    component = fixture.componentInstance;
    component.maxDateTime = moment('09/09/2099', 'DD/MM/YYYY');
    component.minDateTime = moment('09/09/1999', 'DD/MM/YYYY'); // party like it's 1999... again
    fixture.detectChanges();
  });

  it('+++ Should create +++', () => {
    expect(component).toBeTruthy();
  });

  it('+++ Should create hour and minuete subscriptions +++', () => {
    component.ngOnInit();
    expect(
      component.hourControlSub &&
      component.minControlSub
    ).toBeDefined();
  });



  it(`+++ Should have default date/time as today (${moment().date()}/${moment().month() + 1}/${moment().year()}) +++`, () => {
    const curDate = moment();
    expect(
      component.dateTime.date() === curDate.date() &&
      component.dateTime.month() === curDate.month() &&
      component.dateTime.year() === curDate.year() &&
      component.dateTime.hour() === curDate.hour() &&
      component.dateTime.minute() === curDate.minute() // ! - Don't test down any further - not needed
    ).toBeTruthy();
  });

  it(`+++ Should Extract cur hour and min correctly ${moment().hour()}:${moment().minute()} +++`, () => {
    const curDate = moment();
    component.updateDateTime();
    expect(
      component.getCurrentMin() === curDate.minute() &&
      component.getCurrentHour() === curDate.hour()
    ).toBeTruthy();
  });

  it(`+++ Should Change Hour to 12 Correctly +++`, () => {

    component.changeHour(12);
    expect(
      component.getCurrentHour() === 12
    ).toBeTruthy();

  });

  it(`+++ Should Change Hour to -1 unsuccessfully +++`, () => {

    component.changeHour(-1);
    expect(
      component.getCurrentHour() === -1
    ).toBeFalsy();

  });

  it(`+++ Should Change Hour to 25 unsuccessfully +++`, () => {

    component.changeHour(25);
    expect(
      component.getCurrentHour() === 25
    ).toBeFalsy();

  });

  it(`+++ Should Increment Hour by 1 successfully +++`, () => {

    component.dateTime = moment();
    component.dateTime.set('hour', 12); // we expect 13
    component.incrementHour();
    expect(
      component.getCurrentHour() === 13
    ).toBeTruthy();

  });

  it(`+++ Should Decrement Hour by 1 successfully +++`, () => {

    component.dateTime = moment();
    component.dateTime.set('hour', 12); // we expect 11
    component.decrementHour();
    expect(
      component.getCurrentHour() === 11
    ).toBeTruthy();

  });

  it(`+++ Should Increment Min by 1 successfully +++`, () => {

    component.dateTime = moment();
    component.dateTime.set('minute', 30); // we expect 31
    component.incrementMinute();
    expect(
      component.getCurrentMin() === 31
    ).toBeTruthy();

  });

  it(`+++ Should Decrement Min by 1 successfully +++`, () => {

    component.dateTime = moment();
    component.dateTime.set('minute', 30); // we expect 29
    component.decrementMinute();
    expect(
      component.getCurrentMin() === 29
    ).toBeTruthy();

  });

  it(`+++ Should Change Minute to 30 successfully +++`, () => {

    component.dateTime = moment();
    component.dateTime.set('minute', 31); // we expect 29
    component.changeMinute(30);
    expect(
      component.getCurrentMin() === 30
    ).toBeTruthy();

  });

  it(`+++ Should Change Minute to -1 unsuccessfully +++`, () => {

    component.dateTime = moment();
    component.changeMinute(-1);
    expect(
      component.getCurrentMin() === -1
    ).toBeFalsy();

  });

  it(`+++ Should Change Minute to 61 unsuccessfully +++`, () => {

    component.dateTime = moment();
    component.changeMinute(61);
    expect(
      component.getCurrentMin() === 61
    ).toBeFalsy();

  });

  it(`+++ Does not increment hour over max`, () => {
    component.dateTime = moment('08/09/2099:23:59', 'DD/MM/YYYY:HH:mm');

    component.incrementHour();

    expect(component.dateTime.isAfter(component.maxDateTime)).toBeFalsy();
  });

  it(`+++ Does not increment min over max`, () => {
    component.dateTime = moment('08/09/2099:23:59', 'DD/MM/YYYY:HH:mm');

    component.incrementMinute();

    expect(component.dateTime.isAfter(component.maxDateTime)).toBeFalsy();
  });

  it(`+++ Does not decrement hour under min`, () => {
    component.dateTime = moment('09/09/1999:00:01', 'DD/MM/YYYY:HH:mm');

    component.decrementHour();

    expect(component.dateTime.isBefore(component.minDateTime)).toBeFalsy();
  });

  it(`+++ Does not decrement min under min`, () => {
    component.dateTime = moment('09/09/1999:00:01', 'DD/MM/YYYY:HH:mm');

    component.incrementMinute();

    expect(component.dateTime.isBefore(component.minDateTime)).toBeFalsy();
  });

  it(`+++ Does not change minute to be over max`, () => {

    component.dateTime = moment('08/09/2099:23:58', 'DD/MM/YYYY:HH:mm');
    component.maxDateTime = moment('09/09/2099:23:58', 'DD/MM/YYYY:HH:mm');

    component.changeMinute(59);
    expect(component.dateTime.isAfter(component.maxDateTime)).toBeFalsy();
  });

  it(`+++ Does not change minute to be under min`, () => {

    component.dateTime = moment('09/09/2099:23:58', 'DD/MM/YYYY:HH:mm');
    component.minDateTime = moment('09/09/2099:23:58', 'DD/MM/YYYY:HH:mm');



    component.changeMinute(1);

    expect(component.dateTime.isBefore(component.minDateTime)).toBeFalsy();
  });

  it('+++ should unsubscribe on destruction +++', () => {

    spyOn(component.minControlSub, 'unsubscribe');
    spyOn(component.hourControlSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.minControlSub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(component.hourControlSub.unsubscribe).toHaveBeenCalledTimes(1);
  });

  // ! - Unsure how to get this working - online guides not much help
  /*it(`+++ Should unsubscribe from any subscriptions +++`, () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(
      component.minControlSub.unsubscribe &&
      component.hourControlSub.unsubscribe
    ).toHaveBeenCalled();
    // expect(paramMapSubscription.unsubscribe).toHaveBeenCalled();
  });*/
});
