import { Component, computed, Signal } from '@angular/core';
import { TimerService } from '../../services/timer-service/timer.service';
import { Duration } from 'luxon';
import { SessionService } from '../../services/session-service/session.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  public currTimerSetByUser: Signal<Duration>;
  public currRunningTimer: Signal<Duration>;
  public isPaused: Signal<boolean>;
  public sessionHasStarted: Signal<boolean>;

  constructor(
    public timerService: TimerService,
    public sessionService: SessionService
  ) {
    this.currTimerSetByUser = this.timerService.currTimerSetByUser;
    this.currRunningTimer = this.timerService.currRunningTimer;
    this.isPaused = computed(() => {
      return !!this.timerService.currBreak();
    });
    this.sessionHasStarted = computed(() => {
      return !!this.sessionService.currSessionStart();
    });
  }

  public startTimer(): void {
    this.timerService.startTimer(true);
  }

  public stopTimer(): void {
    this.timerService.stopTimer();
  }

  public togglePause(): void {
    this.isPaused()
      ? this.timerService.unpauseTimer()
      : this.timerService.pauseTimer();
  }
}
