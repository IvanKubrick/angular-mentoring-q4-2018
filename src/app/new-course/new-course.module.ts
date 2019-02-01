import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '@app/shared';

import { AuthorsComponent } from './new-course/authors/authors.component';
import { InputDateComponent } from './new-course/input-date/input-date.component';
import { NewCourseComponent } from './new-course/new-course.component';

@NgModule({
  declarations: [NewCourseComponent, AuthorsComponent, InputDateComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ]
})
export class NewCourseModule {}
