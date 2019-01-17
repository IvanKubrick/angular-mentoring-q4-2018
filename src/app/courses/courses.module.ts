import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [CourseListComponent, CourseItemComponent, SearchComponent],
  imports: [CommonModule, FormsModule, SharedModule]
})
export class CoursesModule {}
