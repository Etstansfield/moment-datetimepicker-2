import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentDatepickerComponent } from './moment-datepicker.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { TimepickerComponent } from '../timepicker/timepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';

describe('MomentDatepickerComponent', () => {
  let component: MomentDatepickerComponent;
  let fixture: ComponentFixture<MomentDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentDatepickerComponent, DatepickerComponent, TimepickerComponent],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('+++ should create +++', () => {
    expect(component).toBeTruthy();
  });

  it('+++ should toggle the datepicker open/closed correctly +++', ()=> {
    component.toggleDatePicker();
    expect(component.datePickerOpen).toBeTruthy();
    component.toggleDatePicker();
    expect(component.datePickerOpen).toBeFalsy();
  });

  it('+++ should overwrite the internal moment when a new one emitted +++', () => {
    const newMoment = moment('12/12/2019', 'DD/MM/YYYY');

    component.updateDateTime(newMoment);

    expect(component.momentDateTimeModel.isSame(newMoment)).toBeTruthy();
  });

});
