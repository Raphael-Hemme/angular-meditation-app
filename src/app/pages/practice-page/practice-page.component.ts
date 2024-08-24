import { Component, signal } from '@angular/core';
import { TimerInputComponent } from '../../components/timer-input/timer-input.component';
import { TimerComponent } from '../../components/timer/timer.component';

export type PracticeScreens = 'TIME_SELECTION_SCREEN' | 'SESSION_SCREEN';

@Component({
  selector: 'app-practice-page',
  standalone: true,
  imports: [TimerInputComponent, TimerComponent],
  templateUrl: './practice-page.component.html',
  styleUrl: './practice-page.component.scss',
})
export class PracticePageComponent {
  public currScreen = signal<PracticeScreens>('TIME_SELECTION_SCREEN');

  public confirmTime(): void {
    this.currScreen.set('SESSION_SCREEN');
  }
}
