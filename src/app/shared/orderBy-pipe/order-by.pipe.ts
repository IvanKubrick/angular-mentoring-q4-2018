import { Course } from '@app/shared';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[], filter): Course[] {
    switch (filter) {
      case 'date':
        return courses.sort((course1, course2) => Number(course1.creationDate) - Number(course2.creationDate));

      case 'duration':
        return courses.sort((course1, course2) => Number(course1.duration) - Number(course2.duration));

      default:
        return courses;
    }
  }
}
