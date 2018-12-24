import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseBorderDirective } from './course-border/course-border.directive';
import { DurationPipe } from './duration-pipe/duration.pipe';

@NgModule({
  declarations: [CourseBorderDirective, DurationPipe],
  imports: [CommonModule],
  exports: [CourseBorderDirective, DurationPipe]
})
export class SharedModule {}
