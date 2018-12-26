import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseBorderDirective } from './course-border/course-border.directive';
import { DurationPipe } from './duration-pipe/duration.pipe';
import { OrderByPipe } from './orderBy-pipe/order-by.pipe';

@NgModule({
  declarations: [CourseBorderDirective, DurationPipe, OrderByPipe],
  imports: [CommonModule],
  exports: [CourseBorderDirective, DurationPipe, OrderByPipe]
})
export class SharedModule {}
