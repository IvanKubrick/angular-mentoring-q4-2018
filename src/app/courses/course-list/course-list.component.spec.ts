import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CourseListComponent } from './course-list.component';
import { Course1 } from '@app/shared';
import { By } from '@angular/platform-browser';

describe('CourseListComponent', () => {
  const extraElements = 2;
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the number of course-item components equal to courses array length', () => {
    component.courses = [
      new Course1(100, 'Angular test1', new Date(), 120, 'test'),
      new Course1(101, 'Angular test2', new Date(), 120, 'test'),
      new Course1(102, 'Angular test3', new Date(), 120, 'test')
    ];
    fixture.detectChanges();
    const courseListDe = fixture.debugElement.query(By.css('.course-list'));
    const courseListEl = courseListDe.nativeElement;

    expect(courseListEl.childElementCount).toEqual(3 + extraElements);
  });

  it('should not create course-item components if courses array is null', () => {
    component.courses = null;
    fixture.detectChanges();
    const courseListDe = fixture.debugElement.query(By.css('.course-list'));
    const courseListEl = courseListDe.nativeElement;

    expect(courseListEl.childElementCount).toEqual(extraElements);
  });
});
