import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { TimePipe } from '../../../pipes/time.pipe';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [TimePipe],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
})
export class TimeComponent {
  date: Date = new Date();

  ngOnInit() {
    interval(1000).subscribe(() => {
      this.date = new Date();
    });
  }
}
