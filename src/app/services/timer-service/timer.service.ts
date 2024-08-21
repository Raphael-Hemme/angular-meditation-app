import { Injectable, signal } from '@angular/core';
import { Duration } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private defaultDuration = Duration.fromObject({ hours: 0, minutes: 5 });

  private currTimerSetByUser = signal<Duration>(this.defaultDuration);

  constructor() {}

  public setTimer(hours: number, minutes: number): void {
    const duration = Duration.fromObject({ hours, minutes });
    this.currTimerSetByUser.set(duration);
  }
}
