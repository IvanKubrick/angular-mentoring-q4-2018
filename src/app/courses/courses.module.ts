import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FilterByNamePipe, SharedModule } from '@app/shared';

import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { DialogComponent } from './course-list/dialog/dialog.component';
import { CoursesService } from './courses.service';
import { SearchComponent } from './search/search.component';

import { AuthorsComponent } from './new-course/authors/authors.component';
import { InputDateComponent } from './new-course/input-date/input-date.component';
import { InputDurationComponent } from './new-course/input-duration/input-duration.component';
import { NewCourseComponent } from './new-course/new-course.component';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseItemComponent,
    SearchComponent,
    NewCourseComponent,
    AuthorsComponent,
    InputDateComponent,
    InputDurationComponent,
    DialogComponent
  ],
  providers: [FilterByNamePipe, CoursesService],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    SharedModule
  ]
})
export class CoursesModule {}
