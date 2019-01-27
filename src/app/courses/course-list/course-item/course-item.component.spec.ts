import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Course, CourseBorderDirective, DurationPipe, ICourse } from '@app/shared';
import { Page } from '@testing';

import { CourseItemComponent } from './course-item.component';

class TestPage extends Page<TestHostComponent> {
  get deleteButton(): HTMLButtonElement {
    return super.query<HTMLButtonElement>('.button_delete');
  }

  get courseItem(): HTMLDivElement {
    return super.query<HTMLDivElement>('.course-item__content');
  }

  constructor(fixture: ComponentFixture<TestHostComponent>) {
    super(fixture);
  }
}

@Component({
  template: `
    <app-course-item [course]="course" (courseDeleted)="onCourseDeleted($event)"></app-course-item>
  `
})
class TestHostComponent {
  course: ICourse;
  deletedCourseId: number;

  onCourseDeleted(courseId: number): void {
    this.deletedCourseId = courseId;
  }
}

describe('CourseItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let page: TestPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, TestHostComponent, CourseBorderDirective, DurationPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.course = new Course(100, 'Angular', new Date(0), 120, 'test description', true);
    page = new TestPage(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on "Delete" button click', () => {
    page.deleteButton.click();
    fixture.detectChanges();

    expect(component.deletedCourseId).toBe(100);
  });

  describe('should display appropriate', () => {
    it('title (in upper case)', () => {
      expect(page.courseItem.querySelector('.course-content__title').textContent.trim()).toBe('ANGULAR');
    });

    it('date (formatted in a proper way)', () => {
      expect(page.courseItem.querySelector('.course-content__date').textContent).toBe('01.01.1970');
    });

    it('duration (formatted in a proper way)', () => {
      expect(page.courseItem.querySelector('.course-content__duration').textContent).toBe('2h 0min');
    });

    it('description', () => {
      expect(page.courseItem.querySelector('.course-content__description').textContent).toBe('test description');
    });
  });
});
