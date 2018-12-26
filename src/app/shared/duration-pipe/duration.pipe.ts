import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): any {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours ? `${hours}h ${minutes}min` : `${minutes}min`;
  }
}
