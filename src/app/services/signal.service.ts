import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  count = signal(0);

  constructor() {}

  updateCount(): number {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.count.update((n) => n + 1);
      }, 1000);
    }

    return this.count();
  }
}
