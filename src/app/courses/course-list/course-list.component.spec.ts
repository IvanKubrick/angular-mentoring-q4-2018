import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Course1 } from '@app/shared';
import { OrderByPipe } from 'src/app/shared/orderBy-pipe/order-by.pipe';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent, OrderByPipe],
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
      new Course1(100, 'Angular test1', new Date(), 120, 'test', false),
      new Course1(101, 'Angular test2', new Date(), 120, 'test', false),
      new Course1(102, 'Angular test3', new Date(), 120, 'test', false)
    ];
    fixture.detectChanges();
    const courseItemDeArr: DebugElement[] = fixture.debugElement.queryAll(By.css('app-course-item'));

    expect(courseItemDeArr.length).toEqual(3);
  });

  it('should not create course-item components if courses array is null', () => {
    component.courses = [];
    fixture.detectChanges();
    const courseItemDeArr: DebugElement[] = fixture.debugElement.queryAll(By.css('app-course-item'));

    expect(courseItemDeArr.length).toBe(0);
  });
});
