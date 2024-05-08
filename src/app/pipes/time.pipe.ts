import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(value: string | number | Date): string {
    const date: string | number | Date = new Date(value);
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  }
}
