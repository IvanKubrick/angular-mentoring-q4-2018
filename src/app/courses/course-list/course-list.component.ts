import { Component, OnInit } from '@angular/core';

import { Course, Course1 } from '@app/shared';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [
    new Course1(
      0,
      'Angular Basics',
      new Date(),
      120,
      'This course will provide you with some basic information concerning Angular framework. Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop.'
    ),
    new Course1(
      1,
      'Angular Forms',
      new Date(),
      100,
      'This course will teach you how to create forms (both template and reactive) in a proper way. This guide provides information to help you decide which type of form works best for your situation. Handling user input with forms is the cornerstone of many common applications. Applications use forms to enable users to log in, to update a profile, to enter sensitive information, and to perform many other data-entry tasks. It introduces the common building blocks used by both approaches. It also summarizes the key differences between the two approaches, and demonstrates those differences in the context of setup, data flow, and testing.'
    ),
    new Course1(
      2,
      'Angular + RxJx',
      new Date(),
      180,
      'This course will provide you with deep knowledge regarding using RxJS within an Angular app.RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code (RxJS Docs). RxJS provides an implementation of the Observable type, which is needed until the type becomes part of the language and until browsers support it. The library also provides utility functions for creating and working with observables.'
    )
  ];
  constructor() {}

  ngOnInit() {}

  onCourseDeleted(courseId: number) {
    console.log(courseId);
  }

  onLoadMoreButtonClick() {
    console.log('Load more');
  }
}
