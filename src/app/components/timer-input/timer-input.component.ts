import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IncDecType,
  IncreaseDecreaseBtnComponent,
} from '../increase-decrease-btn/increase-decrease-btn.component';

@Component({
  selector: 'app-timer-input',
  standalone: true,
  imports: [FormsModule, IncreaseDecreaseBtnComponent],
  templateUrl: './timer-input.component.html',
  styleUrl: './timer-input.component.scss',
})
export class TimerInputComponent {
  public hours = signal(0);
  public minutes = signal(5);

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
}
