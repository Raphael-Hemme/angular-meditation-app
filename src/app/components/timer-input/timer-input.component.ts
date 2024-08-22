import { Component, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncreaseDecreaseBtnComponent } from '../increase-decrease-btn/increase-decrease-btn.component';
import { Duration } from 'luxon';
import { TimerService } from '../../services/timer-service/timer.service';

@Component({
  selector: 'app-timer-input',
  standalone: true,
  imports: [FormsModule, IncreaseDecreaseBtnComponent],
  templateUrl: './timer-input.component.html',
  styleUrl: './timer-input.component.scss',
})
export class TimerInputComponent {
  public hours: WritableSignal<number>;
  public minutes: WritableSignal<number>;
  public currTimerSetByUser: Signal<Duration>;
  public currRunningTimer: Signal<Duration>;

  constructor(public readonly timerService: TimerService) {
    this.hours = this.timerService.hours;
    this.minutes = this.timerService.minutes;
    this.currTimerSetByUser = this.timerService.currTimerSetByUser;
    this.currRunningTimer = this.timerService.currRunningTimer;
  }

  public increaseHours(): void {
    this.hours.update((value) => {
      return value < 23 ? value + 1 : 0;
    });
  }

  public decreaseHours(): void {
    this.hours.update((value) => {
      return value > 0 ? value - 1 : 0;
    });
  }

  public increaseMinutes(): void {
    this.minutes.update((value) => {
      return value < 59 ? value + 1 : 0;
    });
  }

  public decreaseMinutes(): void {
    this.minutes.update((value) => {
      return value > 0 ? value - 1 : 0;
    });
  }

  public startTimer(): void {
    this.timerService.startTimer();
  }

  public stopTimer(): void {
    this.timerService.stopTimer();
  }
}
