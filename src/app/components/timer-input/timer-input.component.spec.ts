import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerInputComponent } from './timer-input.component';

describe('TimerInputComponent', () => {
  let component: TimerInputComponent;
  let fixture: ComponentFixture<TimerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
