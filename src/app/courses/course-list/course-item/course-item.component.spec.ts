import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseItemComponent } from './course-item.component';
import { Course, Course1 } from '@app/shared';
import { CourseBorderDirective } from './../../../shared/course-border/course-border.directive';

@Component({
  template: `
    <app-course-item [course]="course"></app-course-item>
  `
})
class TestHostComponent {
  course: Course;
}

describe('CourseItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, TestHostComponent, CourseBorderDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should display appropriate', () => {
    let courseItemDe;
    let courseItemEl;

    beforeEach(() => {
      courseItemDe = fixture.debugElement.query(By.css('.course-item__content'));
      courseItemEl = courseItemDe.nativeElement;
      component.course = new Course1(100, 'Angular', new Date(0), 120, 'test description', true);
      fixture.detectChanges();
    });

    it('title', () => {
      expect(courseItemEl.querySelector('.course-content__title').textContent.trim()).toBe('Angular');
    });

    it('date', () => {
      expect(courseItemEl.querySelector('.course-content__date').textContent).toBe('Jan 1, 1970');
    });

    it('duration', () => {
      expect(courseItemEl.querySelector('.course-content__duration').textContent).toBe('120 min');
    });

    it('description', () => {
      expect(courseItemEl.querySelector('.course-content__description').textContent).toBe('test description');
    });
  });
});
