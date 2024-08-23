import { computed, Injectable, Signal, signal } from '@angular/core';
import { Duration, DateTime } from 'luxon';
import { interval, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Break, SessionService } from '../session-service/session.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerSub!: Subscription;

  public currBreak = signal<null | Break>(null);

  private ZERO_DURATION = Duration.fromMillis(0);
  private DEFAULT_HOURS_VAL = 0;
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

  constructor(private readonly sessionService: SessionService) {}

  public startTimer(): void {
    // This is stupid... and does not work. find better solution for savly preventing starting another sub
    /* if (!!this.timerSub && !!!this.currBreak()) {
      console.log(this.currBreak(), '=', !!this.currBreak());
      console.log("I can't let you do that.");
      return;
    } */

    // Todo: This needs to be fixed... when restarting the sessionStartTime is updated with the time of the break end.
    this.sessionService.currSessionStart.set(DateTime.now());

    this.timerSub = interval(1000)
      .pipe(
        takeUntil(this.stopTimer$$),
        tap(() => {
          if (!this.timerFinished()) {
            this.timePassed.update((prev) => prev.plus({ seconds: 1 }));
          } else {
            this.stopTimer();
          }
        })
      )
      .subscribe();
  }

  public pauseTimer(): void {
    this.currBreak.update((prev: Break | null) => {
      if (!prev) {
        return this.generateStartBreakObj();
      } else {
        // Todo: add actual error handling that is more graceful from a UX perspective
        console.error("There has been a hickup with the timer's state");
        return this.generateStartBreakObj();
      }
    });

    this.stopTimer$$.next();
  }

  public unpauseTimer(): void {
    this.currBreak.update((prev: Break | null) => {
      if (prev) {
        return {
          ...prev,
          endTime: DateTime.now(),
        };
      } else {
        // Todo: add actual error handling that is more graceful from a UX perspective
        console.error("There has been a hickup with the timer's state");
        return this.generateStartBreakObj();
      }
    });

    this.sessionService.currSessionBreaks.update((prev: Break[]) => {
      return [...prev, this.currBreak() as Break];
    });

    this.currBreak.set(null);

    this.startTimer();
  }

  public stopTimer(): void {
    this.stopTimer$$.next();
    // Todo: save timePassed to the session in stats service before resetting.
    this.sessionService.currSessionEnd.set(DateTime.now());
    this.sessionService.currSessionDur.set(this.timePassed());

    this.sessionService.saveSession();

    // Reset state
    this.timePassed.set(this.ZERO_DURATION);
  }

  private generateStartBreakObj(): Break {
    return {
      startTime: DateTime.now(),
      endTime: DateTime.now(),
    };
  }
}
