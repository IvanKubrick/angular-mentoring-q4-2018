import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/core';

import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@app/shared';
import { Page } from '@testing';

import { AuthorsComponent } from './authors/authors.component';
import { NewCourseComponent } from './new-course.component';

class TestPage extends Page<TestHostComponent> {
  get form(): HTMLFormElement {
    return super.query<HTMLFormElement>('form');
  }
  get inputTitle(): HTMLInputElement {
    return super.query<HTMLInputElement>('.course-form__title');
  }
  get inputDescription(): HTMLInputElement {
    return super.query<HTMLInputElement>('.course-form__description');
  }
  get inputDate(): HTMLInputElement {
    return super.query<HTMLInputElement>('.course-form__date');
  }
  get inputDuration(): HTMLInputElement {
    return super.query<HTMLInputElement>('.course-form__duration');
  }
  get textDuration(): HTMLInputElement {
    return super.query<HTMLInputElement>('.duration__text');
  }
  get saveButton(): HTMLInputElement {
    return super.query<HTMLInputElement>('.course-card__button_save');
  }
  get cancelButton(): HTMLInputElement {
    return super.query<HTMLInputElement>('.course-card__button_cancel');
  }

  constructor(fixture: ComponentFixture<TestHostComponent>) {
    super(fixture);
  }
}

@Component({
  template: `
    <app-new-course></app-new-course>
  `
})
class TestHostComponent {}

describe('NewCourseComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let page: TestPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule
      ],
      declarations: [TestHostComponent, NewCourseComponent, AuthorsComponent],
      providers: [{ provide: AuthService, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    page = new TestPage(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form should be', () => {
    beforeEach(() => {
      page.inputTitle.value = 'Course title';
      page.inputDescription.value = 'Course description';
      page.inputDate.value = new Date(0).toISOString();
      page.inputDuration.value = '100';

      page.inputTitle.dispatchEvent(new Event('input'));
      page.inputDescription.dispatchEvent(new Event('input'));
      page.inputDate.dispatchEvent(new Event('input'));
      page.inputDuration.dispatchEvent(new Event('input'));
    });

    it('valid if all fields are populated with valid data', () => {
      fixture.detectChanges();
      expect(page.form.classList).toContain('ng-valid');
    });

    it('invalid if title field is populated with invalid data', () => {
      page.inputTitle.value = 'c';
      page.inputTitle.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(page.form.classList).toContain('ng-invalid');
    });

    it('invalid if description field is populated with invalid data', () => {
      page.inputDescription.value = 'd';
      page.inputDescription.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(page.form.classList).toContain('ng-invalid');
    });

    it('invalid if date was not selected', () => {
      page.inputDate.value = null;
      page.inputDate.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(page.form.classList).toContain('ng-invalid');
    });
  });
});