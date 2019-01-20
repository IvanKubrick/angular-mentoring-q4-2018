import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CourseBorderDirective } from './course-border/course-border.directive';
import { DialogComponent } from './dialog/dialog.component';
import { DurationPipe } from './duration-pipe/duration.pipe';
import { FilterByNamePipe } from './filter-by-name-pipe/filter-by-name.pipe';
import { OrderByPipe } from './orderBy-pipe/order-by.pipe';

@NgModule({
  declarations: [CourseBorderDirective, DurationPipe, OrderByPipe, FilterByNamePipe, DialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [CourseBorderDirective, DurationPipe, OrderByPipe, MatButtonModule, MatDialogModule]
})
export class SharedModule {}
