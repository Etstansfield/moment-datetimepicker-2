import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';
import * as moment from 'moment';
import { TimepickerComponent } from '../timepicker/timepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ DatepickerComponent, TimepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('+++ Should create +++', () => {
    expect(component).toBeTruthy();
  });

  it(`+++ Should have default date as today (${moment().date()}/${moment().month() + 1}/${moment().year()}) +++`, () => {
    const curDate = moment();
    expect(
      component.startDateTime.date() === curDate.date() &&
      component.startDateTime.month() === curDate.month() &&
      component.startDateTime.year() === curDate.year() &&
      component.startDateTime.hour() === curDate.hour() &&
      component.startDateTime.minute() === curDate.minute() // ! - Don't test down any further - not needed
    ).toBeTruthy();
  });

  it(`+++ Should alter the default date to the 20th correctly +++`, () => {
    component.pickDate(20);
    expect(component.pickedDateTime.date() === 20).toBeTruthy();
  });

  it(`+++ Should not alter the date to the 32nd +++`, () => {
    component.pickDate(32);
    expect(component.pickedDateTime.date() === 32).toBeFalsy();
  });

  it(`+++ Should not alter the date to the 0th +++`, () => {
    component.pickDate(0);
    expect(component.pickedDateTime.date() === 0).toBeFalsy();
  });

  it(`+++ Should detect the current day of the month correctly (${moment().date()}) +++`, () => {
    expect(component.isCurrentDate(moment().date())).toBeTruthy();
  });

  it(`+++ Should not overwrite our custom start date to the current date +++`, () => {
    const pastDateTime = moment('12/12/1999', 'DD/MM/YYYY');  // lets party like it's 1999... again
    component.startDateTime = moment(pastDateTime);
    component.ngOnInit();
    fixture.detectChanges();
    expect(pastDateTime.isSame(component.startDateTime)).toBeTruthy();
  });

  it(`+++ Should alter month by specified amount (-1) +++`, () => {
    const setMonth = 12;
    component.pickedDateTime = moment().set('month', setMonth);
    component.changeMonth(-1);

    expect(component.pickedDateTime.month()).toEqual(11);
  });

  it(`+++ Should alter month by specified amount (+2) - should change year +++`, () => {
    const setMonth = 12;
    component.pickedDateTime = moment().set('month', setMonth);
    component.changeMonth(2);

    expect(component.pickedDateTime.month()).toEqual(2);
  });

  it(`+++ Should alter year by specified amount (-1) +++`, () => {
    const setYear = 2020;
    component.pickedDateTime = moment().set('year', setYear);
    component.changeYear(-1);

    expect(component.pickedDateTime.year()).toEqual(2019);
  });

  it(`+++ Should alter year by specified amount (+2) +++`, () => {
    const setYear = 2020;
    component.pickedDateTime = moment().set('year', setYear);
    component.changeYear(2);

    expect(component.pickedDateTime.year()).toEqual(2022);
  });

  it(`+++ Should set specific month (5) +++`, () => {
    component.pickedDateTime = moment();
    component.setSpecificMonth(5);

    expect(component.pickedDateTime.month()).toEqual(5);
  });

  it(`+++ Should not set specific month (0) +++`, () => {
    component.pickedDateTime = moment();
    component.setSpecificMonth(0);

    expect(component.pickedDateTime.month() === 0).toBeFalsy();
  });

  it(`+++ Should not set specific month (32) +++`, () => {
    component.pickedDateTime = moment();
    component.setSpecificMonth(32);

    expect(component.pickedDateTime.month() === 32).toBeFalsy();
  });

  it(`+++ Should set specific year (2025) +++`, () => {
    component.pickedDateTime = moment();
    component.setSpecificYear(2025);

    expect(component.pickedDateTime.year()).toEqual(2025);
  });

  it(`+++ Should not set specific year (3200) +++`, () => {
    component.pickedDateTime = moment();
    component.setSpecificYear(3200);

    expect(component.pickedDateTime.year() === 3200).toBeFalsy();
  });

  it(`+++ Should not set specific year (1850) +++`, () => {
    component.pickedDateTime = moment();
    component.setSpecificYear(1850);

    expect(component.pickedDateTime.year() === 1850).toBeFalsy();
  });

});
