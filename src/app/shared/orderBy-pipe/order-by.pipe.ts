import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '@app/shared';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(courses: ICourse[], filter: string): ICourse[] {
    switch (filter) {
      case 'date':
        return courses.sort((course1: ICourse, course2: ICourse) => Number(course1.date) - Number(course2.date));

      case 'duration':
        return courses.sort(
          (course1: ICourse, course2: ICourse) => Number(course1.duration) - Number(course2.duration)
        );

      default:
        return courses;
    }
  }
}
