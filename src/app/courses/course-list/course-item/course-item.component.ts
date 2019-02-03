import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ICourse } from '@app/shared';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() course: ICourse;
  @Output() courseDeleted: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick(): void {
    this.courseDeleted.emit(this.course.id);
  }
}
