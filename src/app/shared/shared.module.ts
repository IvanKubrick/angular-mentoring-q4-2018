import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseBorderDirective } from './course-border/course-border.directive';

@NgModule({
  declarations: [CourseBorderDirective],
  imports: [CommonModule],
  exports: [CourseBorderDirective]
})
export class SharedModule {}
