import { Pipe, PipeTransform } from '@angular/core';

import { ICourse } from '@app/shared';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {
  transform(courses: ICourse[], searchString: string): ICourse[] {
    return courses.filter((course: ICourse) => course.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
}
