import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Course, ICourse } from '@app/shared';
import { CourseBorderDirective } from './../../../shared/course-border/course-border.directive';
import { DurationPipe } from './../../../shared/duration-pipe/duration.pipe';
import { CourseItemComponent } from './course-item.component';

@Component({
  template: `
    <app-course-item [course]="course"></app-course-item>
  `
})
class TestHostComponent {
  course: ICourse;
}

describe('CourseItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, TestHostComponent, CourseBorderDirective, DurationPipe]
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
    let courseItemDe: DebugElement;
    let courseItemEl: HTMLDivElement;

    beforeEach(() => {
      courseItemDe = fixture.debugElement.query(By.css('.course-item__content'));
      courseItemEl = <HTMLDivElement>courseItemDe.nativeElement;
      component.course = new Course(100, 'Angular', new Date(0), 120, 'test description', true);
      fixture.detectChanges();
    });

    it('title (in upper case)', () => {
      expect(courseItemEl.querySelector('.course-content__title').textContent.trim()).toBe('ANGULAR');
    });

    it('date (formatted in a proper way)', () => {
      expect(courseItemEl.querySelector('.course-content__date').textContent).toBe('01.01.1970');
    });

    it('duration (formatted in a proper way)', () => {
      expect(courseItemEl.querySelector('.course-content__duration').textContent).toBe('2h 0min');
    });

    it('description', () => {
      expect(courseItemEl.querySelector('.course-content__description').textContent).toBe('test description');
    });
  });
});
