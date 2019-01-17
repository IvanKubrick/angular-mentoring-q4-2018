import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): string {
    const hours: number = Math.floor(duration / 60);
    const minutes: number = duration % 60;

    return Boolean(hours) ? `${hours}h ${minutes}min` : `${minutes}min`;
  }
}
