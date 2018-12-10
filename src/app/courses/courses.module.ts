import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search/search.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';

@NgModule({
  declarations: [CourseListComponent, CourseItemComponent, SearchComponent],
  imports: [CommonModule, FormsModule]
})
export class CoursesModule {}
