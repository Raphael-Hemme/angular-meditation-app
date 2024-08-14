import { Component } from '@angular/core';
import { TimerInputComponent } from '../../components/timer-input/timer-input.component';

@Component({
  selector: 'app-practice-page',
  standalone: true,
  imports: [TimerInputComponent],
  templateUrl: './practice-page.component.html',
  styleUrl: './practice-page.component.scss',
})
export class PracticePageComponent {}
