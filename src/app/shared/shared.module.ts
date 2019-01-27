import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CourseBorderDirective } from './course-border/course-border.directive';
import { DurationPipe } from './duration-pipe/duration.pipe';
import { FilterByNamePipe } from './filter-by-name-pipe/filter-by-name.pipe';
import { OrderByPipe } from './orderBy-pipe/order-by.pipe';

@NgModule({
  declarations: [CourseBorderDirective, DurationPipe, OrderByPipe, FilterByNamePipe],
  imports: [CommonModule],
  exports: [CourseBorderDirective, DurationPipe, OrderByPipe]
})
export class SharedModule {}
