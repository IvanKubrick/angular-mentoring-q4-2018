import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterByNamePipe } from '@app/shared';
import { SharedModule } from './../shared/shared.module';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { DialogComponent } from './course-list/dialog/dialog.component';
import { CoursesService } from './courses.service';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [CourseListComponent, CourseItemComponent, SearchComponent, DialogComponent],
  providers: [FilterByNamePipe, CoursesService],
  imports: [CommonModule, FormsModule, SharedModule, MatDialogModule, MatButtonModule]
})
export class CoursesModule {}
