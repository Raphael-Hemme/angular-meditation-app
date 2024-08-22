import { computed, Injectable, Signal, signal } from '@angular/core';
import { Duration } from 'luxon';
import { interval, Subject, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private ZERO_DURATION = Duration.fromMillis(0);
  private DEFAULT_HOURS_VAL = 5;
  private DEFAULT_MINUTES_VAL = 5;

  public hours = signal(this.DEFAULT_HOURS_VAL);
  public minutes = signal(this.DEFAULT_MINUTES_VAL);

  public currTimerSetByUser: Signal<Duration> = computed(() => {
    return Duration.fromObject({
      hours: this.hours(),
      minutes: this.minutes(),
    });
  });

  public timePassed = signal(
    Duration.fromObject({ hours: 0, minutes: 0, seconds: 0 })
  );

  public currRunningTimer = computed(() => {
    return this.currTimerSetByUser().minus(this.timePassed());
  });

  private timerFinished = computed(() => {
    return (
      this.currTimerSetByUser().minus(this.timePassed()) <= this.ZERO_DURATION
    );
  });

  private stopTimer$$ = new Subject<void>();

  constructor() {}

  public startTimer(): void {
    interval(1000)
      .pipe(
        takeUntil(this.stopTimer$$),
        tap(() => {
          if (!this.timerFinished()) {
            this.timePassed.update((prev) => {
              return prev.plus({ seconds: 1 });
            });
          } else {
            this.stopTimer$$.next();
          }
        })
      )
      .subscribe();
  }

  public stopTimer(): void {
    this.stopTimer$$.next();
  }
}
