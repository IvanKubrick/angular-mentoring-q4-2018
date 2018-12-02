import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';

@NgModule({
  declarations: [CourseListComponent, CourseItemComponent],
  imports: [CommonModule],
  exports: [CourseListComponent, CourseItemComponent]
})
export class CoursesModule {}
