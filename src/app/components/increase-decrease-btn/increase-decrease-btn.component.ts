import { Component, EventEmitter, Input, Output } from '@angular/core';

export type IncDecType = 'INC' | 'DEC';

@Component({
  selector: 'app-increase-decrease-btn',
  standalone: true,
  imports: [],
  templateUrl: './increase-decrease-btn.component.html',
  styleUrl: './increase-decrease-btn.component.scss',
})
export class IncreaseDecreaseBtnComponent {
  @Input() type: IncDecType = 'INC';
  @Output() incDecEvent = new EventEmitter<IncDecType>();

  private actionInterval: any;

  startAction() {
    this.actionInterval = setInterval(() => {
      this.incDecEvent.emit(this.type);
    }, 100); // Adjust the interval as needed
  }

  stopAction() {
    clearInterval(this.actionInterval);
  }
}
