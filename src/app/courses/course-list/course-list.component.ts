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
      null,
      120,
      'This course will provide you with some basic information concerning Angular framework.'
    ),
    new Course1(
      1,
      'Angular Forms',
      null,
      100,
      'This course will teach you how to create forms (both template and reactive) in a proper way.'
    ),
    new Course1(
      2,
      'Angular + RxJx',
      null,
      180,
      'This course will provide you with deep knowledge regarding using RxJS within an Angular app.'
    )
  ];
  constructor() {}

  ngOnInit() {}
}
