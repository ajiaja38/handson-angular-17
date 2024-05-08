import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mood',
})
export class MoodPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    if (value.includes('happy')) {
      return value + '😊';
    } else if (value.includes('sad')) {
      return value + '😢';
    } else {
      return value + '😐';
    }
  }
}
