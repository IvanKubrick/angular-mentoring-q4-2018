import { Component, OnInit } from '@angular/core';

import { Course1, ICourse } from '@app/shared';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: ICourse[];

  private readonly _courses: ICourse[] = [
    new Course1(
      0,
      'Angular Basics',
      new Date(2018, 10, 1),
      120,
      'This course will provide you with some basic information concerning Angular framework. Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop.',
      true
    ),
    new Course1(
      1,
      'Angular Forms',
      new Date(2019, 11, 22),
      100,
      'This course will teach you how to create forms (both template and reactive) in a proper way. This guide provides information to help you decide which type of form works best for your situation. Handling user input with forms is the cornerstone of many common applications. Applications use forms to enable users to log in, to update a profile, to enter sensitive information, and to perform many other data-entry tasks. It introduces the common building blocks used by both approaches. It also summarizes the key differences between the two approaches, and demonstrates those differences in the context of setup, data flow, and testing.',
      true
    ),
    new Course1(
      2,
      'Angular + RxJx',
      new Date(2018, 11, 23),
      44,
      'This course will provide you with deep knowledge regarding using RxJS within an Angular app.RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code (RxJS Docs). RxJS provides an implementation of the Observable type, which is needed until the type becomes part of the language and until browsers support it. The library also provides utility functions for creating and working with observables.',
      false
    )
  ];

  ngOnInit(): void {
    this.courses = this._courses;
  }

  onCourseDeleted(courseId: number): void {
    window.console.log(courseId);
  }

  onLoadMoreButtonClick(): void {
    window.console.log('Load more');
  }

  onSearchButtonClicked(searchString: string): void {
    this.courses = this._courses.filter(
      (course: ICourse) => course.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
  }
}
