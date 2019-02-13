import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Course, ICourse } from '@app/shared';
import { ICoursesResponse } from './courses-response.model';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class CoursesService {
  courses: ICourse[] = [
    new Course(
      0,
      'Angular Basics',
      new Date(2018, 10, 1),
      120,
      `This course will provide you with some basic information concerning Angular framework.
      Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target.
      For web, mobile web, native mobile and native desktop.`,
      true
    ),
    new Course(
      1,
      'Angular Forms',
      new Date(2019, 11, 22),
      100,
      `This course will teach you how to create forms (both template and reactive) in a proper way. This guide provides
      information to help you decide which type of form works best for your situation. Handling user input with forms is the
       cornerstone of many common applications. Applications use forms to enable users to log in, to update a profile, to enter
        sensitive information, and to perform many other data-entry tasks. It introduces the common building blocks used by
        both approaches. It also summarizes the key differences between the two approaches, and demonstrates those differences
         in the context of setup, data flow, and testing.`,
      true
    ),
    new Course(
      2,
      'Angular + RxJx',
      new Date(2018, 11, 23),
      44,
      `This course will provide you with deep knowledge regarding using RxJS within an Angular app.RxJS (Reactive Extensions for
         JavaScript) is a library for reactive programming using observables that makes it easier to compose asynchronous or
          callback-based code (RxJS Docs). RxJS provides an implementation of the Observable type, which is needed until the type
           becomes part of the language and until browsers support it. The library also provides utility functions for creating
            and working with observables.`,
      false
    )
  ];

  constructor(private readonly http: HttpClient) {}

  getList(start: number): Observable<ICoursesResponse> {
    const url: string = 'http://localhost:3004/courses';
    const params: {} = {
      start: start,
      count: 5
    };

    return this.http.get<ICoursesResponse>(url, { params });
  }

  getListByName(start: number, searchString: string): Observable<ICoursesResponse> {
    const url: string = 'http://localhost:3004/courses';
    const params: {} = {
      start: start,
      count: 5,
      textFragment: searchString
    };

    return this.http.get<ICoursesResponse>(url, { params });
  }

  createCourse(courseForm: ICourse): Observable<number> {
    const course: ICourse = {
      ...courseForm,
      id: this.courses.length
    };
    this.courses.push(course);

    return of(course.id);
  }

  getItemById(id: number): Observable<ICourse> {
    const url: string = `http://localhost:3004/courses/${id}`;

    return this.http.get<ICourse>(url);
  }

  updateItem(id: number, updatedCourse: ICourse): Observable<ICourse> {
    this.courses = [...this.courses.filter((course: ICourse) => course.id !== id), { ...updatedCourse, id }];
    const newCourse: ICourse = this.courses.find((course: ICourse) => course.id === id);

    return of(newCourse);
  }

  removeItem(id: number): Observable<ICourse[]> {
    this.courses = this.courses.filter((course: ICourse) => course.id !== id);

    return of(this.courses);
  }
}
