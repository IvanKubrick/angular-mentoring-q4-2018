import { inject, TestBed } from '@angular/core/testing';

import { Course, ICourse } from '@app/shared';

import { CoursesService } from './courses.service';

const isCourseList: (courseList: ICourse[]) => boolean = (courseList: ICourse[]): boolean => {
  let result: boolean = true;

  courseList.forEach((el: ICourse) => {
    if (!(el instanceof Course)) {
      result = false;
    }
  });

  return result;
};

describe('CoursesService', () => {
  let course: ICourse;

  beforeEach(() => {
    course = new Course(1, 'Angular Basics', new Date(0), 120, 'test', false);

    TestBed.configureTestingModule({
      providers: [CoursesService]
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return list of courses on getList', inject([CoursesService], (service: CoursesService) => {
    service.getList().subscribe((value: ICourse[]) => {
      const result: boolean = isCourseList(value);

      expect(result).toBeTruthy();
    });
  }));

  it('should return created course id on createCourse', inject([CoursesService], (service: CoursesService) => {
    service.createCourse(course).subscribe((courseId: number) => {
      expect(courseId).toBe(1);
    });
  }));

  it('should return proper course by id on getItemById', inject([CoursesService], (service: CoursesService) => {
    service.getItemById(course.id).subscribe((fetchedCourse: ICourse) => {
      expect(fetchedCourse instanceof Course).toBeTruthy();
      expect(fetchedCourse.id).toBe(1);
    });
  }));

  it('should return updated course on updateItem', inject([CoursesService], (service: CoursesService) => {
    service.updateItem(course.id, course).subscribe((fetchedCourse: ICourse) => {
      expect(fetchedCourse instanceof Course).toBeTruthy();
      expect(fetchedCourse).toEqual(course);
    });
  }));

  it('should return updated course list on removeItem without course that was to be deleted', inject(
    [CoursesService],
    (service: CoursesService) => {
      service.removeItem(course.id).subscribe((courseList: ICourse[]) => {
        const courseListConsistsOfCourses: boolean = isCourseList(courseList);
        const noRemovedCourseInCourseList: ICourse | undefined = courseList.find((el: ICourse) => el.id === course.id);

        expect(courseListConsistsOfCourses).toBeTruthy();
        expect(noRemovedCourseInCourseList).toBeUndefined();
      });
    }
  ));
});
