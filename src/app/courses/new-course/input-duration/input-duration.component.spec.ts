import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DurationPipe } from '@app/shared';

import { InputDurationComponent } from './input-duration.component';

describe('InputDurationComponent', () => {
  let component: InputDurationComponent;
  let fixture: ComponentFixture<InputDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputDurationComponent, DurationPipe],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
