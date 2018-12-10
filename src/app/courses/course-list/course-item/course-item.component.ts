import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Course } from '@app/shared';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;
  @Output() courseDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onDeleteClick() {
    this.courseDeleted.emit(this.course.id);
  }
}
