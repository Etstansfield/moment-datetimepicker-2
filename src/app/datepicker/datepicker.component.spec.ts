import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';
import * as moment from 'moment';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerComponent ]
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

});
