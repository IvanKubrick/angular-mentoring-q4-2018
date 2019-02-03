import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { createCoursesStub, Page } from '@testing';

import { FilterByNamePipe, ICourse, OrderByPipe } from '@app/shared';
import { CoursesService } from '../courses.service';
import { CourseListComponent } from './course-list.component';

class TestPage extends Page<CourseListComponent> {
  get courseItems(): HTMLElement[] {
    return super.queryAll<HTMLElement>('app-course-item');
  }

  constructor(fixture: ComponentFixture<CourseListComponent>) {
    super(fixture);
  }
}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let page: TestPage;
  let coursesService: CoursesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent, OrderByPipe, FilterByNamePipe],
      providers: [FilterByNamePipe, CoursesService, { provide: MatDialog, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    page = new TestPage(fixture);
    // tslint:disable-next-line: no-unsafe-any
    coursesService = TestBed.get(CoursesService);
  });

  it('should create', () => {
    spyOn(coursesService, 'getList').and.returnValue(of([]));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create the number of course-item components equal to courses array length', () => {
    const courses: ICourse[] = createCoursesStub();
    spyOn(coursesService, 'getList').and.returnValue(of(courses));
    fixture.detectChanges();

    expect(page.courseItems.length).toEqual(3);
  });

  it('should not create course-item components if courses array is empty', () => {
    spyOn(coursesService, 'getList').and.returnValue(of([]));
    fixture.detectChanges();

    expect(page.courseItems.length).toBe(0);
  });
});
